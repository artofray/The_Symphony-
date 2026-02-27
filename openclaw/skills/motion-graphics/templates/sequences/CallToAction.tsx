import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { brand } from "../styles/brand";
import { GradientBG } from "../components/GradientBG";

/**
 * CallToAction Sequence — Final card with CTA
 *
 * Animation flow:
 * 1. Tagline fades in large
 * 2. CTA button slides up
 * 3. URL appears below
 * 4. Subtle particle/glow effect
 */
export const CallToAction: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Main tagline
    const taglineScale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 180 },
    });
    const taglineOpacity = interpolate(frame, [10, 35], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // CTA Button
    const ctaOpacity = interpolate(frame, [50, 70], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const ctaY = interpolate(frame, [50, 75], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // URL text
    const urlOpacity = interpolate(frame, [80, 100], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Pulsing glow on CTA
    const glowSize = interpolate(Math.sin(frame * 0.06), [-1, 1], [15, 35]);

    return (
        <GradientBG>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    padding: 80,
                }}
            >
                {/* Logo mini */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        width: 64,
                        height: 64,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 32,
                        fontWeight: 800,
                        color: "#fff",
                        marginBottom: 40,
                    }}
                >
                    {brand.name.charAt(0)}
                </div>

                {/* Main Tagline */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        transform: `scale(${taglineScale})`,
                        fontSize: 72,
                        fontWeight: 900,
                        color: brand.colors.text,
                        fontFamily: brand.typography.heading,
                        textAlign: "center",
                        letterSpacing: -2,
                        lineHeight: 1.15,
                        maxWidth: 900,
                    }}
                >
                    From Idea to App.
                    <br />
                    <span style={{ color: brand.colors.primary }}>Instantly.</span>
                </div>

                {/* CTA Button */}
                <div
                    style={{
                        opacity: ctaOpacity,
                        transform: `translateY(${ctaY}px)`,
                        marginTop: 48,
                        padding: "20px 56px",
                        background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary || brand.colors.accent})`,
                        borderRadius: 16,
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#fff",
                        fontFamily: brand.typography.body,
                        boxShadow: `0 0 ${glowSize}px ${brand.colors.primary}60`,
                    }}
                >
                    Try it Now →
                </div>

                {/* URL */}
                <div
                    style={{
                        opacity: urlOpacity,
                        marginTop: 24,
                        fontSize: 20,
                        color: `${brand.colors.text}88`,
                        fontFamily: brand.typography.mono,
                        letterSpacing: 1,
                    }}
                >
                    {brand.name.toLowerCase().replace(/\s/g, "")}.com
                </div>
            </div>
        </GradientBG>
    );
};
