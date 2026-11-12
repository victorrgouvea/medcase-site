<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <div class="mx-auto max-w-290 px-4 pt-6 pb-16 sm:px-6 lg:pb-22">
    <div class="grid grid-cols-1 items-center gap-8 rounded-[20px] bg-primary-deep px-5.5 py-9 text-white sm:rounded-[28px] sm:px-9 sm:py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:p-16">
      <div>
        <h2 class="mb-2.5 text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-extrabold tracking-[-0.025em]">
          Já faz parte de uma clínica no MedCase?
        </h2>
        <p class="m-0 max-w-[46ch] text-lg text-[#c9ddd8]">
          Entre com o e-mail do convite que você recebeu. Se ainda não tem acesso, peça ao gestor da sua clínica para convidar você.
        </p>
      </div>
      <Button as="a" :href="loginUrl" size="lg" class="w-full bg-white text-primary-deep hover:bg-type-first-soft lg:w-auto">
        Entrar na plataforma
      </Button>
    </div>
  </div>
</template>
