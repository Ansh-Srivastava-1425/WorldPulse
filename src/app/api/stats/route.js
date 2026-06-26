import { NextResponse } from "next/server";

const COUNTRY_DATA = {
  US: { flag: "🇺🇸", name: "United States", capital: "Washington, D.C.", population: "331,000,000", region: "Americas", area: "9,833,517 km²" },
  CN: { flag: "🇨🇳", name: "China", capital: "Beijing", population: "1,412,000,000", region: "Asia", area: "9,596,960 km²" },
  IN: { flag: "🇮🇳", name: "India", capital: "New Delhi", population: "1,380,000,000", region: "Asia", area: "3,287,263 km²" },
  RU: { flag: "🇷🇺", name: "Russia", capital: "Moscow", population: "144,000,000", region: "Europe", area: "17,098,242 km²" },
  BR: { flag: "🇧🇷", name: "Brazil", capital: "Brasília", population: "215,000,000", region: "Americas", area: "8,515,767 km²" },
  DE: { flag: "🇩🇪", name: "Germany", capital: "Berlin", population: "83,000,000", region: "Europe", area: "357,114 km²" },
  GB: { flag: "🇬🇧", name: "United Kingdom", capital: "London", population: "67,000,000", region: "Europe", area: "242,495 km²" },
  FR: { flag: "🇫🇷", name: "France", capital: "Paris", population: "68,000,000", region: "Europe", area: "551,695 km²" },
  JP: { flag: "🇯🇵", name: "Japan", capital: "Tokyo", population: "125,000,000", region: "Asia", area: "377,930 km²" },
  KR: { flag: "🇰🇷", name: "South Korea", capital: "Seoul", population: "51,000,000", region: "Asia", area: "100,210 km²" },
  IR: { flag: "🇮🇷", name: "Iran", capital: "Tehran", population: "87,000,000", region: "Asia", area: "1,648,195 km²" },
  IL: { flag: "🇮🇱", name: "Israel", capital: "Jerusalem", population: "9,000,000", region: "Asia", area: "20,770 km²" },
  SA: { flag: "🇸🇦", name: "Saudi Arabia", capital: "Riyadh", population: "35,000,000", region: "Asia", area: "2,149,690 km²" },
  TR: { flag: "🇹🇷", name: "Turkey", capital: "Ankara", population: "85,000,000", region: "Asia", area: "783,562 km²" },
  UA: { flag: "🇺🇦", name: "Ukraine", capital: "Kyiv", population: "44,000,000", region: "Europe", area: "603,550 km²" },
  PK: { flag: "🇵🇰", name: "Pakistan", capital: "Islamabad", population: "231,000,000", region: "Asia", area: "881,913 km²" },
  NG: { flag: "🇳🇬", name: "Nigeria", capital: "Abuja", population: "218,000,000", region: "Africa", area: "923,768 km²" },
  ZA: { flag: "🇿🇦", name: "South Africa", capital: "Pretoria", population: "60,000,000", region: "Africa", area: "1,219,090 km²" },
  EG: { flag: "🇪🇬", name: "Egypt", capital: "Cairo", population: "104,000,000", region: "Africa", area: "1,001,450 km²" },
  AR: { flag: "🇦🇷", name: "Argentina", capital: "Buenos Aires", population: "46,000,000", region: "Americas", area: "2,780,400 km²" },
  MX: { flag: "🇲🇽", name: "Mexico", capital: "Mexico City", population: "130,000,000", region: "Americas", area: "1,964,375 km²" },
  CA: { flag: "🇨🇦", name: "Canada", capital: "Ottawa", population: "38,000,000", region: "Americas", area: "9,984,670 km²" },
  AU: { flag: "🇦🇺", name: "Australia", capital: "Canberra", population: "26,000,000", region: "Oceania", area: "7,692,024 km²" },
  ID: { flag: "🇮🇩", name: "Indonesia", capital: "Jakarta", population: "277,000,000", region: "Asia", area: "1,904,569 km²" },
  TH: { flag: "🇹🇭", name: "Thailand", capital: "Bangkok", population: "72,000,000", region: "Asia", area: "513,120 km²" },
  VN: { flag: "🇻🇳", name: "Vietnam", capital: "Hanoi", population: "97,000,000", region: "Asia", area: "331,212 km²" },
  PL: { flag: "🇵🇱", name: "Poland", capital: "Warsaw", population: "38,000,000", region: "Europe", area: "312,696 km²" },
  SE: { flag: "🇸🇪", name: "Sweden", capital: "Stockholm", population: "10,000,000", region: "Europe", area: "450,295 km²" },
  ES: { flag: "🇪🇸", name: "Spain", capital: "Madrid", population: "47,000,000", region: "Europe", area: "505,990 km²" },
  IT: { flag: "🇮🇹", name: "Italy", capital: "Rome", population: "60,000,000", region: "Europe", area: "301,340 km²" },
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.toUpperCase();

  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const stats = COUNTRY_DATA[code];
  if (!stats) return NextResponse.json({ error: "Country not found" }, { status: 404 });

  return NextResponse.json(stats);
}