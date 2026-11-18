<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')

const links = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#acessos', label: 'Acessos' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#preco', label: 'Preço' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]
</script>

<template>
  <footer class="border-t pt-10 pb-12 text-[15px] text-muted-foreground">
    <div class="mx-auto flex max-w-290 flex-wrap items-center justify-between gap-x-10 gap-y-6 px-4 sm:px-6">
      <div class="grid gap-4">
        <BrandLogo />
        <a :href="contactMailto" class="hover:text-primary">{{ contactEmail }}</a>
      </div>
      <nav aria-label="Rodapé" class="flex flex-wrap gap-x-6 gap-y-2">
        <a v-for="link in links" :key="link.href" :href="link.href" class="hover:text-primary">{{ link.label }}</a>
        <a :href="loginUrl" class="font-semibold text-primary underline underline-offset-4">Acessar a plataforma</a>
      </nav>
    </div>
  </footer>
</template>
