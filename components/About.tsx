'use client';

export default function About({ text }: { text: string }) {
  return (
    <section id="about" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.5rem', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '1.5rem', letterSpacing: '1px' }}>
          من <span style={{ color: '#ff1022' }}>نحن</span>
        </h2>
        <p style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: 'clamp(0.95rem, 4vw, 1.15rem)',
          lineHeight: '1.8',
          color: '#ccc',
          fontWeight: 400,
          margin: 0
        }}>
          {text}
        </p>
      </div>
    </section>
  );
}
