'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, MessageCircle, Facebook, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { createClient } from '@/lib/supabase';

const SERVICES = [
  'تصاميم الجرافكس',
  'تحرير الفيديوهات',
  'التسويق الرقمي',
  'تصميم المواقع والمتاجر',
  'فيديوهات الذكاء الاصطناعي',
  'الإعلانات الممولة',
  'برامج الإدارة والبيانات',
  'فيديوهات موشن جرافيك',
];

const INFO_ITEMS = [
  { icon: <Mail size={20} />, label: 'البريد الإلكتروني', value: 'companydxmedia@gmail.com' },
  { icon: <MessageCircle size={20} />, label: 'رقم الواتساب', value: '01092157086', href: 'https://wa.me/201092157086', target: '_blank' },
  { icon: <Facebook size={20} />, label: 'فيسبوك', value: 'صفحتنا الرسمية', href: 'https://www.facebook.com/share/1J15UQLn6B/', target: '_blank' },
];

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return setError('الاسم والبريد الإلكتروني مطلوبان');
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: dbError } = await supabase.from('messages').insert([{
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        service: form.service || null,
        message: form.message || null,
      }]);

      if (dbError) throw dbError;
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setAgreed(false);
    } catch {
      setError('حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: '#080808', position: 'relative' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,16,34,0.1)',
            border: '1px solid rgba(255,16,34,0.25)',
            borderRadius: '50px',
            padding: '6px 18px',
            color: '#ff1022',
            fontFamily: "'Changa', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            تواصل معنا
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}>
            ابدأ مشروعك اليوم
          </h2>
          <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '1rem', marginBottom: '2rem' }}>
            يسعدنا الاستماع لفكرتك ومساعدتك في تحقيقها، تواصل معنا وسنرد عليك في أقرب وقت.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: '#ff1022',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 40px',
              fontFamily: "'Changa', sans-serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 30px rgba(255,16,34,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#e00016'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#ff1022'; }}
          >
            <Send size={20} />
            التواصل معانا
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto',
          direction: 'rtl'
        }}>
          <div style={{
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              onClick={() => { setIsModalOpen(false); setSuccess(false); }}
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,16,34,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontFamily: "'Changa', sans-serif", fontSize: '1.5rem', color: '#fff', marginBottom: '1.5rem', textAlign: 'right' }}>
              أرسل رسالتك
            </h3>

            {success ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={56} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                  تم الإرسال بنجاح! 🎉
                </h3>
                <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  شكراً لتواصلك معنا، سنرد عليك قريباً
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: '#ff1022',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontFamily: "'Changa', sans-serif",
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'right' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Changa', sans-serif" }}>
                      الاسم *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="اسمك الكريم"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Changa', sans-serif" }}>
                      البريد الإلكتروني *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Changa', sans-serif" }}>
                      الهاتف
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="01092157086"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Changa', sans-serif" }}>
                      الخدمة المطلوبة
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer', color: form.service ? '#fff' : '#777' }}
                    >
                      <option value="">اختر الخدمة</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Changa', sans-serif" }}>
                    رسالتك
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="أخبرنا عن مشروعك ومتطلباتك..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                  />
                </div>

                {error && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: '8px', padding: '10px 14px', color: '#f87171',
                    fontFamily: "'Changa', sans-serif", fontSize: '0.875rem',
                  }}>
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? '#8b1c18' : '#ff1022',
                    color: '#fff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontFamily: "'Changa', sans-serif",
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                    minHeight: '44px',
                    width: '100%'
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      إرسال الرسالة
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#ffffff',
  fontFamily: "'Changa', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  minHeight: '44px',
  transition: 'border-color 0.3s',
};
