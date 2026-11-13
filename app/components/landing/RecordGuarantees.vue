<script setup lang="ts">
import { Archive, History, Lock, ShieldCheck } from 'lucide-vue-next'

const facts = [
  { icon: Lock, title: 'Atendimento finalizado não muda', text: 'Depois de finalizado, o texto fica travado. Correções entram como adendo, com autor e horário.' },
  { icon: Archive, title: 'Nada clínico é apagado', text: 'Pacientes e documentos são arquivados. Receitas e pedidos de exame ficam como foram emitidos.' },
  { icon: History, title: 'Registro de acessos', text: 'O gestor vê quem abriu cada prontuário, quem alterou o quê e quando.' },
  { icon: ShieldCheck, title: 'Só entra quem foi convidado', text: 'Não existe cadastro aberto. A clínica pode exigir código de verificação em duas etapas da equipe.' },
]
</script>

<template>
  <section class="py-16 lg:py-22">
    <div class="mx-auto max-w-290 px-4 sm:px-6">
      <SectionHeading
        class="mb-12 max-w-160"
        title="O prontuário fica guardado como a lei pede"
        description="A Resolução CFM 1.821/2007 e a Lei 13.787/2018 exigem guarda por 20 anos. O GestoClin foi desenhado para isso."
      />
      <div class="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-16 md:gap-y-10">
        <div v-for="fact in facts" :key="fact.title" class="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
          <div class="grid size-11 place-items-center rounded-xl bg-brand-green-soft text-brand-green-ink">
            <component :is="fact.icon" class="size-5.5" aria-hidden="true" />
          </div>
          <div>
            <h3 class="mb-1.5 text-[19px] font-bold">{{ fact.title }}</h3>
            <p class="m-0 text-muted-foreground">{{ fact.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
