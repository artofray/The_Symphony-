import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

/**
 * TypeWriter — Typing animation effect
 *
 * Simulates a user typing text into an input with a blinking cursor.
 */
interface TypeWriterProps {
    text: string;
    startFrame?: number;
    speed?: number; // Characters per frame (default: 0.8)
    cursorColor?: string;
    style?: React.CSSProperties;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
    text,
    startFrame = 0,
    speed = 0.8,
    cursorColor = "#6366f1",
    style = {},
}) => {
    const frame = useCurrentFrame();
    const adjustedFrame = frame - startFrame;

    if (adjustedFrame < 0) return null;

    const charsToShow = Math.min(
        Math.floor(adjustedFrame * speed),
        text.length
    );
    const isDone = charsToShow >= text.length;
    const showCursor =
        !isDone || (isDone && adjustedFrame < text.length / speed + 30);

    return (
        <span style={style}>
            {text.slice(0, charsToShow)}
            {showCursor && (
                <span
                    style={{
                        color: cursorColor,
                        opacity: Math.sin(frame * 0.12) > 0 ? 1 : 0,
                        fontWeight: 400,
                    }}
                >
                    |
                </span>
            )}
        </span>
    );
};
