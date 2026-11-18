<script setup lang="ts">
import { Check, Headset, Mail, Stethoscope, UserRoundCog } from 'lucide-vue-next'

// One plan for now. Seats mirror the platform's roles (see RolesMatrix).
const seats = [
  { icon: UserRoundCog, label: '1 acesso de gestor', note: 'Pode ser também profissional de saúde e atender pacientes' },
  { icon: Stethoscope, label: '1 acesso de profissional de saúde', note: '' },
  { icon: Headset, label: '2 acessos de recepção', note: '' },
]

const features = ['Agenda', 'Cadastro do paciente', 'Prontuário', 'Equipe e clínica']
</script>

<template>
  <section id="preco" class="scroll-mt-17 pt-16 pb-2 lg:pt-24 lg:pb-4">
    <div class="mx-auto grid max-w-290 grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
      <SectionHeading title="Um plano, com tudo incluído">
        Sem recurso escondido em plano mais caro. A clínica assina e a equipe usa tudo o que o GestoClin faz hoje.
      </SectionHeading>

      <div class="min-w-0">
        <div class="grid overflow-hidden rounded-2xl border bg-card sm:grid-cols-2">
          <div class="flex flex-col p-6 sm:p-8">
            <p class="m-0 font-display text-base font-bold text-primary">Plano Básico</p>
            <p class="mt-3 mb-1 flex flex-wrap items-baseline gap-x-1.5">
              <span class="tabular font-display text-[clamp(44px,5vw,56px)] leading-none font-extrabold tracking-[-0.03em] text-primary">R$&nbsp;149</span>
              <span class="text-lg text-muted-foreground">/mês</span>
            </p>
            <p class="mt-3 mb-6 text-muted-foreground">Todas as funcionalidades, para uma equipe de até quatro pessoas.</p>
            <ul class="mt-auto mb-6 grid list-none gap-y-2 p-0 text-[15px] text-ink">
              <li v-for="item in features" :key="item" class="flex items-center gap-2">
                <Check class="size-4 shrink-0 text-brand-green-ink" :stroke-width="3" aria-hidden="true" />{{ item }}
              </li>
            </ul>
            <Button as="a" :href="contactMailto" size="lg" class="w-full">
              <Mail aria-hidden="true" /> Quero assinar
            </Button>
          </div>

          <div class="border-t bg-muted p-6 sm:border-t-0 sm:border-l sm:p-8">
            <p class="m-0 mb-4 font-display text-base font-bold text-primary">4 acessos incluídos</p>
            <ul class="m-0 list-none p-0">
              <li v-for="seat in seats" :key="seat.label" class="flex items-start gap-3 border-t py-3.5 first:border-t-0 first:pt-0">
                <component :is="seat.icon" class="mt-0.5 size-5 shrink-0 text-brand-green-ink" aria-hidden="true" />
                <span>
                  <span class="block font-semibold text-ink">{{ seat.label }}</span>
                  <small v-if="seat.note" class="block text-sm text-muted-foreground">{{ seat.note }}</small>
                </span>
              </li>
            </ul>
          </div>

        </div>
        <p class="mt-5 text-[15px] text-muted-foreground">
          A equipe é maior? <a :href="contactMailto" class="font-semibold text-primary underline decoration-brand-green decoration-2 underline-offset-4">Escreva pra gente</a> e a gente monta um orçamento.
        </p>
      </div>
    </div>
  </section>
</template>
