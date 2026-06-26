"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AISummary from "@/components/news/AISummary";

// Hardcoded list of 30 major countries
const COUNTRIES = [
  { name: "Argentina", code: "AR" },
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "China", code: "CN" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Mexico", code: "MX" },
  { name: "Nigeria", code: "NG" },
  { name: "Pakistan", code: "PK" },
  { name: "Poland", code: "PL" },
  { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Thailand", code: "TH" },
  { name: "Turkey", code: "TR" },
  { name: "Ukraine", code: "UA" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Vietnam", code: "VN" },
];

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

function CountryColumn({ selectedCountryCode, onCountryChange }) {
  const [stats, setStats] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode);

  useEffect(() => {
    if (!selectedCountryCode) return;

    let active = true;

    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${selectedCountryCode}`);
        if (!res.ok) throw new Error("Stats fetch failed");
        const data = await res.json();
        if (active && data && data[0]) {
          setStats(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        if (active) setLoadingStats(false);
      }
    };

    const fetchNews = async () => {
      setLoadingNews(true);
      try {
        const res = await fetch(`/api/news?country=${selectedCountryCode.toLowerCase()}`);
        if (!res.ok) throw new Error("News fetch failed");
        const data = await res.json();
        if (active) {
          if (data.articles && data.articles.length > 0) {
            setNews(data.articles.slice(0, 4));
          } else {
            setNews([
              { title: `Demo Headline 1 for ${selectedCountry?.name}`, source: { name: "Demo Source" }, publishedAt: new Date().toISOString(), url: "#" },
              { title: `Demo Headline 2 for ${selectedCountry?.name}`, source: { name: "Demo Source" }, publishedAt: new Date().toISOString(), url: "#" },
              { title: `Demo Headline 3 for ${selectedCountry?.name}`, source: { name: "Demo Source" }, publishedAt: new Date().toISOString(), url: "#" },
              { title: `Demo Headline 4 for ${selectedCountry?.name}`, source: { name: "Demo Source" }, publishedAt: new Date().toISOString(), url: "#" },
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
        if (active) {
          setNews([]);
        }
      } finally {
        if (active) setLoadingNews(false);
      }
    };

    fetchStats();
    fetchNews();

    return () => {
      active = false;
    };
  }, [selectedCountryCode, selectedCountry?.name]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Dropdown Selector */}
      <select
        value={selectedCountryCode}
        onChange={(e) => onCountryChange(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          color: "#f8fafc",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "12px",
          outline: "none",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          appearance: "none",
        }}
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name} ({c.code})
          </option>
        ))}
      </select>

      {/* Stats Card */}
      <div
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          borderRadius: "12px",
          padding: "20px",
          color: "#f8fafc",
          minHeight: "180px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "1px" }}>
          Key Statistics
        </h3>
        {loadingStats ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
             <div style={{ height: "14px", background: "rgba(59, 130, 246, 0.15)", borderRadius: "4px", width: "100%", animation: "pulse 1.5s infinite" }}></div>
             <div style={{ height: "14px", background: "rgba(59, 130, 246, 0.15)", borderRadius: "4px", width: "80%", animation: "pulse 1.5s infinite" }}></div>
             <div style={{ height: "14px", background: "rgba(59, 130, 246, 0.15)", borderRadius: "4px", width: "90%", animation: "pulse 1.5s infinite" }}></div>
             <div style={{ height: "14px", background: "rgba(59, 130, 246, 0.15)", borderRadius: "4px", width: "75%", animation: "pulse 1.5s infinite" }}></div>
          </div>
        ) : stats ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Flag</span>
              <span style={{ fontSize: "28px", lineHeight: "1" }}>{stats.flag || stats.cca2}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.5)", paddingBottom: "6px" }}>
              <span style={{ color: "#94a3b8" }}>Capital</span>
              <span style={{ fontWeight: "500" }}>{stats.capital?.[0] || "N/A"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.5)", paddingBottom: "6px" }}>
              <span style={{ color: "#94a3b8" }}>Population</span>
              <span style={{ fontWeight: "500" }}>{stats.population?.toLocaleString() || "N/A"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(51, 65, 85, 0.5)", paddingBottom: "6px" }}>
              <span style={{ color: "#94a3b8" }}>Region</span>
              <span style={{ fontWeight: "500" }}>{stats.region || "N/A"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Area (km²)</span>
              <span style={{ fontWeight: "500" }}>{stats.area?.toLocaleString() || "N/A"}</span>
            </div>
          </div>
        ) : (
          <div style={{ color: "#94a3b8", fontSize: "14px" }}>No stats available.</div>
        )}
      </div>

      {/* AI Brief Component */}
      {selectedCountry && <AISummary country={selectedCountry.name} />}

      {/* News Row */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 style={{ margin: "0", fontSize: "16px", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "1px" }}>
          Top Stories
        </h3>
        {loadingNews ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ height: "90px", background: "rgba(15, 23, 42, 0.95)", border: "1px solid rgba(59, 130, 246, 0.3)", borderRadius: "10px", animation: "pulse 1.5s infinite" }} />
          ))
        ) : news.length > 0 ? (
          news.map((article, i) => (
             <div
               key={i}
               style={{
                 padding: "16px",
                 backgroundColor: "rgba(15, 23, 42, 0.95)",
                 borderRadius: "10px",
                 border: "1px solid rgba(59, 130, 246, 0.3)",
                 display: "flex",
                 flexDirection: "column",
                 gap: "10px",
                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                 transition: "transform 0.2s ease",
                 cursor: "pointer",
               }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
             >
               <h4 style={{ margin: 0, fontSize: "14px", color: "#f1f5f9", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                 {article.title}
               </h4>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "#94a3b8" }}>
                 <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{ color: "#cbd5e1", fontWeight: "600" }}>{article.source?.name}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                 </div>
                 <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                   Read More
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                   </svg>
                 </a>
               </div>
             </div>
          ))
        ) : (
          <div style={{ color: "#64748b", fontSize: "14px" }}>No recent news found.</div>
        )}
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [leftCountry, setLeftCountry] = useState("US");
  const [rightCountry, setRightCountry] = useState("CN");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        body { margin: 0; background-color: #0d1117; }
        select {
           -webkit-appearance: none;
           -moz-appearance: none;
           background-image: url("data:image/svg+xml;utf8,<svg fill='%233b82f6' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
           background-repeat: no-repeat;
           background-position-x: 98%;
           background-position-y: 50%;
        }
      `}} />
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          padding: "90px 24px 60px 24px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Page Header */}
          <div style={{ marginBottom: "40px", textAlign: "center" }}>
            <h1 style={{ margin: "0 0 12px 0", fontSize: "36px", fontWeight: "800", color: "#f8fafc", letterSpacing: "-0.5px" }}>
              Compare Countries
            </h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "16px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.5" }}>
              Side-by-side geopolitical, economic, and breaking news intelligence to analyze global powers and regions.
            </p>
          </div>

          {/* Columns Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            {/* Left Column */}
            <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column" }}>
              <CountryColumn selectedCountryCode={leftCountry} onCountryChange={setLeftCountry} />
            </div>
            
            {/* Right Column */}
            <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column" }}>
               <CountryColumn selectedCountryCode={rightCountry} onCountryChange={setRightCountry} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
