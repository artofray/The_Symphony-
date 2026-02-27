import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/**
 * AnimatedText — Text with various entrance animation styles
 *
 * Supports:
 * - "fade"      — Simple opacity fade
 * - "slideUp"   — Slides up from below with fade
 * - "typewriter" — Characters appear one by one
 * - "wordByWord" — Words reveal sequentially
 */
interface AnimatedTextProps {
    text: string;
    style?: React.CSSProperties;
    animation?: "fade" | "slideUp" | "typewriter" | "wordByWord";
    delay?: number; // Delay in frames before animation starts
    duration?: number; // Animation duration in frames
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
    text,
    style = {},
    animation = "fade",
    delay = 0,
    duration = 30,
}) => {
    const frame = useCurrentFrame();
    const adjustedFrame = frame - delay;

    switch (animation) {
        case "fade": {
            const opacity = interpolate(adjustedFrame, [0, duration], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            });
            return <span style={{ ...style, opacity }}>{text}</span>;
        }

        case "slideUp": {
            const opacity = interpolate(adjustedFrame, [0, duration], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            });
            const translateY = interpolate(adjustedFrame, [0, duration], [30, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            });
            return (
                <span
                    style={{
                        ...style,
                        opacity,
                        transform: `translateY(${translateY}px)`,
                        display: "inline-block",
                    }}
                >
                    {text}
                </span>
            );
        }

        case "typewriter": {
            const charsToShow = Math.floor(
                interpolate(adjustedFrame, [0, duration], [0, text.length], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                })
            );
            const showCursor = adjustedFrame >= 0 && adjustedFrame < duration + 20;
            return (
                <span style={style}>
                    {text.slice(0, charsToShow)}
                    {showCursor && (
                        <span
                            style={{
                                opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                                color: "inherit",
                            }}
                        >
                            |
                        </span>
                    )}
                </span>
            );
        }

        case "wordByWord": {
            const words = text.split(" ");
            return (
                <span style={style}>
                    {words.map((word, i) => {
                        const wordDelay = i * 5;
                        const wordOpacity = interpolate(
                            adjustedFrame,
                            [wordDelay, wordDelay + 10],
                            [0, 1],
                            {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }
                        );
                        const wordY = interpolate(
                            adjustedFrame,
                            [wordDelay, wordDelay + 10],
                            [8, 0],
                            {
                                extrapolateLeft: "clamp",
                                extrapolateRight: "clamp",
                            }
                        );
                        return (
                            <span
                                key={i}
                                style={{
                                    opacity: wordOpacity,
                                    transform: `translateY(${wordY}px)`,
                                    display: "inline-block",
                                    marginRight: "0.3em",
                                }}
                            >
                                {word}
                            </span>
                        );
                    })}
                </span>
            );
        }
    }
};
