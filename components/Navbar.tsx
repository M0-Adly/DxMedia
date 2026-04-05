'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Home, Info, Briefcase, LayoutGrid, Phone, Star } from 'lucide-react';

const navLinks = [
  { label: 'الرئيسية', href: '#home', icon: <Home size={20} /> },
  { label: 'من نحن', href: '#about', icon: <Info size={20} /> },
  { label: 'خدماتنا', href: '#services', icon: <Briefcase size={20} /> },
  { label: 'أعمالنا', href: '#portfolio', icon: <LayoutGrid size={20} /> },
  { label: 'آراء العملاء', href: '#testimonials', icon: <Star size={20} /> },
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
            {/* No hamburger on mobile if using bottom nav, unless you want both. 
                Let's keep it but maybe it's what's causing the "overlap" if it's too close to other things.
                I will remove it and use the elegant bottom nav instead. */}
            <div className="md:hidden">
              <button
                onClick={toggleTheme}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Toggle theme"
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px 15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 16, 34, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff1022')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
          >
            {link.icon}
            <span style={{ fontSize: '0.65rem', fontFamily: "'Changa', sans-serif", fontWeight: 600 }}>{link.label}</span>
          </button>
        ))}
        <button
          onClick={() => handleNavClick('#contact')}
          style={{
            background: '#ff1022',
            border: 'none',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(255, 16, 34, 0.3)',
            marginLeft: '5px'
          }}
        >
          <Phone size={18} />
          <span style={{ fontSize: '0.65rem', fontFamily: "'Changa', sans-serif", fontWeight: 700 }}>تواصل</span>
        </button>
      </div>
    </>
  );
}
