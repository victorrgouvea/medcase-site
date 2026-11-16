<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

const questions = [
  { q: 'Como coloco a minha clínica no GestoClin?', a: 'O cadastro não é aberto. Escreva para ' + contactEmail + ' contando sobre a sua clínica; a gente conversa, monta um orçamento e envia o link para você criar a conta.' },
  { q: 'Preciso instalar alguma coisa?', a: 'Não. O GestoClin abre no navegador do celular, do tablet ou do computador. Basta entrar com o seu e-mail e senha.' },
  { q: 'Como a minha equipe entra?', a: 'O gestor convida cada pessoa por e-mail, ou copia o link do convite e manda pelo WhatsApp. Quem ainda não tem conta cria a sua pelo próprio link.' },
  { q: 'A recepção consegue ler o prontuário?', a: 'Não. A recepção cuida da agenda e do cadastro. O conteúdo clínico só aparece para os profissionais da equipe de cuidado daquele paciente.' },
  { q: 'Errei algo num atendimento já finalizado. E agora?', a: 'O texto finalizado não é alterado. Você escreve um adendo, que fica registrado logo abaixo com o seu nome e o horário.' },
  { q: 'Atendo em mais de uma clínica. Preciso de duas contas?', a: 'Não. A mesma conta participa de várias clínicas, e você troca de uma para a outra dentro da plataforma. Os pacientes de cada clínica ficam separados.' },
  { q: 'O que acontece quando alguém sai da clínica?', a: 'O gestor suspende o acesso da pessoa. Tudo o que ela registrou continua no prontuário, com o nome dela.' },
]
</script>

<template>
  <section id="duvidas" class="scroll-mt-17 py-16 lg:py-24">
    <div class="mx-auto grid max-w-290 grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
      <SectionHeading title="Perguntas que sempre aparecem" description="O que a recepção, os profissionais e os gestores costumam querer saber antes de começar." />
      <div class="border-b-2 border-primary">
        <details v-for="item in questions" :key="item.q" class="group border-t-2 border-primary first:border-t-2 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-border">
          <summary class="flex cursor-pointer items-center justify-between gap-4 py-4.5 font-display text-[18px] font-bold text-primary">
            {{ item.q }}
            <Plus class="size-5 shrink-0 text-brand-green-ink transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p class="m-0 max-w-[62ch] pb-5 text-muted-foreground">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
