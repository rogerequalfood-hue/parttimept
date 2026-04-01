import clsx from "clsx";

export default function Badge({ children, tone="slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    brand: "bg-brand-100 text-brand-800",
    green: "bg-emerald-100 text-emerald-800",
    orange: "bg-orange-100 text-orange-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold", tones[tone] || tones.slate)}>
      {children}
    </span>
  );
}
