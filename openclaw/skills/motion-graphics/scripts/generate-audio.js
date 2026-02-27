#!/usr/bin/env node

/**
 * generate-audio.js — 11Labs Audio Generator
 *
 * Generates background music and sound effects using the ElevenLabs API.
 * Outputs a local HTML page with playable audio options for easy selection.
 *
 * Usage:
 *   node generate-audio.js --prompt "upbeat tech demo" --duration 45 [--output ./public/audio]
 *   node generate-audio.js --sfx "mouse click, keyboard typing"
 *
 * Requires: ELEVENLABS_API_KEY environment variable
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = "https://api.elevenlabs.io/v1";

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
    const idx = args.indexOf(`--${name}`);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultValue;
}

const prompt = getArg("prompt", null);
const sfxList = getArg("sfx", null);
const duration = parseInt(getArg("duration", "45"), 10);
const outputDir = resolve(getArg("output", "./public/audio"));
const count = parseInt(getArg("count", "5"), 10);
const port = parseInt(getArg("port", "3002"), 10);

if (!prompt && !sfxList) {
    console.error("Usage:");
    console.error('  node generate-audio.js --prompt "upbeat corporate" --duration 45');
    console.error('  node generate-audio.js --sfx "mouse click, keyboard typing"');
    process.exit(1);
}

if (!API_KEY) {
    console.error("Error: ELEVENLABS_API_KEY environment variable is required.");
    console.error("Get your API key at https://elevenlabs.io/");

    // Fallback: generate a selection page with suggestions
    console.log("\n🎵 Generating royalty-free music suggestions instead...");
    generateFallbackPage();
    process.exit(0);
}

// Ensure output directory
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

/**
 * Generate music using 11Labs Sound Generation API
 */
async function generateMusic(musicPrompt, durationSecs) {
    console.log(`\n🎵 Generating music: "${musicPrompt}" (${durationSecs}s)`);

    const response = await fetch(`${BASE_URL}/sound-generation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "xi-api-key": API_KEY,
        },
        body: JSON.stringify({
            text: musicPrompt,
            duration_seconds: durationSecs,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`11Labs API error: ${response.status} - ${err}`);
    }

    return Buffer.from(await response.arrayBuffer());
}

/**
 * Generate sound effects
 */
async function generateSFX(sfxPrompt) {
    console.log(`  🔊 Generating SFX: "${sfxPrompt}"`);

    const response = await fetch(`${BASE_URL}/sound-generation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "xi-api-key": API_KEY,
        },
        body: JSON.stringify({
            text: sfxPrompt,
            duration_seconds: 3,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`11Labs SFX error: ${response.status} - ${err}`);
    }

    return Buffer.from(await response.arrayBuffer());
}

/**
 * Generate HTML selection page
 */
