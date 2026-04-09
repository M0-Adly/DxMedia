'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '#home' },
  { label: 'من نحن', href: '#about' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'الخطط التسويقية', href: '#marketing-plans' },
  { label: 'أعمالنا', href: '#portfolio' },
  { label: 'آراء العملاء', href: '#testimonials' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    // Check local storage or system preference
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newVal = !isLight;
    setIsLight(newVal);
    if (newVal) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      if (current > lastScroll.current && current > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease, background 0.3s ease',
          background: scrolled ? 'rgba(5,5,5,0.97)' : 'rgba(5,5,5,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          padding: '0 1.5rem',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#fff', letterSpacing: '1px' }}>Dx</span>
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#ff1022', letterSpacing: '1px' }}>Media</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ccc',
                  fontSize: '0.95rem',
                  fontFamily: "'Changa', sans-serif",
                  fontWeight: 500,
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff1022')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex"
              style={{
                background: '#ff1022',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '8px',
                fontFamily: "'Changa', sans-serif",
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3b0000';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ff1022';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              تواصل معنا
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(5,5,5,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          style={{ position: 'absolute', top: '24px', left: '24px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={28} />
        </button>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#fff' }}>Dx</span>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#ff1022' }}>Media</span>
        </div>
        {navLinks.map((link, i) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '1.5rem',
              fontFamily: "'Changa', sans-serif",
              fontWeight: 800,
              cursor: 'pointer',
              padding: '8px 0',
              transition: 'color 0.3s, opacity 0.4s, transform 0.4s',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.08}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff1022')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('#contact')}
          style={{
            marginTop: '1rem',
            background: '#ff1022',
            color: '#fff',
            border: 'none',
            padding: '14px 40px',
            borderRadius: '8px',
            fontFamily: "'Changa', sans-serif",
            fontWeight: 800,
            fontSize: '1.1rem',
            cursor: 'pointer',
          }}
        >
          تواصل معنا
        </button>
        <button
          onClick={toggleTheme}
          style={{
            marginTop: '1rem',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontFamily: "'Changa', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          {isLight ? <Moon size={20} /> : <Sun size={20} />}
          {isLight ? 'الوضع المظلم' : 'الوضع المضيء'}
        </button>
      </div>
    </>
  );
}
