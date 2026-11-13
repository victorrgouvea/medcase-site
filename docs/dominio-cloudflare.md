# Domínio gestoclin.com na Cloudflare

Plano: `gestoclin.com` (e `www`) servem a landing pelo GitHub Pages; `app.gestoclin.com` serve a plataforma no Cloudflare Workers.

## 1. Registros DNS

Cloudflare, gestoclin.com, **DNS, Records**. Em todos, "Proxy status" em **DNS only** (nuvem cinza).

Landing (GitHub Pages):

| Tipo | Nome | Conteúdo |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `victorrgouvea.github.io` |

Plataforma (quando for para a Vercel): adicionar o domínio no projeto da Vercel primeiro e usar o registro que ela mostrar, normalmente:

| Tipo | Nome | Conteúdo |
|---|---|---|
| CNAME | `app` | `cname.vercel-dns.com` |

Por que DNS only: GitHub e Vercel emitem o certificado HTTPS sozinhos e precisam receber o tráfego direto. Com a nuvem laranja (proxy da Cloudflare) a emissão e a renovação podem falhar, e você ganha pouco num site estático. Dá para ligar o proxy depois, com SSL em "Full (strict)", se um dia precisar de firewall ou cache da Cloudflare.

## 2. Verificar o domínio no GitHub (evita que alguém sequestre o domínio)

GitHub, foto do perfil, **Settings, Pages, Add a domain**, digite `gestoclin.com`. O GitHub mostra um registro TXT (`_github-pages-challenge-victorrgouvea`). Crie esse TXT na Cloudflare e clique em Verify. Depois disso, nenhum outro repositório do GitHub consegue usar o seu domínio.

## 3. Segurança básica na Cloudflare

Faça agora:

- **Duas etapas na conta da Cloudflare** (My Profile, Authentication). Quem entra na conta controla o domínio inteiro, inclusive o app e os e-mails.
- **DNSSEC**: DNS, Settings, Enable DNSSEC. Como o domínio foi comprado na Cloudflare, ela publica o registro DS sozinha. Impede que alguém falsifique as respostas de DNS do domínio.
- **Renovação automática**: Domain Registration, Manage domains, gestoclin.com, Auto-renew ligado. Perder o domínio por esquecimento é o risco mais comum.
- **Transfer lock**: na mesma tela, confirme que está "Locked" (vem ligado). Impede transferência do domínio sem você.
- **Bloquear e-mail falso em nome do domínio** (enquanto vocês não mandam e-mail com @gestoclin.com):

  | Tipo | Nome | Conteúdo |
  |---|---|---|
  | TXT | `@` | `v=spf1 -all` |
  | TXT | `_dmarc` | `v=DMARC1; p=reject;` |

  Sem isso, qualquer um consegue mandar e-mail "de" contato@gestoclin.com. Quando forem enviar e-mail de verdade (convites e recuperação de senha do app pelo Supabase, com Resend ou parecido), esses dois registros são trocados pelos que o serviço de envio indicar.

Opcional, útil:

- **Email Routing** (Email, Email Routing): recebe `contato@gestoclin.com` e encaminha para um Gmail, de graça. Ele cria registros MX e SPF próprios; aí o SPF acima passa a ser o que a Cloudflare sugerir.
- **Notifications**: ative os avisos de expiração do domínio e de mudança de DNS.

Não precisa mexer agora: WAF, Bot Fight Mode, cache, Page Rules. Eles só valem para registros com a nuvem laranja.

## 4. Depois que o DNS estiver no ar

1. GitHub, repositório medcase-site, **Settings, Pages, Custom domain**: `gestoclin.com`, Save. (Ou pelo `gh`, ver abaixo.)
2. Esperar o check de DNS ficar verde e o certificado sair (de minutos a algumas horas).
3. Marcar **Enforce HTTPS**.

```bash
gh api -X PUT repos/victorrgouvea/medcase-site/pages -f cname=gestoclin.com
gh api -X PUT repos/victorrgouvea/medcase-site/pages -F https_enforced=true
```

4. Rodar o deploy de novo (Actions, Deploy to GitHub Pages, Run workflow, ou `gh workflow run pages.yml`). O workflow lê a configuração do Pages e, com domínio próprio, gera o site na raiz (`/`) em vez de `/medcase-site/`.
