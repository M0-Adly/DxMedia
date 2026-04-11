'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, File as FileIcon } from 'lucide-react';
import { Project } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  graphic: 'جرافيك',
  motion: 'موشن جرافيك',
  video: 'مونتاج فيديو',
  ads: 'إعلانات ممولة',
  web: 'تطوير مواقع',
  ai: 'ذكاء اصطناعي',
  marketing: 'تسويق رقمي',
};

const FILTER_TABS = ['graphic', 'video', 'marketing', 'motion', 'web', 'ai', 'ads'];

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

  const isVideo = project.image_url?.match(/\.(mp4|webm|mov)$/i);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: project.project_url ? 'pointer' : 'default',
        background: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4), 0 0 15px rgba(255,16,34,0.05)' : 'none',
        height: '100%',
      }}
    >
      {/* Media Section */}
      <div 
        className="project-media"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          background: '#151515',
        }}
      >
        {project.image_url ? (
          isVideo ? (
            <video
              src={project.image_url}
              autoPlay
              muted
              loop
              playsInline
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
            />
          ) : project.image_url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              style={{ 
                objectFit: 'cover', 
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.4s ease',
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ff1022', background: '#0a0a0a' }}>
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(255,16,34,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' 
              }}>
                <FileIcon size={32} />
              </div>
              <span style={{ fontSize: '0.65rem', color: '#888', fontFamily: "'Changa', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>
                {project.image_url.split('.').pop() || 'ملف'}
              </span>
            </div>
          )
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            background: '#0a0a0a'
          }}>
            <FileIcon size={40} opacity={0.2} />
          </div>
        )}

        {/* Hover Overlay Icon */}
        {project.project_url && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 2,
          }}>
            <div style={{
              background: '#ff1022',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(255,16,34,0.4)',
            }}>
              <ExternalLink size={32} color="#fff" />
            </div>
          </div>
        )}

        {/* Featured Tag */}
        {project.featured && (
          <div 
            className="hidden-mobile"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: 'linear-gradient(90deg, #ff1022, #b00010)',
              color: '#fff',
              fontSize: '0.65rem',
              padding: '3px 10px',
              borderRadius: '4px',
              fontFamily: "'Changa', sans-serif",
              fontWeight: 800,
              zIndex: 3,
              boxShadow: '0 4px 10px rgba(255,16,34,0.3)',
            }}
          >
            مميز ⭐
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{
        padding: 'clamp(0.5rem, 2vw, 1.25rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        flexGrow: 1,
        textAlign: 'center', // Support RTL
      }}>
        <h3 
          className="project-title"
          style={{
            fontFamily: "'Changa', sans-serif",
            fontWeight: 800,
            color: hovered ? '#ff1022' : '#fff',
            margin: 0,
            transition: 'color 0.3s ease',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>
        {project.description && (
          <p 
            className="hidden-mobile"
            style={{
              fontFamily: "'Changa', sans-serif",
              fontSize: 'clamp(0.65rem, 3.5vw, 0.85rem)',
              color: '#888',
              margin: 0,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.description}
          </p>
        )}
      </div>
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
      <p style={{ fontFamily: "'Changa', sans-serif", color: '#555', fontSize: '1rem' }}>
        لم تتم إضافة أي مشاريع بعد
      </p>
      <p style={{ fontFamily: "'Changa', sans-serif", color: '#444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
        ادخل لوحة التحكم لإضافة مشاريعك
      </p>
    </div>
  );
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [activeTab, setActiveTab] = useState('graphic');
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);

    // External filter listener
    const handleExternalFilter = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('setPortfolioCategory', handleExternalFilter);

    return () => {
      observer.disconnect();
      window.removeEventListener('setPortfolioCategory', handleExternalFilter);
    };
  }, []);

  const filteredProjects = projects
    .filter(p => {
      if (p.is_archived) return false;
      
      // Match category - handling both 'graphic' and old 'images'
      if (activeTab === 'graphic') {
        return p.category === 'graphic' || (p.category as string) === 'images' || !p.category;
      }
      return p.category === activeTab;
    })
    .sort((a, b) => {
      // 1. Get numeric values, default to a very high number (1,000,000) for items with no order
      const aVal = (a.order_index === undefined || a.order_index === null || Number(a.order_index) === 0) 
        ? 1000000 
        : Number(a.order_index);
        
      const bVal = (b.order_index === undefined || b.order_index === null || Number(b.order_index) === 0) 
        ? 1000000 
        : Number(b.order_index);

      // 2. Sort by order_index ascending
      if (aVal !== bVal) return aVal - bVal;
      
      // 3. Tie-breaker: Newest creation date first
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });

  return (
    <section id="portfolio" style={{ padding: '6rem 1.5rem', background: '#050505', position: 'relative' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} style={{
          textAlign: 'center',
          marginBottom: '4rem',
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: '#fff',
            letterSpacing: '4px',
            marginBottom: '1rem',
          }}>
            معرض <span style={{ color: '#ff1022' }}>الأعمال</span>
          </h2>
          <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            نحول الأفكار إلى واقع رقمي ملموس من خلال تصاميم وحلول برمجية مبتكرة
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          padding: '0 10px',
        }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#ff1022' : 'transparent',
                color: activeTab === tab ? '#fff' : '#888',
                border: activeTab === tab ? '1px solid #ff1022' : '1px solid rgba(255,255,255,0.1)',
                padding: '10px 24px',
                borderRadius: '50px',
                fontFamily: "'Changa', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: activeTab === tab ? '0 10px 20px rgba(255,16,34,0.2)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.borderColor = 'rgba(255,16,34,0.5)';
                      e.currentTarget.style.color = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#888';
                    }
                  }}
                >
                  {CATEGORY_LABELS[tab] || tab}
                </button>
          ))}
        </div>

        {/* Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#444', fontFamily: "'Changa', sans-serif" }}>
            <p>لا توجد أعمال في هذا القسم حالياً</p>
          </div>
        ) : (
          <div className="grid-responsive">
            {filteredProjects.map((project, idx) => (
              <PortfolioItem key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
