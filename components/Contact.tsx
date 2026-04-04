'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
  { icon: <MapPin size={20} />, label: 'العنوان', value: 'مصر' },
  { icon: <Phone size={20} />, label: 'الهاتف', value: '01092157086' },
  { icon: <Mail size={20} />, label: 'البريد الإلكتروني', value: 'companydxmedia@gmail.com' },
];

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
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
    <section id="contact" style={{ padding: '6rem 1.5rem', background: '#050505', position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '40%',
        background: 'radial-gradient(ellipse at center, rgba(230,51,41,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(230,51,41,0.1)',
            border: '1px solid rgba(230,51,41,0.25)',
            borderRadius: '50px',
            padding: '6px 18px',
            color: '#e63329',
            fontFamily: "'Cairo', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 600,
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
          <p style={{ fontFamily: "'Cairo', sans-serif", color: '#777', fontSize: '1rem' }}>
            يسعدنا الاستماع لفكرتك ومساعدتك في تحقيقها
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#f0f0f0',
            }}>
              معلومات التواصل
            </h3>
            <p style={{ fontFamily: "'Cairo', sans-serif", color: '#777', lineHeight: 1.8, fontSize: '0.95rem' }}>
              نحن هنا لمساعدتك في بناء حضور رقمي قوي. تواصل معنا وسنرد عليك في أقرب وقت ممكن.
            </p>
            {INFO_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'rgba(230,51,41,0.1)',
                  border: '1px solid rgba(230,51,41,0.25)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#e63329',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Cairo', sans-serif", color: '#888', fontSize: '0.8rem' }}>{item.label}</div>
                  <div style={{ fontFamily: "'Cairo', sans-serif", color: '#f0f0f0', fontWeight: 600, fontSize: '0.95rem' }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Decorative box */}
            <div style={{
              marginTop: '1rem',
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.5rem',
              borderRight: '3px solid #e63329',
            }}>
              <p style={{ fontFamily: "'Cairo', sans-serif", color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7 }}>
                ⚡ نرد على جميع الاستفسارات خلال <strong style={{ color: '#e63329' }}>24 ساعة</strong>
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle size={56} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontFamily: "'Cairo', sans-serif", color: '#f0f0f0', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                  تم الإرسال بنجاح! 🎉
                </h3>
                <p style={{ fontFamily: "'Cairo', sans-serif", color: '#777', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  شكراً لتواصلك معنا، سنرد عليك قريباً
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  style={{
                    background: '#e63329',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    fontFamily: "'Cairo', sans-serif",
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Cairo', sans-serif" }}>
                      الاسم *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="اسمك الكريم"
                      required
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#f0f0f0',
                        fontFamily: "'Cairo', sans-serif",
                        fontSize: '0.9rem',
                        outline: 'none',
                        minHeight: '44px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e63329')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Cairo', sans-serif" }}>
                      البريد الإلكتروني *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#f0f0f0',
                        fontFamily: "'Cairo', sans-serif",
                        fontSize: '0.9rem',
                        outline: 'none',
                        minHeight: '44px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e63329')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Cairo', sans-serif" }}>
                      الهاتف
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="01092157086"
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#f0f0f0',
                        fontFamily: "'Cairo', sans-serif",
                        fontSize: '0.9rem',
                        outline: 'none',
                        minHeight: '44px',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e63329')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Cairo', sans-serif" }}>
                      الخدمة المطلوبة
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        background: '#1a1a1a',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: form.service ? '#f0f0f0' : '#777',
                        fontFamily: "'Cairo', sans-serif",
                        fontSize: '0.9rem',
                        outline: 'none',
                        minHeight: '44px',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#e63329')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    >
                      <option value="">اختر الخدمة</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#aaa', fontSize: '0.85rem', marginBottom: '6px', fontFamily: "'Cairo', sans-serif" }}>
                    رسالتك
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="أخبرنا عن مشروعك ومتطلباتك..."
                    rows={4}
                    style={{
                      width: '100%',
                      background: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#f0f0f0',
                      fontFamily: "'Cairo', sans-serif",
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '100px',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#e63329')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>

                {/* Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#e63329', cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: "'Cairo', sans-serif", color: '#888', fontSize: '0.875rem' }}>
                    أوافق على التواصل معي بخصوص خدمات Dx Media
                  </span>
                </label>

                {error && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#f87171',
                    fontFamily: "'Cairo', sans-serif",
                    fontSize: '0.875rem',
                  }}>
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? '#8b1c18' : '#e63329',
                    color: '#fff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontFamily: "'Cairo', sans-serif",
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease',
                    minHeight: '44px',
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
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
