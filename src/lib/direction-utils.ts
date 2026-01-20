// List of RTL language codes
const RTL_LANGUAGES = [
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Persian/Farsi
  "ur", // Urdu
  "yi", // Yiddish
  "ji", // Yiddish (alternative)
  "ku", // Kurdish
  "ps", // Pashto
  "sd", // Sindhi
] as const;

// Determines if a language code is RTL
export function isRTL(language: string): boolean {
  // Normalize language code ("en-US" -> "en")
  const langCode = language.toLowerCase().split("-")[0];
  return RTL_LANGUAGES.includes(langCode as (typeof RTL_LANGUAGES)[number]);
}

// Gets the direction based on language code
export function getDirectionFromLanguage(language: string): "ltr" | "rtl" {
  return isRTL(language) ? "rtl" : "ltr";
}

// Gets the browser's preferred language
export function getBrowserLanguage(): string {
  if (typeof window === "undefined") return "en";

  // Try to get from navigator.languages
  const languages = navigator.languages || [navigator.language];
  return languages[0] || "en";
}
