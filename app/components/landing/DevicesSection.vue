<script setup lang="ts">
// Miniature agenda drawn inside a laptop and a phone: same patients, two layouts.
const tones = {
  postop: 'border-type-postop bg-type-postop-soft',
  procedure: 'border-type-procedure bg-type-procedure-soft',
  follow: 'border-type-follow bg-type-follow-soft',
  first: 'border-type-first bg-type-first-soft',
}
type Tone = keyof typeof tones
const hours = ['09:00', '09:30', '10:00', '10:30', '11:00']
const columns: { name: string, rows: ([string, Tone] | null)[] }[] = [
  { name: 'Dra. Helena', rows: [['Lúcia F.', 'postop'], ['Antônio R.', 'procedure'], null, ['Beatriz N.', 'follow'], ['Rui S.', 'first']] },
  { name: 'Dr. Rafael', rows: [['Caio M.', 'first'], null, ['Sônia T.', 'follow'], ['Davi L.', 'postop'], null] },
  { name: 'Dra. Paula', rows: [null, ['Íris B.', 'follow'], ['Otávio P.', 'procedure'], null, ['Nina C.', 'first']] },
]
const mine = columns[0]!.rows
</script>

<template>
  <section class="border-b bg-card py-16 lg:py-24">
    <div class="mx-auto grid max-w-290 grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div class="relative mx-auto w-full max-w-115 pr-[12%] pb-[7%]" aria-hidden="true">
        <!-- Laptop: the whole clinic, one column per professional -->
        <div class="flex aspect-[16/10.5] flex-col rounded-t-[14px] border-[7px] border-b-[9px] border-primary-deep bg-background p-2.5 sm:rounded-t-[18px] sm:border-[9px] sm:border-b-[11px] sm:p-3.5">
          <div class="mb-2 flex items-center justify-between">
            <span class="font-display text-[10px] font-bold text-primary sm:text-[13px]">Agenda, segunda 16/11</span>
            <span class="flex overflow-hidden rounded text-[8px] font-semibold sm:text-[10px]">
              <i class="bg-primary px-1.5 py-0.5 text-white not-italic">Dia</i><i class="bg-secondary px-1.5 py-0.5 text-muted-foreground not-italic">Semana</i>
            </span>
          </div>
          <div class="grid min-h-0 flex-1 grid-cols-[auto_repeat(3,minmax(0,1fr))] grid-rows-[auto_repeat(5,minmax(0,1fr))] gap-x-1.5 gap-y-1 text-[8px] sm:gap-x-2 sm:text-[10.5px]">
            <span />
            <span v-for="col in columns" :key="col.name" class="truncate pb-0.5 font-semibold text-muted-foreground">{{ col.name }}</span>
            <template v-for="(hour, r) in hours" :key="hour">
              <span class="tabular pt-0.5 pr-0.5 text-subtle-foreground">{{ hour }}</span>
              <span
                v-for="col in columns"
                :key="col.name"
                :class="['flex min-w-0 items-center rounded border-l-[3px] px-1.5 text-ink', col.rows[r] ? tones[col.rows[r]![1]] : 'border-transparent bg-card']"
              ><span class="truncate">{{ col.rows[r]?.[0] }}</span></span>
            </template>
          </div>
        </div>
        <div class="relative -mx-[5%] h-2.5 rounded-b-[10px] bg-primary-deep sm:h-3.5">
          <span class="absolute top-0 left-1/2 h-1 w-[14%] -translate-x-1/2 rounded-b bg-[#1d4a6e] sm:h-1.5" />
        </div>

        <!-- Phone: one professional, the day as a list -->
        <div class="absolute right-0 bottom-0 flex aspect-[9/18.5] w-[27%] flex-col rounded-[16px] border-[5px] border-primary-deep bg-background px-1.5 pt-3 pb-1.5 shadow-[0_18px_36px_-18px_rgba(0,43,80,.6)] sm:rounded-[22px] sm:border-[6px] sm:px-2 sm:pt-4 sm:pb-2">
          <span class="absolute top-1 left-1/2 h-1 w-[30%] -translate-x-1/2 rounded-full bg-primary-deep sm:top-1.5 sm:h-1.5" />
          <p class="m-0 mb-1 font-display text-[9px] font-bold text-primary sm:text-xs">Hoje</p>
          <div class="grid min-h-0 flex-1 grid-rows-5 gap-1 text-[8px] leading-tight sm:text-[10.5px]">
            <template v-for="(slot, r) in mine" :key="r">
              <div v-if="slot" :class="['flex min-w-0 flex-col justify-center rounded border-l-[3px] px-1.5 text-ink', tones[slot[1]]]">
                <span class="tabular text-muted-foreground">{{ hours[r] }}</span><span class="truncate">{{ slot[0] }}</span>
              </div>
              <div v-else class="flex items-center rounded border border-dashed px-1.5 text-subtle-foreground">{{ hours[r] }}</div>
            </template>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading title="Abre no aparelho que estiver à mão">
          O GestoClin é um site. A recepção usa no computador do balcão, o profissional confere a agenda no celular entre um paciente e outro.
        </SectionHeading>
        <ul class="mt-6 list-none p-0 text-muted-foreground">
          <li class="border-t py-3">Nada para instalar ou atualizar</li>
          <li class="border-y py-3">Uma conta só, em qualquer aparelho</li>
        </ul>
      </div>
    </div>
  </section>
</template>
