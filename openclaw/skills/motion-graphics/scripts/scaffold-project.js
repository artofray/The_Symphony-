#!/usr/bin/env node

/**
 * scaffold-project.js — Remotion Project Scaffolder
 *
 * Creates a new Remotion project pre-configured for motion graphics video creation.
 * Includes TailwindCSS, brand assets integration, and template sequences.
 *
 * Usage:
 *   node scaffold-project.js --name "my-video" [--port 3001] [--brand ./brand-assets]
 */

import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync, copyFileSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const projectName = getArg("name", "launch-video");
const port = getArg("port", "3001");
const brandDir = getArg("brand", null);
const projectDir = resolve(projectName);

console.log("🎬 Motion Graphics Project Scaffolder");
console.log("=".repeat(50));
console.log(`📁 Project: ${projectName}`);
console.log(`🌐 Port: ${port}`);
console.log(`📂 Location: ${projectDir}`);
if (brandDir) console.log(`🎨 Brand assets: ${brandDir}`);

// Step 1: Create the Remotion project
console.log("\n📦 Creating Remotion project...");
if (!existsSync(projectDir)) {
    try {
        execSync(`npx -y create-video@latest ${projectName} --template blank --tailwind`, {
            stdio: "inherit",
            cwd: resolve("."),
        });
    } catch (err) {
        console.log("⚠️  create-video might have prompted. Creating manually...");
        mkdirSync(projectDir, { recursive: true });
    }
}

// Ensure project directory exists
if (!existsSync(projectDir)) {
    mkdirSync(projectDir, { recursive: true });
}

// Step 2: Create directory structure
console.log("\n📂 Creating directory structure...");
const dirs = [
    "src/sequences",
    "src/components",
    "src/styles",
    "public/audio",
    "public/images",
    "out",
];
dirs.forEach((dir) => {
    const fullDir = join(projectDir, dir);
    if (!existsSync(fullDir)) {
        mkdirSync(fullDir, { recursive: true });
        console.log(`  ✅ ${dir}/`);
    }
});

// Step 3: Copy brand assets if provided
if (brandDir && existsSync(resolve(brandDir))) {
    console.log("\n🎨 Copying brand assets...");
    const brandSrc = resolve(brandDir);

    // Copy brand.ts to styles
    const brandTsPath = join(brandSrc, "brand.ts");
    if (existsSync(brandTsPath)) {
        copyFileSync(brandTsPath, join(projectDir, "src/styles/brand.ts"));
        console.log("  ✅ Copied brand.ts to src/styles/");
    }

    // Copy images to public
    const brandDataPath = join(brandSrc, "brand-data.json");
    if (existsSync(brandDataPath)) {
        const brandData = JSON.parse(readFileSync(brandDataPath, "utf-8"));
        if (brandData.assets) {
            brandData.assets.forEach((asset) => {
                if (asset.local_path) {
                    const srcFile = join(brandSrc, asset.local_path);
                    if (existsSync(srcFile)) {
                        copyFileSync(srcFile, join(projectDir, "public/images", asset.local_path));
                        console.log(`  ✅ Copied ${asset.local_path}`);
                    }
                }
            });
        }
    }
}

// Step 4: Generate default brand config if none provided
if (!brandDir) {
    console.log("\n🎨 Generating default brand config...");
    const defaultBrand = `// Default brand configuration — customize these values
// Run scrape-brand.js to auto-populate from a website

export const brand = {
  name: "Your Company",
  tagline: "Your Tagline Here",

  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    background: "#0f0f0f",
    text: "#ffffff",
    additional: ["#f59e0b", "#10b981"],
  },

  typography: {
    heading: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  style: "modern minimal",
  valuePropositions: [],
  keyFeatures: [],
} as const;

export type Brand = typeof brand;
`;
    writeFileSync(join(projectDir, "src/styles/brand.ts"), defaultBrand);
    console.log("  ✅ Created default brand.ts");
}

// Step 5: Generate package.json scripts
console.log("\n📄 Updating package.json...");
const pkgPath = join(projectDir, "package.json");
let pkg;
if (existsSync(pkgPath)) {
    pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
} else {
    pkg = { name: projectName, version: "1.0.0", type: "module" };
}

pkg.scripts = {
    ...(pkg.scripts || {}),
    dev: `remotion studio --port ${port}`,
    build: "remotion render LaunchVideo out/video.mp4",
    "build:preview": "remotion render LaunchVideo out/preview.mp4 --crf 28 --scale 0.5",
    "build:hq": "remotion render LaunchVideo out/video-hq.mp4 --codec h264 --crf 16",
    "build:webm": "remotion render LaunchVideo out/video.webm --codec vp8",
};

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("  ✅ Updated package.json scripts");

// Step 6: Install additional dependencies
console.log("\n📦 Installing additional dependencies...");
try {
    execSync(
        "npm install @remotion/transitions @remotion/motion-blur @remotion/media-utils @remotion/google-fonts",
        {
            stdio: "inherit",
            cwd: projectDir,
        }
    );
    console.log("  ✅ Additional Remotion packages installed");
} catch (err) {
    console.log("  ⚠️  Dependency installation had issues — you may need to run npm install manually");
}

// Step 7: Copy template files
console.log("\n📝 Copying template files...");
const templatesDir = join(__dirname, "..", "templates");
if (existsSync(templatesDir)) {
    const templateFiles = [
        { src: "Root.tsx", dest: "src/Root.tsx" },
        { src: "sequences/Intro.tsx", dest: "src/sequences/Intro.tsx" },
        { src: "sequences/FeatureShowcase.tsx", dest: "src/sequences/FeatureShowcase.tsx" },
        { src: "sequences/BrowserDemo.tsx", dest: "src/sequences/BrowserDemo.tsx" },
        { src: "sequences/CallToAction.tsx", dest: "src/sequences/CallToAction.tsx" },
        { src: "components/AnimatedText.tsx", dest: "src/components/AnimatedText.tsx" },
        { src: "components/MockBrowser.tsx", dest: "src/components/MockBrowser.tsx" },
        { src: "components/TypeWriter.tsx", dest: "src/components/TypeWriter.tsx" },
        { src: "components/MouseCursor.tsx", dest: "src/components/MouseCursor.tsx" },
        { src: "components/GradientBG.tsx", dest: "src/components/GradientBG.tsx" },
    ];

    templateFiles.forEach(({ src, dest }) => {
        const srcPath = join(templatesDir, src);
        if (existsSync(srcPath)) {
            const destPath = join(projectDir, dest);
            const destDir = dirname(destPath);
            if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
            copyFileSync(srcPath, destPath);
            console.log(`  ✅ ${dest}`);
        }
    });
}

// Done
console.log("\n" + "=".repeat(50));
console.log("✨ Project scaffolded successfully!");
console.log("=".repeat(50));
console.log(`
Next steps:
  cd ${projectName}
  npm run dev          → Opens Remotion Studio at http://localhost:${port}

To render the final video:
  npm run build        → Standard quality MP4
  npm run build:hq     → High quality MP4 (for YouTube)
  npm run build:webm   → WebM format
`);
