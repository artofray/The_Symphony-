import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { brand } from "../styles/brand";
import { AnimatedText } from "../components/AnimatedText";
import { GradientBG } from "../components/GradientBG";

/**
 * FeatureShowcase Sequence
 *
 * Displays a key feature with animated title, subtitle, and feature text.
 * Great for highlighting product capabilities between demo sequences.
 */
interface FeatureShowcaseProps {
    title: string;
    subtitle: string;
    featureText: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
    title,
    subtitle,
    featureText,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title entrance
    const titleScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 14, stiffness: 200 },
    });
    const titleOpacity = interpolate(frame, [5, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Subtitle entrance (staggered)
    const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const subtitleY = interpolate(frame, [30, 55], [25, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Feature text entrance
    const featureOpacity = interpolate(frame, [55, 75], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const featureY = interpolate(frame, [55, 80], [20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Decorative accent line
    const lineWidth = interpolate(frame, [15, 50], [0, 120], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

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
                {/* Main Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `scale(${titleScale})`,
                        fontSize: 96,
                        fontWeight: 900,
                        color: brand.colors.text,
                        fontFamily: brand.typography.heading,
                        letterSpacing: -3,
                        textAlign: "center",
                        lineHeight: 1.1,
                    }}
                >
                    {title}
                </div>

                {/* Accent Line */}
                <div
                    style={{
                        width: lineWidth,
                        height: 4,
                        background: `linear-gradient(90deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                        borderRadius: 2,
                        marginTop: 24,
                        marginBottom: 24,
                    }}
                />

                {/* Subtitle */}
                <div
                    style={{
                        opacity: subtitleOpacity,
                        transform: `translateY(${subtitleY}px)`,
                        fontSize: 36,
                        color: brand.colors.primary,
                        fontFamily: brand.typography.body,
                        fontWeight: 500,
                        textAlign: "center",
                    }}
                >
                    {subtitle}
                </div>

                {/* Feature Description */}
                <div
                    style={{
                        opacity: featureOpacity,
                        transform: `translateY(${featureY}px)`,
                        fontSize: 24,
                        color: `${brand.colors.text}88`,
                        fontFamily: brand.typography.body,
                        textAlign: "center",
                        marginTop: 16,
                        maxWidth: 800,
                        lineHeight: 1.6,
                    }}
                >
                    {featureText}
                </div>
            </div>
        </GradientBG>
    );
};
