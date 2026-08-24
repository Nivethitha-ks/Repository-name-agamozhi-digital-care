# Agamozhi Digital Care — Public Website & B2B Lead Management Portal

[![Production Build](https://img.shields.io/badge/Build-Passing-brightgreen)]()
[![React](https://img.shields.io/badge/React-19-blue)]()
[![Vite](https://img.shields.io/badge/Vite-8-purple)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8)]()
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%2B%20Auth-3ecf8e)]()

Production-quality React web platform and protected B2B Lead Management Portal for **Agamozhi Digital Care**.

- **Tagline**: Get Found. Get Leads. Grow.
- **Location**: Thiruvallur Nagar, Near Raja's College, Pudukkottai, Tamil Nadu
- **Phone / WhatsApp**: `9965352749`
- **Design Theme**: Modern Blue (`#0F2747`, `#2563EB`, `#3B82F6`, `#DBEAFE`, `#F0F7FF`)

---

## ⚡ Tech Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, React Router v7
- **Backend & Database**: Supabase JS SDK, PostgreSQL, Supabase Auth, Row Level Security (RLS)
- **Analytics & SEO**: GA4 Integration Utility, LocalBusiness JSON-LD, Sitemap.xml, Robots.txt
- **Hosting & Headers**: Vercel SPA Routing & Production Security Headers (`vercel.json`)

---

## 🚀 Local Development Setup

### 1. Installation

```powershell
cd "C:\Users\DELI BABU C\.gemini\antigravity\scratch\agamozhi-digital-care"
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env`:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-publishable-key
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Database Migration

Run the SQL migration script located at `supabase/schema.sql` in your Supabase SQL Editor to create tables (`leads`, `lead_responses`, `analytics_events`, `profiles`) with hardened RLS policies.

### 4. Run Development Server

```powershell
npm run dev
```

### 5. Build for Production

```powershell
npm run build
```

---

## 🔐 Admin Portal Access

- **Login Route**: `/admin/login`
- **Dashboard Routes**:
  - `/admin/dashboard` — Live enquiries & performance metrics
  - `/admin/leads` — Search, filter, and review enquiries
  - `/admin/leads/:id` — Status changer, Click-to-Call, WhatsApp chat, communication timeline
  - `/admin/analytics` — Real-time website visitor activity stream
  - `/admin/settings` — Admin security & contact variables
- **Authentication**:
  - Admin authentication flow verified successfully via Supabase Auth and session management.

---

## 📦 Deployment

Refer to [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full step-by-step instructions on deploying to Vercel, connecting custom domains, and DNS setup.

