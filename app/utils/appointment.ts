// Appointment types and statuses with the same names and colors used on the platform agenda.
export type AppointmentType = 'first' | 'follow' | 'postop' | 'procedure'
export type AppointmentStatus = 'scheduled' | 'confirmed' | 'arrived' | 'in_room' | 'done'

export const appointmentTypes: Record<AppointmentType, { label: string, class: string }> = {
  first: { label: 'Primeira consulta', class: 'border-type-first bg-type-first-soft text-type-first' },
  follow: { label: 'Retorno', class: 'border-type-follow bg-type-follow-soft text-type-follow' },
  postop: { label: 'Pós-operatório', class: 'border-type-postop bg-type-postop-soft text-type-postop' },
  procedure: { label: 'Procedimento', class: 'border-type-procedure bg-type-procedure-soft text-type-procedure' },
}

export const appointmentStatuses: Record<AppointmentStatus, { label: string, class: string }> = {
  scheduled: { label: 'Agendado', class: 'bg-muted text-muted-foreground' },
  confirmed: { label: 'Confirmado', class: 'bg-type-follow-soft text-type-follow' },
  arrived: { label: 'Chegou', class: 'bg-arrival-soft text-arrival' },
  in_room: { label: 'Em atendimento', class: 'bg-primary text-primary-foreground' },
  done: { label: 'Concluído', class: 'bg-muted text-muted-foreground' },
}
