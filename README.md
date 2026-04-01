# parttimept (MVP) — Vagas part-time em Lisboa & Margem Sul

Site pronto (Next.js + Tailwind + Supabase) com:
- **Somente part-time**
- Filtro por zona: **Lisboa**, **Margem Sul**, **Montijo**, **Alcochete**, **Samouco**
- Ordenação padrão: **Remoto → Híbrido → Presencial → mais recentes**
- Página da vaga + botão **Candidatar**
- **Favoritos** (localStorage)
- Importador por **RSS (feeds públicos permitidos)**

> Nota: para evitar problemas legais/ToS, este projeto NÃO faz scraping de sites que proíbem isso. Use RSS/APIs/parcerias.

---

## 1) Criar o banco no Supabase

1. Crie um projeto no Supabase
2. No SQL Editor, execute: `supabase/schema.sql`

---

## 2) Configurar variáveis de ambiente

Crie um `.env.local` (local) e/ou configure no Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Lista de RSS (separados por vírgula) — você escolhe quais são permitidos/publicados
FEEDS=https://exemplo.com/rss,https://outro.com/feed
# Opcional (pra SEO/metadata)
NEXT_PUBLIC_SITE_URL=https://seu-site.vercel.app
```

---

## 3) Rodar localmente

```
npm install
npm run dev
```

---

## 4) Importar vagas (RSS)

Rodar manualmente:

```
npm run import:jobs
```

---

## 5) Deploy (Vercel)

1. Suba este projeto no GitHub
2. No Vercel: **New Project → Import Git**
3. Configure as env vars acima
4. Deploy

---

## (Opcional) Import automático via GitHub Actions

Crie secrets no GitHub:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FEEDS`

Depois ative o workflow em `.github/workflows/import.yml`.

---

## Personalizações rápidas
- Logo: `public/logo.svg` e `public/favicon.svg`
- Título/descrição/OG: `app/layout.jsx`
- Zonas/labels: `components/Filters.jsx` e `scripts/import_jobs.mjs`
