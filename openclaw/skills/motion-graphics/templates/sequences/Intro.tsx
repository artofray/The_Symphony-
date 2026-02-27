import React from "react";
import {
    useCurrentFrame,
    interpolate,
    spring,
    useVideoConfig,
    Img,
    staticFile,
} from "remotion";
import { brand } from "../styles/brand";
import { AnimatedText } from "../components/AnimatedText";
import { GradientBG } from "../components/GradientBG";

/**
 * Intro Sequence — Logo Reveal + Tagline
 *
 * Animation flow:
 * 1. Gradient background fades in
 * 2. Logo scales up with spring physics
 * 3. Company name types in
 * 4. Tagline fades in from below
 */
export const Intro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Logo entrance: scale up with spring
    const logoScale = spring({
        frame: frame - 15,
        fps,
        config: { damping: 12, stiffness: 180, mass: 0.8 },
    });

    const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Company name entrance
    const nameOpacity = interpolate(frame, [40, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const nameY = interpolate(frame, [40, 65], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Tagline entrance
    const taglineOpacity = interpolate(frame, [70, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const taglineY = interpolate(frame, [70, 95], [20, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Subtle glow pulse on logo
    const glowIntensity = interpolate(
        Math.sin(frame * 0.05),
        [-1, 1],
        [20, 40]
    );

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
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        opacity: logoOpacity,
                        transform: `scale(${logoScale})`,
                        marginBottom: 32,
                        filter: `drop-shadow(0 0 ${glowIntensity}px ${brand.colors.primary}40)`,
                    }}
                >
                    {/* Replace with actual logo: <Img src={staticFile("images/logo.svg")} /> */}
                    <div
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 24,
                            background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 56,
                            fontWeight: 800,
                            color: "#fff",
                        }}
                    >
                        {brand.name.charAt(0)}
                    </div>
                </div>

                {/* Company Name */}
                <div
                    style={{
                        opacity: nameOpacity,
                        transform: `translateY(${nameY}px)`,
                        fontSize: 72,
                        fontWeight: 800,
                        color: brand.colors.text,
                        fontFamily: brand.typography.heading,
                        letterSpacing: -2,
                    }}
                >
                    {brand.name}
                </div>

                {/* Tagline */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        transform: `translateY(${taglineY}px)`,
                        fontSize: 28,
                        color: `${brand.colors.text}aa`,
                        fontFamily: brand.typography.body,
                        marginTop: 16,
                        letterSpacing: 1,
                    }}
                >
                    {brand.tagline}
                </div>
            </div>
        </GradientBG>
    );
};