function generateSelectionPage(tracks) {
    const trackCards = tracks
        .map(
            (t, i) => `
    <div class="track-card">
      <div class="track-header">
        <span class="track-number">#${i + 1}</span>
        <span class="track-prompt">${t.prompt}</span>
      </div>
      <audio controls src="${t.url}" preload="none"></audio>
      <div class="track-actions">
        <button onclick="copyUrl('${t.url}')" class="btn btn-copy">📋 Copy URL</button>
        <a href="${t.url}" download="${t.filename}" class="btn btn-download">⬇️ Download</a>
      </div>
    </div>`
        )
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>🎵 Audio Selection — Motion Graphics</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      background: #0a0a0a; color: #e0e0e0;
      min-height: 100vh; padding: 40px;
    }
    h1 { font-size: 28px; margin-bottom: 8px; color: #fff; }
    .subtitle { color: #888; margin-bottom: 32px; font-size: 14px; }
    .track-card {
      background: #1a1a1a; border: 1px solid #333; border-radius: 12px;
      padding: 20px; margin-bottom: 16px; transition: border-color 0.2s;
    }
    .track-card:hover { border-color: #6366f1; }
    .track-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .track-number {
      background: #6366f1; color: white; padding: 4px 10px;
      border-radius: 6px; font-size: 13px; font-weight: 600;
    }
    .track-prompt { color: #ccc; font-size: 14px; }
    audio { width: 100%; margin-bottom: 12px; border-radius: 8px; }
    .track-actions { display: flex; gap: 8px; }
    .btn {
      padding: 8px 16px; border: none; border-radius: 6px;
      cursor: pointer; font-size: 13px; text-decoration: none;
      display: inline-flex; align-items: center; gap: 4px;
    }
    .btn-copy { background: #333; color: #fff; }
    .btn-copy:hover { background: #444; }
    .btn-download { background: #6366f1; color: #fff; }
    .btn-download:hover { background: #5254cc; }
    .instruction {
      margin-top: 32px; padding: 20px; background: #111;
      border: 1px solid #333; border-radius: 12px;
    }
    .instruction code {
      background: #222; padding: 2px 6px; border-radius: 4px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px;
    }
  </style>
</head>
<body>
  <h1>🎵 Audio Selection</h1>
  <p class="subtitle">Listen to each track and select the one you want for your video.</p>
  ${trackCards}
  <div class="instruction">
    <p>To use a track, tell the agent:</p>
    <p style="margin-top: 8px;"><code>Please use track #N as the background music for the video.</code></p>
  </div>
  <script>
    function copyUrl(url) {
      navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    }
  </script>
</body>
</html>`;
}

/**
 * Fallback: generate suggestions page when no API key
 */
function generateFallbackPage() {
    const suggestions = [
        { name: "Pixabay Music", url: "https://pixabay.com/music/", note: "Free royalty-free music" },
        { name: "Mixkit", url: "https://mixkit.co/free-stock-music/", note: "Free music & SFX" },
        { name: "Uppbeat", url: "https://uppbeat.io/", note: "Free for creators" },
        { name: "YouTube Audio Library", url: "https://studio.youtube.com/channel/UCX/music", note: "Free for YouTube" },
        { name: "Epidemic Sound", url: "https://www.epidemicsound.com/", note: "Paid — high quality" },
    ];

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>🎵 Music Sources — No API Key</title>
  <style>
    body { font-family: Inter, sans-serif; background: #0a0a0a; color: #e0e0e0; padding: 40px; }
    h1 { color: #fff; margin-bottom: 16px; }
    .note { color: #f59e0b; margin-bottom: 24px; }
    a { color: #6366f1; }
    .source { padding: 16px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>🎵 Music Sources</h1>
  <p class="note">⚠️ No ELEVENLABS_API_KEY found. Here are royalty-free alternatives:</p>
  ${suggestions.map((s) => `<div class="source"><a href="${s.url}" target="_blank">${s.name}</a> — ${s.note}</div>`).join("\n")}
  <p style="margin-top:24px;">Set <code>ELEVENLABS_API_KEY</code> to generate custom music with AI.</p>
</body>
</html>`;

    const pagePath = resolve("audio-selection.html");
    writeFileSync(pagePath, html);
    console.log(`\n📄 Opened: ${pagePath}`);
}

/**
 * Main execution
 */
async function main() {
    const tracks = [];

    if (prompt) {
        // Generate multiple music variations
        const variations = [
            prompt,
            `${prompt}, minimal and clean`,
            `${prompt}, energetic and uplifting`,
            `${prompt}, ambient and atmospheric`,
            `${prompt}, cinematic and dramatic`,
        ].slice(0, count);

        for (let i = 0; i < variations.length; i++) {
            try {
                const audio = await generateMusic(variations[i], duration);
                const filename = `music-${i + 1}.mp3`;
                const filepath = join(outputDir, filename);
                writeFileSync(filepath, audio);
                tracks.push({
                    prompt: variations[i],
                    filename,
                    url: filepath,
                });
                console.log(`  ✅ Saved: ${filename}`);
            } catch (err) {
                console.log(`  ⚠️  Failed variation ${i + 1}: ${err.message}`);
            }
        }
    }

    if (sfxList) {
        // Generate sound effects
        const effects = sfxList.split(",").map((s) => s.trim());
        for (const effect of effects) {
            try {
                const audio = await generateSFX(effect);
                const safeName = effect.replace(/[^a-z0-9]/gi, "-").toLowerCase();
                const filename = `sfx-${safeName}.mp3`;
                const filepath = join(outputDir, filename);
                writeFileSync(filepath, audio);
                tracks.push({
                    prompt: `SFX: ${effect}`,
                    filename,
                    url: filepath,
                });
                console.log(`  ✅ Saved: ${filename}`);
            } catch (err) {
                console.log(`  ⚠️  Failed SFX "${effect}": ${err.message}`);
            }
        }
    }

    // Generate selection HTML page
    if (tracks.length > 0) {
        const html = generateSelectionPage(tracks);
        const htmlPath = join(outputDir, "select.html");
        writeFileSync(htmlPath, html);

        console.log("\n" + "=".repeat(50));
        console.log("✨ Audio generation complete!");
        console.log("=".repeat(50));
        console.log(`\n🎵 ${tracks.length} tracks generated`);
        console.log(`📂 Saved to: ${outputDir}`);
        console.log(`🌐 Selection page: ${htmlPath}`);
        console.log(`\nOpen the selection page to listen and choose your track.`);
    }
}

main().catch((err) => {
    console.error("❌ Fatal error:", err.message);
    process.exit(1);
});
