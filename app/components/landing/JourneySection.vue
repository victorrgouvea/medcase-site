<script setup lang="ts">
import { Check, Lock, Paperclip, Pill, ScanLine } from 'lucide-vue-next'

// One consultation followed from booking to the locked record. The screens are simplified
// drawings of the platform (agenda dialog, Hoje, atendimento, prontuário) with made-up data.
const steps = [
  { title: 'A recepção marca o horário', text: 'Escolhe o paciente, o profissional e o tipo de consulta. Se o horário já estiver ocupado, o GestoClin não deixa marcar por cima.', path: '/agenda' },
  { title: 'O paciente chega', text: 'Um toque em "Marcar chegada" e o profissional vê, da sala, quem está esperando e há quanto tempo.', path: '/' },
  { title: 'O profissional atende', text: 'Anamnese, exame físico, avaliação e conduta na mesma tela. O rascunho é salvo sozinho, e receitas e pedidos de exame saem dali.', path: '/pacientes/lucia-fernandes/atendimentos' },
  { title: 'Finaliza e fica guardado', text: 'Atendimento finalizado não muda mais. Se precisar corrigir, entra um adendo com autor e horário.', path: '/pacientes/lucia-fernandes' },
]

const bookingFields: { label: string, value: string, wide?: boolean, focus?: boolean }[] = [
  { label: 'Paciente', value: 'Lúcia Fernandes', wide: true },
  { label: 'Profissional', value: 'Dra. Helena Prado' },
  { label: 'Tipo', value: 'Pós-operatório' },
  { label: 'Data', value: '16/11/2026' },
  { label: 'Horário', value: '09:00', focus: true },
]

const active = ref(0)
const auto = ref(false)
const root = ref<HTMLElement>()
let inView = false
let idle: number | undefined
let reducedMotion = true

// Steps advance on their own, in a loop, while the section is on screen. Picking a step pauses
// the loop; after a few seconds without another click it picks up again from that step.
function select(i: number) {
  active.value = i
  auto.value = false
  window.clearTimeout(idle)
  idle = window.setTimeout(() => { auto.value = inView && !reducedMotion }, 4000)
}
function next() { active.value = (active.value + 1) % steps.length }

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion || !root.value) return
  const observer = new IntersectionObserver(([entry]) => {
    inView = !!entry?.isIntersecting
    window.clearTimeout(idle)
    auto.value = inView
  }, { threshold: 0.15 })
  observer.observe(root.value)
  onBeforeUnmount(() => { observer.disconnect(); window.clearTimeout(idle) })
})
</script>

