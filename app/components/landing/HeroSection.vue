<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <div class="relative overflow-hidden bg-primary-deep">
    <!-- The swoosh from the GestoClin symbol, scaled up behind the agenda. -->
    <svg
      class="pointer-events-none absolute -right-[18%] -bottom-[8%] w-[125%] max-w-none text-brand-green opacity-[.13] lg:-right-[6%] lg:bottom-[-22%] lg:w-[88%]"
      viewBox="255 463 790 380"
      aria-hidden="true"
    >
      <path fill="currentColor" d="M255 843 C560 838 950 720 1022 590 C1058 520 975 470 822 463 C930 482 980 530 950 585 C880 700 560 820 255 843 Z" />
    </svg>

    <div class="relative mx-auto grid max-w-290 grid-cols-1 items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,490px)] lg:gap-16 lg:pt-20 lg:pb-26">
      <div>
        <h1 class="rise-in mb-6 max-w-[16ch] text-[clamp(40px,5.6vw,68px)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white lg:max-w-[13ch]">
          A clínica inteira no mesmo lugar.
        </h1>
        <p class="rise-in mb-9 max-w-[38ch] text-lg text-[#c9d8e6] sm:text-xl" style="--i: 1">
          Agenda, atendimento e equipe em um só lugar. A recepção marca, o profissional de saúde atende e o gestor acompanha, mas cada um com o seu acesso e suas permissões.
        </p>
        <div class="rise-in flex flex-wrap gap-3" style="--i: 2">
          <Button as="a" :href="loginUrl" size="lg" class="w-full bg-brand-green text-primary-deep hover:bg-[#00c4a1] sm:w-auto">Entrar na plataforma</Button>
          <Button as="a" href="#como-funciona" size="lg" variant="outline" class="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto">
            Ver como funciona
          </Button>
        </div>
        <p class="rise-in mt-5.5 text-[15px] text-[#a9bfd3]" style="--i: 3">
          Ainda não usa o GestoClin? <a href="#contato" class="font-semibold text-white underline decoration-brand-green decoration-2 underline-offset-4">Peça um orçamento</a>.
        </p>
      </div>

      <AgendaPreview class="rise-in max-w-130 lg:max-w-none" style="--i: 3" />
    </div>
  </div>
</template>
