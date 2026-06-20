/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";


// Comprehensive country-to-ISO-2 mapping
const countryToIso = {
  "Afghanistan": "af", "Albania": "al", "Algeria": "dz", "Angola": "ao", "Argentina": "ar",
  "Armenia": "am", "Australia": "au", "Austria": "at", "Azerbaijan": "az", "Bangladesh": "bd",
  "Belarus": "by", "Belgium": "be", "Bolivia": "bo", "Bosnia and Herz.": "ba", "Brazil": "br",
  "Bulgaria": "bg", "Cambodia": "kh", "Cameroon": "cm", "Canada": "ca", "Central African Rep.": "cf",
  "Chad": "td", "Chile": "cl", "China": "cn", "Colombia": "co", "Congo": "cg", "Costa Rica": "cr",
  "Croatia": "hr", "Cuba": "cu", "Cyprus": "cy", "Czechia": "cz", "Dem. Rep. Congo": "cd",
  "Denmark": "dk", "Dominican Rep.": "do", "Ecuador": "ec", "Egypt": "eg", "El Salvador": "sv",
  "Estonia": "ee", "Ethiopia": "et", "Finland": "fi", "France": "fr", "Georgia": "ge",
  "Germany": "de", "Ghana": "gh", "Greece": "gr", "Guatemala": "gt", "Haiti": "ht",
  "Honduras": "hn", "Hungary": "hu", "Iceland": "is", "India": "in", "Indonesia": "id",
  "Iran": "ir", "Iraq": "iq", "Ireland": "ie", "Israel": "il", "Italy": "it", "Jamaica": "jm",
  "Japan": "jp", "Jordan": "jo", "Kazakhstan": "kz", "Kenya": "ke", "Kuwait": "kw",
  "Kyrgyzstan": "kg", "Laos": "la", "Latvia": "lv", "Lebanon": "lb", "Libya": "ly",
  "Lithuania": "lt", "Luxembourg": "lu", "Madagascar": "mg", "Malaysia": "my", "Mali": "ml",
  "Mexico": "mx", "Moldova": "md", "Mongolia": "mn", "Montenegro": "me", "Morocco": "ma",
  "Myanmar": "mm", "Nepal": "np", "Netherlands": "nl", "New Zealand": "nz", "Nicaragua": "ni",
  "Niger": "ne", "Nigeria": "ng", "North Korea": "kp", "North Macedonia": "mk", "Norway": "no",
  "Oman": "om", "Pakistan": "pk", "Palestine": "ps", "Panama": "pa", "Papua New Guinea": "pg",
  "Paraguay": "py", "Peru": "pe", "Philippines": "ph", "Poland": "pl", "Portugal": "pt",
  "Qatar": "qa", "Romania": "ro", "Russia": "ru", "Rwanda": "rw", "Saudi Arabia": "sa",
  "Senegal": "sn", "Serbia": "rs", "Sierra Leone": "sl", "Singapore": "sg", "Slovakia": "sk",
  "Slovenia": "si", "Somalia": "so", "South Africa": "za", "South Korea": "kr", "South Sudan": "ss",
  "Spain": "es", "Sri Lanka": "lk", "Sudan": "sd", "Sweden": "se", "Switzerland": "ch",
  "Syria": "sy", "Taiwan": "tw", "Tajikistan": "tj", "Tanzania": "tz", "Thailand": "th",
  "Tunisia": "tn", "Turkey": "tr", "Turkmenistan": "tm", "Uganda": "ug", "Ukraine": "ua",
  "United Arab Emirates": "ae", "United Kingdom": "gb", "United States of America": "us",
  "Uruguay": "uy", "Uzbekistan": "uz", "Venezuela": "ve", "Vietnam": "vn", "Yemen": "ye",
  "Zambia": "zm", "Zimbabwe": "zw"
};

// GNews API supported countries for country filter parameter
const gnewsSupportedCountries = new Set([
  "au", "br", "ca", "cn", "eg", "fr", "de", "gr", "hk", "in", "ie", "il", "it", "jp", "pk", "pe", "ph", "pl", "pt", "ro", "ru", "sg", "es", "se", "ch", "tw", "ua", "gb", "us"
]);

