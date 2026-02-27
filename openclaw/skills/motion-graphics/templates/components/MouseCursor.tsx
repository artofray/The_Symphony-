import React from "react";

/**
 * MouseCursor — Animated computer mouse cursor
 *
 * Renders a cursor at an absolute position with an optional click animation.
 * Use interpolate() to animate the x/y position over time.
 */
interface MouseCursorProps {
    x: number;
    y: number;
    clicking?: boolean;
    color?: string;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
    x,
    y,
    clicking = false,
    color = "#ffffff",
}) => {
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                pointerEvents: "none",
                zIndex: 1000,
                transform: `scale(${clicking ? 0.85 : 1})`,
                transition: "transform 0.08s",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
        >
            {/* Cursor SVG */}
            <svg
                width="28"
                height="34"
                viewBox="0 0 28 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 2L2 26L8.5 19.5L14 30L19 27.5L13.5 17L22 17L2 2Z"
                    fill={color}
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>

            {/* Click ring animation */}
            {clicking && (
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: `2px solid ${color}`,
                        opacity: 0.5,
                        transform: "translate(-8px, -4px)",
                    }}
                />
            )}
        </div>
    );
};
