'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'الكل',
  images: 'صور',
  motion: 'موشن',
  video: 'فيديو',
  ads: 'إعلانات',
  web: 'مواقع',
  ai: 'ذكاء اصطناعي',
  data: 'بيانات',
  other: 'أخرى',
};

const FILTER_TABS = ['all', 'images', 'motion', 'video', 'ads', 'web'];

function PortfolioItem({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (project.project_url) window.open(project.project_url, '_blank');
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: project.project_url ? 'pointer' : 'default',
        background: '#141414',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
    >
      {project.image_url ? (
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #222 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '2.5rem' }}>🎨</span>
          <span style={{ color: '#555', fontSize: '0.8rem', fontFamily: "'Cairo', sans-serif" }}>{project.title}</span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(230,51,41,0.88)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <ExternalLink size={28} color="#fff" />
        <span style={{ fontFamily: "'Cairo', sans-serif", color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
          عرض المشروع
        </span>
        <span
          style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '20px',
            padding: '3px 12px',
            fontFamily: "'Cairo', sans-serif",
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.78rem',
          }}
        >
          {CATEGORY_LABELS[project.category] || project.category}
        </span>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: '#e63329',
          color: '#fff',
          fontSize: '0.7rem',
          padding: '3px 10px',
          borderRadius: '20px',
          fontFamily: "'Cairo', sans-serif",
          fontWeight: 700,
        }}>
          مميز ⭐
        </div>
      )}
    </div>
  );
}

// Placeholder empty state grid
function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        maxWidth: '600px',
        margin: '0 auto 2rem',
        opacity: 0.15,
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: '1',
            background: '#222',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.06)',
          }} />
        ))}
      </div>
      <p style={{ fontFamily: "'Cairo', sans-serif", color: '#555', fontSize: '1rem' }}>
        لم تتم إضافة أي مشاريع بعد
      </p>
      <p style={{ fontFamily: "'Cairo', sans-serif", color: '#444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
        ادخل لوحة التحكم لإضافة مشاريعك
      </p>
    </div>
  );
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState('all');
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

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      style={{ padding: '6rem 1.5rem', background: '#050505', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
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
            إبداعاتنا
          </span>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}>
            أعمالنا
          </h2>
          <p style={{ fontFamily: "'Cairo', sans-serif", color: '#777', fontSize: '1rem' }}>
            نماذج من مشاريعنا المنجزة مع عملائنا المميزين
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              style={{
                background: activeFilter === tab ? '#e63329' : 'rgba(255,255,255,0.05)',
                color: activeFilter === tab ? '#fff' : '#999',
                border: activeFilter === tab ? '1px solid #e63329' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50px',
                padding: '8px 20px',
                fontFamily: "'Cairo', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {CATEGORY_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}>
            {filtered.map((project, i) => (
              <PortfolioItem key={project.id} project={project} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        {projects.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                background: 'transparent',
                color: '#e63329',
                border: '1px solid rgba(230,51,41,0.4)',
                padding: '12px 32px',
                borderRadius: '8px',
                fontFamily: "'Cairo', sans-serif",
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,51,41,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              عرض كل الأعمال
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
