<script setup lang="ts">
// Sketch of a screen: a title bar and a few rows, drawn with gradients.
const screen = `background:
  linear-gradient(var(--primary), var(--primary)) 12px 14px / 40% 6px no-repeat,
  repeating-linear-gradient(#fff 0 10px, var(--type-first-soft) 10px 20px, #fff 20px 26px) 12px 30px / calc(100% - 24px) 52% no-repeat,
  var(--card)`

const devices = [
  { label: 'celular', class: 'h-24.5 w-13 rounded-2xl sm:h-35 sm:w-18.5' },
  { label: 'tablet', class: 'h-31 w-22.5 rounded-[14px] sm:h-50 sm:w-37.5' },
  { label: 'computador', class: 'h-26 w-37.5 rounded-t-xl rounded-b sm:h-41 sm:w-62.5' },
]
</script>

<template>
  <section class="border-y bg-card py-16 lg:py-22">
    <div class="mx-auto grid max-w-290 grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div class="flex items-end justify-center gap-2.5 sm:gap-4.5" aria-hidden="true">
        <div
          v-for="d in devices"
          :key="d.label"
          :class="['grid place-items-end justify-center border-2 border-ink pb-2.5 text-[11px] text-muted-foreground sm:text-[13px]', d.class]"
          :style="screen"
        >
          {{ d.label }}
        </div>
      </div>
      <div>
        <SectionHeading title="Abre no aparelho que estiver à mão">
          O MedCase é um site. A recepção usa no computador do balcão, o médico confere a agenda no celular entre um paciente e outro.
        </SectionHeading>
        <ul class="mt-4.5 list-disc pl-5 text-muted-foreground">
          <li class="my-1.5">Sem app de loja para instalar ou atualizar</li>
          <li class="my-1.5">Letra pensada para leitura rápida, em qualquer tela</li>
          <li class="my-1.5">A mesma conta serve no celular e no computador</li>
        </ul>
      </div>
    </div>
  </section>
</template>
