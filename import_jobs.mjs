import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const parser = new Parser();

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const SUPABASE_URL = required("NEXT_PUBLIC_SUPABASE_URL");
const SERVICE_KEY = required("SUPABASE_SERVICE_ROLE_KEY");

// Comma-separated RSS feed URLs (must be allowed/public)
const FEEDS = (process.env.FEEDS || "").split(",").map(s => s.trim()).filter(Boolean);

if (FEEDS.length === 0) {
  console.log("No FEEDS configured. Set env FEEDS with comma-separated RSS URLs.");
  process.exit(0);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const AREA_KEYWORDS = {
  lisboa: ["lisboa", "lisbon"],
  montijo: ["montijo"],
  alcochete: ["alcochete"],
  samouco: ["samouco"],
  margem_sul: ["margem sul", "almada", "seixal", "barreiro", "setúbal", "setubal", "moita", "montijo", "alcochete", "samouco"]
};

function detectArea(text) {
  const t = (text || "").toLowerCase();
  for (const [area, keys] of Object.entries(AREA_KEYWORDS)) {
    if (keys.some(k => t.includes(k))) return area;
  }
  return "lisboa";
}

function detectWorkModel(text) {
  const t = (text || "").toLowerCase();
  if (t.includes("remote") || t.includes("remoto") || t.includes("teletrabalho")) return "remote";
  if (t.includes("hybrid") || t.includes("híbrido") || t.includes("hibrido")) return "hybrid";
  return "onsite";
}

function isPartTime(text) {
  const t = (text || "").toLowerCase();
  return t.includes("part-time") || t.includes("part time") || t.includes("parttime") || t.includes("tempo parcial");
}

function hashId(s) {
  return crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);
}

async function upsertJob(job) {
  const { error } = await supabase.from("jobs").upsert(job, { onConflict: "id" });
  if (error) console.error("Upsert error:", error.message);
}

async function run() {
  let imported = 0;

  for (const feedUrl of FEEDS) {
    console.log("Fetching:", feedUrl);
    const feed = await parser.parseURL(feedUrl);
    const source = feed.title || "RSS";

    for (const item of feed.items || []) {
      const title = item.title || "";
      const link = item.link || item.guid || "";
      const content = (item.contentSnippet || item.content || item.summary || "").toString();

      const combined = `${title} ${content} ${link}`;

      // Only part-time
      if (!isPartTime(combined)) continue;

      // Only Lisbon + Margem Sul focus (soft filter: at least one keyword)
      const area = detectArea(combined);
      const allowedAreas = new Set(["lisboa", "montijo", "alcochete", "samouco", "margem_sul"]);
      if (!allowedAreas.has(area)) continue;

      const work_model = detectWorkModel(combined);

      const published_at = item.isoDate ? new Date(item.isoDate).toISOString() : new Date().toISOString();
      const id = hashId(link || title + published_at);

      // Try to infer location from content (very simple)
      const location = (combined.toLowerCase().includes("lisboa") ? "Lisboa" :
                        combined.toLowerCase().includes("montijo") ? "Montijo" :
                        combined.toLowerCase().includes("alcochete") ? "Alcochete" :
                        combined.toLowerCase().includes("samouco") ? "Samouco" :
                        "Margem Sul");

      const job = {
        id,
        title: title.slice(0, 160),
        company: null,
        location,
        area,
        employment_type: "part-time",
        work_model,
        published_at,
        url: link,
        source,
        description: content.slice(0, 5000),
      };

      await upsertJob(job);
      imported++;
    }
  }

  console.log("Imported/updated:", imported);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
