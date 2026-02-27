import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { brand } from "../styles/brand";
import { MockBrowser } from "../components/MockBrowser";
import { TypeWriter } from "../components/TypeWriter";
import { MouseCursor } from "../components/MouseCursor";
import { GradientBG } from "../components/GradientBG";

/**
 * BrowserDemo Sequence
 *
 * Shows a product demo inside a browser mockup with:
 * 1. Browser window slides in
 * 2. User types a prompt in the input
 * 3. Mouse clicks the generate button
 * 4. App content appears (with prompt sidebar on the left)
 */
interface BrowserDemoProps {
    prompt: string;
    appTitle: string;
}

export const BrowserDemo: React.FC<BrowserDemoProps> = ({
    prompt,
    appTitle,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Browser slide-in
    const browserScale = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, stiffness: 150 },
    });
    const browserOpacity = interpolate(frame, [5, 25], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const browserY = interpolate(frame, [5, 30], [60, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Typing starts after browser appears
    const typingStartFrame = 40;
    const typingChars = Math.max(
        0,
        Math.floor((frame - typingStartFrame) * 0.8)
    );
    const typedText = prompt.slice(0, Math.min(typingChars, prompt.length));
    const typingDone = typingChars >= prompt.length;

    // Mouse cursor moves to generate button after typing
    const generateFrame = typingStartFrame + Math.ceil(prompt.length / 0.8) + 15;
    const clickFrame = generateFrame + 20;

    // Generate button click effect
    const isClicking = frame > clickFrame && frame < clickFrame + 10;
    const generateBtnScale = isClicking ? 0.95 : 1;

    // App content appears after click
    const appContentFrame = clickFrame + 20;
    const appOpacity = interpolate(
        frame,
        [appContentFrame, appContentFrame + 20],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Loading animation between click and content
    const isLoading =
        frame > clickFrame + 5 && frame < appContentFrame;
    const loadingProgress = interpolate(
        frame,
        [clickFrame + 5, appContentFrame],
        [0, 100],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <GradientBG>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    padding: 60,
                }}
            >
                {/* Browser Window */}
                <div
                    style={{
                        opacity: browserOpacity,
                        transform: `translateY(${browserY}px) scale(${browserScale})`,
                        width: "90%",
                        maxWidth: 1400,
                    }}
                >
                    <MockBrowser url={`${brand.name.toLowerCase()}.app`}>
                        {/* Input Area */}
                        <div
                            style={{
                                padding: 32,
                                borderBottom: "1px solid #333",
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                            }}
                        >
                            {/* Text Input */}
                            <div
                                style={{
                                    flex: 1,
                                    background: "#1a1a2e",
                                    border: "1px solid #333",
                                    borderRadius: 12,
                                    padding: "16px 20px",
                                    fontSize: 18,
                                    color: "#fff",
                                    fontFamily: brand.typography.body,
                                    minHeight: 56,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {typedText}
                                {!typingDone && (
                                    <span
                                        style={{
                                            opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                                            color: brand.colors.primary,
                                            marginLeft: 2,
                                        }}
                                    >
                                        |
                                    </span>
                                )}
                            </div>

                            {/* Generate Button */}
                            <div
                                style={{
                                    background: `linear-gradient(135deg, ${brand.colors.primary}, ${brand.colors.secondary || brand.colors.primary})`,
                                    color: "#fff",
                                    padding: "16px 32px",
                                    borderRadius: 12,
                                    fontSize: 18,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    transform: `scale(${generateBtnScale})`,
                                    transition: "transform 0.1s",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                ✨ Generate
                            </div>
                        </div>

                        {/* Content Area: Prompt Sidebar + App */}
                        <div
                            style={{
                                display: "flex",
                                height: 450,
                                position: "relative",
                            }}
                        >
                            {/* Loading State */}
                            {isLoading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "#111119",
                                        zIndex: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 300,
                                            height: 6,
                                            background: "#222",
                                            borderRadius: 3,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${loadingProgress}%`,
                                                height: "100%",
                                                background: `linear-gradient(90deg, ${brand.colors.primary}, ${brand.colors.accent})`,
                                                borderRadius: 3,
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 16,
                                            color: "#888",
                                            fontSize: 14,
                                            fontFamily: brand.typography.body,
                                        }}
                                    >
                                        Generating your app...
                                    </div>
                                </div>
                            )}

                            {/* Prompt Sidebar (25% width) */}
                            {frame > appContentFrame && (
                                <div
                                    style={{
                                        width: "25%",
                                        borderRight: "1px solid #333",
                                        padding: 20,
                                        background: "#0d0d15",
                                        opacity: appOpacity,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color: "#666",
                                            textTransform: "uppercase",
                                            letterSpacing: 1.5,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Prompt
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: "#aaa",
                                            fontFamily: brand.typography.body,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {prompt}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 20,
                                            padding: "8px 14px",
                                            background: "#10b98120",
                                            color: "#10b981",
                                            fontSize: 13,
                                            borderRadius: 8,
                                            fontWeight: 600,
                                        }}
                                    >
                                        ✓ Generated
                                    </div>
                                </div>
                            )}

                            {/* App Content (75% width) */}
                            {frame > appContentFrame && (
                                <div
                                    style={{
                                        flex: 1,
                                        opacity: appOpacity,
                                        padding: 24,
                                        background: "#111119",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 22,
                                            fontWeight: 700,
                                            color: "#fff",
                                            fontFamily: brand.typography.heading,
                                        }}
                                    >
                                        {appTitle}
                                    </div>

                                    {/* Mock Dashboard Grid */}
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr",
                                            gap: 12,
                                        }}
                                    >
                                        {["Revenue", "Users", "Growth"].map((label, i) => {
                                            const cardDelay = appContentFrame + i * 8;
                                            const cardOpacity = interpolate(
                                                frame,
                                                [cardDelay, cardDelay + 15],
                                                [0, 1],
                                                {
                                                    extrapolateLeft: "clamp",
                                                    extrapolateRight: "clamp",
                                                }
                                            );
                                            return (
                                                <div
                                                    key={label}
                                                    style={{
                                                        opacity: cardOpacity,
                                                        background: "#1a1a2e",
                                                        borderRadius: 10,
                                                        padding: 16,
                                                        border: "1px solid #333",
                                                    }}
                                                >
                                                    <div style={{ fontSize: 12, color: "#666" }}>
                                                        {label}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: 28,
                                                            fontWeight: 800,
                                                            color: brand.colors.primary,
                                                            marginTop: 4,
                                                        }}
                                                    >
                                                        {["$124K", "12.4K", "+240%"][i]}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Mock Chart */}
                                    <div
                                        style={{
                                            flex: 1,
                                            background: "#1a1a2e",
                                            borderRadius: 10,
                                            border: "1px solid #333",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 400 150"
                                            style={{ width: "100%", height: "100%" }}
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="chartGrad"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="0%"
                                                        stopColor={brand.colors.primary}
                                                        stopOpacity="0.3"
                                                    />
                                                    <stop
                                                        offset="100%"
                                                        stopColor={brand.colors.primary}
                                                        stopOpacity="0"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,120 C50,100 100,80 150,90 C200,100 250,40 300,50 C350,60 380,30 400,35 L400,150 L0,150 Z"
                                                fill="url(#chartGrad)"
                                            />
                                            <path
                                                d="M0,120 C50,100 100,80 150,90 C200,100 250,40 300,50 C350,60 380,30 400,35"
                                                fill="none"
                                                stroke={brand.colors.primary}
                                                strokeWidth="2.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </MockBrowser>
                </div>

                {/* Mouse Cursor — moves to generate button after typing */}
                {frame > generateFrame - 10 && frame < clickFrame + 15 && (
                    <MouseCursor
                        x={interpolate(
                            frame,
                            [generateFrame - 10, generateFrame + 10],
                            [900, 1250],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )}
                        y={interpolate(
                            frame,
                            [generateFrame - 10, generateFrame + 10],
                            [300, 358],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )}
                        clicking={isClicking}
                    />
                )}
            </div>
        </GradientBG>
    );
};
