"use client";

import React from "react";

const tickerHeadlines = [
  "Russia-Ukraine ceasefire talks stall in Geneva",
  "China conducts military drills near Taiwan strait",
  "US Federal Reserve signals interest rate pause",
  "Iran nuclear talks resume after 6-month gap",
  "African Union summit addresses Sahel security crisis",
  "South China Sea tensions rise after naval incident",
  "EU announces new sanctions package against Belarus",
  "India-Pakistan border skirmish reported in Kashmir",
];

export default function NewsTicker() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes pulse-red-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        .ticker-track-animate {
          display: flex;
          width: max-content;
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track-animate:hover {
          animation-play-state: paused;
        }
      `}} />

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "40px",
          backgroundColor: "#0d1117",
          borderTop: "1px solid #1e293b",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Pinned LIVE tag on the left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "0 16px",
            backgroundColor: "#0d1117",
            height: "100%",
            zIndex: 1005,
            borderRight: "1px solid #1e293b",
            boxShadow: "8px 0 16px rgba(13, 17, 23, 0.9)",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              boxShadow: "0 0 6px #ef4444",
              display: "inline-block",
              animation: "pulse-red-dot 2s infinite ease-in-out",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              color: "#ef4444",
            }}
          >
            LIVE
          </span>
          <span style={{ color: "#334155", fontWeight: "300", marginLeft: "4px" }}>|</span>
        </div>

        {/* Scrolling track wrapper */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            height: "100%",
            zIndex: 1000,
          }}
        >
          {/* Double list of headlines to facilitate smooth infinite loop */}
          <div className="ticker-track-animate">
            {/* First Set */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {tickerHeadlines.map((headline, idx) => (
                <div key={`set1-${idx}`} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", color: "#f1f5f9", fontWeight: "500" }}>
                    {headline}
                  </span>
                  <span style={{ fontSize: "13px", color: "#94a3b8", margin: "0 24px" }}>
                    •
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicated Second Set */}
            <div style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
              {tickerHeadlines.map((headline, idx) => (
                <div key={`set2-${idx}`} style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", color: "#f1f5f9", fontWeight: "500" }}>
                    {headline}
                  </span>
                  <span style={{ fontSize: "13px", color: "#94a3b8", margin: "0 24px" }}>
                    •
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
