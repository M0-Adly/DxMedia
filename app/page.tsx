import { createClient } from '@/lib/supabase-server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import About from '@/components/About';
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

  const aboutText = settings['about_text'] || 'رؤيتنا هي ضمان نجاحك، وعملنا هو تحويل فكرتك لواقع رقمي مسيطر. في مكان واحد، بنجمع لك بين عبقرية البيانات وتطوير البرامج والأنظمة الإدارية المعقدة، وبين سحر الإبداع في تصميم الجرافيك والمواقع، وتحرير الفيديوهات والموشن جرافيك اللي بيخطف الأنظار. إحنا مش بس بنصمم أو بنبرمج، إحنا بنبني لك حضور ذكي من خلال تسويق رقمي مبني على الأرقام وإعلانات ممولة عالية العائد، مع دمج أحدث تقنيات الذكاء الاصطناعي لضمان ريادتك في السوق. باختصار.. إحنا الشريك اللي هيبدأ معاك من أول خطوة تخطيط لحد ما توصل للقمة وتستمر فيها';

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
      <About text={aboutText} />
      <Services />
      <Portfolio projects={(projects as Project[]) || []} />
      <Testimonials testimonials={(testimonials as Testimonial[]) || []} />
      <Contact />
      <Footer />
    </main>
  );
}