// Helper to determine news categories dynamically based on keywords
const getArticleCategory = (title, description) => {
  const text = `${title} ${description || ""}`.toLowerCase();
  if (
    text.includes("conflict") || text.includes("war") || text.includes("military") ||
    text.includes("army") || text.includes("strike") || text.includes("attack") ||
    text.includes("bomb") || text.includes("nato") || text.includes("missile") ||
    text.includes("combat") || text.includes("defense") || text.includes("clash")
  ) {
    return "Conflict";
  }
  if (
    text.includes("diplomacy") || text.includes("summit") || text.includes("meet") ||
    text.includes("treaty") || text.includes("talks") || text.includes("un ") ||
    text.includes("united nations") || text.includes("relations") || text.includes("sanctions") ||
    text.includes("president") || text.includes("prime minister") || text.includes("accord")
  ) {
    return "Diplomacy";
  }
  if (
    text.includes("economy") || text.includes("market") || text.includes("trade") ||
    text.includes("oil") || text.includes("price") || text.includes("currency") ||
    text.includes("inflation") || text.includes("stocks") || text.includes("bank") ||
    text.includes("finance") || text.includes("gdp") || text.includes("tariff")
  ) {
    return "Economy";
  }
  return "Politics"; // Default category
};

// Helper for formatting time ago
const formatTimeAgo = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

