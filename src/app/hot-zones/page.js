"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

const hotZones = [
  {
    name: "Ukraine-Russia Front",
    region: "Eastern Europe",
    severity: "critical",
    description:
      "Ongoing armed conflict between Russia and Ukraine involving territorial disputes and NATO tensions.",
    casualties: "500,000+",
    since: "2022",
    flags: ["🇺🇦", "🇷🇺"],
  },
  {
    name: "Gaza Strip",
    region: "Middle East",
    severity: "critical",
    description:
      "Armed conflict between Israel and Hamas with widespread civilian casualties and humanitarian crisis.",
    casualties: "45,000+",
    since: "2023",
    flags: ["🇮🇱", "🇵🇸"],
  },
  {
    name: "Sudan Civil War",
    region: "Africa",
    severity: "critical",
    description:
      "Civil war between Sudanese Armed Forces and Rapid Support Forces causing mass displacement.",
    casualties: "150,000+",
    since: "2023",
    flags: ["🇸🇩"],
  },
  {
    name: "Kashmir Dispute",
    region: "South Asia",
    severity: "high",
    description:
      "Long-standing territorial dispute between India and Pakistan with periodic military skirmishes.",
    casualties: "Ongoing",
    since: "1947",
    flags: ["🇮🇳", "🇵🇰"],
  },
  {
    name: "Myanmar Civil War",
    region: "Southeast Asia",
    severity: "high",
    description:
      "Armed resistance against military junta following 2021 coup across multiple ethnic regions.",
    casualties: "50,000+",
    since: "2021",
    flags: ["🇲🇲"],
  },
  {
    name: "Yemen Conflict",
    region: "Middle East",
    severity: "critical",
    description:
      "Multi-sided civil war involving Houthi forces and Saudi-led coalition causing world's worst humanitarian crisis.",
    casualties: "377,000+",
    since: "2014",
    flags: ["🇾🇪"],
  },
];

const SEVERITY = {
  critical: {
    label: "CRITICAL",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    glow: "rgba(239,68,68,0.18)",
    barColor: "#ef4444",
  },
  high: {
    label: "HIGH",
    color: "#f97316",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.35)",
    glow: "rgba(249,115,22,0.15)",
    barColor: "#f97316",
  },
  elevated: {
    label: "ELEVATED",
    color: "#eab308",
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.35)",
    glow: "rgba(234,179,8,0.12)",
    barColor: "#eab308",
  },
};

const nowYear = new Date().getFullYear();

function durationYears(since) {
  const years = nowYear - parseInt(since, 10);
  return years === 1 ? "1 year" : `${years} years`;
}

