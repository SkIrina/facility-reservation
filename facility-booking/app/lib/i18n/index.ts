import { en } from './dictionaries/en';
import { ja } from './dictionaries/ja';

export const dictionaries = {
  en,
  ja,
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

// Function to get dictionary for a specific locale
export async function getDictionary(locale: Locale) {
  return dictionaries[locale];
}