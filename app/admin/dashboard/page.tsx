'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderOpen, MessageSquare, Star, Settings, LogOut,
  Plus, Check, X, Eye, Trash2, ChevronDown, ChevronUp, Save,
} from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Project, Testimonial, Message, ProjectCategory } from '@/lib/types';
import ProjectCard from '@/components/admin/ProjectCard';
import UploadModal from '@/components/admin/UploadModal';

type Tab = 'projects' | 'messages' | 'testimonials' | 'settings' | 'marketing';

const SIDEBAR_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'projects', label: 'المشاريع', icon: <FolderOpen size={18} /> },
  { id: 'marketing', label: 'الخطط التسويقية', icon: <Star size={18} /> },
  { id: 'messages', label: 'الرسائل', icon: <MessageSquare size={18} /> },
  { id: 'testimonials', label: 'آراء وصور العملاء', icon: <Star size={18} /> },
  { id: 'settings', label: 'الإعدادات', icon: <Settings size={18} /> },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [adminCategory, setAdminCategory] = useState<ProjectCategory | 'all' | 'archived'>('all');

  // Messages state
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [messagesLoading, setMessagesLoading] = useState(true);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', company: '', content: '', link_url: '', rating: 5 });
  const [testimonialFile, setTestimonialFile] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string>('');
  const [addingTestimonial, setAddingTestimonial] = useState(false);

  // Marketing Plans state
  const [marketingPlans, setMarketingPlans] = useState<any[]>([]);
  const [marketingLoading, setMarketingLoading] = useState(true);
  const [newMarketingPlan, setNewMarketingPlan] = useState({ title: '', order_index: 0 });
  const [marketingFiles, setMarketingFiles] = useState<File[]>([]);
  const [addingMarketing, setAddingMarketing] = useState(false);

  // Settings state
  const [heroStats, setHeroStats] = useState({ clients: '150', projects: '420', years: '6' });
  const [aboutUsText, setAboutUsText] = useState('رؤيتنا هي ضمان نجاحك، وعملنا هو تحويل فكرتك لواقع رقمي مسيطر. في مكان واحد، بنجمع لك بين عبقرية البيانات وتطوير البرامج والأنظمة الإدارية المعقدة، وبين سحر الإبداع في تصميم الجرافيك والمواقع، وتحرير الفيديوهات والموشن جرافيك اللي بيخطف الأنظار. إحنا مش بس بنصمم أو بنبرمج، إحنا بنبني لك حضور ذكي من خلال تسويق رقمي مبني على الأرقام وإعلانات ممولة عالية العائد، مع دمج أحدث تقنيات الذكاء الاصطناعي لضمان ريادتك في السوق. باختصار.. إحنا الشريك اللي هيبدأ معاك من أول خطوة تخطيط لحد ما توصل للقمة وتستمر فيها');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);

  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    setProjectsLoading(true);
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects(data as Project[] || []);
    setProjectsLoading(false);
  }, []);

  const fetchMessages = useCallback(async () => {
    setMessagesLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    setMessages(data as Message[] || []);
    setMessagesLoading(false);
  }, []);

  const fetchTestimonials = useCallback(async () => {
    setTestimonialsLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setTestimonials(data as Testimonial[] || []);
    setTestimonialsLoading(false);
  }, []);

  const fetchMarketingPlans = useCallback(async () => {
    setMarketingLoading(true);
    const { data } = await supabase.from('marketing_plans').select('*').order('order_index', { ascending: true });
    setMarketingPlans(data || []);
    setMarketingLoading(false);
  }, []);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from('settings').select('key, value');
    if (data) {
      const map: Record<string, string> = {};
      data.forEach((s) => (map[s.key] = s.value));
      setHeroStats({
        clients: map['hero_clients'] || '150',
        projects: map['hero_projects'] || '420',
        years: map['hero_years'] || '6',
      });
      if (map['about_text']) setAboutUsText(map['about_text']);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchMessages();
    fetchTestimonials();
    fetchMarketingPlans();
    fetchSettings();
  }, [fetchProjects, fetchMessages, fetchTestimonials, fetchMarketingPlans, fetchSettings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const handleProjectSuccess = () => {
    setShowUploadModal(false);
    setEditProject(null);
    fetchProjects();
  };

  const handleDeleteProject = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    await supabase.from('projects').update({ featured }).eq('id', id);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, featured } : p));
  };

  const handleMarkRead = async (id: string) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('حذف هذه الرسالة؟')) return;
    await supabase.from('messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (expandedMsg === id) setExpandedMsg(null);
  };

  const handleToggleTestimonial = async (id: string, is_active: boolean) => {
    await supabase.from('testimonials').update({ is_active }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_active } : t));
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('حذف هذه الشهادة؟')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name) return;
    setAddingTestimonial(true);
    try {
      let imageUrl = '';
      if (testimonialFile) {
        const ext = testimonialFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('projects').upload(fileName, testimonialFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const payload = {
        ...newTestimonial,
        image_url: imageUrl || null,
        content: newTestimonial.content || null
      };

      const { data } = await supabase.from('testimonials').insert([payload]).select().single();
      if (data) setTestimonials(prev => [data as Testimonial, ...prev]);
      setNewTestimonial({ name: '', role: '', company: '', content: '', link_url: '', rating: 5 });
      setTestimonialFile(null);
      setTestimonialPreview('');
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الإضافة');
    } finally {
      setAddingTestimonial(false);
    }
  };

  const handleAddMarketingPlan = async () => {
    if (!newMarketingPlan.title) return;
    setAddingMarketing(true);
    try {
      const imageUrls: string[] = [];
      for (const file of marketingFiles) {
        const ext = file.name.split('.').pop();
        const fileName = `marketing/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from('projects').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(fileName);
        imageUrls.push(urlData.publicUrl);
      }

      const payload = {
        ...newMarketingPlan,
        images: imageUrls,
      };

      const { data, error } = await supabase.from('marketing_plans').insert([payload]).select().single();
      if (error) throw error;
      if (data) setMarketingPlans(prev => [...prev, data]);
      setNewMarketingPlan({ title: '', order_index: 0 });
      setMarketingFiles([]);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء إضافة الخطة');
    } finally {
      setAddingMarketing(false);
    }
  };

  const handleDeleteMarketingPlan = async (id: string) => {
    if (!window.confirm('حذف هذه الخطة؟')) return;
    await supabase.from('marketing_plans').delete().eq('id', id);
    setMarketingPlans(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveSettings = async () => {
    setSettingsLoading(true);
    const results = await Promise.all([
      supabase.from('settings').upsert({ key: 'hero_clients', value: heroStats.clients }),
      supabase.from('settings').upsert({ key: 'hero_projects', value: heroStats.projects }),
      supabase.from('settings').upsert({ key: 'hero_years', value: heroStats.years }),
      supabase.from('settings').upsert({ key: 'about_text', value: aboutUsText }),
    ]);

    const error = results.find(r => r.error)?.error;
    if (error) {
      console.error(error);
      alert(`حدث خطأ أثناء حفظ الإعدادات: ${error.message}`);
    } else {
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    }
    setSettingsLoading(false);
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', fontFamily: "'Almarai', sans-serif" }}>
      {/* ── SIDEBAR (desktop) ── */}
      <aside
        style={{
          width: '240px',
          background: '#000000',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'none', // Default hidden, shown only via Tailwind md:flex
        }} 
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.75rem', color: '#fff' }}>Dx</span>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.75rem', color: '#ff1022' }}>Media</span>
          <p style={{ color: '#555', fontSize: '0.75rem', marginTop: '2px' }}>لوحة التحكم</p>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? 'rgba(255,16,34,0.12)' : 'transparent',
                border: activeTab === item.id ? '1px solid rgba(255,16,34,0.25)' : '1px solid transparent',
                borderRadius: '10px',
                padding: '12px 16px',
                color: activeTab === item.id ? '#ff1022' : '#777',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.925rem',
                fontWeight: activeTab === item.id ? 700 : 500,
                transition: 'all 0.2s',
                textAlign: 'right',
                width: '100%',
                position: 'relative',
              }}
            >
              {item.icon}
              {item.label}
              {item.id === 'messages' && unreadCount > 0 && (
                <span style={{
                  marginRight: 'auto',
                  background: '#ff1022',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '1px 7px',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '10px', padding: '12px 16px', color: '#666',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
              fontSize: '0.9rem', width: '100%', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1022'; e.currentTarget.style.borderColor = 'rgba(255,16,34,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1 }} className="mr-0 md:mr-[240px] pb-[80px] md:pb-0">
        {/* Top bar */}
        <header style={{
          background: '#050505',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <h1 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', fontFamily: "'Almarai', sans-serif" }}>
            {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#555', fontSize: '0.8rem', fontFamily: "'Almarai', sans-serif" }}>لوحة تحكم Dx Media</span>
            <a href="/" target="_blank" style={{ color: '#4d9cf8', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} /> الموقع
            </a>
          </div>
        </header>

        <div style={{ padding: '1.5rem' }}>

          {/* ── PROJECTS TAB ── */}
          {activeTab === 'projects' && (
            <div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'إجمالي المشاريع', value: projects.length, color: '#4d9cf8' },
                  { label: 'مشاريع مميزة', value: projects.filter(p => p.featured).length, color: '#ff1022' },
                  { label: 'التصنيفات', value: new Set(projects.map(p => p.category)).size, color: '#a78bfa' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px', padding: '1.25rem',
                  }}>
                    <div style={{ fontSize: '1.75rem', fontFamily: '"Bebas Neue", sans-serif', color: stat.color }}>{stat.value}</div>
                    <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Add button (desktop) */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1.25rem' }}>
                <button
                  onClick={() => { setEditProject(null); setShowUploadModal(true); }}
                  style={{
                    background: '#ff1022', color: '#fff', border: 'none',
                    borderRadius: '10px', padding: '10px 20px',
                    fontFamily: "'Almarai', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#3b0000')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#ff1022')}
                >
                  <Plus size={18} /> إضافة مشروع
                </button>
              </div>

              {/* Category Filter */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '1.5rem',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'none',
              }}>
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'graphic', label: 'جرافيك' },
                  { id: 'video', label: 'فيديو' },
                  { id: 'motion', label: 'موشن' },
                  { id: 'ads', label: 'إعلانات' },
                  { id: 'web', label: 'مواقع' },
                  { id: 'ai', label: 'ذكاء اصطناعي' },
                  { id: 'data', label: 'بيانات' },
                  { id: 'archived', label: 'الأرشيف 📁' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setAdminCategory(cat.id as any)}
                    style={{
                      background: adminCategory === cat.id ? '#ff1022' : '#111',
                      color: adminCategory === cat.id ? '#fff' : '#666',
                      border: '1px solid',
                      borderColor: adminCategory === cat.id ? '#ff1022' : 'rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '0.825rem',
                      fontFamily: "'Almarai', sans-serif",
                      fontWeight: adminCategory === cat.id ? 700 : 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Projects grid */}
              {projectsLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#ff1022', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                  <p style={{ fontFamily: "'Almarai', sans-serif" }}>جاري التحميل...</p>
                </div>
              ) : projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
                  <FolderOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                  <p style={{ fontFamily: "'Almarai', sans-serif" }}>لا توجد مشاريع بعد</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {projects
                    .filter(p => {
                      if (adminCategory === 'archived') return p.is_archived;
                      if (adminCategory !== 'all') {
                        // Allow matching old 'images' to 'graphic'
                        if (adminCategory === 'graphic') {
                          return p.category === 'graphic' || (p.category as string) === 'images' || !p.category;
                        }
                        return p.category === adminCategory && !p.is_archived;
                      }
                      return true;
                    })
                    .sort((a, b) => {
                      const aV = (a.order_index === undefined || a.order_index === null || Number(a.order_index) === 0) ? 1000000 : Number(a.order_index);
                      const bV = (b.order_index === undefined || b.order_index === null || Number(b.order_index) === 0) ? 1000000 : Number(b.order_index);
                      if (aV !== bV) return aV - bV;
                      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    })
                    .map(p => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        onEdit={(proj) => { setEditProject(proj); setShowUploadModal(true); }}
                        onDelete={handleDeleteProject}
                        onToggleFeatured={handleToggleFeatured}
                      />
                    ))}
                </div>
              )}
            </div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#777', fontFamily: "'Almarai', sans-serif", fontSize: '0.9rem' }}>
                  {unreadCount > 0 ? `${unreadCount} رسالة غير مقروءة` : 'جميع الرسائل مقروءة'}
                </span>
              </div>
              {messagesLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#ff1022', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                </div>
              ) : messages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#555' }}>
                  <MessageSquare size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                  <p style={{ fontFamily: "'Almarai', sans-serif" }}>لا توجد رسائل بعد</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {messages.map(msg => (
                    <div key={msg.id} style={{
                      background: msg.is_read ? '#0a0a0a' : '#1a1212',
                      border: `1px solid ${msg.is_read ? 'rgba(255,255,255,0.06)' : 'rgba(255,16,34,0.2)'}`,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                    }}>
                      {/* Header row */}
                      <div
                        onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)}
                        style={{
                          padding: '1rem 1.25rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: "'Almarai', sans-serif", fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{msg.name}</span>
                            {!msg.is_read && (
                              <span style={{ background: '#ff1022', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>جديد</span>
                            )}
                            {msg.service && (
                              <span style={{ background: 'rgba(255,255,255,0.06)', color: '#888', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '10px' }}>{msg.service}</span>
                            )}
                          </div>
                          <div style={{ color: '#555', fontSize: '0.8rem', marginTop: '3px' }}>
                            {msg.email} {msg.phone ? `· ${msg.phone}` : ''}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: '#444', fontSize: '0.75rem' }}>
                            {new Date(msg.created_at).toLocaleDateString('ar-SA')}
                          </span>
                          {expandedMsg === msg.id ? <ChevronUp size={16} color="#666" /> : <ChevronDown size={16} color="#666" />}
                        </div>
                      </div>

                      {/* Expanded content */}
                      {expandedMsg === msg.id && (
                        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          {msg.message && (
                            <p style={{ fontFamily: "'Almarai', sans-serif", color: '#bbb', fontSize: '0.9rem', lineHeight: 1.75, margin: '1rem 0' }}>
                              {msg.message}
                            </p>
                          )}
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {!msg.is_read && (
                              <button onClick={() => handleMarkRead(msg.id)} style={{
                                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px',
                                padding: '7px 14px', color: '#4ade80', fontFamily: "'Almarai', sans-serif", fontSize: '0.8rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                              }}>
                                <Check size={14} /> تحديد كمقروء
                              </button>
                            )}
                            <a href={`mailto:${msg.email}`} style={{
                              background: 'rgba(77,156,248,0.1)', border: '1px solid rgba(77,156,248,0.2)', borderRadius: '8px',
                              padding: '7px 14px', color: '#4d9cf8', fontFamily: "'Changa', sans-serif", fontSize: '0.8rem',
                              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
                            }}>
                              رد بالبريد
                            </a>
                            {msg.phone && (
                              <a href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{
                                background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '8px',
                                padding: '7px 14px', color: '#25D366', fontFamily: "'Changa', sans-serif", fontSize: '0.8rem',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
                              }}>
                                رد واتساب
                              </a>
                            )}
                            <button onClick={() => handleDeleteMessage(msg.id)} style={{
                              background: 'rgba(255,16,34,0.08)', border: '1px solid rgba(255,16,34,0.15)', borderRadius: '8px',
                              padding: '7px 14px', color: '#ff1022', fontFamily: "'Almarai', sans-serif", fontSize: '0.8rem',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                            }}>
                              <Trash2 size={14} /> حذف
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TESTIMONIALS TAB ── */}
          {activeTab === 'testimonials' && (
            <div>
              {/* Add new testimonial */}
              <div style={{
                background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontFamily: "'Almarai', sans-serif", color: '#ffffff', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                  إضافة شهادة جديدة
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  {['name', 'role', 'company', 'link_url'].map(field => (
                    <input
                      key={field}
                      placeholder={field === 'name' ? 'الاسم (أو اسم البراند) *' : field === 'role' ? 'الوظيفة' : field === 'company' ? 'الشركة' : 'رابط (عند الضغط على الصورة)'}
                      value={newTestimonial[field as keyof typeof newTestimonial] as string}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, [field]: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  ))}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <textarea
                    placeholder="نص الشهادة (اختياري إذا أضفت صورة)"
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, content: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', width: '100%' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                  
                  <div style={{ 
                    border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px',
                    display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)'
                  }}>
                    <input 
                      type="file" 
                      id="test-img" 
                      hidden 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTestimonialFile(file);
                          setTestimonialPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <label htmlFor="test-img" style={{ 
                      background: '#222', padding: '8px 15px', borderRadius: '8px', color: '#eee',
                      fontSize: '0.8rem', cursor: 'pointer', border: '1px solid #333'
                    }}>
                      {testimonialFile ? 'تغيير الصورة' : 'رفع صورة الرأي'}
                    </label>
                    {testimonialPreview && (
                      <img src={testimonialPreview} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px', border: '1px solid #ff1022' }} />
                    )}
                    <span style={{ fontSize: '0.75rem', color: '#555' }}>يمكنك رفع سكرين شوت للرأي</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: "'Almarai', sans-serif", color: '#888', fontSize: '0.875rem' }}>التقييم:</span>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setNewTestimonial(prev => ({ ...prev, rating: n }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.2rem', opacity: n <= newTestimonial.rating ? 1 : 0.3, transition: 'opacity 0.2s' }}>
                        ⭐
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleAddTestimonial}
                    disabled={addingTestimonial}
                    style={{
                      background: '#ff1022', color: '#fff', border: 'none', borderRadius: '8px',
                      padding: '10px 20px', fontFamily: "'Almarai', sans-serif", fontWeight: 700, fontSize: '0.875rem',
                      cursor: addingTestimonial ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    <Plus size={16} /> إضافة
                  </button>
                </div>
              </div>

              {/* Testimonials list */}
              {testimonialsLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#ff1022', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {testimonials.map(t => (
                    <div key={t.id} style={{
                      background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px', padding: '1rem 1.25rem',
                      display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap',
                    }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: "'Almarai', sans-serif", fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{t.name}</span>
                          <span style={{ color: '#666', fontSize: '0.8rem' }}>{t.role} {t.company ? `— ${t.company}` : ''}</span>
                          <span style={{ fontSize: '0.8rem' }}>{'⭐'.repeat(t.rating)}</span>
                        </div>
                        <p style={{ fontFamily: "'Almarai', sans-serif", color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{t.content}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <button onClick={() => handleToggleTestimonial(t.id, !t.is_active)} style={{
                          background: t.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${t.is_active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: '8px', padding: '6px 12px',
                          color: t.is_active ? '#4ade80' : '#666',
                          fontFamily: "'Almarai', sans-serif", fontSize: '0.78rem', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          {t.is_active ? <><Check size={12} /> نشط</> : <><X size={12} /> مخفي</>}
                        </button>
                        <button onClick={() => handleDeleteTestimonial(t.id)} style={{
                          background: 'rgba(255,16,34,0.08)', border: '1px solid rgba(255,16,34,0.15)',
                          borderRadius: '8px', padding: '6px 10px', color: '#ff1022', cursor: 'pointer',
                        }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MARKETING TABS ── */}
          {activeTab === 'marketing' && (
            <div>
              {/* Add new marketing plan */}
              <div style={{
                background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem',
              }}>
                <h3 style={{ fontFamily: "'Almarai', sans-serif", color: '#ffffff', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>
                  إضافة خطة تسويقية جديدة
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    placeholder="عنوان الخطة التسويقية *"
                    value={newMarketingPlan.title}
                    onChange={(e) => setNewMarketingPlan(prev => ({ ...prev, title: e.target.value }))}
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    placeholder="الترتيب"
                    value={newMarketingPlan.order_index}
                    onChange={(e) => setNewMarketingPlan(prev => ({ ...prev, order_index: Number(e.target.value) }))}
                    style={inputStyle}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ 
                    border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '10px', padding: '15px',
                    display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255,255,255,0.02)'
                  }}>
                    <input 
                      type="file" 
                      id="mkt-imgs" 
                      multiple
                      hidden 
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setMarketingFiles(prev => [...prev, ...files]);
                      }}
                    />
                    <label htmlFor="mkt-imgs" style={{ 
                      alignSelf: 'center',
                      background: '#222', padding: '10px 20px', borderRadius: '8px', color: '#eee',
                      fontSize: '0.9rem', cursor: 'pointer', border: '1px solid #333'
                    }}>
                      اختر صور الخطة (يمكن اختيار أكثر من صورة)
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {marketingFiles.map((f, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img src={URL.createObjectURL(f)} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ff1022' }} />
                          <button onClick={() => setMarketingFiles(prev => prev.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ff1022', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', cursor: 'pointer' }}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleAddMarketingPlan}
                    disabled={addingMarketing}
                    style={{
                      background: '#ff1022', color: '#fff', border: 'none', borderRadius: '8px',
                      padding: '10px 24px', fontFamily: "'Almarai', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                      cursor: addingMarketing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                    }}
                  >
                    {addingMarketing ? 'جاري الحفظ...' : <><Plus size={18} /> حفظ الخطة</>}
                  </button>
                </div>
              </div>

              {/* Marketing plans list */}
              {marketingLoading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#555' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid #333', borderTopColor: '#ff1022', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {marketingPlans.map(plan => (
                    <div key={plan.id} style={{
                      background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px', padding: '1.25rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontFamily: "'Almarai', sans-serif", fontWeight: 700, color: '#ffffff', fontSize: '1.1rem', margin: 0 }}>{plan.title}</h4>
                          <span style={{ color: '#555', fontSize: '0.8rem' }}>الترتيب: {plan.order_index} | {plan.images?.length || 0} صور</span>
                        </div>
                        <button onClick={() => handleDeleteMarketingPlan(plan.id)} style={{
                          background: 'rgba(255,16,34,0.08)', border: '1px solid rgba(255,16,34,0.15)',
                          borderRadius: '8px', padding: '8px 12px', color: '#ff1022', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem'
                        }}>
                          <Trash2 size={14} /> حذف
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                        {plan.images?.map((img: string, i: number) => (
                          <img key={i} src={img} style={{ height: '80px', borderRadius: '8px', border: '1px solid #1a1a1a' }} alt="" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: '500px' }}>
              <div style={{
                background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', padding: '2rem',
              }}>
                <h3 style={{ fontFamily: "'Almarai', sans-serif", color: '#ffffff', fontWeight: 700, marginBottom: '0.5rem' }}>
                  إحصائيات الصفحة الرئيسية
                </h3>
                <p style={{ fontFamily: "'Almarai', sans-serif", color: '#666', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
                  الأرقام التي تظهر في قسم الإحصائيات بصفحة الهيرو
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { key: 'clients', label: 'عدد العملاء', icon: '👥' },
                    { key: 'projects', label: 'المشاريع المنجزة', icon: '📦' },
                    { key: 'years', label: 'سنوات الخبرة', icon: '🏆' },
                  ].map(({ key, label, icon }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontFamily: "'Almarai', sans-serif", color: '#aaa', fontSize: '0.875rem', marginBottom: '6px' }}>
                        {icon} {label}
                      </label>
                      <input
                        type="number"
                        value={heroStats[key as keyof typeof heroStats]}
                        onChange={(e) => setHeroStats(prev => ({ ...prev, [key]: e.target.value }))}
                        style={{ ...inputStyle, direction: 'ltr', textAlign: 'center', fontSize: '1.1rem', fontWeight: 700 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    نص من نحن (About Us)
                  </h3>
                  <textarea
                    value={aboutUsText}
                    onChange={(e) => setAboutUsText(e.target.value)}
                    rows={6}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={settingsLoading}
                  style={{
                    marginTop: '2rem',
                    background: settingsSaved ? 'rgba(34,197,94,0.2)' : '#ff1022',
                    color: settingsSaved ? '#4ade80' : '#fff',
                    border: settingsSaved ? '1px solid rgba(34,197,94,0.3)' : 'none',
                    borderRadius: '10px', padding: '13px', width: '100%',
                    fontFamily: "'Almarai', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                    cursor: settingsLoading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.4s',
                  }}
                >
                  {settingsSaved ? <><Check size={18} /> تم الحفظ بنجاح!</> : <><Save size={18} /> حفظ الإعدادات</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE BOTTOM TABS (Modern Floating Style) ── */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '15px',
        right: '15px',
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        display: 'grid',
        gridTemplateColumns: `repeat(${SIDEBAR_ITEMS.length}, 1fr)`,
        zIndex: 200,
        padding: '8px 4px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 16, 34, 0.1)',
      }} className="md:hidden">
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              color: activeTab === item.id ? '#ff1022' : '#555',
              transition: 'all 0.3s',
              position: 'relative',
              transform: activeTab === item.id ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {item.icon}
            <span style={{ fontSize: '0.6rem', fontFamily: "'Almarai', sans-serif", fontWeight: 700 }}>{item.label}</span>
            {item.id === 'messages' && unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '20%',
                background: '#ff1022', color: '#fff', fontSize: '0.55rem',
                width: '15px', height: '15px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
              }}>{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── FAB (mobile) ── */}
      {activeTab === 'projects' && (
        <button
          onClick={() => { setEditProject(null); setShowUploadModal(true); }}
          style={{
            position: 'fixed',
            bottom: '90px',
            left: '20px',
            width: '56px',
            height: '56px',
            background: '#ff1022',
            border: 'none',
            borderRadius: '50%',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(255,16,34,0.5)',
            zIndex: 150,
            transition: 'transform 0.2s',
          }}
          className="md:hidden"
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Plus size={24} />
        </button>
      )}

      {/* ── UPLOAD MODAL ── */}
      {showUploadModal && (
        <UploadModal
          onClose={() => { setShowUploadModal(false); setEditProject(null); }}
          onSuccess={handleProjectSuccess}
          editProject={editProject}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '11px 14px',
  color: '#ffffff',
  fontFamily: "'Almarai', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  minHeight: '44px',
  transition: 'border-color 0.3s',
};
