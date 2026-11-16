<script setup lang="ts">
import { Archive, History, Lock, ShieldCheck } from 'lucide-vue-next'

const facts = [
  { icon: Lock, title: 'Atendimento finalizado não muda', text: 'Depois de finalizado, o texto fica travado. Correções entram como adendo, com autor e horário.' },
  { icon: Archive, title: 'Nada clínico é apagado', text: 'Pacientes e documentos são arquivados. Receitas e pedidos de exame ficam como foram emitidos.' },
  { icon: History, title: 'Registro de acessos', text: 'O gestor vê quem abriu cada prontuário, quem alterou o quê e quando.' },
  { icon: ShieldCheck, title: 'Só entra quem foi convidado', text: 'Não existe cadastro aberto. A clínica pode exigir código de verificação em duas etapas da equipe.' },
]

// Same wording as the platform's "Registro de acessos" screen. Names are made up.
const log = [
  { at: '16/11, 09:26', who: 'Dra. Helena Prado', what: 'criou atendimento de', patient: 'Lúcia Fernandes' },
  { at: '16/11, 09:19', who: 'Dra. Helena Prado', what: 'criou receita de', patient: 'Lúcia Fernandes' },
  { at: '16/11, 09:04', who: 'Dra. Helena Prado', what: 'abriu o prontuário de', patient: 'Lúcia Fernandes' },
  { at: '16/11, 08:48', who: 'Carla Menezes', what: 'alterou consulta de', patient: 'Lúcia Fernandes', fields: 'status' },
  { at: '15/11, 17:32', who: 'Carla Menezes', what: 'alterou cadastro do paciente de', patient: 'Antônio Ribeiro', fields: 'telefone' },
]

const list = ref<HTMLElement>()
const visible = ref(false)
onMounted(() => {
  if (!list.value) return
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) { visible.value = true; observer.disconnect() }
  }, { threshold: 0.4 })
  observer.observe(list.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <section id="seguranca" class="scroll-mt-17 bg-primary-deep py-16 lg:py-24">
    <div class="mx-auto max-w-290 px-4 sm:px-6">
      <SectionHeading
        inverted
        class="mb-12 max-w-170"
        title="O prontuário fica guardado como a lei pede"
        description="A Resolução CFM 1.821/2007 e a Lei 13.787/2018 exigem guarda por 20 anos. O GestoClin foi desenhado para isso."
      />
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
          <div v-for="fact in facts" :key="fact.title">
            <component :is="fact.icon" class="mb-3.5 size-7 text-brand-green" :stroke-width="1.75" aria-hidden="true" />
            <h3 class="mb-1.5 text-[19px] font-bold text-white">{{ fact.title }}</h3>
            <p class="m-0 text-[#b8ccdd]">{{ fact.text }}</p>
          </div>
        </div>

        <figure ref="list" :class="['m-0 overflow-hidden rounded-2xl bg-card shadow-[0_40px_80px_-32px_rgba(0,12,28,.75)]', visible ? 'is-visible' : '']" aria-label="Exemplo do registro de acessos que o gestor consulta">
          <figcaption class="border-b px-5 py-3.5">
            <strong class="block font-display text-lg text-primary">Registro de acessos</strong>
            <span class="text-sm text-muted-foreground">Quem abriu ou alterou o quê. Não pode ser editado nem apagado.</span>
          </figcaption>
          <ul class="m-0 list-none p-0" aria-hidden="true">
            <li v-for="(row, i) in log" :key="row.at" class="log-row grid gap-0.5 border-b px-5 py-3 text-[15px] last:border-0 sm:grid-cols-[104px_minmax(0,1fr)]" :style="{ '--i': log.length - 1 - i }">
              <span class="tabular text-sm text-muted-foreground">{{ row.at }}</span>
              <span class="text-ink">
                <strong>{{ row.who }}</strong> {{ row.what }} <span class="font-semibold text-primary">{{ row.patient }}</span>
                <span v-if="row.fields" class="text-sm text-muted-foreground"> ({{ row.fields }})</span>
              </span>
            </li>
          </ul>
        </figure>
      </div>
    </div>
  </section>
</template>
