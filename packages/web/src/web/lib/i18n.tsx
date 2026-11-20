import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";
export type Bi = { fr: string; en: string };

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the string for the current language. */
  t: (b: Bi) => string;
}

const Ctx = createContext<LangCtx | null>(null);
const KEY = "mv-lang";

function initialLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const saved = window.localStorage.getItem(KEY);
  if (saved === "fr" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((b: Bi) => b[lang], [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
