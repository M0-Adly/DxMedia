'use client';

import { useState } from 'react';

export default function About({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.5rem', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '1.5rem', letterSpacing: '1px' }}>
          من <span style={{ color: '#ff1022' }}>نحن</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <p style={{
            fontFamily: "'Changa', sans-serif",
            fontSize: 'clamp(0.95rem, 4vw, 1.15rem)',
            lineHeight: '1.8',
            color: '#ccc',
            fontWeight: 400,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            textOverflow: 'ellipsis'
          }}>
            {text}
          </p>
          {text.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,16,34,0.5)',
                color: '#ff1022',
                padding: '6px 16px',
                borderRadius: '50px',
                fontFamily: "'Changa', sans-serif",
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,16,34,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {isExpanded ? 'عرض أقل' : 'عرض المزيد'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
