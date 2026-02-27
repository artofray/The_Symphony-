#!/usr/bin/env node

/**
 * scrape-brand.js — Firecrawl Brand Asset Scraper
 * 
 * Scrapes a company's website for brand assets including:
 * - Brand colors (primary, secondary, accent)
 * - Logo URLs (SVG, PNG, favicon)
 * - Typography / font families
 * - Taglines and key messaging
 * - Open Graph images
 * 
 * Usage:
 *   node scrape-brand.js "https://example.com" [--output ./brand-assets]
 * 
 * Requires: FIRECRAWL_API_KEY environment variable
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
const FIRECRAWL_BASE_URL = "https://api.firecrawl.dev/v1";

// Parse CLI args
const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("http"));
const outputIdx = args.indexOf("--output");
const outputDir = outputIdx !== -1 ? args[outputIdx + 1] : "./brand-assets";

if (!url) {
  console.error("Usage: node scrape-brand.js <url> [--output <dir>]");
  console.error("Example: node scrape-brand.js https://perplexity.ai");
  process.exit(1);
}

if (!FIRECRAWL_API_KEY) {
  console.error("Error: FIRECRAWL_API_KEY environment variable is required.");
  console.error("Get your API key at https://www.firecrawl.dev/");
  process.exit(1);
}

// Ensure output directory exists
const absOutput = resolve(outputDir);
if (!existsSync(absOutput)) {
  mkdirSync(absOutput, { recursive: true });
}

console.log(`🔥 Scraping brand assets from: ${url}`);
console.log(`📂 Output directory: ${absOutput}`);

/**
 * Method 1: Use Firecrawl /scrape endpoint to get page content
 */
