CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  long_description text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  live_demo text,
  github text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_public_read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "projects_open_insert" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "projects_open_update" ON public.projects FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "projects_open_delete" ON public.projects FOR DELETE USING (true);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  icon text NOT NULL DEFAULT 'Code2',
  title text NOT NULL,
  short_text text NOT NULL DEFAULT '',
  cta_label text NOT NULL DEFAULT 'Get Started',
  description text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  related_categories text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services_public_read" ON public.services FOR SELECT USING (true);
CREATE POLICY "services_open_insert" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "services_open_update" ON public.services FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "services_open_delete" ON public.services FOR DELETE USING (true);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  service text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_open_insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "messages_open_read" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "messages_open_update" ON public.contact_messages FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "messages_open_delete" ON public.contact_messages FOR DELETE USING (true);

CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings_open_insert" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "settings_open_update" ON public.site_settings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "settings_open_delete" ON public.site_settings FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.projects (slug, name, category, description, image, published, long_description, features, technologies, live_demo, github, sort_order) VALUES
('codelab-academy','CodeLab Academy','E-Learning Platform','Coding education platform for students and developers.','proj-codelab',true,'CodeLab Academy is a full learning platform built for aspiring developers — structured courses, in-browser coding exercises, and progress tracking designed to keep learners moving forward.',ARRAY['Interactive in-browser code editor','Course progress tracking','Instructor dashboard','Certificates on completion'],ARRAY['React','Node.js','MongoDB','Express'],'#','#',1),
('cinevault','CineVault','Entertainment','Movie streaming and discovery experience.','proj-cinevault',true,'CineVault helps people discover what to watch next with a fast, personalised browsing experience and a clean streaming interface across devices.',ARRAY['Personalised recommendations','Watchlists and history','Adaptive streaming playback','Cross-device sync'],ARRAY['React','Node.js','APIs'],'#',NULL,2),
('bconnect','BConnect','Marketplace','Multi-vendor marketplace connecting people and services.','proj-bconnect',true,'BConnect is a multi-vendor marketplace that connects independent service providers with the people who need them, with built-in messaging and payments.',ARRAY['Vendor storefronts','In-app messaging','Secure payments','Ratings and reviews'],ARRAY['React','Node.js','MongoDB','Express'],'#','#',3),
('firebox-whatsapp-bot','Firebox WhatsApp Bot','Automation','AI-powered WhatsApp automation for businesses.','proj-whatsapp',true,'An AI-powered WhatsApp bot that handles customer inquiries, bookings and follow-ups automatically, freeing teams for higher-value work.',ARRAY['Natural language understanding','Automated booking flows','Human handoff when needed','Analytics dashboard'],ARRAY['Node.js','AI','APIs'],'#',NULL,4),
('fireboxdeploy','FireboxDeploy','Developer Platform','Deployment platform for modern applications.','proj-fireboxdeploy',true,'FireboxDeploy gives development teams a simple way to ship and monitor applications, with git-based deployments and real-time logs.',ARRAY['Git-based deployments','Real-time build logs','Environment management','One-click rollbacks'],ARRAY['Node.js','React','APIs','Git'],'#','#',5);

INSERT INTO public.services (slug, icon, title, short_text, cta_label, description, features, technologies, related_categories, sort_order) VALUES
('web-development','Code2','Web Development','Modern websites and powerful web applications.','Get Started','We design and build fast, responsive websites and web applications tailored to how your business actually works — from marketing sites to full-scale platforms.',ARRAY['Responsive, accessible interfaces','Performance-first architecture','SEO-friendly page structure','Scalable component-based codebase','Ongoing support and iteration'],ARRAY['React','JavaScript','Node.js','Express','MongoDB'],ARRAY['E-Learning Platform','Marketplace'],1),
('app-development','Smartphone','App Development','Responsive and user-friendly digital applications.','Get Started','We build cross-platform applications with a focus on clean UX and reliable performance, from first prototype through to a published product.',ARRAY['Cross-platform delivery','Native-feeling interactions','Offline-friendly data handling','Push notification support','App store deployment guidance'],ARRAY['React','Node.js','APIs','Git'],ARRAY['Entertainment'],2),
('ai-solutions','Sparkles','AI Solutions','AI-powered products, assistants and intelligent systems.','Explore AI','We integrate AI into real products — assistants, automations and intelligent features that give your business a genuine edge rather than a novelty.',ARRAY['Custom AI assistants','Workflow automation','Natural language interfaces','Model integration guidance','Responsible, tested deployments'],ARRAY['AI','Node.js','APIs','React'],ARRAY['Automation'],3),
('automation','Workflow','Automation','Bots, workflows and API integrations for businesses.','Get Started','We connect your tools and automate the repetitive parts of your business — bots, integrations and workflows that save real hours every week.',ARRAY['Custom chat & WhatsApp bots','Third-party API integrations','Scheduled and event-driven workflows','Internal tooling and dashboards','Monitoring and error alerts'],ARRAY['Node.js','APIs','MongoDB','Git'],ARRAY['Automation','Developer Platform'],4),
('custom-software','Layers3','Custom Software','Software designed around specific business requirements.','Request a Project','When off-the-shelf tools don''t fit, we design and build custom software around your exact requirements — from internal systems to full platforms.',ARRAY['Requirements discovery & scoping','Custom system architecture','Database design','Secure, maintainable codebases','Long-term technical partnership'],ARRAY['React','Node.js','Express','MongoDB','Git'],ARRAY['Developer Platform'],5);

INSERT INTO public.site_settings (key, value) VALUES
('company','{"name":"FireboxTechs","tagline":"We Build Digital Solutions That Matter.","shortDescription":"A modern technology company building websites, applications, AI products and automation for businesses and individuals."}'::jsonb),
('stats','[{"id":"stat-projects","icon":"Layers3","value":"30+","label":"Projects Completed"},{"id":"stat-clients","icon":"Users","value":"20+","label":"Happy Clients"},{"id":"stat-experience","icon":"ShieldCheck","value":"2+","label":"Years Experience"},{"id":"stat-satisfaction","icon":"Star","value":"99%","label":"Client Satisfaction"}]'::jsonb),
('about','{"label":"ABOUT US","heading":"Technology built around your ideas.","body":"FireboxTechs creates modern digital products for businesses, organizations and individuals. From websites and applications to AI-powered systems and automation, we turn ideas into practical technology that ships.","approach":[{"title":"Understand first","text":"We start with the problem and the people using the product, not the tech stack."},{"title":"Build clean","text":"Modern tools, clear architecture and code that stays maintainable as you grow."},{"title":"Ship and improve","text":"We deliver on time, then keep refining based on real usage and feedback."}]}'::jsonb),
('technologies','[{"name":"React","note":"UI library"},{"name":"JavaScript","note":"Core language"},{"name":"Node.js","note":"Runtime"},{"name":"Express","note":"Backend"},{"name":"MongoDB","note":"Database"},{"name":"APIs","note":"Integrations"},{"name":"Git","note":"Version control"},{"name":"AI","note":"Intelligent systems"}]'::jsonb),
('contactInfo','{"email":"hello@fireboxtechs.com","phone":"+254 700 000 000","location":"Remote-first · Worldwide"}'::jsonb),
('socials','[{"id":"social-github","label":"GitHub","href":"https://github.com"},{"id":"social-linkedin","label":"LinkedIn","href":"https://linkedin.com"},{"id":"social-x","label":"X","href":"https://x.com"}]'::jsonb);