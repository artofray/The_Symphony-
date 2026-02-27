import React from "react";

/**
 * MockBrowser — Fake browser chrome for product demos
 *
 * Renders a realistic browser window with:
 * - Traffic light buttons (red, yellow, green)
 * - URL bar with custom URL
 * - Content area for child components
 */
interface MockBrowserProps {
    url?: string;
    children: React.ReactNode;
    darkMode?: boolean;
}

export const MockBrowser: React.FC<MockBrowserProps> = ({
    url = "app.example.com",
    children,
    darkMode = true,
}) => {
    const chromeBg = darkMode ? "#1e1e2e" : "#f0f0f0";
    const chromeText = darkMode ? "#888" : "#666";
    const chromeBorder = darkMode ? "#333" : "#ddd";
    const contentBg = darkMode ? "#111119" : "#ffffff";

    return (
        <div
            style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${chromeBorder}`,
                boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
                width: "100%",
            }}
        >
            {/* Browser Chrome */}
            <div
                style={{
                    background: chromeBg,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderBottom: `1px solid ${chromeBorder}`,
                }}
            >
                {/* Traffic Lights */}
                <div style={{ display: "flex", gap: 8 }}>
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#ff5f56",
                        }}
                    />
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#ffbd2e",
                        }}
                    />
                    <div
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: "#27c93f",
                        }}
                    />
                </div>

                {/* URL Bar */}
                <div
                    style={{
                        flex: 1,
                        background: darkMode ? "#0d0d15" : "#fff",
                        borderRadius: 8,
                        padding: "8px 16px",
                        fontSize: 14,
                        color: chromeText,
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <span style={{ opacity: 0.5 }}>🔒</span>
                    <span>{url}</span>
                </div>
            </div>

            {/* Content Area */}
            <div
                style={{
                    background: contentBg,
                    minHeight: 500,
                }}
            >
                {children}
            </div>
        </div>
    );
};
