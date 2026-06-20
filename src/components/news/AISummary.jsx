"use client";

import React, { useState, useEffect, useRef } from "react";

// Animated brain/AI icon
const BrainIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

// Chevron icon for collapse/expand
const ChevronIcon = ({ up }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 0.3s ease",
      transform: up ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Spark / stars icon for the button
const SparkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

// Groq logo-ish icon
const GroqIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ opacity: 0.7 }}
  >
    <circle cx="12" cy="12" r="10" />
    <path
      d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm4-2v4m-2-2h4"
      stroke="#0d1117"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

// Animated dots for loading
const LoadingDots = () => (
  <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: "#60a5fa",
          animation: `ai-dot-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          display: "inline-block",
        }}
      />
    ))}
  </span>
);

export default function AISummary({ country }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [visible, setVisible] = useState(false);
  const prevCountryRef = useRef(null);

  // Reset when country changes
  useEffect(() => {
    if (prevCountryRef.current !== country) {
      setSummary(null);
      setError(null);
      setLoading(false);
      setExpanded(true);
      setVisible(false);
      prevCountryRef.current = country;
    }
  }, [country]);

  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    setVisible(true);
    setExpanded(true);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      setError("Failed to fetch intelligence brief. Please try again.");
      console.error("AISummary error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!country) return null;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes ai-dot-pulse {
            0%, 100% { opacity: 0.25; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes ai-card-in {
            from { opacity: 0; transform: translateY(-8px); max-height: 0; }
            to   { opacity: 1; transform: translateY(0);  max-height: 400px; }
          }
          @keyframes ai-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes ai-glow-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0), 0 4px 20px rgba(0,0,0,0.4); }
            50% { box-shadow: 0 0 0 3px rgba(59,130,246,0.15), 0 4px 20px rgba(0,0,0,0.4); }
          }
          .ai-brief-btn {
            position: relative;
            overflow: hidden;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .ai-brief-btn::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
          }
          .ai-brief-btn:hover::before {
            transform: translateX(100%);
          }
          .ai-brief-btn:hover {
            background: linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(99,102,241,0.2) 100%) !important;
            border-color: rgba(99,102,241,0.6) !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(59,130,246,0.2) !important;
          }
          .ai-brief-btn:active {
            transform: translateY(0px) scale(0.98);
          }
          .ai-card-collapse-btn:hover {
            color: #93c5fd !important;
          }
          .ai-summary-text {
            line-height: 1.7;
            letter-spacing: 0.01em;
          }
        `,
        }}
      />

      <div style={{ marginBottom: "16px" }}>
        {/* AI Brief Trigger Button */}
        {!visible && (
          <button
            className="ai-brief-btn"
            onClick={fetchSummary}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 16px",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.12) 100%)",
              border: "1px solid rgba(59,130,246,0.35)",
              borderRadius: "10px",
              color: "#93c5fd",
              fontSize: "12.5px",
              fontWeight: "700",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
              fontFamily: "inherit",
            }}
          >
            <SparkIcon />
            AI Brief
          </button>
        )}

        {/* Intelligence Card */}
        {visible && (
          <div
            style={{
              background:
                "linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "12px",
              overflow: "hidden",
              animation: "ai-card-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              animationFillMode: loading ? "none" : "both",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              ...(loading && {
                animation: "ai-glow-pulse 2s ease-in-out infinite",
              }),
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 14px",
                borderBottom: expanded
                  ? "1px solid rgba(59,130,246,0.2)"
                  : "none",
                background:
                  "linear-gradient(to right, rgba(59,130,246,0.12), rgba(99,102,241,0.08), transparent)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "7px" }}
              >
                {/* Blinking status indicator */}
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: loading ? "#f59e0b" : "#22d3ee",
                    display: "inline-block",
                    animation: loading
                      ? "ai-dot-pulse 0.8s ease-in-out infinite"
                      : "ai-dot-pulse 3s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: loading ? "#f59e0b" : "#94a3b8",
                  }}
                >
                  {loading ? "Analyzing…" : "Intelligence Brief"}
                </span>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {/* Re-fetch button (only when summary loaded) */}
                {!loading && summary && (
                  <button
                    onClick={fetchSummary}
                    title="Refresh brief"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#475569",
                      cursor: "pointer",
                      padding: "3px 5px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.15s ease",
                      fontSize: "11px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#60a5fa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#475569")
                    }
                  >
                    ↺
                  </button>
                )}

                {/* Collapse/Expand toggle */}
                <button
                  className="ai-card-collapse-btn"
                  onClick={() => setExpanded((p) => !p)}
                  title={expanded ? "Collapse" : "Expand"}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#475569",
                    cursor: "pointer",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.15s ease",
                  }}
                >
                  <ChevronIcon up={expanded} />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div
              style={{
                maxHeight: expanded ? "400px" : "0",
                overflow: "hidden",
                transition: "max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div style={{ padding: "14px 16px 12px" }}>
                {/* Loading state */}
                {loading && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      alignItems: "center",
                      padding: "8px 0 4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#94a3b8",
                        fontSize: "12px",
                      }}
                    >
                      <LoadingDots />
                      <span>Generating brief for {country}…</span>
                    </div>
                    {/* Skeleton lines */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                        marginTop: "6px",
                      }}
                    >
                      {[100, 88, 95, 72].map((w, i) => (
                        <div
                          key={i}
                          style={{
                            height: "10px",
                            borderRadius: "5px",
                            width: `${w}%`,
                            background:
                              "linear-gradient(90deg, rgba(59,130,246,0.08) 25%, rgba(99,102,241,0.18) 50%, rgba(59,130,246,0.08) 75%)",
                            backgroundSize: "200% auto",
                            animation: `ai-shimmer 1.5s linear ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Error state */}
                {error && !loading && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      padding: "8px 10px",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontSize: "14px", lineHeight: 1 }}>⚠</span>
                    <span style={{ fontSize: "12px", color: "#fca5a5", lineHeight: 1.5 }}>
                      {error}
                    </span>
                  </div>
                )}

                {/* Summary text */}
                {summary && !loading && (
                  <p
                    className="ai-summary-text"
                    style={{
                      margin: 0,
                      fontSize: "12.5px",
                      color: "#cbd5e1",
                      lineHeight: "1.75",
                    }}
                  >
                    {summary}
                  </p>
                )}
              </div>

              {/* Footer attribution */}
              {(summary || error) && !loading && (
                <div
                  style={{
                    padding: "7px 16px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    borderTop: "1px solid rgba(59,130,246,0.1)",
                  }}
                >
                  <GroqIcon />
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#334155",
                      fontWeight: "500",
                      letterSpacing: "0.4px",
                    }}
                  >
                    Sources: Groq / Llama 3 · AI-generated · Verify independently
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
