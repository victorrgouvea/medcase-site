<script setup lang="ts">
import type { AppointmentStatus, AppointmentType } from '~/utils/appointment'

interface Slot {
  time: string
  patient?: string
  type?: AppointmentType
}

// Demo data only: names are made up.
const slots: Slot[] = [
  { time: '08:00', patient: 'Marina Albuquerque', type: 'follow' },
  { time: '08:30', patient: 'João Pedro Saraiva', type: 'first' },
  { time: '09:00', patient: 'Lúcia Fernandes', type: 'postop' },
  { time: '09:30', patient: 'Antônio Ribeiro', type: 'procedure' },
  { time: '10:00' },
  { time: '10:30', patient: 'Beatriz Nogueira', type: 'follow' },
]

// The morning plays as a short loop: each frame is the clock plus the status of each booked slot,
// in the order above. `arrivedAt` feeds the "esperando N min" line, as on the platform's Hoje screen.
const frames: { now: string, statuses: AppointmentStatus[], arrivedAt?: Record<number, string> }[] = [
  { now: '08:52', statuses: ['done', 'in_room', 'arrived', 'confirmed', 'scheduled'], arrivedAt: { 2: '08:48' } },
  { now: '09:04', statuses: ['done', 'done', 'in_room', 'confirmed', 'confirmed'] },
  { now: '09:24', statuses: ['done', 'done', 'in_room', 'arrived', 'confirmed'], arrivedAt: { 3: '09:21' } },
  { now: '09:38', statuses: ['done', 'done', 'done', 'in_room', 'confirmed'] },
]

const ROW = 64 // px, one 30-minute slot
const frameIndex = ref(1)
const minutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3))

const frame = computed(() => frames[frameIndex.value]!)
const rows = computed(() => {
  let booked = -1
  return slots.map((slot) => {
    if (!slot.patient) return { ...slot, status: undefined, waiting: undefined }
    booked += 1
    const arrived = frame.value.arrivedAt?.[booked]
    return { ...slot, status: frame.value.statuses[booked], waiting: arrived ? minutes(frame.value.now) - minutes(arrived) : undefined }
  })
})
const nowTop = computed(() => `${((minutes(frame.value.now) - minutes(slots[0]!.time)) / 30) * ROW}px`)
const summary = computed(() => {
  const s = frame.value.statuses
  const ahead = s.filter(x => x !== 'done').length
  const waiting = s.filter(x => x === 'arrived').length
  return `${s.length} consultas, ${ahead} pela frente${waiting ? `, ${waiting} na recepção` : ''}`
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  frameIndex.value = 0
  const timer = window.setInterval(() => { frameIndex.value = (frameIndex.value + 1) % frames.length }, 3200)
  onBeforeUnmount(() => window.clearInterval(timer))
})
</script>

<template>
  <figure
    class="m-0 rounded-[20px] bg-card p-4 pb-3 shadow-[0_40px_80px_-32px_rgba(0,12,28,.75)] ring-1 ring-white/10 sm:p-5.5 sm:pb-4.5"
    aria-label="Exemplo da agenda do dia de uma profissional de saúde, com o status de cada paciente mudando ao longo da manhã"
  >
    <figcaption class="mb-3.5 flex items-baseline justify-between gap-3">
      <span>
        <strong class="block text-lg text-primary">Agenda de hoje</strong>
        <span class="tabular text-sm text-muted-foreground">{{ summary }}</span>
      </span>
      <span class="hidden text-right text-sm text-muted-foreground sm:block">Dra. Helena, Clínica Ipê</span>
    </figcaption>

    <ol class="relative m-0 list-none p-0" aria-hidden="true">
      <li
        v-for="slot in rows"
        :key="slot.time"
        class="grid h-16 grid-cols-[44px_minmax(0,1fr)] gap-2 border-t sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-3"
      >
        <time class="tabular pt-2.5 text-[13px] font-medium text-muted-foreground">{{ slot.time }}</time>

        <div
          v-if="slot.patient && slot.type && slot.status"
          :class="['my-1.5 flex min-w-0 items-center justify-between gap-2.5 rounded-[10px] border-l-4 px-3 transition-opacity duration-500', appointmentTypes[slot.type].class, slot.status === 'done' ? 'opacity-60' : '']"
        >
          <div class="min-w-0">
            <b class="block truncate text-[15px] leading-tight font-semibold text-ink">{{ slot.patient }}</b>
            <small class="block truncate text-[13px]">
              {{ appointmentTypes[slot.type].label }}<template v-if="slot.waiting !== undefined">, esperando {{ slot.waiting }} min</template>
            </small>
          </div>
          <Transition name="swap" mode="out-in">
            <Badge :key="slot.status" :class="['shrink-0 rounded-full border-transparent px-2 text-[11px] shadow-none sm:px-2.5 sm:text-xs', appointmentStatuses[slot.status].class]">
              {{ appointmentStatuses[slot.status].label }}
            </Badge>
          </Transition>
        </div>
        <div v-else class="my-1.5 flex items-center rounded-[10px] border-[1.5px] border-dashed px-3 text-[13px] text-subtle-foreground">
          Horário livre
        </div>
      </li>

      <li
        class="absolute right-0 left-11 z-10 h-0.5 bg-now transition-[top] duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] sm:left-13"
        :style="{ top: nowTop }"
      >
        <span class="absolute -top-1 -left-1.25 size-2.5 rounded-full bg-now" />
        <span class="tabular absolute -top-2.5 -left-11 bg-card px-0.5 text-xs font-bold text-now sm:-left-12.5">{{ frame.now }}</span>
      </li>
    </ol>
  </figure>
</template>
