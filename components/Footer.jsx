import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Rss,
} from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { siteConfig, footerNav } from "@/lib/site";

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, twitter: Twitter };

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-brand-100 bg-ink text-brand-100">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-ember-500/20 text-ember-400">
                <Rss className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-white">Get trek updates</p>
                <p className="text-sm text-brand-200/70">New routes, seasonal deals, and trail stories.</p>
              </div>
            </div>
            <div className="sm:w-96">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + socials */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200/80">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-ember-500"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns: Customer Support / About Us / Terms & Conditions */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-200/80 transition-colors duration-200 hover:text-ember-400"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-4 text-sm text-brand-200/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember-400" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-ember-400">
                  <Phone className="h-5 w-5 flex-shrink-0 text-ember-400" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-ember-400">
                  <Mail className="h-5 w-5 flex-shrink-0 text-ember-400" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-ember-400" aria-hidden="true" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-brand-200/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted for the mountains
            <span className="text-ember-400" aria-hidden="true">▲</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
