<script setup lang="ts">
const loginUrl = usePlatformUrl('/entrar')
</script>

<template>
  <footer class="border-t pt-7 pb-10 text-[15px] text-muted-foreground">
    <div class="mx-auto flex max-w-290 flex-wrap justify-between gap-4 px-4 sm:px-6">
      <span>MedCase, prontuário e agenda para clínicas.</span>
      <a :href="loginUrl" class="underline underline-offset-4 hover:text-foreground">Acessar a plataforma</a>
    </div>
  </footer>
</template>
