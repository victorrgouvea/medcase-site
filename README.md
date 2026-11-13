# GestoClin, site

Landing page do GestoClin (gestoclin.com). Mesma stack da plataforma (Nuxt 4, Vue 3, TypeScript, Tailwind 4, shadcn-nuxt), gerada como site estático e publicada no GitHub Pages. Os botões "Entrar" levam para a plataforma (`runtimeConfig.public.platformUrl` em `nuxt.config.ts`).

## Rodar localmente

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm generate   # HTML estático em .output/public
```

Push na `main` publica sozinho (`.github/workflows/pages.yml`). No repositório, Settings, Pages, Source precisa estar em "GitHub Actions".

## Estrutura

```
app/app.vue                    monta a página com as seções
app/components/landing/        uma seção por arquivo (Hero, FeatureAreas, RolesMatrix...)
app/components/ui/             componentes shadcn copiados da plataforma (Button, Badge)
app/utils/appointment.ts       tipos e status de consulta, com as mesmas cores da agenda da plataforma
app/assets/css/main.css        tokens de cor e fonte, iguais aos da plataforma
```

Para trazer outro componente shadcn da plataforma, copie a pasta de `Medcase/app/components/ui/<nome>` para cá. Se mudar um token de cor num lado, mude no outro.
