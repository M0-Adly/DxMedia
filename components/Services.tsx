'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: '🎨',
    title: 'تصاميم الجرافكس',
    desc: 'تصاميم بصرية مذهلة تخطف الأنظار وتوصل رسالتك بوضوح.',
    category: 'graphic',
  },
  {
    icon: '🎬',
    title: 'تحرير الفيديوهات',
    desc: 'مونتاج سينمائي احترافي مصمم لزيادة التفاعل وبقاء المشاهد.',
    category: 'video',
  },
  {
    icon: '📈',
    title: 'التسويق الرقمي',
    desc: 'استراتيجيات مبنية على البيانات لتنمية علامتك التجارية وتصدر السوق.',
    category: 'marketing',
  },
  {
    icon: '🌐',
    title: 'تصميم المواقع والمتاجر',
    desc: 'مواقع متجاوبة ومتاجر قوية تساعدك على بيع منتجاتك.',
    category: 'web',
  },
  {
    icon: '🤖',
    title: 'فيديوهات الذكاء الاصطناعي',
    desc: 'محتوى مبتكر بالذكاء الاصطناعي لقصص بصرية استثنائية.',
    category: 'ai',
  },
  {
    icon: '📢',
    title: 'الإعلانات الممولة',
    desc: 'حملات إعلانية عالية العائد على Meta وTikTok وGoogle.',
    category: 'ads',
  },

  {
    icon: '🎞️',
    title: 'فيديوهات موشن جرافيك',
    desc: 'رسوم متحركة حيوية وجذابة لشرح فكرتك ومنتجاتك.',
    category: 'motion',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
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

  const handleClick = () => {
    // 1. Dispatch event to filter portfolio
    window.dispatchEvent(new CustomEvent('setPortfolioCategory', { detail: service.category }));
    
    // 2. Scroll to portfolio
    const el = document.querySelector('#portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#111111' : '#0a0a0a',
        border: hovered ? '1px solid rgba(255,16,34,0.35)' : '1px solid rgba(255,255,255,0.06)',
        borderBottom: hovered ? '3px solid #ff1022' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: 'clamp(0.5rem, 2vw, 1.75rem)',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        transform: visible ? `translateY(0)` : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 'clamp(28px, 8vw, 52px)',
          height: 'clamp(28px, 8vw, 52px)',
          background: hovered ? 'rgba(255,16,34,0.2)' : 'rgba(255,16,34,0.1)',
          border: '1px solid rgba(255,16,34,0.25)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(0.9rem, 4vw, 1.5rem)',
          transition: 'all 0.3s ease',
          margin: '0 auto',
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: 'clamp(0.65rem, 3.5vw, 1.1rem)',
          fontWeight: 800,
          color: '#ffffff',
          textAlign: 'center',
          margin: 0,
        }}
      >
        {service.title}
      </h3>

      <p
        className="hidden-mobile"
        style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: 'clamp(0.7rem, 3.5vw, 0.9rem)',
          color: '#777',
          lineHeight: 1.5,
          flex: 1,
          margin: 0,
        }}
      >
        {service.desc}
      </p>
    </div>
  );
}

export default function Services() {
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

  return (
    <section
      id="services"
      style={{
        padding: '6rem 1.5rem',
        background: '#000000',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
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
          <span
            style={{
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
            }}
          >
            ما نقدمه
          </span>
          <h2
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#fff',
              letterSpacing: '2px',
              marginBottom: '1rem',
            }}
          >
            خدماتنا
          </h2>
          <p
            style={{
              fontFamily: "'Changa', sans-serif",
              color: '#777',
              fontSize: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            نقدم حلولاً شاملة لتنمية علامتك التجارية رقمياً وتحقيق أهدافك التسويقية
          </p>
        </div>

        {/* Grid */}
        <div className="grid-responsive">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
