-- MIGRATION 002: Make business_type nullable
-- 
-- The public contact form no longer collects business_type (removed in UI update).
-- Existing lead records that have business_type populated are preserved.
-- This only relaxes the NOT NULL constraint so new submissions succeed without that field.
--
-- Run this once in your Supabase SQL Editor:
--   Dashboard ? SQL Editor ? paste this ? Run

ALTER TABLE public.leads
  ALTER COLUMN business_type DROP NOT NULL;
