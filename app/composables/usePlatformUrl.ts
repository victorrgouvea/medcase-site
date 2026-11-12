/** Link into the MedCase platform, e.g. usePlatformUrl('/entrar'). */
export function usePlatformUrl(path = '/') {
  return `${useRuntimeConfig().public.platformUrl}${path}`
}
