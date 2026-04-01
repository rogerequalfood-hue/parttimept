export default function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-semibold text-slate-800">parttimept</span> · Vagas part-time em Lisboa & Margem Sul
          </div>
          <div className="text-xs">
            Fonte das vagas: links externos. Este site não representa as empresas anunciantes.
          </div>
        </div>
      </div>
    </footer>
  );
}
