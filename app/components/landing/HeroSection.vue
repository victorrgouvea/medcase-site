<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <div class="mx-auto grid max-w-290 grid-cols-1 items-center gap-12 px-4 pt-6 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-16 lg:pt-14 lg:pb-24">
    <div>
      <h1 class="mb-6 max-w-[16ch] text-[clamp(40px,5.6vw,68px)] leading-[1.02] font-extrabold tracking-[-0.035em] lg:max-w-[13ch]">
        A clínica inteira no mesmo prontuário.
      </h1>
      <p class="mb-9 max-w-[36ch] text-lg text-muted-foreground sm:text-xl">
        Agenda, atendimento e equipe num só lugar. A recepção marca, o médico atende, o gestor acompanha, e cada um vê só o que precisa.
      </p>
      <div class="flex flex-wrap gap-3">
        <Button as="a" :href="loginUrl" size="lg" class="w-full sm:w-auto">Entrar na plataforma</Button>
        <Button as="a" href="#recursos" size="lg" variant="outline" class="w-full bg-transparent text-primary sm:w-auto">
          Ver o que dá para fazer
        </Button>
      </div>
      <p class="mt-5.5 text-[15px] text-muted-foreground">Funciona no navegador. Não precisa instalar nada.</p>
    </div>

    <AgendaPreview class="max-w-130 lg:max-w-none" />
  </div>
</template>
