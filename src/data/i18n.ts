export type Locale = "en" | "zh-TW";

export type LocalizedText = Record<Locale, string>;

export const ui = {
  en: {
    locale: "en" as Locale,
    lang: "EN",
    alternateLang: "繁中",
    home: "Work",
    about: "About",
    projects: "Selected work",
    more: "More experiments",
    viewProject: "Open case study",
    role: "My role",
    tools: "Tools & systems",
    gallery: "Project gallery",
    next: "Next project",
    github: "View on GitHub",
    resume: "Resume — 2025 edition",
    currentNote: "This archived resume predates my current graduate studies at USC.",
    back: "Back to selected work",
  },
  "zh-TW": {
    locale: "zh-TW" as Locale,
    lang: "繁中",
    alternateLang: "EN",
    home: "作品",
    about: "關於我",
    projects: "精選作品",
    more: "更多實驗作品",
    viewProject: "查看完整介紹",
    role: "我的角色",
    tools: "工具與系統",
    gallery: "專案畫面",
    next: "下一個專案",
    github: "前往 GitHub",
    resume: "履歷 — 2025 版本",
    currentNote: "此封存履歷早於我目前在 USC 的研究所學業。",
    back: "回到精選作品",
  },
} as const;

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\//, "");
  return locale === "zh-TW" ? `/zh/${clean}` : `/${clean}`;
}
