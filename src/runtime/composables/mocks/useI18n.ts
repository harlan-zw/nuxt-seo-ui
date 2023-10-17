export function useI18n() {
  return {
    t: (_: string, fallback: string) => fallback,
    te: (_: string) => false,
  }
}
