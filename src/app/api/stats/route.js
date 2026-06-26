import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  
  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`);
    const data = await res.json();
    const c = Array.isArray(data) ? data[0] : data;
    return NextResponse.json({
      flag: c.flags?.emoji || "🏳️",
      name: c.name?.common || code,
      capital: c.capital?.[0] || "N/A",
      population: c.population?.toLocaleString() || "N/A",
      region: c.region || "N/A",
      area: c.area ? c.area.toLocaleString() + " km²" : "N/A",
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
