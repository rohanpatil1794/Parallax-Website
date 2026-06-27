import Link from "next/link";
import { Map, Images, Info, Phone, ArrowRight } from "lucide-react";
import { getAllTreks } from "@/lib/treks";
import { getGalleryData, getAboutData } from "@/lib/serverData";

export default async function AdminDashboard() {
  const [treks, gallery, about] = await Promise.all([
    getAllTreks(),
    getGalleryData(),
    getAboutData(),
  ]);

  const stats = [
    { label: "Treks", value: treks.length, icon: Map, href: "/admin/treks", color: "bg-brand-100 text-brand-700" },
    { label: "Gallery photos", value: gallery.length, icon: Images, href: "/admin/gallery", color: "bg-ember-100 text-ember-700" },
    { label: "Team members", value: about.team.length, icon: Info, href: "/admin/about", color: "bg-emerald-100 text-emerald-700" },
    { label: "Manage contact", value: "→", icon: Phone, href: "/admin/contact", color: "bg-slate-100 text-slate-700" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/50">Manage your Travello website content</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl ${s.color}`}>
              <s.icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink/50 uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold text-ink">{s.value}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-ink/25 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">Quick links</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: "Add a new trek", href: "/admin/treks/new" },
            { label: "Upload gallery photo", href: "/admin/gallery" },
            { label: "Edit about page", href: "/admin/about" },
            { label: "Update contact info", href: "/admin/contact" },
            { label: "View public site", href: "/", target: "_blank" },
            { label: "View treks page", href: "/treks", target: "_blank" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.target}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink/70 hover:bg-slate-50 hover:text-ink transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember-400 flex-shrink-0" />
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
