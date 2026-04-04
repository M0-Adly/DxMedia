import { createClient } from '@/lib/supabase-server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Project, Testimonial } from '@/lib/types';

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch hero stats
  const { data: settingsData } = await supabase
    .from('settings')
    .select('key, value');

  const settings: Record<string, string> = {};
  settingsData?.forEach((s) => { settings[s.key] = s.value; });

  const heroStats = {
    clients: settings['hero_clients'] || '150',
    projects: settings['hero_projects'] || '420',
    years: settings['hero_years'] || '6',
  };

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch active testimonials
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <main>
      <Navbar />
      <Hero stats={heroStats} />
      <Services />
      <Portfolio projects={(projects as Project[]) || []} />
      <Testimonials testimonials={(testimonials as Testimonial[]) || []} />
      <Contact />
      <Footer />
    </main>
  );
}
