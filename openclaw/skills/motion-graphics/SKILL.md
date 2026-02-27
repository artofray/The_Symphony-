# Motion Graphics Video Generator — "The Director" 🎬

## Overview

A complete toolkit for creating production-quality motion graphics videos using **Remotion** (React-based programmatic video framework). This skill enables Maggie to:

1. **Research & scrape** brand assets, colors, logos, and typography from any company website using Firecrawl
2. **Scaffold** a Remotion project with TailwindCSS and AI-optimized templates
3. **Compose** multi-sequence motion graphics with animations, transitions, and text effects
4. **Generate music** via 11Labs or use royalty-free audio
5. **Preview** in Remotion Studio (localhost) and **render** to MP4/WebM

## Prerequisites

- **Node.js 18+** (required by Remotion)
- **Firecrawl API key** (for brand asset scraping) — set as `FIRECRAWL_API_KEY` in environment
- **11Labs API key** (optional, for music/SFX generation) — set as `ELEVENLABS_API_KEY` in environment
- **FFmpeg** is bundled with `@remotion/renderer` — no separate install needed

## Trigger Patterns

- "create a launch video for..."
- "make a motion graphics video..."
- "generate a promo video..."
- "build a video showcasing..."
- "create an animated video about..."
- "make a product demo video..."
- Any request involving video creation, motion graphics, or launch/promo videos

## Workflow

### Phase 1: Discovery & Brand Research

When the user requests a video, FIRST gather context:

1. **Ask clarifying questions** (if not already answered):
   - What company/product is this for?
   - Target video duration (default: 30-60 seconds)
   - Key message or tagline?
   - Any specific scenes or sequences the user envisions?
   - Preferred style (corporate, playful, techy, minimal)?

2. **Scrape brand assets** using Firecrawl:
   ```bash
   node scripts/scrape-brand.js "https://company-website.com"
   ```
   This will extract:
   - Brand colors (primary, secondary, accent)
   - Logo URLs and favicon
   - Typography/font families
   - Taglines and key messaging
   - Screenshots for reference
   
   Output is saved to `brand-assets/` inside the project.

### Phase 2: Project Scaffolding

3. **Create a new Remotion project:**
   ```bash
   node scripts/scaffold-project.js --name "project-name" --port 3001
   ```
   
   Or manually:
   ```bash
   npx create-video@latest ./video-project --template blank --tailwind
   cd video-project
   npm install
   ```

4. **Install additional dependencies:**
   ```bash
   npm install @remotion/tailwind @remotion/media-utils @remotion/transitions @remotion/motion-blur
   ```

### Phase 3: Scene Composition

5. **Structure the video as sequences.** Each sequence is a React component:

   ```
   src/
   ├── Root.tsx              # Main composition entry
   ├── sequences/
   │   ├── Intro.tsx         # Logo reveal + tagline
   │   ├── Feature1.tsx      # First key feature/demo
   │   ├── Feature2.tsx      # Second key feature/demo
   │   ├── Demo.tsx          # Product demo mockup
   │   ├── CallToAction.tsx  # CTA + website URL
   │   └── Outro.tsx         # Final brand card
   ├── components/
   │   ├── AnimatedText.tsx   # Text with entrance animations
   │   ├── MockBrowser.tsx    # Fake browser chrome for app demos
   │   ├── TypeWriter.tsx     # Typing animation effect
   │   ├── MouseCursor.tsx    # Animated mouse pointer
   │   ├── ProgressBar.tsx    # Loading/generation animation
   │   ├── CodeBlock.tsx      # Animated code display
   │   ├── GradientBG.tsx     # Animated gradient backgrounds
   │   └── ParticleField.tsx  # Particle effects overlay
   ├── styles/
   │   └── brand.ts          # Brand colors, fonts, dimensions
   └── audio/
       └── background.mp3    # Background music track
   ```

6. **Composition setup** in `Root.tsx`:
   ```tsx
   import { Composition } from "remotion";
   
   export const RemotionRoot: React.FC = () => {
     return (
       <Composition
         id="LaunchVideo"
         component={LaunchVideo}
         durationInFrames={30 * 45}  // 45 seconds at 30fps
         fps={30}
         width={1920}
         height={1080}
       />
     );
   };
   ```

### Phase 4: Animation Patterns

Use these Remotion primitives for professional animations:

#### Entrance Animations
```tsx
import { useCurrentFrame, interpolate, spring } from "remotion";

const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
const scale = spring({ frame, fps: 30, config: { damping: 12, stiffness: 200 } });
```

#### Sequence Timing
```tsx
import { Sequence } from "remotion";

<Sequence from={0} durationInFrames={150} name="Intro">
  <IntroSequence />
</Sequence>
<Sequence from={150} durationInFrames={200} name="Feature Demo">
  <FeatureDemo />
</Sequence>
```

