// One-time script: replace daily interactions with correct Intric CSV data
// Run: node scripts/import-march-stats.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const envContent = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const daily2025 = [
  { date: "14 nov", interactions: 4 },
  { date: "16 nov", interactions: 12 },
  { date: "17 nov", interactions: 127 },
  { date: "18 nov", interactions: 108 },
  { date: "19 nov", interactions: 157 },
  { date: "20 nov", interactions: 69 },
  { date: "21 nov", interactions: 190 },
  { date: "22 nov", interactions: 1 },
  { date: "24 nov", interactions: 74 },
  { date: "25 nov", interactions: 101 },
  { date: "26 nov", interactions: 331 },
  { date: "27 nov", interactions: 132 },
  { date: "28 nov", interactions: 140 },
  { date: "29 nov", interactions: 33 },
  { date: "30 nov", interactions: 1 },
  { date: "1 dec", interactions: 161 },
  { date: "2 dec", interactions: 212 },
  { date: "3 dec", interactions: 44 },
  { date: "4 dec", interactions: 213 },
  { date: "5 dec", interactions: 47 },
  { date: "6 dec", interactions: 16 },
  { date: "7 dec", interactions: 92 },
  { date: "8 dec", interactions: 139 },
  { date: "9 dec", interactions: 150 },
  { date: "10 dec", interactions: 111 },
  { date: "11 dec", interactions: 112 },
  { date: "12 dec", interactions: 106 },
  { date: "13 dec", interactions: 6 },
  { date: "15 dec", interactions: 144 },
  { date: "16 dec", interactions: 82 },
  { date: "17 dec", interactions: 219 },
  { date: "18 dec", interactions: 209 },
  { date: "19 dec", interactions: 58 },
  { date: "20 dec", interactions: 26 },
  { date: "21 dec", interactions: 1 },
  { date: "22 dec", interactions: 104 },
  { date: "23 dec", interactions: 58 },
  { date: "29 dec", interactions: 75 },
  { date: "30 dec", interactions: 94 },
];

const daily2026 = [
  { date: "2 jan", interactions: 58 },
  { date: "3 jan", interactions: 30 },
  { date: "4 jan", interactions: 11 },
  { date: "5 jan", interactions: 67 },
  { date: "7 jan", interactions: 123 },
  { date: "8 jan", interactions: 162 },
  { date: "9 jan", interactions: 140 },
  { date: "11 jan", interactions: 9 },
  { date: "12 jan", interactions: 192 },
  { date: "13 jan", interactions: 156 },
  { date: "14 jan", interactions: 175 },
  { date: "15 jan", interactions: 92 },
  { date: "16 jan", interactions: 181 },
  { date: "17 jan", interactions: 8 },
  { date: "18 jan", interactions: 3 },
  { date: "19 jan", interactions: 93 },
  { date: "20 jan", interactions: 140 },
  { date: "21 jan", interactions: 161 },
  { date: "22 jan", interactions: 132 },
  { date: "23 jan", interactions: 118 },
  { date: "24 jan", interactions: 32 },
  { date: "26 jan", interactions: 179 },
  { date: "27 jan", interactions: 80 },
  { date: "28 jan", interactions: 135 },
  { date: "29 jan", interactions: 125 },
  { date: "30 jan", interactions: 125 },
  { date: "31 jan", interactions: 19 },
  { date: "1 feb", interactions: 12 },
  { date: "2 feb", interactions: 196 },
  { date: "3 feb", interactions: 219 },
  { date: "4 feb", interactions: 274 },
  { date: "5 feb", interactions: 220 },
  { date: "6 feb", interactions: 299 },
  { date: "7 feb", interactions: 4 },
  { date: "8 feb", interactions: 20 },
  { date: "9 feb", interactions: 146 },
  { date: "10 feb", interactions: 150 },
  { date: "11 feb", interactions: 124 },
  { date: "12 feb", interactions: 144 },
  { date: "13 feb", interactions: 113 },
  { date: "14 feb", interactions: 4 },
  { date: "16 feb", interactions: 140 },
  { date: "17 feb", interactions: 151 },
  { date: "18 feb", interactions: 158 },
  { date: "19 feb", interactions: 76 },
  { date: "20 feb", interactions: 160 },
  { date: "21 feb", interactions: 15 },
  { date: "22 feb", interactions: 12 },
  { date: "23 feb", interactions: 132 },
  { date: "24 feb", interactions: 91 },
  { date: "25 feb", interactions: 154 },
  { date: "26 feb", interactions: 156 },
  { date: "27 feb", interactions: 134 },
  { date: "28 feb", interactions: 11 },
  { date: "1 mar", interactions: 20 },
  { date: "2 mar", interactions: 184 },
  { date: "3 mar", interactions: 114 },
  { date: "4 mar", interactions: 151 },
  { date: "5 mar", interactions: 166 },
  { date: "6 mar", interactions: 92 },
  { date: "7 mar", interactions: 18 },
  { date: "8 mar", interactions: 33 },
  { date: "9 mar", interactions: 247 },
  { date: "10 mar", interactions: 178 },
  { date: "11 mar", interactions: 189 },
  { date: "12 mar", interactions: 464 },
  { date: "13 mar", interactions: 1760 },
  { date: "14 mar", interactions: 73 },
  { date: "15 mar", interactions: 109 },
  { date: "16 mar", interactions: 512 },
  { date: "17 mar", interactions: 536 },
  { date: "18 mar", interactions: 461 },
  { date: "19 mar", interactions: 349 },
  { date: "20 mar", interactions: 366 },
  { date: "21 mar", interactions: 21 },
  { date: "22 mar", interactions: 47 },
  { date: "23 mar", interactions: 203 },
  { date: "24 mar", interactions: 301 },
  { date: "25 mar", interactions: 70 },
];

async function run() {
  const ts = new Date().toISOString();

  // Save 2025 (nov-dec)
  const { error: e1 } = await supabase.from("stats_data").upsert(
    { key: "daily_interactions_2025", value: daily2025, updated_at: ts },
    { onConflict: "key" }
  );
  if (e1) { console.error("2025:", e1.message); return; }
  console.log(`daily_interactions_2025: ${daily2025.length} dagar (nov-dec), ${daily2025.reduce((s,d)=>s+d.interactions,0)} interaktioner`);

  // Save 2026 (jan-mar)
  const { error: e2 } = await supabase.from("stats_data").upsert(
    { key: "daily_interactions_2026", value: daily2026, updated_at: ts },
    { onConflict: "key" }
  );
  if (e2) { console.error("2026:", e2.message); return; }
  console.log(`daily_interactions_2026: ${daily2026.length} dagar (jan-mar), ${daily2026.reduce((s,d)=>s+d.interactions,0)} interaktioner`);

  // Save all (2025+2026)
  const allData = [...daily2025, ...daily2026];
  const { error: e3 } = await supabase.from("stats_data").upsert(
    { key: "daily_interactions_all", value: allData, updated_at: ts },
    { onConflict: "key" }
  );
  if (e3) { console.error("all:", e3.message); return; }
  console.log(`daily_interactions_all: ${allData.length} dagar, ${allData.reduce((s,d)=>s+d.interactions,0)} interaktioner`);

  console.log("Klart!");
}

run();