// Generates fallback mock headlines
const getMockNews = (countryName) => {
  if (!countryName) {
    return [
      { title: "Global leaders meet at UN summit to discuss climate and security", source: { name: "Reuters" }, publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), url: "#" },
      { title: "Oil prices surge amid Middle East supply line tensions", source: { name: "BBC" }, publishedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(), url: "#" },
      { title: "NATO expands eastern flank presence following defensive review", source: { name: "AP News" }, publishedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(), url: "#" },
      { title: "Diplomatic efforts increase ahead of regional economic talks", source: { name: "Al Jazeera" }, publishedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(), url: "#" },
      { title: "Global inflation levels show signs of stabilizing in Q2 reports", source: { name: "Bloomberg" }, publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(), url: "#" },
      { title: "Tech sector faces new regulation threats over international data privacy laws", source: { name: "TechCrunch" }, publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(), url: "#" }
    ];
  } else {
    return [
      { title: `Bilateral talks open new trade routes and investments in ${countryName}`, source: { name: "Reuters" }, publishedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Security beefed up in major cities across ${countryName} ahead of summit`, source: { name: "AP News" }, publishedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), url: "#" },
      { title: `${countryName} announces new environmental regulations for heavy industries`, source: { name: "BBC" }, publishedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Inflation rises unexpectedly in ${countryName} following recent tariff policies`, source: { name: "Bloomberg" }, publishedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Regional security summit yields new alliances for ${countryName} leadership`, source: { name: "Al Jazeera" }, publishedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Tech startup ecosystem in ${countryName} breaks quarterly funding records`, source: { name: "TechCrunch" }, publishedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Special envoys arrive in ${countryName} for high-stakes diplomatic talks`, source: { name: "Reuters" }, publishedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(), url: "#" },
      { title: `Border security patrols increased in southern regions of ${countryName}`, source: { name: "AP News" }, publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), url: "#" }
    ];
  }
};

const ExternalLinkIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function NewsPanel({ selectedCountry, onClose }) {
  const [isOpen, setIsOpen] = useState(true);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Re-open panel when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      setIsOpen(true);
    }
  }, [selectedCountry]);

  // Fetch news articles when panel is open or selected country changes
  useEffect(() => {
    let active = true;
    setLoading(true);
    setIsDemoMode(false);

    const fetchNews = async () => {
      let queryParam = "";
      const limit = selectedCountry ? 8 : 6;

      if (selectedCountry) {
        const isoCode = countryToIso[selectedCountry];
        // If ISO-2 code is supported by GNews, query by country, otherwise query by keyword
        if (isoCode && gnewsSupportedCountries.has(isoCode.toLowerCase())) {
          queryParam = `country=${isoCode.toLowerCase()}`;
        } else {
          queryParam = `q=${selectedCountry}`;
        }
      } else {
        queryParam = "q=world headlines";
      }

      try {
        const response = await fetch(`/api/news?${queryParam}`);
        if (!response.ok) {
          throw new Error(`Proxy responded with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle case where GNews key is missing or invalid on proxy
        if (data.error || !data.articles || data.articles.length === 0) {
          throw new Error(data.error || "No articles found");
        }

        if (active) {
          // Truncate to desired limit (6 for world, 8 for country)
          setArticles(data.articles.slice(0, limit));
          setLoading(false);
        }
      } catch (err) {
        console.warn(`Failed to fetch live news, falling back to mock data. Reason: ${err.message}`);
        if (active) {
          setIsDemoMode(true);
          // Set simulated fallback data
          const mockData = getMockNews(selectedCountry);
          setArticles(mockData);
          // Add a tiny delay to simulate network skeleton loading
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }
      }
    };

    fetchNews();

    return () => {
      active = false;
    };
  }, [selectedCountry]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const isoCode = selectedCountry ? countryToIso[selectedCountry] : null;
  const flagUrl = isoCode ? `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png` : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .news-card-hover {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .news-card-hover:hover {
          background-color: #1f2937 !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .news-card-hover .link-icon-wrapper {
          opacity: 0;
          transform: translate(-2px, 2px);
          transition: all 0.2s ease;
        }
        .news-card-hover:hover .link-icon-wrapper {
          opacity: 1;
          transform: translate(0, 0);
        }
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slide-in-btn {
          from { transform: translateY(-50%) translateX(100%); }
          to { transform: translateY(-50%) translateX(0); }
        }
      `}} />

      {/* Floating Reopen Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          title="Open News Feed"
          style={{
            position: "fixed",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 990,
            background: "rgba(13, 17, 23, 0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(51, 65, 85, 0.6)",
            borderRight: "none",
            borderRadius: "12px 0 0 12px",
            padding: "18px 10px",
            color: "#e2e8f0",
            cursor: "pointer",
            boxShadow: "-4px 0 20px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            writingMode: "vertical-rl",
            textTransform: "uppercase",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2.5px",
            transition: "all 0.2s ease",
            animation: "slide-in-btn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3b82f6";
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.6)";
            e.currentTarget.style.paddingLeft = "14px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#e2e8f0";
            e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.6)";
            e.currentTarget.style.paddingLeft = "10px";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ transform: "rotate(-90deg)", marginBottom: "6px" }}
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <path d="M12 9h8M12 13h5" />
          </svg>
          NEWS FEED
        </button>
      )}

      {/* Main Sidebar Panel */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          height: "100vh",
          backgroundColor: "#0d1117",
          borderLeft: "1px solid rgba(51, 65, 85, 0.4)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.6)",
          zIndex: 995,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#f8fafc",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(to bottom, #111827, #0d1117)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {selectedCountry ? (
              <>
                {flagUrl && (
                  <img
                    src={flagUrl}
                    alt={`${selectedCountry} flag`}
                    style={{
                      width: "24px",
                      height: "16px",
                      borderRadius: "2px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div>
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      margin: 0,
                      color: "#ffffff",
                      lineHeight: "1.2",
                    }}
                  >
                    {selectedCountry}
                  </h2>
                  <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Local Intel
                  </span>
                </div>
              </>
            ) : (
              <div>
                <h2
                  style={{
                    fontSize: "16px",
                    fontWeight: "800",
                    margin: 0,
                    letterSpacing: "1.5px",
                    color: "#ffffff",
                    background: "linear-gradient(to right, #3b82f6, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  WORLD NEWS
                </h2>
                <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>
                  Global Briefing
                </span>
              </div>
            )}
            {isDemoMode && (
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: "700",
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "#f59e0b",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  marginLeft: "4px",
                }}
              >
                DEMO
              </span>
            )}
          </div>
          
          <button
            onClick={handleClose}
            title="Close Panel"
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: "6px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.backgroundColor = "rgba(51, 65, 85, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Body / Article List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            background: "#0d1117",
          }}
        >
          {loading ? (
            // Skeleton Loader
            Array.from({ length: selectedCountry ? 8 : 6 }).map((_, idx) => (
              <div
                key={`sk-${idx}`}
                style={{
                  padding: "16px",
                  background: "#161b22",
                  borderRadius: "10px",
                  border: "1px solid rgba(51, 65, 85, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  animation: "pulse-bg 1.5s infinite ease-in-out",
                }}
              >
                <div style={{ height: "14px", backgroundColor: "rgba(100, 116, 139, 0.15)", borderRadius: "4px", width: "95%" }} />
                <div style={{ height: "14px", backgroundColor: "rgba(100, 116, 139, 0.15)", borderRadius: "4px", width: "70%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
                  <div style={{ height: "10px", backgroundColor: "rgba(100, 116, 139, 0.15)", borderRadius: "4px", width: "100px" }} />
                  <div style={{ height: "18px", backgroundColor: "rgba(100, 116, 139, 0.15)", borderRadius: "9px", width: "55px" }} />
                </div>
              </div>
            ))
          ) : articles.length > 0 ? (
            articles.map((article, index) => {
              const category = getArticleCategory(article.title, article.description);
              
              // Colors matching the category design specs
              let badgeBg = "rgba(139, 92, 246, 0.15)";
              let badgeText = "#a78bfa";
              let badgeBorder = "rgba(139, 92, 246, 0.3)";

              if (category === "Conflict") {
                badgeBg = "rgba(239, 68, 68, 0.15)";
                badgeText = "#f87171";
                badgeBorder = "rgba(239, 68, 68, 0.3)";
              } else if (category === "Diplomacy") {
                badgeBg = "rgba(59, 130, 246, 0.15)";
                badgeText = "#60a5fa";
                badgeBorder = "rgba(59, 130, 246, 0.3)";
              } else if (category === "Economy") {
                badgeBg = "rgba(245, 158, 11, 0.15)";
                badgeText = "#fbbf24";
                badgeBorder = "rgba(245, 158, 11, 0.3)";
              }

              return (
                <a
                  key={`art-${index}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card-hover"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    padding: "16px",
                    backgroundColor: "#161b22",
                    borderRadius: "10px",
                    border: "1px solid rgba(51, 65, 85, 0.2)",
                    color: "inherit",
                    position: "relative",
                  }}
                >
                  {/* Title (max 2 lines, truncated) */}
                  <h3
                    style={{
                      fontSize: "13.5px",
                      fontWeight: "600",
                      color: "#f1f5f9",
                      margin: "0 0 10px 0",
                      lineHeight: "1.4",
                      paddingRight: "16px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {article.title}
                  </h3>

                  {/* Metadata Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      <span style={{ fontWeight: "500", color: "#94a3b8" }}>
                        {article.source.name}
                      </span>
                      <span style={{ margin: "0 6px" }}>•</span>
                      <span>{formatTimeAgo(article.publishedAt)}</span>
                    </div>

                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: "700",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        backgroundColor: badgeBg,
                        color: badgeText,
                        border: `1px solid ${badgeBorder}`,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {category}
                    </span>
                  </div>

                  {/* External Link Icon displayed on hover */}
                  <div
                    className="link-icon-wrapper"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      color: "#3b82f6",
                    }}
                  >
                    <ExternalLinkIcon />
                  </div>
                </a>
              );
            })
          ) : (
            // Empty State
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
                color: "#64748b",
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 9v4M12 16h.01" />
              </svg>
              <span style={{ fontSize: "13px" }}>No recent news updates available for this region.</span>
            </div>
          )}
        </div>
        
        {/* Mini Footer/Status */}
        {selectedCountry && (
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "#0a0d12",
              borderTop: "1px solid rgba(51, 65, 85, 0.3)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "4px",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#60a5fa";
                e.currentTarget.style.backgroundColor = "rgba(59, 130, 246, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#3b82f6";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Clear filter & show World News
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
