-- Run this in Supabase SQL Editor if you already created the table with the old "department" column.
-- This renames the column to "service". Skip if you are creating the table fresh (supabase-appointments.sql already uses "service").

ALTER TABLE public.appointments RENAME COLUMN department TO service;
