"use client";

import React from "react";

// Comprehensive country-to-ISO-2 mapping for dynamic flag emoji generation
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

// Mock data provided in the requirements
const countryData = {
  "India": { flag: "🇮🇳", population: "1.4B", capital: "New Delhi", region: "South Asia", gdp: "$3.7T", alliance: "Non-Aligned", tension: 65 },
  "China": { flag: "🇨🇳", population: "1.4B", capital: "Beijing", region: "East Asia", gdp: "$17.7T", alliance: "SCO", tension: 70 },
  "Russia": { flag: "🇷🇺", population: "144M", capital: "Moscow", region: "Eastern Europe", gdp: "$2.2T", alliance: "CSTO", tension: 80 },
  "United States of America": { flag: "🇺🇸", population: "331M", capital: "Washington D.C.", region: "North America", gdp: "$25.4T", alliance: "NATO", tension: 30 },
  "Iran": { flag: "🇮🇷", population: "87M", capital: "Tehran", region: "Middle East", gdp: "$367B", alliance: "Non-Aligned", tension: 88 },
  "Israel": { flag: "🇮🇱", population: "9M", capital: "Jerusalem", region: "Middle East", gdp: "$522B", alliance: "Non-Aligned", tension: 82 },
  "Iraq": { flag: "🇮🇶", population: "41M", capital: "Baghdad", region: "Middle East", gdp: "$264B", alliance: "Non-Aligned", tension: 90 },
  "Syria": { flag: "🇸🇾", population: "21M", capital: "Damascus", region: "Middle East", gdp: "$60B", alliance: "Non-Aligned", tension: 85 },
  "South Korea": { flag: "🇰🇷", population: "52M", capital: "Seoul", region: "East Asia", gdp: "$1.7T", alliance: "US-Allied", tension: 60 },
};

// Generates flag emoji based on ISO code
const getFlagEmoji = (countryName) => {
  const iso = countryToIso[countryName];
  if (!iso) return "🏳️";
  const codePoints = iso
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  try {
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🏳️";
  }
};

export default function CountryStats({ selectedCountry, onClose }) {
  const stats = selectedCountry ? countryData[selectedCountry] : null;

  // Resolve values with proper fallback for missing data
  const flag = stats?.flag || (selectedCountry ? getFlagEmoji(selectedCountry) : "");
  const population = stats?.population || "N/A";
  const capital = stats?.capital || "N/A";
  const region = stats?.region || "N/A";
  const gdp = stats?.gdp || "N/A";
  const alliance = stats?.alliance || "Independent";
  const tension = stats?.tension;

  // Determine badge styling based on tension level
  let badgeBg = "#1e293b";
  let badgeText = "#cbd5e1";
  let badgeLabel = "No Data";

  if (tension !== undefined) {
    if (tension <= 30) {
      badgeBg = "#166534";
      badgeText = "#bbf7d0";
      badgeLabel = `Calm (${tension})`;
    } else if (tension <= 60) {
      badgeBg = "#854d0e";
      badgeText = "#fef08a";
      badgeLabel = `Elevated (${tension})`;
    } else {
      badgeBg = "#7f1d1d";
      badgeText = "#fecaca";
      badgeLabel = `Conflict (${tension})`;
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        left: "20px",
        right: "auto",
        width: "auto",
        maxWidth: "calc(100vw - 420px)", // never overlap the 380px news panel + margin
        height: "auto",
        minHeight: "80px",
        backgroundColor: "#0d1117",
        border: "1px solid #1e293b",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#f1f5f9",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        transform: selectedCountry ? "translateY(0)" : "translateY(calc(100% + 60px))",
        opacity: selectedCountry ? 1 : 0,
        pointerEvents: selectedCountry ? "auto" : "none",
      }}
    >
      {/* Dynamic Background subtle gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(13, 17, 23, 0.95), rgba(22, 27, 34, 0.9))",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Main Stats Container */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px", width: "100%" }}>
        {/* Country Name & Flag */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "220px" }}>
          <span style={{ fontSize: "28px", lineHeight: "1" }} role="img" aria-label="Country Flag">
            {flag}
          </span>
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
              Region Intelligence
            </div>
            <div style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "180px" }}>
              {selectedCountry || ""}
            </div>
          </div>
        </div>

        {/* Separator | */}
        <div style={{ color: "#334155", fontWeight: "300", fontSize: "20px" }}>|</div>

        {/* Horizontal Row of Stats */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px", flex: 1 }}>
          {/* Capital */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              Capital
            </div>
            <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "600" }}>{capital}</div>
          </div>

          {/* Population */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              Population
            </div>
            <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "600" }}>{population}</div>
          </div>

          {/* Region */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              Subregion
            </div>
            <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "600" }}>{region}</div>
          </div>

          {/* GDP */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              GDP (Nominal)
            </div>
            <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "600" }}>{gdp}</div>
          </div>

          {/* Alliance */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              Strategic Alliance
            </div>
            <div style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: "600" }}>{alliance}</div>
          </div>

          {/* Tension Badge */}
          <div>
            <div style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "4px" }}>
              Tension Index
            </div>
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "800",
                backgroundColor: badgeBg,
                color: badgeText,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {badgeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={onClose}
        title="Deselect Country"
        style={{
          background: "none",
          border: "none",
          color: "#64748b",
          fontSize: "20px",
          cursor: "pointer",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.15s ease",
          marginLeft: "16px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
      >
        &times;
      </button>
    </div>
  );
}
