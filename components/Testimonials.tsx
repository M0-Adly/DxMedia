'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Testimonial } from '@/lib/types';

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#141414',
        border: hovered ? '1px solid rgba(230,51,41,0.35)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transition: `all 0.5s ease ${index * 0.12}s`,
        boxShadow: hovered ? '0 8px 30px rgba(230,51,41,0.08)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Big quote mark */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '20px',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '8rem',
        color: 'rgba(230,51,41,0.08)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        &quot;
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < t.rating ? '#e63329' : 'transparent'}
            color={i < t.rating ? '#e63329' : '#444'}
          />
        ))}
      </div>

      {/* Content */}
      {t.image_url ? (
        <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: t.link_url ? 'pointer' : 'default' }} onClick={() => t.link_url && window.open(t.link_url, '_blank')}>
          <img src={t.image_url} alt={t.name} style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => t.link_url && (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={(e) => t.link_url && (e.currentTarget.style.transform = 'scale(1)')} />
          {t.link_url && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(230,51,41,0.9)', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Star size={14} fill="white" />
            </div>
          )}
        </div>
      ) : (
        <p style={{
          fontFamily: "'Cairo', sans-serif",
          fontSize: '0.95rem',
          color: '#bbb',
          lineHeight: 1.8,
          fontStyle: 'italic',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}>
          {t.content}
        </p>
      )}

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: t.image_url ? '0.5rem' : '0' }}>
        {t.avatar_url ? (
          <div style={{ position: 'relative', width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <Image src={t.avatar_url} alt={t.name} fill style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e63329, #c0281f)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: "'Cairo', sans-serif",
            fontWeight: 700,
            fontSize: '1.1rem',
            flexShrink: 0,
          }}>
            {t.name.charAt(0)}
          </div>
        )}
        <div>
          <div style={{ fontFamily: "'Cairo', sans-serif", color: '#f0f0f0', fontWeight: 700, fontSize: '0.95rem' }}>
            {t.name}
          </div>
          <div style={{ fontFamily: "'Cairo', sans-serif", color: '#777', fontSize: '0.8rem' }}>
            {t.role}{t.company ? ` — ${t.company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder cards when no testimonials
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد الشمري',
    role: 'مدير تسويق',
    company: 'شركة النجوم',
    content: 'تجربة رائعة مع Dx Media، قدموا لنا محتوى إبداعياً رفع من مستوى علامتنا التجارية بشكل ملحوظ في وقت قياسي.',
    rating: 5,
    is_active: true,
    created_at: '',
  },
  {
    id: '2',
    name: 'سارة القحطاني',
    role: 'صاحبة مشروع',
    company: 'متجر لمسة',
    content: 'الاحترافية والدقة في التنفيذ هما ما يميز هذا الفريق. أنصح بهم بشدة لكل من يريد نتائج فعلية وملموسة.',
    rating: 5,
    is_active: true,
    created_at: '',
  },
  {
    id: '3',
    name: 'محمد العتيبي',
    role: 'رائد أعمال',
    company: '',
    content: 'أفضل استثمار قمت به لمشروعي. فريق Dx Media متميز في الإبداع والالتزام بالمواعيد وجودة التسليم.',
    rating: 5,
    is_active: true,
    created_at: '',
  },
];

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const displayList = testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      style={{ padding: '6rem 1.5rem', background: '#0a0a0a' }}
    >
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
            ثقة عملائنا
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}>
            آراء العملاء
          </h2>
          <p style={{ fontFamily: "'Cairo', sans-serif", color: '#777', fontSize: '1rem' }}>
            ماذا يقول عملاؤنا عن تجربتهم معنا
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {displayList.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
