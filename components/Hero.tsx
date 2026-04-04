'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

interface HeroStats {
  clients: string;
  projects: string;
  years: string;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero({ stats }: { stats: HeroStats }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
        paddingTop: '80px',
      }}
    >
      {/* Background layers */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(230,51,41,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, #0a0a0a, transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 1,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(230,51,41,0.1)',
            border: '1px solid rgba(230,51,41,0.25)',
            borderRadius: '50px',
            padding: '8px 20px',
            marginBottom: '2rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.6s ease',
          }}
        >
          <span style={{ fontSize: '1rem' }}>🔥</span>
          <span
            style={{
              fontFamily: "'Cairo', sans-serif",
              fontSize: '0.9rem',
              color: '#e63329',
              fontWeight: 600,
            }}
          >
            وكالة تسويق رقمي متميزة
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            lineHeight: 1,
            letterSpacing: '5px',
            color: '#fff',
            marginBottom: '1.5rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(20deg)',
            transition: 'all 0.9s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
            textShadow: '0 4px 0 #cc2211, 0 8px 0 #aa1100, 0 15px 30px rgba(230,51,41,0.5)',
          }}
        >
          Dx<span style={{ color: '#e63329' }}>Media</span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Cairo', sans-serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: '#888',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.3s',
          }}
        >
          نصنع محتوى إبداعياً وحملات تسويقية مدروسة تُرسّخ علامتك التجارية وتوصلها لأكبر عدد من العملاء المثاليين.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.45s',
          }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: '#e63329',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '8px',
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(230,51,41,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c0281f';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e63329';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ArrowLeft size={18} />
            ابدأ معنا
          </button>
          <button
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '14px 32px',
              borderRadius: '8px',
              fontFamily: "'Cairo', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#e63329';
              e.currentTarget.style.color = '#e63329';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#fff';
            }}
          >
            <Play size={16} />
            شاهد أعمالنا
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            maxWidth: '700px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.7s ease 0.6s',
          }}
        >
          {[
            { value: parseInt(stats.clients || '150'), label: 'عميل سعيد', suffix: '+' },
            { value: parseInt(stats.projects || '420'), label: 'مشروع منجز', suffix: '+' },
            { value: parseInt(stats.years || '6'), label: 'سنوات خبرة', suffix: '+' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#141414',
                padding: '2rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  color: '#e63329',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: '0.9rem',
                  color: '#777',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
