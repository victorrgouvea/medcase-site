<script setup lang="ts">
import { Check, Copy, Mail } from 'lucide-vue-next'

const loginUrl = usePlatformUrl('/entrar')
const copied = ref(false)

// For visitors without a mail app set up: the address is on the page and one click copies it.
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contactEmail)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 2500)
  } catch { /* clipboard blocked: the address is still visible to select */ }
}
</script>

<template>
  <div id="contato" class="mx-auto max-w-290 scroll-mt-24 px-4 pb-16 sm:px-6 lg:pb-24">
    <div class="relative overflow-hidden rounded-[20px] bg-primary-deep text-white sm:rounded-[28px]">
      <svg class="pointer-events-none absolute -right-[10%] -bottom-[30%] w-[70%] text-brand-green opacity-[.14]" viewBox="255 463 790 380" aria-hidden="true">
        <path fill="currentColor" d="M255 843 C560 838 950 720 1022 590 C1058 520 975 470 822 463 C930 482 980 530 950 585 C880 700 560 820 255 843 Z" />
      </svg>

      <div class="relative grid grid-cols-1 items-center gap-8 px-5.5 py-9 sm:px-9 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:p-16 lg:pb-14">
        <div>
          <h2 class="mb-2.5 text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-white">
            Quer o GestoClin na sua clínica?
          </h2>
          <p class="m-0 max-w-[48ch] text-lg text-[#b8ccdd]">
            Escreva contando sobre a sua clínica. A gente responde por e-mail e envia o link para você criar a conta.
          </p>
        </div>
        <div class="grid gap-3 lg:justify-items-end">
          <Button as="a" :href="contactMailto" size="lg" class="w-full bg-brand-green text-primary-deep hover:bg-[#00c4a1] lg:w-auto">
            <Mail aria-hidden="true" /> Falar com a gente por e-mail
          </Button>
          <button
            type="button"
            class="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 text-[15px] break-all text-[#c9d8e6] hover:text-white lg:justify-end"
            :aria-label="`Copiar o e-mail ${contactEmail}`"
            @click="copyEmail"
          >
            {{ contactEmail }}
            <component :is="copied ? Check : Copy" class="size-4 shrink-0 text-brand-green" aria-hidden="true" />
          </button>
          <span class="sr-only" role="status">{{ copied ? 'E-mail copiado' : '' }}</span>
        </div>
      </div>

      <div class="relative flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-white/15 px-5.5 py-5 sm:px-9 lg:px-16">
        <p class="m-0 max-w-[60ch] text-[15px] text-[#b8ccdd]">
          <strong class="text-white">Já faz parte de uma clínica no GestoClin?</strong>
          Entre com o e-mail do convite que você recebeu.
        </p>
        <a :href="loginUrl" class="font-semibold text-white underline decoration-brand-green decoration-2 underline-offset-4 hover:text-brand-green">Entrar na plataforma</a>
      </div>
    </div>
  </div>
</template>
