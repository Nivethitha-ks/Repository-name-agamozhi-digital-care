# AGAMOZHI DIGITAL CARE — PRODUCTION DEPLOYMENT & HANDOVER GUIDE

This document provides complete instructions for deploying, configuring, maintaining, and handing over the **Agamozhi Digital Care** web platform and B2B Admin Portal.

---

## 1. System Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + Vite | Fast, responsive Single Page Application (SPA) |
| **Styling** | Tailwind CSS v4 | Approved Modern Blue design system (`#0F2747`, `#2563EB`, `#3B82F6`) |
| **Icons & UI** | Lucide React | Lightweight, accessible vector icons |
| **Routing** | React Router v7 | Public pages + Protected Admin Portal |
| **Database & Auth** | Supabase (PostgreSQL + Auth) | Real-time lead capture, activity timeline, admin session management |
| **Security** | PostgreSQL Row Level Security (RLS) | Restricts lead SELECT/UPDATE/DELETE strictly to authenticated admins |
| **Analytics** | GA4 + Admin Event Logger | Dual tracking of visitors, calls, WhatsApp chats, and form submissions |
| **Hosting & CI/CD** | Vercel / Netlify / Cloudflare Pages | Edge-deployed static frontend with SPA rewrites and security headers |

---

## 2. Environment Variables Configuration

Set these variables in your hosting provider's dashboard (e.g. Vercel Project Settings → Environment Variables):

| Variable | Description | Production Example | Required? |
|---|---|---|---|
| `VITE_SUPABASE_URL` | Supabase Project REST Endpoint URL | `https://your-project.supabase.co` | **Yes** |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anonymous Publishable Key | `sb_publishable_...` | **Yes** |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` | Optional |

> ⚠️ **Security Rule**: Never expose your Supabase `service_role` key in frontend environment variables. Only use the public anonymous key (`anon_key`).

---

## 3. Database Setup (Supabase PostgreSQL)

1. Create a project at [supabase.com](https://supabase.com/).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository, copy its entire contents, paste into the SQL editor, and click **Run**.
4. This will create:
   - `leads` table with custom `lead_status` enum (`New`, `Contacted`, `Interested`, `Quotation`, `Negotiation`, `Won`, `Lost`).
   - `lead_responses` table for client communication history and call notes.
   - `analytics_events` table for recording website conversions.
   - `profiles` table for admin users.
   - Hardened Row Level Security (RLS) policies ensuring unauthenticated visitors can only `INSERT` leads and cannot read or tamper with other leads.

---

## 4. Admin Portal & Authentication

- **Admin Login Route**: `/admin/login`
- **Admin Authentication**:
  - Admin authentication flow verified successfully via Supabase Auth.
  - Role-based authorization ensures only verified administrators can access the admin dashboard.
- **Admin Features**:
  - **Dashboard** (`/admin/dashboard`): Real-time metrics (Total Leads, New Leads, Today's Leads, Pending Follow-ups).
  - **Lead Management** (`/admin/leads`): Search by name, business, phone; filter by status; sort by date.
  - **Lead Details** (`/admin/leads/:id`): Status updater, Click-to-Call, WhatsApp Click-to-Chat, activity note logging.
  - **Website Analytics** (`/admin/analytics`): Real-time event streams, conversion counters, test simulation.
  - **Settings** (`/admin/settings`): Admin password updates, notification email routing, integration statuses.

---

## 5. Step-by-Step Vercel Deployment

1. Push your repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: production ready agamozhi digital care"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Verify build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Expand **Environment Variables** and add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
6. Click **Deploy**.

---

## 6. Custom Domain & DNS Setup (`www.agamozhi.com`)

1. In Vercel Project Settings, navigate to **Domains**.
2. Enter your custom domain: `www.agamozhi.com` (and `agamozhi.com`).
3. Configure your domain DNS records at your registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
4. Vercel will automatically provision and renew a free **SSL/TLS HTTPS Certificate**.

---

## 7. Client Handover Checklist

### ✅ Deliverables Verified
- [x] **Public Website**: All 8 pages (`/`, `/services`, `/packages`, `/projects`, `/why-us`, `/how-it-works`, `/industries`, `/contact`) + 404 Error page.
- [x] **Brand & Contact Consistency**: Verified official phone, WhatsApp pre-filled link, Google Maps embed, and enquiry notification routing.
- [x] **Real Client Showcase**: Sri Bhavani Automation (`https://www.sbautomation.in/`).
- [x] **Enquiry Capture Flow**: Form validation, duplicate click prevention, database persistence, immediate feedback.
- [x] **Protected Admin Portal**: Session authentication, lead management, response timeline, status updates.
- [x] **Analytics Pipeline**: Non-PII conversion tracking for page views, calls, WhatsApp, and form submissions.
- [x] **SEO & Structured Data**: Sitemap.xml, robots.txt, OpenGraph tags, JSON-LD `LocalBusiness` schema.
- [x] **Production Hardening**: Strict RLS policies, zero exposed secrets, SPA routing configuration, security headers.

### 🔑 External Client Dependencies (If Adding Future Services)
1. **Google Analytics 4**: Client provides GA4 Measurement ID (`G-XXXXXXXXXX`) if they wish to view stats in the Google Analytics dashboard.
2. **Meta WhatsApp Business API**: Client provides Meta Developer API keys if they wish to transition from Click-to-Chat to fully automated AI WhatsApp bots in future phases.
3. **Resend / SendGrid API**: Client provides email provider API key if they wish to deploy the optional serverless edge function for external SMTP relay.
