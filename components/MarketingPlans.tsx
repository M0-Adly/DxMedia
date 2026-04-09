'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { MarketingPlan } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MarketingPlans({ plans }: { plans: MarketingPlan[] }) {
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  if (!plans || plans.length === 0) return null;

  const currentPlan = plans[activePlanIdx];

  const nextPlan = () => setActivePlanIdx((prev) => (prev + 1) % plans.length);
  const prevPlan = () => setActivePlanIdx((prev) => (prev - 1 + plans.length) % plans.length);

  return (
    <section id="marketing-plans" style={{ padding: '6rem 1.5rem', background: '#080808', borderBottom: '1px solid rgba(255,16,34,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            استراتيجياتنا
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}>
            الخطط التسويقية
          </h2>
          <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            نصمم لك استراتيجيات مدروسة تضمن وصول علامتك التجارية للجمهور المستهدف بدقة واحترافية
          </p>
        </div>

        <div style={{ position: 'relative', background: '#0d0d0d', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
          {/* Plan Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontFamily: "'Changa', sans-serif", fontSize: '1.75rem', fontWeight: 800, color: '#ff1022' }}>
              {currentPlan.title}
            </h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={prevPlan} style={navBtnStyle}>
                <ChevronRight size={20} />
              </button>
              <span style={{ fontFamily: "'Changa', sans-serif", color: '#555', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                {activePlanIdx + 1} / {plans.length}
              </span>
              <button onClick={nextPlan} style={navBtnStyle}>
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>

          {/* Plan Images Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {currentPlan.images?.map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Image
                  src={img}
                  alt={currentPlan.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {!currentPlan.images || currentPlan.images.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#333' }}>
              لا توجد صور لهذه الخطة
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const navBtnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  onMouseEnter: (e: any) => { e.currentTarget.style.background = '#ff1022'; e.currentTarget.style.borderColor = '#ff1022'; },
  onMouseLeave: (e: any) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; },
};
