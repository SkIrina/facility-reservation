import "server-only";

const dictionaries = {
  en: () =>
    import("../lib/i18n/dictionaries/en.json").then((module) => module.default),
  ja: () =>
    import("../lib/i18n/dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "ja") =>
  dictionaries[locale]();
