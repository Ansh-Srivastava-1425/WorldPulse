"use client";

import React, { useState } from "react";

const NAV_LINKS = [
  { label: "Map", active: true },
  { label: "Hot Zones", active: false },
  { label: "Compare Countries", active: false },
  { label: "Timeline", active: false },
];

export default function Navbar() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes nav-red-pulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.6); }
          50%       { opacity: 0.8; transform: scale(1.25); box-shadow: 0 0 0 5px rgba(239,68,68,0); }
        }
        @keyframes nav-green-pulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          50%       { opacity: 0.75; transform: scale(1.3); box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        @keyframes nav-live-badge {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }
        .nav-link-item {
          position: relative;
          cursor: pointer;
          transition: color 0.18s ease;
          text-decoration: none;
          padding: 4px 0;
          user-select: none;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: #3b82f6;
          transition: width 0.22s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          width: 100%;
        }
      ` }} />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "52px",
          backgroundColor: "#0d1117",
          borderBottom: "1px solid #1e293b",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          boxSizing: "border-box",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* ── LEFT: Brand ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Pulsing red dot */}
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              display: "inline-block",
              flexShrink: 0,
              animation: "nav-red-pulse 2s ease-in-out infinite",
            }}
          />

          {/* Brand text */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "2.5px",
                fontFamily: "'Courier New', Courier, monospace",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              WORLD PULSE
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: "500",
                color: "#475569",
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                fontFamily: "'Courier New', Courier, monospace",
                lineHeight: 1,
                marginTop: "1px",
              }}
            >
              GLOBAL TENSION MONITOR
            </span>
          </div>
        </div>

        {/* ── RIGHT: Nav links + LIVE badge ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {NAV_LINKS.map(({ label, active }) => (
            <span
              key={label}
              className={`nav-link-item${active ? " active" : ""}`}
              style={{
                fontSize: "12px",
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: active ? "700" : "500",
                letterSpacing: "0.8px",
                color:
                  hovered === label
                    ? "#ffffff"
                    : active
                    ? "#e2e8f0"
                    : "#94a3b8",
                textTransform: "uppercase",
              }}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
            >
              {label}
            </span>
          ))}

          {/* Divider */}
          <span
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "#1e293b",
              display: "inline-block",
            }}
          />

          {/* LIVE badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: "20px",
              padding: "3px 10px 3px 8px",
              animation: "nav-live-badge 2.5s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "inline-block",
                flexShrink: 0,
                animation: "nav-green-pulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: "800",
                color: "#22c55e",
                letterSpacing: "1.5px",
                fontFamily: "'Courier New', Courier, monospace",
                lineHeight: 1,
              }}
            >
              LIVE
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
