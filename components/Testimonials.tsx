'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '@/lib/types';

function TestimonialCard({ t }: { t: Testimonial }) {
  const [hovered, setHovered] = useState(false);

  if (t.image_url) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div 
          onClick={() => t.link_url && window.open(t.link_url, '_blank')}
          style={{ 
            position: 'relative', 
            width: '100%', 
            cursor: t.link_url ? 'pointer' : 'default',
            overflow: 'hidden',
            borderRadius: '14px',
          }} 
        >
          <img 
            src={t.image_url} 
            alt={t.name || 'Testimonial'} 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block', 
              transition: 'transform 0.3s ease',
              transform: hovered && t.link_url ? 'scale(1.02)' : 'scale(1)'
            }} 
          />
        </div>
        {t.name && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontWeight: 600, fontSize: '0.9rem' }}>
              {t.name}
            </div>
            {(t.role || t.company) && (
              <div style={{ fontFamily: "'Changa', sans-serif", color: '#999', fontSize: '0.8rem' }}>
                {t.role}{t.company ? ` — ${t.company}` : ''}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0a0a0a',
        border: hovered ? '1px solid rgba(74,0,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? '0 8px 30px rgba(74,0,0,0.08)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        minHeight: '320px',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '20px',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '8rem',
        color: 'rgba(255,16,34,0.08)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        &quot;
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: '#eee',
          lineHeight: 1.8,
          fontStyle: 'italic',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          "{t.content}"
        </p>
      </div>

      {/* Author */}
      {(t.name || t.role) && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '16px', 
          padding: '0',
          marginTop: '1.5rem',
          borderTop: 'none',
        }}>
          {t.name && (
            <>
              {t.avatar_url ? (
                <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={t.avatar_url} alt={t.name} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                </div>
              ) : (
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff1022, #3b0000)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: "'Changa', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}>
                  {t.name.charAt(0)}
                </div>
              )}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>
                  {t.name}
                </div>
                {(t.role || t.company) && (
                  <div style={{ fontFamily: "'Changa', sans-serif", color: '#999', fontSize: '0.9rem' }}>
                    {t.role}{t.company ? ` — ${t.company}` : ''}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
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
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const displayList = testimonials.length > 0 ? [...testimonials].sort((a, b) => {
    const aV = (a.order_index === undefined || a.order_index === null || Number(a.order_index) === 0) ? 1000000 : Number(a.order_index);
    const bV = (b.order_index === undefined || b.order_index === null || Number(b.order_index) === 0) ? 1000000 : Number(b.order_index);
    if (aV !== bV) return aV - bV;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }) : PLACEHOLDER_TESTIMONIALS;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === displayList.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayList.length - 1 : prev - 1));
  };

  return (
    <section
      id="testimonials"
      style={{ padding: '6rem 1.5rem', background: '#000000' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
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
          <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '1rem' }}>
            ماذا يقول عملاؤنا عن تجربتهم معنا
          </p>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <button 
            onClick={nextTestimonial}
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 10,
              background: 'rgba(255,16,34,0.1)',
              border: '1px solid rgba(255,16,34,0.2)',
              color: '#ff1022',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ff1022'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,16,34,0.1)'; e.currentTarget.style.color = '#ff1022'; }}
            aria-label="Next Testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div style={{ width: '100%', overflow: 'hidden', padding: '1rem 3rem' }}>
            <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentIndex * 100}%)`, direction: 'ltr' }}>
              {displayList.map((t, idx) => (
                <div key={t.id || idx} style={{ width: '100%', flexShrink: 0, padding: '0 1rem', direction: 'rtl' }}>
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={prevTestimonial}
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 10,
              background: 'rgba(255,16,34,0.1)',
              border: '1px solid rgba(255,16,34,0.2)',
              color: '#ff1022',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#ff1022'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,16,34,0.1)'; e.currentTarget.style.color = '#ff1022'; }}
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={24} />
          </button>

        </div>

        {/* Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
          {displayList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: currentIndex === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentIndex === idx ? '#ff1022' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
