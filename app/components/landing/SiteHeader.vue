<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')

const links = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#acessos', label: 'Acessos' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#contato', label: 'Contato' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-primary-deep/95 backdrop-blur">
    <div class="mx-auto flex h-17 max-w-290 items-center justify-between gap-4 px-4 sm:px-6">
      <a href="#" class="no-underline" aria-label="GestoClin, início">
        <BrandLogo compact inverted />
      </a>
      <nav aria-label="Principal" class="flex items-center gap-7">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="hidden text-base font-medium text-[#c9d8e6] transition-colors hover:text-white lg:inline"
        >{{ link.label }}</a>
        <Button as="a" :href="loginUrl" class="h-10 bg-brand-green px-5 text-primary-deep hover:bg-[#00c4a1]">Entrar</Button>
      </nav>
    </div>
  </header>
</template>
