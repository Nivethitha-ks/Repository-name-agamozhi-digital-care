-- AGAMOZHI DIGITAL CARE — DATABASE SCHEMA & RLS POLICIES

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUM FOR LEAD STATUS
DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM (
        'New',
        'Contacted',
        'Interested',
        'Quotation',
        'Negotiation',
        'Won',
        'Lost'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    business_name TEXT,
    phone TEXT NOT NULL,
    business_type TEXT NOT NULL,
    requirement TEXT NOT NULL,
    current_website TEXT,
    preferred_package TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    status lead_status DEFAULT 'New'::lead_status,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schema Migration (Idempotent column additions for existing deployments)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS current_website TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS preferred_package TEXT;


-- 3. LEAD RESPONSES / TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.lead_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'web_note', -- 'call', 'whatsapp', 'email', 'web_note', 'status_change'
    sent_by TEXT NOT NULL DEFAULT 'Admin',
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    delivery_status TEXT DEFAULT 'sent'
);

-- 4. ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    page TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ADMIN PROFILES TABLE (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PDF DOCUMENTS & RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    pdf_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TRIGGER TO UPDATE updated_at TIMESTAMP ON LEADS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_documents_updated_at ON public.documents;
CREATE TRIGGER set_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_responses_lead_id ON public.lead_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_display_order ON public.documents(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_documents_is_active ON public.documents(is_active);

-- 8. AUTHORIZATION HELPER FUNCTION
-- Checks if the authenticated requesting user is an authorized administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    COALESCE(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin'
    OR COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- DOCUMENTS POLICIES:
-- 1. Public & anonymous visitors can view active documents
DROP POLICY IF EXISTS "Public users can view active documents" ON public.documents;
CREATE POLICY "Public users can view active documents"
    ON public.documents
    FOR SELECT
    TO anon, authenticated, public
    USING (is_active = true OR public.is_admin());

-- 2. ONLY authorized admins can INSERT documents
DROP POLICY IF EXISTS "Admins can insert documents" ON public.documents;
CREATE POLICY "Admins can insert documents"
    ON public.documents
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- 3. ONLY authorized admins can UPDATE documents
DROP POLICY IF EXISTS "Admins can update documents" ON public.documents;
CREATE POLICY "Admins can update documents"
    ON public.documents
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. ONLY authorized admins can DELETE documents
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;
CREATE POLICY "Admins can delete documents"
    ON public.documents
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- LEADS POLICIES:
-- 1. Public & anonymous visitors can INSERT leads (website enquiry submission)
DROP POLICY IF EXISTS "Public users can insert leads" ON public.leads;
CREATE POLICY "Public users can insert leads"
    ON public.leads
    FOR INSERT
    TO anon, authenticated, public
    WITH CHECK (true);

-- 2. ONLY authorized admins can SELECT leads (protects visitor PII)
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
CREATE POLICY "Admins can view all leads"
    ON public.leads
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 3. ONLY authorized admins can UPDATE leads (status changes)
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads"
    ON public.leads
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. ONLY authorized admins can DELETE leads
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
CREATE POLICY "Admins can delete leads"
    ON public.leads
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- LEAD_RESPONSES POLICIES:
-- 1. ONLY authorized admins can SELECT lead responses
DROP POLICY IF EXISTS "Admins can view lead responses" ON public.lead_responses;
CREATE POLICY "Admins can view lead responses"
    ON public.lead_responses
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 2. ONLY authorized admins can INSERT lead responses / notes
DROP POLICY IF EXISTS "Admins can insert lead responses" ON public.lead_responses;
CREATE POLICY "Admins can insert lead responses"
    ON public.lead_responses
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- ANALYTICS_EVENTS POLICIES:
-- 1. Public & anonymous visitors can insert non-PII analytics events
DROP POLICY IF EXISTS "Public users can insert analytics" ON public.analytics_events;
CREATE POLICY "Public users can insert analytics"
    ON public.analytics_events
    FOR INSERT
    TO anon, authenticated, public
    WITH CHECK (true);

-- 2. ONLY authorized admins can view analytics streams
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics_events;
CREATE POLICY "Admins can view analytics"
    ON public.analytics_events
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- PROFILES POLICIES:
-- 1. Authorized users and admins can view profiles
DROP POLICY IF EXISTS "Admins can view profiles" ON public.profiles;
CREATE POLICY "Admins can view profiles"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id OR public.is_admin());

-- 2. Authenticated users can update their own profile
DROP POLICY IF EXISTS "Admins can update own profile" ON public.profiles;
CREATE POLICY "Admins can update own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- ============================================================================
-- 10. RATE LIMITING ARCHITECTURE (PRIVATE SCHEMA - NOT EXPOSED TO DATA API)
-- ============================================================================

-- Create private schema isolated from PostgREST Data API
CREATE SCHEMA IF NOT EXISTS app_private;
REVOKE ALL ON SCHEMA app_private FROM anon, authenticated, public;

-- Table to track anonymized hourly submission counts
CREATE TABLE IF NOT EXISTS app_private.submission_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_hash TEXT NOT NULL,
    bucket_hour TIMESTAMPTZ NOT NULL,
    submission_count INT NOT NULL DEFAULT 1,
    last_submission_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_ip_bucket UNIQUE (ip_hash, bucket_hour)
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_bucket 
    ON app_private.submission_rate_limits(ip_hash, bucket_hour);

-- Function to check and enforce rate limit on lead insertions
CREATE OR REPLACE FUNCTION public.check_lead_submission_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
    client_ip TEXT;
    hashed_ip TEXT;
    current_bucket TIMESTAMPTZ;
    current_count INT;
    max_submissions CONSTANT INT := 5; -- Allow approx 5 submissions per IP per hour
BEGIN
    -- Bypass rate limiting if the caller is an authorized administrator
    IF public.is_admin() THEN
        RETURN NEW;
    END IF;

    -- Extract client IP securely from PostgREST request headers (Cloudflare, Proxy, or direct)
    BEGIN
        client_ip := COALESCE(
            current_setting('request.headers', true)::json ->> 'cf-connecting-ip',
            current_setting('request.headers', true)::json ->> 'x-forwarded-for',
            current_setting('request.headers', true)::json ->> 'x-real-ip',
            'client_fallback_ip'
        );
        -- Take first IP if multiple are forwarded
        IF client_ip LIKE '%,%' THEN
            client_ip := split_part(client_ip, ',', 1);
        END IF;
    EXCEPTION WHEN OTHERS THEN
        client_ip := 'client_fallback_ip';
    END;

    -- One-way hash client IP with salt to avoid storing raw IP addresses (privacy protection)
    hashed_ip := md5(trim(client_ip) || '_agamozhi_salt_2026');
    current_bucket := date_trunc('hour', NOW());

    -- Check current hourly submission count
    SELECT submission_count INTO current_count
    FROM app_private.submission_rate_limits
    WHERE ip_hash = hashed_ip AND bucket_hour = current_bucket;

    -- Enforce threshold: 5 submissions per hour
    IF current_count IS NOT NULL AND current_count >= max_submissions THEN
        RAISE EXCEPTION 'RATE_LIMIT_EXCEEDED: Too many enquiries were submitted. Please try again later.'
            USING ERRCODE = 'P0001';
    END IF;

    -- Record / increment submission count
    INSERT INTO app_private.submission_rate_limits (ip_hash, bucket_hour, submission_count, last_submission_at)
    VALUES (hashed_ip, current_bucket, 1, NOW())
    ON CONFLICT (ip_hash, bucket_hour)
    DO UPDATE SET 
        submission_count = app_private.submission_rate_limits.submission_count + 1,
        last_submission_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger BEFORE INSERT on public.leads
DROP TRIGGER IF EXISTS trg_enforce_lead_rate_limit ON public.leads;
CREATE TRIGGER trg_enforce_lead_rate_limit
    BEFORE INSERT ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.check_lead_submission_rate_limit();



