"use client";

import Link from "next/link";
import Badge from "./Badge";
import { formatPtDate, workModelLabel, workModelTone, locationTone } from "../lib/ui";
import { useFavorites } from "../lib/useFavorites";

export default function JobCard({ job }) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(job.id);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/vaga/${job.id}`} className="block">
            <h3 className="truncate text-lg font-extrabold text-slate-900 group-hover:text-brand-800">
              {job.title}
            </h3>
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">{job.company || "Empresa"}</span>
            <span>·</span>
            <span>{job.location || "Lisboa"}</span>
          </div>
        </div>

        <button
          onClick={() => toggle(job)}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          aria-label="Guardar vaga"
          title={fav ? "Remover dos favoritos" : "Guardar nos favoritos"}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Badge tone={workModelTone(job.work_model)}>{workModelLabel(job.work_model)}</Badge>
        <Badge tone={locationTone(job.location)}>{job.area || "Lisboa / Margem Sul"}</Badge>
        <Badge tone="brand">Part-time</Badge>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        {formatPtDate(job.published_at)} · {job.source || "Fonte"}
      </div>
    </div>
  );
}
