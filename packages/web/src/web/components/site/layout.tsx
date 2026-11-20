import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Mail, MessageCircle, Phone, X, MapPin, Clock } from "lucide-react";
import { useLang } from "../../lib/i18n";
import { site, whatsappLink } from "../../lib/site";
import { cn } from "../../lib/utils";
import { Provisional } from "./ui";

const nav = [
  { to: "/", label: { fr: "Accueil", en: "Home" } },
  { to: "/services", label: { fr: "Nos services", en: "Services" } },
  { to: "/destinations", label: { fr: "Destinations", en: "Destinations" } },
  { to: "/voyages-etudes", label: { fr: "Voyages d'études", en: "Study trips" } },
  { to: "/a-propos", label: { fr: "À propos", en: "About" } },
  { to: "/contact", label: { fr: "Contact", en: "Contact" } },
];

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="inline-flex rounded-full border border-line bg-white p-0.5 text-xs font-bold">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1.5 uppercase transition-colors",
            lang === l ? "bg-forest text-paper" : "text-muted hover:text-forest",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  // Transparent header only over the home hero; solid everywhere else.
  const solid = scrolled || open || location !== "/";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "bg-paper/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link to="/" className={cn("font-display text-xl font-semibold", solid ? "text-forest" : "text-paper")}>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-sm font-semibold transition-colors",
                location === n.to
                  ? solid ? "text-ocean" : "text-sun"
                  : solid
                    ? "text-ink hover:text-ocean"
                    : "text-paper hover:text-sun",
              )}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <Link
            to="/contact"
            className="hidden rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-[#f0b155] md:inline-flex"
          >
            {t({ fr: "Demander un devis", en: "Request a quote" })}
          </Link>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full lg:hidden",
              solid ? "text-forest" : "text-paper",
            )}
            aria-label={open ? t({ fr: "Fermer le menu", en: "Close menu" }) : t({ fr: "Ouvrir le menu", en: "Open menu" })}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-5 pb-6 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="border-b border-line py-4 text-lg font-medium text-forest">
                {t(n.label)}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-3">
            <LangSwitch />
            <Link to="/contact" className="rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-forest">
              {t({ fr: "Demander un devis", en: "Request a quote" })}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a
      href={whatsappLink(t({ fr: "Bonjour, je souhaite un renseignement sur un voyage à Madagascar.", en: "Hello, I would like information about a trip to Madagascar." }))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          {site.nameIsProvisional && (
            <div className="mt-2">
              <Provisional />
            </div>
          )}
          <p className="mt-4 max-w-sm text-sm opacity-80">
            {t({
              fr: "Voyages d'études, excursions scolaires et circuits sur mesure à Madagascar.",
              en: "Study trips, school excursions and tailor-made tours in Madagascar.",
            })}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-widest opacity-70">{t({ fr: "Contact", en: "Contact" })}</p>
          <p className="flex items-start gap-2"><Phone className="mt-0.5 size-4 shrink-0" /> <a href={`tel:${site.phoneTel}`} className="hover:text-sun">{site.phoneDisplay}</a></p>
          <p className="flex items-start gap-2"><Mail className="mt-0.5 size-4 shrink-0" /> <a href={`mailto:${site.email}`} className="hover:text-sun">{site.email}</a></p>
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> <span>{t(site.address)}</span></p>
          <p className="flex items-start gap-2"><Clock className="mt-0.5 size-4 shrink-0" /> <span>{t(site.hours)}</span></p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold uppercase tracking-widest opacity-70">{t({ fr: "Navigation", en: "Navigate" })}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="opacity-85 hover:text-sun">
                {t(n.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-5 text-xs opacity-70 md:flex-row md:justify-between md:px-8">
          <span>© {new Date().getFullYear()} {site.name}. {t({ fr: "Tous droits réservés.", en: "All rights reserved." })}</span>
          <span>{t({ fr: "Photos : Unsplash (licence libre), à remplacer par les photos de l'agence si possible.", en: "Photos: Unsplash (free license), to be replaced with the agency's own photos when possible." })}</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