<template>
  <section id="como-funciona" ref="root" class="scroll-mt-17 py-16 lg:py-24">
    <div class="mx-auto max-w-290 px-4 sm:px-6">
      <SectionHeading
        class="mb-10 max-w-170 lg:mb-14"
        title="Uma consulta, do agendamento ao prontuário"
        description="Cada pessoa faz a sua parte e a próxima já enxerga. Sem recado em papel, sem perguntar no corredor quem chegou."
      />

      <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-14">
        <ol class="m-0 list-none p-0">
          <li v-for="(step, i) in steps" :key="step.title" class="relative border-t-2" :class="active === i ? 'border-primary' : 'border-border'">
            <span
              v-if="auto && active === i"
              class="step-timer absolute -top-0.5 left-0 h-0.5 w-full bg-brand-green"
              aria-hidden="true"
              @animationend="next"
            />
            <button
              type="button"
              class="grid w-full cursor-pointer grid-cols-[36px_minmax(0,1fr)] gap-3 py-4.5 text-left"
              :aria-current="active === i ? 'step' : undefined"
              @click="select(i)"
            >
              <span
                :class="['tabular grid size-9 place-items-center rounded-full font-display text-[15px] font-bold transition-colors', active === i ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground']"
                aria-hidden="true"
              >{{ i + 1 }}</span>
              <span>
                <span :class="['block font-display text-[19px] leading-snug font-bold transition-colors', active === i ? 'text-primary' : 'text-muted-foreground']">{{ step.title }}</span>
                <span v-show="active === i" class="mt-1.5 block text-base text-muted-foreground">{{ step.text }}</span>
              </span>
            </button>
          </li>
        </ol>

        <MockWindow :path="steps[active]!.path" aria-hidden="true">
          <div class="grid min-h-[400px] items-center bg-background p-4 sm:min-h-[440px] sm:p-6">
            <Transition name="swap" mode="out-in">
              <!-- 1. Booking -->
              <div v-if="active === 0" key="0" class="mx-auto max-w-120 rounded-xl border bg-card p-4 sm:p-5">
                <p class="mb-3 font-display text-lg font-bold text-primary">Nova consulta</p>
                <dl class="m-0 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[15px]">
                  <div
                    v-for="f in bookingFields"
                    :key="f.label"
                    :class="['min-w-0', f.wide ? 'col-span-2' : '']"
                  >
                    <dt class="mb-1 text-[13px] font-semibold text-muted-foreground">{{ f.label }}</dt>
                    <dd :class="['tabular m-0 truncate rounded-lg px-3', f.focus ? 'border-2 border-brand-green py-[5px]' : 'border border-input py-1.5']">{{ f.value }}</dd>
                  </div>
                </dl>
                <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p class="m-0 flex items-center gap-2 text-sm text-brand-green-ink"><Check class="size-4" :stroke-width="2.5" /> Horário livre na agenda da Dra. Helena</p>
                  <span class="rounded-lg bg-primary px-4 py-2 text-[15px] font-semibold text-white">Agendar</span>
                </div>
              </div>

              <!-- 2. Arrival -->
              <div v-else-if="active === 1" key="1">
                <p class="font-display text-xl font-bold text-primary">Hoje</p>
                <p class="tabular mb-4 text-[15px] text-muted-foreground">Segunda, 16 de novembro. 5 consultas, 3 pela frente, 1 na recepção</p>
                <div class="rounded-xl border bg-card">
                  <p class="border-b px-4 py-2.5 text-sm font-semibold text-arrival">Na recepção</p>
                  <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                    <div>
                      <b class="block text-base text-ink">Lúcia Fernandes</b>
                      <span class="tabular text-sm text-muted-foreground">09:00, Pós-operatório. Chegou às 08:48, esperando 4 min</span>
                    </div>
                    <span class="rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-white">Iniciar atendimento</span>
                  </div>
                </div>
                <div class="mt-3 rounded-xl border bg-card">
                  <p class="border-b px-4 py-2.5 text-sm font-semibold text-muted-foreground">Próximas</p>
                  <div
                    v-for="[time, name, type, status] in [['09:30', 'Antônio Ribeiro', 'Procedimento', 'Confirmado'], ['10:30', 'Beatriz Nogueira', 'Retorno', 'Agendado']]"
                    :key="time"
                    class="flex items-center justify-between gap-3 border-b px-4 py-3 last:border-0"
                  >
                    <div class="min-w-0">
                      <b class="block truncate text-[15px] text-ink">{{ name }}</b>
                      <span class="tabular text-sm text-muted-foreground">{{ time }}, {{ type }}</span>
                    </div>
                    <span class="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">{{ status }}</span>
                  </div>
                </div>
              </div>

              <!-- 3. Encounter -->
              <div v-else-if="active === 2" key="2" class="overflow-hidden rounded-xl border bg-card">
                <div class="flex items-center justify-between gap-3 border-b px-4 py-2.5">
                  <div class="min-w-0">
                    <b class="block truncate text-[15px] text-ink">Lúcia Fernandes<span class="font-normal text-muted-foreground">, 46 anos</span></b>
                    <span class="tabular flex items-center gap-1 text-[13px] text-muted-foreground"><Check class="size-3.5 text-primary" /> Rascunho salvo às 09:11</span>
                  </div>
                  <span class="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white"><Lock class="size-3.5" /> Finalizar</span>
                </div>
                <p class="m-0 border-b bg-[#fdecea] px-4 py-1.5 text-sm font-semibold text-destructive">Alergia: dipirona</p>
                <div class="p-4">
                  <div class="mb-4 flex flex-wrap gap-2 border-b pb-3 text-[13px] font-semibold">
                    <span class="flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5"><Pill class="size-3.5" /> Receita</span>
                    <span class="flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5"><ScanLine class="size-3.5" /> Pedir exames</span>
                    <span class="flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5"><Paperclip class="size-3.5" /> Arquivo</span>
                  </div>
                  <p class="mb-1 font-display text-[15px] font-bold text-primary">Anamnese</p>
                  <p class="mb-4 text-[15px] text-ink">Sétimo dia de pós-operatório. Sem febre. Dor leve, controlada com analgésico comum.</p>
                  <p class="mb-1 font-display text-[15px] font-bold text-primary">Exame físico</p>
                  <p class="mb-4 text-[15px] text-ink"><strong>PA</strong> 120x80 mmHg, <strong>FC</strong> 72 bpm. Ferida operatória limpa e seca.</p>
                  <p class="mb-1 font-display text-[15px] font-bold text-primary">Conduta e plano</p>
                  <p class="caret m-0 text-[15px] text-ink">Retirados os pontos. Retorno em 30 dias</p>
                </div>
              </div>

              <!-- 4. Locked record -->
              <div v-else key="3" class="rounded-xl border bg-card p-4 sm:p-5">
                <div class="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p class="m-0 font-display text-lg font-bold text-primary">Revisão de pós-operatório</p>
                    <p class="tabular m-0 text-sm text-muted-foreground">Dra. Helena Prado, 16/11/2026 às 09:26</p>
                  </div>
                  <span class="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[13px] font-semibold text-muted-foreground"><Lock class="size-3.5" /> Finalizado, somente leitura</span>
                </div>
                <p class="mt-3 mb-0 text-[15px] text-ink"><strong>Conduta e plano.</strong> Retirados os pontos. Retorno em 30 dias.</p>
                <div class="mt-3 flex flex-wrap gap-2 text-[13px] font-semibold text-primary">
                  <span class="flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5"><Pill class="size-3.5" /> Receita</span>
                  <span class="flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1.5"><ScanLine class="size-3.5" /> Pedido de exames</span>
                </div>
                <div class="mt-4 border-l-4 border-brand-green bg-brand-green-soft px-4 py-3">
                  <p class="tabular m-0 text-[13px] font-semibold text-brand-green-ink">Adendo de Dra. Helena Prado, 17/11/2026 às 08:10</p>
                  <p class="m-0 mt-1 text-[15px] text-ink">Paciente avisou por telefone que antecipou o retorno para o dia 10.</p>
                </div>
                <p class="mt-4 mb-0 text-sm text-muted-foreground">O texto original continua como foi finalizado. O adendo fica registrado logo abaixo.</p>
              </div>
            </Transition>
          </div>
        </MockWindow>
      </div>
    </div>
  </section>
</template>
