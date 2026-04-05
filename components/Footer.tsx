'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'أعمالنا', href: '#portfolio' },
  { label: 'العملاء', href: '#testimonials' },
  { label: 'تواصل معنا', href: '#contact' },
];

const SERVICES = [
  'تصاميم الجرافكس',
  'تحرير الفيديوهات',
  'التسويق الرقمي',
  'تصميم المواقع',
  'الإعلانات الممولة',
  'موشن جرافيك',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubDone(true);
    setEmail('');
  };

  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        {/* 4-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: 'span 1' }}>
            <div>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#fff' }}>Dx</span>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#500000' }}>Media</span>
            </div>
            <p style={{ fontFamily: "'Changa', sans-serif", color: '#666', fontSize: '0.9rem', lineHeight: 1.8 }}>
              وكالة تسويق رقمي متميزة متخصصة في بناء علامات تجارية قوية وتحقيق نتائج ملموسة.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { icon: '📘', href: 'https://www.facebook.com/share/1J15UQLn6B/', color: '#1877F2', bgColor: 'rgba(24,119,242,0.1)' },
                { icon: '📷', href: '#', color: '#E4405F', bgColor: 'rgba(228,64,95,0.1)' },
                { icon: '🎵', href: '#', color: '#000000', bgColor: 'rgba(255,255,255,0.1)' },
                { icon: '🐦', href: '#', color: '#1DA1F2', bgColor: 'rgba(29,161,242,0.1)' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: social.bgColor,
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    color: social.color
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = social.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Changa', sans-serif", color: '#f0f0f0', fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>
              روابط سريعة
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontFamily: "'Changa', sans-serif",
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    textAlign: 'right',
                    padding: 0,
                    transition: 'color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#500000')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
                >
                  <span style={{ color: '#500000', fontSize: '0.7rem' }}>◆</span>
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Changa', sans-serif", color: '#f0f0f0', fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>
              خدماتنا
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SERVICES.map((s) => (
                <span key={s} style={{ fontFamily: "'Changa', sans-serif", color: '#666', fontSize: '0.9rem' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Changa', sans-serif", color: '#f0f0f0', fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>
              النشرة البريدية
            </h4>
            <p style={{ fontFamily: "'Changa', sans-serif", color: '#666', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.7 }}>
              اشترك للحصول على آخر مقالاتنا ونصائح التسويق الرقمي
            </p>
            {subDone ? (
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '8px',
                padding: '12px',
                fontFamily: "'Changa', sans-serif",
                color: '#4ade80',
                fontSize: '0.875rem',
                textAlign: 'center',
              }}>
                ✅ تم الاشتراك بنجاح!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  style={{
                    flex: 1,
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#f0f0f0',
                    fontFamily: "'Changa', sans-serif",
                    fontSize: '0.875rem',
                    outline: 'none',
                    minHeight: '44px',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#500000')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <button
                  type="submit"
                  style={{
                    background: '#500000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    width: '44px',
                    height: '44px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#3b0000')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#500000')}
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <p style={{ fontFamily: "'Changa', sans-serif", color: '#444', fontSize: '0.85rem' }}>
              © {new Date().getFullYear()} Dx Media. جميع الحقوق محفوظة.
            </p>
            <p style={{ fontFamily: "'Changa', sans-serif", color: '#444', fontSize: '0.85rem' }}>
              صُمِّم للتميز ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
