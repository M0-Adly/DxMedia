'use client';

import { Facebook, MessageCircle, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <p style={{ fontFamily: "'Changa', sans-serif", color: '#444', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Dx Media. جميع الحقوق محفوظة.
        </p>
        <div className="social-container" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: <Facebook size={22} color="#fff" />, text: 'Facebook', href: 'https://www.facebook.com/share/1UfsNVEwxM/', bgColor: '#1877F2' },
            { icon: <Instagram size={22} color="#fff" />, text: 'Instagram', href: 'https://www.instagram.com/dx._media?igsh=NGxtZ2RvOGxyY3Y=', bgColor: '#E4405F' },
            { icon: <MessageCircle size={22} color="#fff" />, text: 'WhatsApp', href: 'https://wa.me/201092157086', bgColor: '#25D366' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div 
                className="social-icon-box"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: social.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${social.bgColor}40`,
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {social.icon}
              </div>
              <span className="social-text" style={{ fontSize: '0.95rem', fontWeight: 800, fontFamily: "'Changa', sans-serif", color: '#fff' }}>
                {social.text}
              </span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .social-container {
            gap: 12px !important;
            width: 100%;
            justify-content: space-between !important;
          }
          .social-link {
            gap: 6px !important;
          }
          .social-icon-box {
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
          }
          .social-icon-box svg {
            width: 16px !important;
            height: 16px !important;
          }
          .social-text {
            font-size: 0.75rem !important;
          }
        }
        @media (max-width: 480px) {
           .social-container {
             gap: 8px !important;
           }
        }
      `}</style>
    </footer>
  );
}
