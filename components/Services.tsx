'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: '🎨',
    title: 'تصاميم الجرافكس',
    desc: 'تصاميم بصرية مذهلة تخطف الأنظار وتوصل رسالتك بوضوح.',
  },
  {
    icon: '🎬',
    title: 'تحرير الفيديوهات',
    desc: 'مونتاج سينمائي احترافي مصمم لزيادة التفاعل وبقاء المشاهد.',
  },
  {
    icon: '📈',
    title: 'التسويق الرقمي',
    desc: 'استراتيجيات مبنية على البيانات لتنمية علامتك التجارية وتصدر السوق.',
  },
  {
    icon: '🌐',
    title: 'تصميم المواقع والمتاجر',
    desc: 'مواقع متجاوبة ومتاجر قوية تساعدك على بيع منتجاتك.',
  },
  {
    icon: '🤖',
    title: 'فيديوهات الذكاء الاصطناعي',
    desc: 'محتوى مبتكر بالذكاء الاصطناعي لقصص بصرية استثنائية.',
  },
  {
    icon: '📢',
    title: 'الإعلانات الممولة',
    desc: 'حملات إعلانية عالية العائد على Meta وTikTok وGoogle.',
  },
  {
    icon: '🗄️',
    title: 'برامج الإدارة والبيانات',
    desc: 'برامج احترافية لإدارة المؤسسات وتحليل البيانات المعقدة.',
  },
  {
    icon: '🎞️',
    title: 'فيديوهات موشن جرافيك',
    desc: 'رسوم متحركة حيوية وجذابة لشرح فكرتك ومنتجاتك.',
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

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1c1c1c' : '#141414',
        border: hovered ? '1px solid rgba(128,0,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
        borderBottom: hovered ? '3px solid #800000' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '1.75rem',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        transform: visible ? `translateY(0)` : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: '52px',
          height: '52px',
          background: hovered ? 'rgba(128,0,0,0.2)' : 'rgba(128,0,0,0.1)',
          border: '1px solid rgba(128,0,0,0.25)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'all 0.3s ease',
        }}
      >
        {service.icon}
      </div>

      <h3
        style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 800,
          color: '#f0f0f0',
          textAlign: 'right',
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: "'Changa', sans-serif",
          fontSize: '0.9rem',
          color: '#777',
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {service.desc}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#800000',
          fontFamily: "'Changa', sans-serif",
          fontSize: '0.875rem',
          fontWeight: 700,
          marginTop: 'auto',
          transition: 'gap 0.3s ease',
        }}
      >
        <span>اعرف المزيد</span>
        <span style={{ transform: hovered ? 'translateX(-4px)' : 'translateX(0)', transition: 'transform 0.3s' }}>←</span>
      </div>
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
        background: '#0a0a0a',
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
              background: 'rgba(128,0,0,0.1)',
              border: '1px solid rgba(128,0,0,0.25)',
              borderRadius: '50px',
              padding: '6px 18px',
              color: '#800000',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
