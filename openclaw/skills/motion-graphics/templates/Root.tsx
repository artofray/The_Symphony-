import React from "react";
import { Composition } from "remotion";
import { Intro } from "./sequences/Intro";
import { FeatureShowcase } from "./sequences/FeatureShowcase";
import { BrowserDemo } from "./sequences/BrowserDemo";
import { CallToAction } from "./sequences/CallToAction";
import { brand } from "./styles/brand";

/**
 * LaunchVideo — Main Composition
 *
 * This is the root component that assembles all sequences into the final video.
 * Sequence timing (in frames at 30fps):
 *   - Intro:          0–149    (5 seconds)
 *   - Feature 1:      150–349  (6.6 seconds)
 *   - Browser Demo:   350–649  (10 seconds)
 *   - Feature 2:      650–849  (6.6 seconds)
 *   - CTA:            850–1199 (11.6 seconds)
 *
 * Total: ~40 seconds. Adjust durationInFrames below to change.
 */

const FPS = 30;
const DURATION_SECONDS = 45;

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="LaunchVideo"
                component={LaunchVideo}
                durationInFrames={FPS * DURATION_SECONDS}
                fps={FPS}
                width={1920}
                height={1080}
                defaultProps={{
                    brandName: brand.name,
                    tagline: brand.tagline,
                    primaryColor: brand.colors.primary,
                    bgColor: brand.colors.background,
                }}
            />
            {/* Preview individual sequences */}
            <Composition
                id="IntroOnly"
                component={Intro}
                durationInFrames={150}
                fps={FPS}
                width={1920}
                height={1080}
            />
            <Composition
                id="CTAOnly"
                component={CallToAction}
                durationInFrames={150}
                fps={FPS}
                width={1920}
                height={1080}
            />
        </>
    );
};

import { Sequence, Audio, staticFile, useCurrentFrame } from "remotion";

const LaunchVideo: React.FC<{
    brandName: string;
    tagline: string;
    primaryColor: string;
    bgColor: string;
}> = ({ brandName, tagline, primaryColor, bgColor }) => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: bgColor,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Music */}
            <Sequence from={0}>
                <Audio src={staticFile("audio/background.mp3")} volume={0.25} />
            </Sequence>

            {/* Sequence 1: Intro — Logo + Tagline */}
            <Sequence from={0} durationInFrames={150} name="Intro">
                <Intro />
            </Sequence>

            {/* Sequence 2: Feature Showcase 1 */}
            <Sequence from={150} durationInFrames={200} name="Feature 1">
                <FeatureShowcase
                    title="Build Anything"
                    subtitle="Just describe what you want"
                    featureText="Transform your ideas into production-ready applications"
                />
            </Sequence>

            {/* Sequence 3: Browser Demo */}
            <Sequence from={350} durationInFrames={300} name="Browser Demo">
                <BrowserDemo
                    prompt="Build me a real-time analytics dashboard"
                    appTitle="Analytics Dashboard"
                />
            </Sequence>

            {/* Sequence 4: Feature Showcase 2 */}
            <Sequence from={650} durationInFrames={200} name="Feature 2">
                <FeatureShowcase
                    title="Ship Faster"
                    subtitle="From idea to deployment in minutes"
                    featureText="No boilerplate. No setup. Just results."
                />
            </Sequence>

            {/* Sequence 5: Call to Action */}
            <Sequence from={850} durationInFrames={500} name="CTA">
                <CallToAction />
            </Sequence>
        </div>
    );
};
