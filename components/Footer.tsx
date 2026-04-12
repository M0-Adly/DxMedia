'use client';

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
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { icon: '📘', href: 'https://www.facebook.com/share/1J15UQLn6B/', color: '#1877F2', bgColor: 'rgba(24,119,242,0.1)' },
            { icon: '💬', href: 'https://wa.me/201092157086', color: '#25D366', bgColor: 'rgba(37,211,102,0.1)' },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '32px',
                height: '32px',
                background: social.bgColor,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
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
    </footer>
  );
}
