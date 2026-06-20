import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const q = searchParams.get("q");

  const apiKey = process.env.GNEWS_API_KEY;

  // Fallback warning if GNEWS_API_KEY is not defined in .env.local
  if (!apiKey) {
    return NextResponse.json(
      { error: "GNEWS_API_KEY is not configured in .env.local", articles: [] },
      { status: 200 } // Return 200 with error property so client falls back gracefully
    );
  }

  // Choose appropriate endpoint: top-headlines for country/general, search for keyword queries
  let url = "";
  if (country) {
    url = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&country=${country.toLowerCase()}&lang=en`;
  } else if (q) {
    url = `https://gnews.io/api/v4/search?apikey=${apiKey}&q=${encodeURIComponent(q)}&lang=en`;
  } else {
    url = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&category=general&lang=en`;
  }

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    
    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `GNews API responded with status ${res.status}: ${errorText}`, articles: [] },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch news from GNews";
    return NextResponse.json(
      { error: errorMessage, articles: [] },
      { status: 500 }
    );
  }
}
