"use client";

import { useEffect, useMemo, useState } from "react";

const AREAS = [
  { value: "all", label: "Lisboa + Margem Sul" },
  { value: "lisboa", label: "Lisboa" },
  { value: "margem_sul", label: "Margem Sul (geral)" },
  { value: "montijo", label: "Montijo" },
  { value: "alcochete", label: "Alcochete" },
  { value: "samouco", label: "Samouco" },
];

const DAYS = [
  { value: 3, label: "Últimos 3 dias" },
  { value: 7, label: "Últimos 7 dias" },
  { value: 30, label: "Últimos 30 dias" },
];

export default function Filters({ initial, onChange }) {
  const [q, setQ] = useState(initial.q || "");
  const [area, setArea] = useState(initial.area || "all");
  const [days, setDays] = useState(Number(initial.days || 30));

  useEffect(() => {
    const t = setTimeout(() => onChange({ q, area, days }), 250);
    return () => clearTimeout(t);
  }, [q, area, days, onChange]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="text-xs font-semibold text-slate-600">Pesquisar</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ex.: barista, limpezas, armazém..."
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Zona</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          >
            {AREAS.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600">Data</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
          >
            {DAYS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
        Ordenação: <span className="font-semibold">Remoto</span> → <span className="font-semibold">Híbrido</span> → <span className="font-semibold">Presencial</span> → mais recentes
      </div>
    </div>
  );
}