async function scrapePage(targetUrl) {
  const response = await fetch(`${FIRECRAWL_BASE_URL}/scrape`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify({
      url: targetUrl,
      formats: ["markdown", "html", "screenshot@fullPage"],
      actions: [{ type: "wait", milliseconds: 3000 }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Firecrawl scrape failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Method 2: Use Firecrawl /extract endpoint for structured brand data
 */
async function extractBrandData(targetUrl) {
  const response = await fetch(`${FIRECRAWL_BASE_URL}/extract`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
    },
    body: JSON.stringify({
      urls: [targetUrl],
      prompt:
        "Extract the brand identity from this website. Include: company name, tagline or slogan, primary brand colors (hex values), secondary colors, accent colors, background colors, font families used, logo description, key messaging or value propositions, and any notable design characteristics (modern, minimal, playful, corporate, etc).",
      schema: {
        type: "object",
        properties: {
          company_name: { type: "string" },
          tagline: { type: "string" },
          value_propositions: {
            type: "array",
            items: { type: "string" },
          },
          colors: {
            type: "object",
            properties: {
              primary: { type: "string", description: "Primary brand color hex" },
              secondary: { type: "string", description: "Secondary brand color hex" },
              accent: { type: "string", description: "Accent color hex" },
              background: { type: "string", description: "Main background color hex" },
              text: { type: "string", description: "Primary text color hex" },
              additional: {
                type: "array",
                items: { type: "string" },
                description: "Any other notable brand colors",
              },
            },
          },
          typography: {
            type: "object",
            properties: {
              heading_font: { type: "string" },
              body_font: { type: "string" },
              mono_font: { type: "string" },
            },
          },
          style: {
            type: "string",
            description:
              "Overall design aesthetic: e.g. 'modern minimal', 'bold corporate', 'playful startup'",
          },
          logo_description: { type: "string" },
          key_features: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Firecrawl extract failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Extract logo URLs from HTML content
 */
function extractLogoUrls(html, baseUrl) {
  const logos = [];
  const base = new URL(baseUrl);

  // Look for common logo patterns
  const patterns = [
    /src=["']([^"']*logo[^"']*\.(?:svg|png|webp|jpg))/gi,
    /src=["']([^"']*brand[^"']*\.(?:svg|png|webp|jpg))/gi,
    /href=["']([^"']*favicon[^"']*)/gi,
    /content=["']([^"']*og:image[^"']*)/gi,
  ];

  // OG image
  const ogMatch = html.match(
    /property=["']og:image["'][^>]*content=["']([^"']+)["']/i
  );
  if (ogMatch) logos.push({ type: "og-image", url: ogMatch[1] });

  // Favicon
  const faviconMatch = html.match(
    /rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i
  );
  if (faviconMatch) {
    const faviconUrl = faviconMatch[1].startsWith("http")
      ? faviconMatch[1]
      : `${base.origin}${faviconMatch[1]}`;
    logos.push({ type: "favicon", url: faviconUrl });
  }

  // Logo images
  for (const pattern of patterns.slice(0, 2)) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const logoUrl = match[1].startsWith("http")
        ? match[1]
        : `${base.origin}${match[1]}`;
      logos.push({ type: "logo", url: logoUrl });
    }
  }

  return logos;
}

/**
 * Download a file from URL
 */
async function downloadFile(fileUrl, filename) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    const filepath = join(absOutput, filename);
    writeFileSync(filepath, buffer);
    console.log(`  ✅ Downloaded: ${filename}`);
    return filepath;
  } catch (err) {
    console.log(`  ⚠️  Failed to download: ${fileUrl} — ${err.message}`);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  const brandData = {
    source_url: url,
    scraped_at: new Date().toISOString(),
    company_name: null,
    tagline: null,
    colors: {},
    typography: {},
    style: null,
    logos: [],
    assets: [],
    value_propositions: [],
    key_features: [],
  };

  // Step 1: Extract structured brand data
  console.log("\n📊 Extracting brand data...");
  try {
    const extracted = await extractBrandData(url);
    if (extracted.data) {
      const d = extracted.data;
      brandData.company_name = d.company_name || null;
      brandData.tagline = d.tagline || null;
      brandData.colors = d.colors || {};
      brandData.typography = d.typography || {};
      brandData.style = d.style || null;
      brandData.value_propositions = d.value_propositions || [];
      brandData.key_features = d.key_features || [];
      brandData.logo_description = d.logo_description || null;
      console.log(`  ✅ Company: ${brandData.company_name}`);
      console.log(`  ✅ Tagline: ${brandData.tagline}`);
      console.log(`  ✅ Primary color: ${brandData.colors.primary}`);
      console.log(`  ✅ Style: ${brandData.style}`);
    }
  } catch (err) {
    console.log(`  ⚠️  Brand extraction failed: ${err.message}`);
    console.log(`  → Falling back to page scrape...`);
  }

  // Step 2: Scrape the page for logos and screenshots
  console.log("\n🖼️  Scraping page for assets...");
  try {
    const scraped = await scrapePage(url);
    if (scraped.data) {
      // Save screenshot if available
      if (scraped.data.screenshot) {
        const screenshotData = scraped.data.screenshot.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
        const screenshotPath = join(absOutput, "screenshot.png");
        writeFileSync(screenshotPath, Buffer.from(screenshotData, "base64"));
        brandData.assets.push({ type: "screenshot", path: "screenshot.png" });
        console.log("  ✅ Saved full-page screenshot");
      }

      // Extract logo URLs from HTML
      if (scraped.data.html) {
        const logos = extractLogoUrls(scraped.data.html, url);
        brandData.logos = logos;
        console.log(`  ✅ Found ${logos.length} logo/asset URLs`);

        // Download logo files
        for (let i = 0; i < logos.length; i++) {
          const logo = logos[i];
          const ext = logo.url.match(/\.(\w+)(?:\?|$)/)?.[1] || "png";
          const filename = `${logo.type}-${i}.${ext}`;
          const path = await downloadFile(logo.url, filename);
          if (path) {
            brandData.assets.push({
              type: logo.type,
              url: logo.url,
              local_path: filename,
            });
          }
        }
      }

      // Save markdown content for reference
      if (scraped.data.markdown) {
        writeFileSync(
          join(absOutput, "page-content.md"),
          scraped.data.markdown
        );
        console.log("  ✅ Saved page content as markdown");
      }
    }
  } catch (err) {
    console.log(`  ⚠️  Page scrape failed: ${err.message}`);
  }

  // Step 3: Generate brand.ts for Remotion project
  console.log("\n🎨 Generating brand configuration...");
  const brandTs = generateBrandConfig(brandData);
  writeFileSync(join(absOutput, "brand.ts"), brandTs);
  console.log("  ✅ Generated brand.ts");

  // Step 4: Save complete brand data as JSON
  writeFileSync(
    join(absOutput, "brand-data.json"),
    JSON.stringify(brandData, null, 2)
  );
  console.log("  ✅ Saved brand-data.json");

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("✨ Brand scraping complete!");
  console.log("=".repeat(60));
  console.log(`\n📁 Assets saved to: ${absOutput}`);
  console.log(`\n🏢 Company: ${brandData.company_name || "Unknown"}`);
  console.log(`💬 Tagline: ${brandData.tagline || "—"}`);
  console.log(`🎨 Colors:`);
  if (brandData.colors.primary) console.log(`   Primary:    ${brandData.colors.primary}`);
  if (brandData.colors.secondary) console.log(`   Secondary:  ${brandData.colors.secondary}`);
  if (brandData.colors.accent) console.log(`   Accent:     ${brandData.colors.accent}`);
  if (brandData.colors.background) console.log(`   Background: ${brandData.colors.background}`);
  console.log(`✍️  Typography:`);
  if (brandData.typography.heading_font) console.log(`   Heading: ${brandData.typography.heading_font}`);
  if (brandData.typography.body_font) console.log(`   Body:    ${brandData.typography.body_font}`);
  console.log(`📦 Assets downloaded: ${brandData.assets.length}`);
}

/**
 * Generate a TypeScript brand config file for use in Remotion
 */
function generateBrandConfig(data) {
  const c = data.colors || {};
  const t = data.typography || {};

  return `// Auto-generated brand configuration
// Source: ${data.source_url}
// Generated: ${data.scraped_at}

export const brand = {
  name: ${JSON.stringify(data.company_name || "Company")},
  tagline: ${JSON.stringify(data.tagline || "")},

  colors: {
    primary: "${c.primary || "#6366f1"}",
    secondary: "${c.secondary || "#8b5cf6"}",
    accent: "${c.accent || "#06b6d4"}",
    background: "${c.background || "#0f0f0f"}",
    text: "${c.text || "#ffffff"}",
    additional: ${JSON.stringify(c.additional || [])},
  },

  typography: {
    heading: "${t.heading_font || "Inter"}",
    body: "${t.body_font || "Inter"}",
    mono: "${t.mono_font || "JetBrains Mono"}",
  },

  style: ${JSON.stringify(data.style || "modern minimal")},

  valuePropositions: ${JSON.stringify(data.value_propositions || [], null, 4)},

  keyFeatures: ${JSON.stringify(data.key_features || [], null, 4)},
} as const;

export type Brand = typeof brand;
`;
}

main().catch((err) => {
  console.error("❌ Fatal error:", err.message);
  process.exit(1);
});
