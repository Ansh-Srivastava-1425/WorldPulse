"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

// Mock tension data inside the file as requested
const tensionLevels = {
  "India": 65,
  "China": 70,
  "Russia": 80,
  "United States of America": 30,
  "Palestine": 95,
  "Iraq": 90,
  "Syria": 85,
  "South Korea": 60,
  "Iran": 88,
  "Israel": 82,
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Helper to get color based on tension level
const getColor = (countryName) => {
  const value = tensionLevels[countryName];
  if (value === undefined) return "#1e293b"; // no data: default slate
  if (value <= 30) return "#1e3a5f";         // 0-30: calm, dark blue
  if (value <= 60) return "#7c4a00";         // 31-60: elevated, dark amber
  return "#7f1d1d";                          // 61-100: conflict, dark red
};

// Helper to get brightened color for hover effect
const getHoverColor = (countryName) => {
  const value = tensionLevels[countryName];
  if (value === undefined) return "#334155"; // brightened slate
  if (value <= 30) return "#2d5385";         // brightened blue
  if (value <= 60) return "#a16207";         // brightened amber
  return "#991b1b";                          // brightened red
};

// Helper to describe the status based on tension
const getTensionStatus = (value) => {
  if (value === undefined) return "No Data";
  if (value <= 30) return "Calm";
  if (value <= 60) return "Elevated";
  return "Conflict Zone";
};

export default function WorldMap({ onCountrySelect }) {
  const [mounted, setMounted] = useState(false);
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  useEffect(() => {
    setMounted(true);
    fetch(geoUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load map geometries:", err);
        setLoading(false);
      });
  }, []);

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((prev) => ({ ...prev, zoom: Math.max(1, prev.zoom / 1.5) }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  const handleCountryClick = (geo) => {
    const name = geo.properties.name;
    setSelectedCountry({
      name,
      tension: tensionLevels[name],
      properties: geo.properties,
    });
    if (onCountrySelect) {
      onCountrySelect(name);
    }
  };

  if (!mounted) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0a0f1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0a0f1e",
        position: "relative",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        color: "#f8fafc",
        userSelect: "none",
      }}
    >
      {/* Glow effects in the background */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,58,138,0.15) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(127,29,29,0.08) 0%, rgba(0,0,0,0) 80%)",
          pointerEvents: "none",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Main Header Overlay */}
      <header
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          zIndex: 10,
          background: "rgba(10, 15, 30, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(51, 65, 85, 0.5)",
          borderRadius: "12px",
          padding: "16px 24px",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              boxShadow: "0 0 10px #ef4444",
              display: "inline-block",
              animation: "pulse 2s infinite ease-in-out",
            }}
          />
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "800",
              letterSpacing: "2px",
              margin: 0,
              background: "linear-gradient(to right, #ffffff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WORLD PULSE
          </h1>
        </div>
        <p style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>
          Global Tension Monitor
        </p>
      </header>

      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#0a0f1e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid rgba(30, 58, 138, 0.3)",
              borderTopColor: "#3b82f6",
              animation: "spin 1s infinite linear",
            }}
          />
          <span style={{ fontSize: "14px", color: "#94a3b8", letterSpacing: "1.5px" }}>LOADING GLOBAL DATA...</span>
        </div>
      )}

      {/* Map Element */}
      <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 2 }}>
        {!loading && geoData && (
          <ComposableMap
            projection="geoNaturalEarth1"
            style={{ width: "100%", height: "100%" }}
            projectionConfig={{ scale: 160 }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={setPosition}
              maxZoom={8}
              minZoom={1}
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name;
                    const tension = tensionLevels[name];
                    const isSelected = selectedCountry && selectedCountry.name === name;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(geo)}
                        onMouseEnter={(event) => {
                          setTooltip({
                            name,
                            tension,
                            x: event.clientX,
                            y: event.clientY,
                          });
                        }}
                        onMouseMove={(event) => {
                          setTooltip((prev) =>
                            prev ? { ...prev, x: event.clientX, y: event.clientY } : null
                          );
                        }}
                        onMouseLeave={() => {
                          setTooltip(null);
                        }}
                        style={{
                          default: {
                            fill: isSelected ? "#3b82f6" : getColor(name),
                            stroke: isSelected ? "#60a5fa" : "#334155",
                            strokeWidth: isSelected ? 1.5 : 0.5,
                            outline: "none",
                            transition: "fill 0.15s ease, stroke 0.15s ease",
                          },
                          hover: {
                            fill: isSelected ? "#60a5fa" : getHoverColor(name),
                            stroke: isSelected ? "#93c5fd" : "#475569",
                            strokeWidth: isSelected ? 1.5 : 0.8,
                            outline: "none",
                            cursor: "pointer",
                            transition: "fill 0.15s ease, stroke 0.15s ease",
                          },
                          pressed: {
                            fill: isSelected ? "#2563eb" : getColor(name),
                            stroke: "#475569",
                            strokeWidth: 1,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        )}
      </div>

      {/* Floating Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 15,
            top: tooltip.y + 15,
            zIndex: 100,
            background: "rgba(10, 15, 30, 0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(51, 65, 85, 0.8)",
            borderRadius: "8px",
            padding: "8px 12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>{tooltip.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor:
                  tooltip.tension === undefined
                    ? "#475569"
                    : tooltip.tension <= 30
                    ? "#3b82f6"
                    : tooltip.tension <= 60
                    ? "#f59e0b"
                    : "#ef4444",
              }}
            />
            <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "500" }}>
              {tooltip.tension !== undefined ? `Tension: ${tooltip.tension}` : "No Threat Data"}
            </span>
          </div>
        </div>
      )}

      {/* Legend Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "24px",
          zIndex: 10,
          background: "rgba(10, 15, 30, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(51, 65, 85, 0.5)",
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", letterSpacing: "1px", textTransform: "uppercase" }}>
          Tension Scale
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#7f1d1d" }} />
            <span style={{ fontSize: "12px", color: "#e2e8f0" }}>Conflict (61-100)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#7c4a00" }} />
            <span style={{ fontSize: "12px", color: "#e2e8f0" }}>Elevated (31-60)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#1e3a5f" }} />
            <span style={{ fontSize: "12px", color: "#e2e8f0" }}>Calm (0-30)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#1e293b" }} />
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>No Data</span>
          </div>
        </div>
      </div>

      {/* Floating Zoom Controls */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            backgroundColor: "rgba(10, 15, 30, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.85)";
            e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(10, 15, 30, 0.75)";
            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
          }}
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            backgroundColor: "rgba(10, 15, 30, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.85)";
            e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(10, 15, 30, 0.75)";
            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
          }}
        >
          −
        </button>
        <button
          onClick={handleReset}
          title="Reset Map"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            backgroundColor: "rgba(10, 15, 30, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(51, 65, 85, 0.5)",
            color: "#ffffff",
            fontSize: "11px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.85)";
            e.currentTarget.style.borderColor = "rgba(100, 116, 139, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(10, 15, 30, 0.75)";
            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
          }}
        >
          RESET
        </button>
      </div>

      {/* Selected Country Info Sidebar */}
      {selectedCountry && (
        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            zIndex: 10,
            width: "320px",
            background: "rgba(10, 15, 30, 0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(51, 65, 85, 0.6)",
            borderRadius: "14px",
            padding: "20px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
            animation: "slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: "10px", fontWeight: "700", color: "#3b82f6", letterSpacing: "1px", textTransform: "uppercase" }}>
                Selected Region
              </span>
              <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "4px 0 0 0", color: "#ffffff" }}>
                {selectedCountry.name}
              </h2>
            </div>
            <button
              onClick={() => setSelectedCountry(null)}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: "18px",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              &times;
            </button>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid rgba(51, 65, 85, 0.4)", margin: 0 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>Threat Assessment</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    backgroundColor:
                      selectedCountry.tension === undefined
                        ? "rgba(71, 85, 105, 0.2)"
                        : selectedCountry.tension <= 30
                        ? "rgba(30, 58, 138, 0.3)"
                        : selectedCountry.tension <= 60
                        ? "rgba(124, 74, 0, 0.3)"
                        : "rgba(127, 29, 29, 0.3)",
                    color:
                      selectedCountry.tension === undefined
                        ? "#94a3b8"
                        : selectedCountry.tension <= 30
                        ? "#60a5fa"
                        : selectedCountry.tension <= 60
                        ? "#fbbf24"
                        : "#f87171",
                    border:
                      selectedCountry.tension === undefined
                        ? "1px solid rgba(71, 85, 105, 0.4)"
                        : selectedCountry.tension <= 30
                        ? "1px solid rgba(59, 130, 246, 0.4)"
                        : selectedCountry.tension <= 60
                        ? "1px solid rgba(245, 158, 11, 0.4)"
                        : "1px solid rgba(239, 68, 68, 0.4)",
                  }}
                >
                  {getTensionStatus(selectedCountry.tension)}
                </span>
                {selectedCountry.tension !== undefined && (
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>
                    {selectedCountry.tension}/100
                  </span>
                )}
              </div>
            </div>

            {selectedCountry.tension !== undefined && (
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>Risk Index</div>
                <div
                  style={{
                    height: "6px",
                    width: "100%",
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${selectedCountry.tension}%`,
                      backgroundColor:
                        selectedCountry.tension <= 30
                          ? "#3b82f6"
                          : selectedCountry.tension <= 60
                          ? "#f59e0b"
                          : "#ef4444",
                      boxShadow:
                        selectedCountry.tension <= 30
                          ? "0 0 8px rgba(59, 130, 246, 0.5)"
                          : selectedCountry.tension <= 60
                          ? "0 0 8px rgba(245, 158, 11, 0.5)"
                          : "0 0 8px rgba(239, 68, 68, 0.5)",
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Geographical Code:</span>
                <span style={{ fontSize: "12px", color: "#e2e8f0", fontFamily: "monospace" }}>
                  {selectedCountry.properties.postal || selectedCountry.properties.iso_a3 || "N/A"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "12px", color: "#64748b" }}>Status Severity:</span>
                <span
                  style={{
                    fontSize: "12px",
                    color:
                      selectedCountry.tension === undefined
                        ? "#94a3b8"
                        : selectedCountry.tension <= 30
                        ? "#60a5fa"
                        : selectedCountry.tension <= 60
                        ? "#fbbf24"
                        : "#f87171",
                  }}
                >
                  {selectedCountry.tension === undefined
                    ? "UNMONITORED"
                    : selectedCountry.tension <= 30
                    ? "LOW RISK"
                    : selectedCountry.tension <= 60
                    ? "MODERATE"
                    : "CRITICAL"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