#### Transitions Between Sequences
```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={150}>
    <Intro />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 30 })}
  />
  <TransitionSeries.Sequence durationInFrames={200}>
    <FeatureDemo />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

#### Text Animation Patterns
```tsx
// Word-by-word reveal
const words = text.split(" ");
{words.map((word, i) => {
  const delay = i * 5;
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <span style={{ opacity }}>{word} </span>;
})}
```

#### Mouse Cursor Animation
```tsx
// Animate a cursor to click a button
const cursorX = interpolate(frame, [0, 30, 60], [800, 500, 500]);
const cursorY = interpolate(frame, [0, 30, 60], [200, 400, 400]);
const clicking = frame > 55 && frame < 65;
```

### Phase 5: Audio Integration

7. **Add background music:**
   ```tsx
   import { Audio, staticFile } from "remotion";
   
   <Audio src={staticFile("background.mp3")} volume={0.3} />
   ```

8. **Generate music with 11Labs** (if API key available):
   ```bash
   node scripts/generate-audio.js --prompt "sleek corporate tech demo, upbeat, modern" --duration 45
   ```
   The script will generate options and save them to `public/audio/`.

9. **Add sound effects:**
   ```tsx
   <Sequence from={60}>
     <Audio src={staticFile("click.mp3")} volume={0.8} />
   </Sequence>
   ```

### Phase 6: Preview & Iterate

10. **Start the Remotion Studio for preview:**
    ```bash
    npm run dev
    ```
    This opens at `http://localhost:3001` (or specified port) with:
    - Visual timeline like Premiere Pro
    - Frame-by-frame scrubbing
    - Real-time preview of all sequences
    - Asset panel showing downloaded brand materials

11. **Make iterative changes** based on user feedback:
    - Adjust timing, sizing, colors
    - Reposition elements
    - Add/remove sequences
    - Change animation curves

### Phase 7: Render & Export

12. **Render the final video:**
    ```bash
    # Highest quality for YouTube
    npx remotion render LaunchVideo out/launch-video.mp4 --codec h264 --crf 18
    
    # Quick preview render
    npx remotion render LaunchVideo out/preview.mp4 --codec h264 --crf 28 --scale 0.5
    
    # WebM format
    npx remotion render LaunchVideo out/launch-video.webm --codec vp8
    ```

    Or use the Remotion Studio UI: click **Render** → choose H.264 → Export.

## Design Guidelines

### Video Dimensions
- **YouTube/Standard**: 1920×1080 (16:9) @ 30fps
- **Instagram Reels/TikTok**: 1080×1920 (9:16) @ 30fps
- **Twitter/X**: 1280×720 @ 30fps
- **Square (IG Feed)**: 1080×1080 @ 30fps

### Animation Best Practices
- Use `spring()` for natural-feeling motion (damping: 10-15, stiffness: 150-250)
- Keep text on screen for minimum 2-3 seconds (60-90 frames at 30fps)
- Use `extrapolateRight: "clamp"` to prevent animation overshoot
- Add easing to all transitions — never use linear interpolation for UI elements
- Stagger entrance animations by 5-10 frames for grouped elements
- Background music should be -10 to -15 dB below speech/narration

### Color & Typography
- Pull actual brand colors from Firecrawl scrape
- Use Google Fonts loaded via `@remotion/google-fonts`
- Ensure text contrast ratio ≥ 4.5:1 against backgrounds
- Maximum 2 font families per video

### Common Scene Templates
1. **Logo Reveal**: Logo scales up from 0 with spring animation, tagline fades in below
2. **Feature Showcase**: Split screen — prompt/input on left, output/result on right
3. **Browser Mockup**: Fake Chrome/Safari frame with animated app content inside
4. **Typing Effect**: Cursor types out a prompt, then a result appears
5. **Stats/Numbers**: Counting up animation for impressive metrics
6. **CTA Card**: Bold text + URL with subtle background animation

## File Structure

```
motion-graphics/
├── SKILL.md                    # This file — main instructions
├── scripts/
│   ├── scrape-brand.js         # Firecrawl brand asset scraper
│   ├── scaffold-project.js     # Project scaffolding helper
│   └── generate-audio.js       # 11Labs music generator
├── templates/
│   ├── Root.tsx                # Base composition template
│   ├── sequences/
│   │   ├── Intro.tsx           # Logo reveal template
│   │   ├── FeatureShowcase.tsx # Feature demo template
│   │   ├── BrowserDemo.tsx     # App demo in browser chrome
│   │   └── CallToAction.tsx    # CTA template
│   └── components/
│       ├── AnimatedText.tsx    # Text animation component
│       ├── MockBrowser.tsx     # Browser chrome component
│       ├── TypeWriter.tsx      # Typing effect component
│       ├── MouseCursor.tsx     # Animated cursor component
│       └── GradientBG.tsx      # Gradient background component
└── examples/
    └── perplexity-launch/      # Example: Perplexity app builder launch video
```

## Response Format

When creating a video, always return:
1. **Project location** and how to access the preview (localhost URL)
2. **Scene breakdown** — what each sequence contains and timing
3. **Brand assets found** — colors, logos, fonts discovered
4. **Next steps** — what the user can tweak or iterate on
5. **Render command** — exact command to export the final video

## Tools Used

- **Remotion** — React-based programmatic video framework
- **Firecrawl API** — Web scraping for brand assets
- **11Labs API** — AI music and sound effect generation (optional)
- **TailwindCSS** — Styling within Remotion components
- **@remotion/google-fonts** — Typography
- **@remotion/transitions** — Scene transitions
- **@remotion/motion-blur** — Motion blur effects
- **@remotion/media-utils** — Audio/video utilities
