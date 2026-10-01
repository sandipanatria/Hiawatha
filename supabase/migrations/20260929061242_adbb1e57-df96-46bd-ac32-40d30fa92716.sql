CREATE TABLE public.property_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
  ip_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.property_enquiries TO service_role;
ALTER TABLE public.property_enquiries ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.set_property_enquiry_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER property_enquiries_updated_at BEFORE UPDATE ON public.property_enquiries FOR EACH ROW EXECUTE FUNCTION public.set_property_enquiry_updated_at();
CREATE INDEX property_enquiries_ip_recent_idx ON public.property_enquiries (ip_hash, created_at DESC);