function lastUpdated() {
  const now = new Date();
  return now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function PulsingDot({ color }) {
  return (
    <span
      style={{
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "inline-block",
        flexShrink: 0,
        animation: "hz-dot-pulse 2s ease-in-out infinite",
        boxShadow: `0 0 6px ${color}`,
      }}
    />
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SkullIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a9 9 0 0 1 9 9c0 3.6-2.1 6.7-5.3 8.2L15 22H9l.3-2.8A9 9 0 0 1 12 2z" />
      <line x1="9" y1="17" x2="9.01" y2="17" />
      <line x1="15" y1="17" x2="15.01" y2="17" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const ts = lastUpdated();

export default function HotZonesPage() {
  const criticalCount = hotZones.filter((z) => z.severity === "critical").length;
  const highCount = hotZones.filter((z) => z.severity === "high").length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hz-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.35); }
        }
        @keyframes hz-card-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hz-header-in {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hz-bar-fill {
          from { width: 0%; }
        }
        @keyframes hz-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hz-card {
          transition: transform 0.22s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.22s cubic-bezier(0.4,0,0.2,1),
                      border-color 0.22s ease;
        }
        .hz-card:hover {
          transform: translateY(-4px) !important;
        }
        .hz-card.critical:hover {
          box-shadow: 0 12px 40px rgba(239,68,68,0.2), 0 4px 16px rgba(0,0,0,0.5) !important;
          border-color: rgba(239,68,68,0.55) !important;
        }
        .hz-card.high:hover {
          box-shadow: 0 12px 40px rgba(249,115,22,0.18), 0 4px 16px rgba(0,0,0,0.5) !important;
          border-color: rgba(249,115,22,0.55) !important;
        }
        .hz-card.elevated:hover {
          box-shadow: 0 12px 40px rgba(234,179,8,0.15), 0 4px 16px rgba(0,0,0,0.5) !important;
          border-color: rgba(234,179,8,0.5) !important;
        }
        .hz-view-btn {
          transition: all 0.18s ease;
        }
        .hz-view-btn:hover {
          background: rgba(59,130,246,0.2) !important;
          border-color: rgba(59,130,246,0.6) !important;
          color: #93c5fd !important;
          gap: 8px !important;
        }
      ` }} />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0f1e",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#f8fafc",
        }}
      >
        <Navbar />

        {/* ── Page body ── */}
        <div
          style={{
            paddingTop: "52px",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "52px 32px 64px",
          }}
        >

          {/* ── Page Header ── */}
          <div
            style={{
              paddingTop: "40px",
              paddingBottom: "36px",
              animation: "hz-header-in 0.4s ease forwards",
            }}
          >
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <Link href="/" style={{ fontSize: "11px", color: "#475569", textDecoration: "none", letterSpacing: "0.5px" }}>
                HOME
              </Link>
              <span style={{ color: "#334155", fontSize: "11px" }}>/</span>
              <span style={{ fontSize: "11px", color: "#64748b", letterSpacing: "0.5px" }}>HOT ZONES</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <PulsingDot color="#ef4444" />
                  <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
                    Live Conflict Tracking
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: "36px",
                    fontWeight: "800",
                    margin: 0,
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                    color: "#ffffff",
                  }}
                >
                  Active Hot Zones
                </h1>
                <p style={{ margin: "10px 0 0", fontSize: "14px", color: "#64748b", maxWidth: "520px", lineHeight: 1.6 }}>
                  Monitoring {hotZones.length} active conflict zones worldwide. Data updated continuously from open-source intelligence feeds.
                </p>
              </div>

              {/* Summary stat pills */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ padding: "10px 18px", borderRadius: "10px", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#ef4444", lineHeight: 1 }}>{criticalCount}</div>
                  <div style={{ fontSize: "9px", color: "#ef4444", letterSpacing: "1.5px", marginTop: "4px", textTransform: "uppercase" }}>Critical</div>
                </div>
                <div style={{ padding: "10px 18px", borderRadius: "10px", backgroundColor: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#f97316", lineHeight: 1 }}>{highCount}</div>
                  <div style={{ fontSize: "9px", color: "#f97316", letterSpacing: "1.5px", marginTop: "4px", textTransform: "uppercase" }}>High</div>
                </div>
                <div style={{ padding: "10px 18px", borderRadius: "10px", backgroundColor: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#60a5fa", lineHeight: 1 }}>{hotZones.length}</div>
                  <div style={{ fontSize: "9px", color: "#60a5fa", letterSpacing: "1.5px", marginTop: "4px", textTransform: "uppercase" }}>Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", backgroundColor: "#1e293b", marginBottom: "36px" }} />

          {/* ── Cards Grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "20px",
            }}
          >
            {hotZones.map((zone, i) => {
              const sev = SEVERITY[zone.severity] ?? SEVERITY.elevated;
              return (
                <div
                  key={zone.name}
                  className={`hz-card ${zone.severity}`}
                  style={{
                    backgroundColor: "#0d1117",
                    border: `1px solid ${sev.border}`,
                    borderRadius: "14px",
                    padding: "22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: `0 4px 24px ${sev.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
                    animation: `hz-card-in 0.4s ease ${i * 0.07}s both`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(to right, ${sev.color}, transparent)`,
                      borderRadius: "14px 14px 0 0",
                    }}
                  />

                  {/* ── Card Header ── */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {/* Flags + Region */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
                        <span style={{ fontSize: "16px", lineHeight: 1 }}>{zone.flags.join(" ")}</span>
                        <span style={{ fontSize: "10px", color: "#64748b", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                          {zone.region}
                        </span>
                      </div>
                      {/* Zone name */}
                      <h2
                        style={{
                          fontSize: "17px",
                          fontWeight: "700",
                          margin: 0,
                          color: "#f1f5f9",
                          lineHeight: 1.25,
                          letterSpacing: "-0.2px",
                        }}
                      >
                        {zone.name}
                      </h2>
                    </div>

                    {/* Severity badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        backgroundColor: sev.bg,
                        border: `1px solid ${sev.border}`,
                        flexShrink: 0,
                      }}
                    >
                      <PulsingDot color={sev.color} />
                      <span style={{ fontSize: "9.5px", fontWeight: "800", color: sev.color, letterSpacing: "1.2px" }}>
                        {sev.label}
                      </span>
                    </div>
                  </div>

                  {/* ── Description ── */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#94a3b8",
                      lineHeight: 1.65,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {zone.description}
                  </p>

                  {/* ── Stat row ── */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid rgba(30,41,59,0.8)",
                    }}
                  >
                    {/* Casualties */}
                    <div
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        backgroundColor: "rgba(15,23,42,0.6)",
                        borderRight: "1px solid rgba(30,41,59,0.8)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                        <SkullIcon />
                        <span style={{ fontSize: "9px", color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                          Casualties
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: sev.color }}>
                        {zone.casualties}
                      </div>
                    </div>
                    {/* Duration */}
                    <div
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        backgroundColor: "rgba(15,23,42,0.6)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                        <ClockIcon />
                        <span style={{ fontSize: "9px", color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase" }}>
                          Duration
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#e2e8f0" }}>
                        {durationYears(zone.since)}
                      </div>
                    </div>
                  </div>

                  {/* ── Active since bar ── */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "10px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.6px" }}>
                        Active since {zone.since}
                      </span>
                      <span style={{ fontSize: "10px", color: "#475569" }}>
                        {durationYears(zone.since)}
                      </span>
                    </div>
                    <div style={{ height: "3px", backgroundColor: "rgba(30,41,59,0.8)", borderRadius: "2px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.min(100, ((nowYear - parseInt(zone.since, 10)) / 10) * 100)}%`,
                          backgroundColor: sev.barColor,
                          borderRadius: "2px",
                          animation: "hz-bar-fill 1s ease forwards",
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>

                  {/* ── Footer ── */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px" }}>
                    {/* Last updated */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <MapPinIcon />
                      <span style={{ fontSize: "10px", color: "#334155" }}>
                        Updated {ts}
                      </span>
                    </div>

                    {/* View on Map button */}
                    <Link
                      href="/"
                      className="hz-view-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "6px 14px",
                        borderRadius: "7px",
                        backgroundColor: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        color: "#60a5fa",
                        fontSize: "11.5px",
                        fontWeight: "600",
                        textDecoration: "none",
                        letterSpacing: "0.3px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      View on Map
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Bottom disclaimer ── */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "11px", color: "#334155", lineHeight: 1.6, maxWidth: "680px" }}>
              ⚠ Data is sourced from open-source intelligence reports and updated periodically. Casualty figures are estimates compiled from multiple sources and may not reflect the most current situation. This tool is for informational purposes only.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
