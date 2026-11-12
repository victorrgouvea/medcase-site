<script setup lang="ts">
import { Check, Minus } from 'lucide-vue-next'

const columns = ['Agenda', 'Cadastro do paciente', 'Prontuário', 'Equipe e clínica']

// Mirrors the platform's role rules (RLS): admin, professional, reception.
const roles = [
  { name: 'Médico', note: 'Só os próprios pacientes', access: [true, true, true, false] },
  { name: 'Recepção', note: '', access: [true, true, false, false] },
  { name: 'Gestor', note: 'Lê prontuário se também for médico', access: [true, true, false, true] },
]
</script>

<template>
  <section id="acessos" class="border-y bg-card py-16 lg:py-22">
    <div class="mx-auto grid max-w-290 grid-cols-1 items-start gap-8 px-4 sm:px-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-16">
      <SectionHeading title="Cada pessoa vê o que o trabalho dela pede">
        A recepção cuida da agenda e do cadastro, mas não abre o conteúdo clínico. O médico lê o prontuário dos pacientes que acompanha. As regras valem no banco de dados, não só na tela.
      </SectionHeading>

      <div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-140 border-collapse text-base">
            <caption class="pb-3 text-left text-sm text-muted-foreground">Permissões por papel na clínica</caption>
            <thead>
              <tr>
                <th scope="col" class="border-b p-3.5"><span class="sr-only">Papel</span></th>
                <th v-for="col in columns" :key="col" scope="col" class="border-b p-3.5 align-bottom text-sm font-semibold text-muted-foreground">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles" :key="role.name">
                <th scope="row" class="border-b py-3.5 pr-3 text-left font-semibold">
                  {{ role.name }}
                  <small v-if="role.note" class="block text-sm font-normal text-muted-foreground">{{ role.note }}</small>
                </th>
                <td v-for="(allowed, i) in role.access" :key="i" class="border-b p-3.5 text-center">
                  <span
                    :class="['inline-grid size-7 place-items-center rounded-full', allowed ? 'bg-type-first-soft text-primary' : 'bg-muted text-subtle-foreground']"
                  >
                    <component :is="allowed ? Check : Minus" class="size-3.5" :stroke-width="3" aria-hidden="true" />
                    <span class="sr-only">{{ allowed ? 'Sim' : 'Não' }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-5 text-[15px] text-muted-foreground">
          O dono da clínica costuma ser gestor e médico ao mesmo tempo. Dá para ter os dois papéis na mesma conta.
        </p>
      </div>
    </div>
  </section>
</template>
