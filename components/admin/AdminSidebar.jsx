"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Images,
  Info,
  Phone,
  LogOut,
  Mountain,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Treks", href: "/admin/treks", icon: Map },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Contact", href: "/admin/contact", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="flex w-56 flex-col bg-ink text-white">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <Mountain className="h-5 w-5 text-ember-400" />
        <span className="font-display text-lg font-bold tracking-tight">
          Travello <span className="text-ember-400 text-sm font-semibold">Admin</span>
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {nav.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-ember-500 text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/55 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
