<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const areas = [
  {
    title: 'Agenda',
    description: 'Uma agenda por profissional, com o andamento de cada paciente na sala de espera.',
    items: ['Dois horários no mesmo intervalo são bloqueados', 'Agendado, confirmado, chegou, em atendimento', 'Faltas e cancelamentos ficam no histórico'],
  },
  {
    title: 'Prontuário',
    description: 'Anotação do atendimento, receitas, pedidos de exame e anexos do paciente.',
    items: ['Alergias e alertas sempre à vista', 'Receitas e pedidos prontos para imprimir', 'Atendimento finalizado só recebe adendos'],
  },
  {
    title: 'Equipe',
    description: 'Convide médicos e recepção por e-mail ou por um link no WhatsApp.',
    items: ['Tarefas entre recepção e médicos', 'Um médico pode atender em mais de uma clínica', 'Verificação em duas etapas, se a clínica exigir'],
  },
]
</script>

<template>
  <section id="recursos" class="py-16 lg:py-22">
    <div class="mx-auto max-w-290 px-4 sm:px-6">
      <SectionHeading
        class="mb-12 max-w-160"
        title="Feito para o dia a dia de um consultório"
        description="Do horário marcado ao atendimento finalizado, tudo fica ligado ao mesmo paciente."
      />
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:border-t-2 lg:border-ink">
        <div
          v-for="(area, i) in areas"
          :key="area.title"
          :class="['border-t-2 border-ink pt-7 pb-3 lg:border-t-0 lg:pb-2', i > 0 ? 'lg:border-l lg:border-l-border lg:pl-8' : '', i < areas.length - 1 ? 'lg:pr-8' : '']"
        >
          <h3 class="mb-2.5 text-[22px] font-bold tracking-tight">{{ area.title }}</h3>
          <p class="mb-4.5 text-muted-foreground">{{ area.description }}</p>
          <ul class="m-0 list-none p-0">
            <li v-for="item in area.items" :key="item" class="flex gap-3 border-t py-2.5 text-base">
              <Check class="mt-1 size-4 shrink-0 text-primary" :stroke-width="2.5" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
