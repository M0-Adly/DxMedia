'use client';

import { Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontFamily: "'Changa', sans-serif", color: '#444', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Dx Media. جميع الحقوق محفوظة.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { icon: <Facebook size={22} color="#fff" />, text: 'Facebook', href: 'https://www.facebook.com/share/1UfsNVEwxM/', color: '#1877F2', bgColor: '#1877F2' },
            { icon: <MessageCircle size={22} color="#fff" />, text: 'WhatsApp', href: 'https://wa.me/201092157086', color: '#25D366', bgColor: '#25D366' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
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
              <span style={{ fontSize: '1rem', fontWeight: 800, fontFamily: "'Changa', sans-serif", color: '#fff', letterSpacing: '0.5px' }}>
                {social.text}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
