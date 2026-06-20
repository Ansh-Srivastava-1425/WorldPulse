"use client";

import { useState } from "react";
import WorldMap from "@/components/map/WorldMap";
import NewsPanel from "@/components/news/NewsPanel";
import NewsTicker from "@/components/news/NewsTicker";
import CountryStats from "@/components/map/CountryStats";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a0f1e",
        position: "relative",
        paddingBottom: "40px",
      }}
    >
      <WorldMap onCountrySelect={setSelectedCountry} />
      <NewsPanel selectedCountry={selectedCountry} onClose={() => setSelectedCountry(null)} />
      <CountryStats selectedCountry={selectedCountry} onClose={() => setSelectedCountry(null)} />
      <NewsTicker />
    </main>
  );
}



