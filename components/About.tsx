'use client';

export default function About({ text }: { text: string }) {
  return (
    <section id="about" style={{ padding: '6rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '2rem', letterSpacing: '1px' }}>
          من <span style={{ color: '#500000' }}>نحن</span>
        </h2>
        <p style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: '1.1rem',
          lineHeight: '2.2',
          color: '#ccc',
          fontWeight: 400
        }}>
          {text}
        </p>
      </div>
    </section>
  );
}
