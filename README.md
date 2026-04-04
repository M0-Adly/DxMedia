# Dx Media — وكالة تسويق رقمي متميزة

A full-stack Arabic digital marketing agency website built with **Next.js 14**, **Supabase**, and **Tailwind CSS**.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Auth | Supabase Auth |
| Deployment | Vercel |
| Fonts | Cairo + Bebas Neue |

## ⚙️ Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd dx-media
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Database

1. Go to [Supabase Dashboard](https://supabase.com) → Your Project → **SQL Editor**
2. Run the contents of `supabase/schema.sql`
3. This creates all tables, RLS policies, and the storage bucket

### 4. Create Admin User

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click **"Add user"** → Enter your admin email + password
3. This account is used to log into `/admin`

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Access

| URL | Description |
|-----|-------------|
| `/admin` | Admin login page |
| `/admin/dashboard` | Protected dashboard |

Login with the email/password you created in Supabase Auth.

### Dashboard Tabs

- **المشاريع** — Add/edit/delete projects with image upload to Supabase Storage
- **الرسائل** — View contact form submissions, mark as read
- **الشهادات** — Manage client testimonials (add/toggle/delete)
- **الإعدادات** — Edit hero section stats (clients, projects, years)

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

## 📁 Project Structure

```
dx-media/
├── app/
│   ├── layout.tsx              # Root RTL layout
│   ├── page.tsx                # Home page (SSR)
│   ├── admin/
│   │   ├── page.tsx            # Login page
│   │   └── dashboard/page.tsx  # Admin dashboard
│   └── api/
│       ├── projects/route.ts
│       ├── projects/[id]/route.ts
│       └── auth/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── admin/
│       ├── ProjectCard.tsx
│       └── UploadModal.tsx
├── lib/
│   ├── supabase.ts
│   ├── supabase-server.ts
│   └── types.ts
├── supabase/
│   └── schema.sql
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
└── vercel.json
```

## ✅ Features

- [x] Full RTL Arabic layout (`dir="rtl"`, `lang="ar"`)
- [x] Cairo + Bebas Neue Google Fonts
- [x] Dark theme (`#0a0a0a` bg, `#e63329` accent)
- [x] Smart navbar (hide on scroll down, show on scroll up)
- [x] Mobile fullscreen overlay menu
- [x] Hero with animated counters from DB
- [x] 8 hardcoded service cards
- [x] Portfolio with filter tabs + Supabase data
- [x] Testimonials from Supabase (with placeholders)
- [x] Contact form → saves to `messages` table
- [x] Admin login with Supabase Auth
- [x] Protected dashboard route (middleware)
- [x] Projects CRUD + image upload to Supabase Storage
- [x] Messages inbox (read/delete)
- [x] Testimonials management
- [x] Hero stats editor
- [x] Mobile-first responsive design
- [x] Scroll animations (IntersectionObserver)
- [x] Vercel deployment config

---

> صُمِّم للتميز ✨ — Designed for Excellence
