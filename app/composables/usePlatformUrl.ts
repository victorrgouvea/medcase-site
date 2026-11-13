/** Link into the GestoClin platform, e.g. usePlatformUrl('/entrar'). */
export function usePlatformUrl(path = '/') {
  return `${useRuntimeConfig().public.platformUrl}${path}`
}
