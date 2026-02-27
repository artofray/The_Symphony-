import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { brand } from "../styles/brand";

/**
 * GradientBG — Animated gradient background
 *
 * A dark, subtly animated background with gradient mesh effects.
 * Uses the brand colors for accent glows.
 */
interface GradientBGProps {
    children: React.ReactNode;
}

export const GradientBG: React.FC<GradientBGProps> = ({ children }) => {
    const frame = useCurrentFrame();

    // Subtle movement of gradient blobs
    const blob1X = interpolate(Math.sin(frame * 0.015), [-1, 1], [15, 35]);
    const blob1Y = interpolate(Math.cos(frame * 0.012), [-1, 1], [10, 30]);
    const blob2X = interpolate(Math.sin(frame * 0.018 + 2), [-1, 1], [55, 85]);
    const blob2Y = interpolate(Math.cos(frame * 0.014 + 1), [-1, 1], [50, 80]);
    const blob3X = interpolate(Math.sin(frame * 0.01 + 4), [-1, 1], [30, 60]);
    const blob3Y = interpolate(Math.cos(frame * 0.016 + 3), [-1, 1], [60, 90]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: brand.colors.background,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Gradient Blob 1 */}
            <div
                style={{
                    position: "absolute",
                    left: `${blob1X}%`,
                    top: `${blob1Y}%`,
                    width: 600,
                    height: 600,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${brand.colors.primary}15 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Gradient Blob 2 */}
            <div
                style={{
                    position: "absolute",
                    left: `${blob2X}%`,
                    top: `${blob2Y}%`,
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${brand.colors.accent || brand.colors.secondary}10 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Gradient Blob 3 */}
            <div
                style={{
                    position: "absolute",
                    left: `${blob3X}%`,
                    top: `${blob3Y}%`,
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${brand.colors.secondary || brand.colors.primary}08 0%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(60px)",
                }}
            />

            {/* Subtle grid overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${brand.colors.text}05 1px, transparent 1px), linear-gradient(90deg, ${brand.colors.text}05 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    opacity: 0.5,
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                }}
            >
                {children}
            </div>
        </div>
    );
};
