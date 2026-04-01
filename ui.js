export function formatPtDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("pt-PT", { year: "numeric", month: "short", day: "2-digit" });
}

export function workModelLabel(wm) {
  const v = (wm || "").toLowerCase();
  if (v.includes("remote") || v.includes("remoto")) return "Remoto";
  if (v.includes("hybrid") || v.includes("híbrido")) return "Híbrido";
  return "Presencial";
}

export function workModelTone(wm) {
  const v = (wm || "").toLowerCase();
  if (v.includes("remote") || v.includes("remoto")) return "green";
  if (v.includes("hybrid") || v.includes("híbrido")) return "purple";
  return "orange";
}

export function locationTone(loc) {
  const v = (loc || "").toLowerCase();
  if (v.includes("lisboa")) return "brand";
  if (v.includes("montijo") || v.includes("alcochete") || v.includes("samouco")) return "slate";
  if (v.includes("almada") || v.includes("seixal") || v.includes("barreiro") || v.includes("setúbal")) return "slate";
  return "slate";
}

export function rankWorkModel(wm) {
  const v = (wm || "").toLowerCase();
  if (v.includes("remote") || v.includes("remoto")) return 0;
  if (v.includes("hybrid") || v.includes("híbrido")) return 1;
  return 2;
}
