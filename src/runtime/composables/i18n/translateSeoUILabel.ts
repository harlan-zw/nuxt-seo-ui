import { useI18n } from '#imports'

export function translateSeoUILabel(key: string, fallback?: string | undefined): string {
  const i18n = useI18n()
  if (i18n.te(key))
    return i18n.t(key)
  return fallback || key
}
