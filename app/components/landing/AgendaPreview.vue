<script setup lang="ts">
import type { AppointmentStatus, AppointmentType } from '~/utils/appointment'

interface Slot {
  time: string
  patient?: string
  type?: AppointmentType
  status?: AppointmentStatus
  now?: string
}

// Demo data only: names are made up.
const slots: Slot[] = [
  { time: '08:00', patient: 'Marina Albuquerque', type: 'follow', status: 'done' },
  { time: '08:30', patient: 'João Pedro Saraiva', type: 'first', status: 'done' },
  { time: '09:00', patient: 'Lúcia Fernandes', type: 'postop', status: 'in_room', now: '09:18' },
  { time: '09:30', patient: 'Antônio Ribeiro', type: 'procedure', status: 'arrived' },
  { time: '10:00' },
  { time: '10:30', patient: 'Beatriz Nogueira', type: 'follow', status: 'confirmed' },
]
</script>

<template>
  <figure
    class="m-0 rounded-[20px] border bg-card p-4 pb-3 shadow-[0_1px_0_rgba(22,33,31,.04),0_24px_48px_-28px_rgba(18,59,55,.35)] sm:p-5.5 sm:pb-4.5"
    aria-label="Exemplo da agenda do dia de uma médica"
  >
    <figcaption class="mb-3.5 flex items-baseline justify-between gap-3">
      <strong class="text-lg">Agenda de hoje</strong>
      <span class="text-sm text-muted-foreground">Dra. Helena, Clínica Ipê</span>
    </figcaption>

    <ol class="m-0 list-none p-0">
      <li
        v-for="slot in slots"
        :key="slot.time"
        class="relative grid min-h-15.5 grid-cols-[44px_minmax(0,1fr)] gap-2 border-t sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-3"
      >
        <time class="tabular pt-2.5 text-[13px] font-medium text-muted-foreground">{{ slot.time }}</time>

        <div
          v-if="slot.patient && slot.type && slot.status"
          :class="['my-1.5 flex items-center justify-between gap-2.5 rounded-[10px] border-l-4 px-3 py-2', appointmentTypes[slot.type].class]"
        >
          <div>
            <b class="block text-[15px] leading-tight font-semibold text-ink">{{ slot.patient }}</b>
            <small class="text-[13px]">{{ appointmentTypes[slot.type].label }}</small>
          </div>
          <Badge :class="['hidden rounded-full border-transparent shadow-none sm:inline-flex', appointmentStatuses[slot.status].class]">
            {{ appointmentStatuses[slot.status].label }}
          </Badge>
        </div>
        <div v-else class="my-1.5 flex items-center rounded-[10px] border-[1.5px] border-dashed px-3 text-[13px] text-subtle-foreground">
          Horário livre
        </div>

        <div
          v-if="slot.now"
          class="absolute top-[60%] right-0 left-11 z-10 h-0.5 bg-now motion-safe:animate-now-sweep sm:left-13"
          aria-hidden="true"
        >
          <span class="absolute -top-1 -left-1.25 size-2.5 rounded-full bg-now" />
          <span class="tabular absolute -top-2.5 -left-11 bg-card px-0.5 text-xs font-bold text-now sm:-left-12.5">{{ slot.now }}</span>
        </div>
      </li>
    </ol>
  </figure>
</template>
