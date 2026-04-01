"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavLink = ({ href, children }) => {
  const p = usePathname();
  const active = p === href;
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-full px-3 py-1.5 text-sm font-semibold transition",
        active ? "bg-brand-100 text-brand-800" : "text-slate-700 hover:bg-slate-100"
      )}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/favicon.svg" alt="parttimept" width={36} height={36} />
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight">
              <span className="text-slate-900">parttime</span><span className="text-brand-700">pt</span>
            </div>
            <div className="text-xs text-slate-500">Lisboa & Margem Sul</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink href="/">Vagas</NavLink>
          <NavLink href="/favoritos">Favoritos</NavLink>
          <NavLink href="/sobre">Sobre</NavLink>
          <NavLink href="/contato">Contato</NavLink>
        </nav>
      </div>
    </header>
  );
}
