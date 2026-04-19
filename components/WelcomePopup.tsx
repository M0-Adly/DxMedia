'use client';

import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay
    const timer = setTimeout(() => {
      setShouldRender(true);
      setIsVisible(true);
    }, 1000);

    // Hide after 8 seconds + delay
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      // Remove from DOM after transition
      setTimeout(() => setShouldRender(false), 500);
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        maxWidth: '400px',
        width: 'calc(100% - 48px)',
        background: 'rgba(15, 15, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 16, 34, 0.3)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 16, 34, 0.1)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        direction: 'rtl',
      }}
    >
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'none',
          border: 'none',
          color: '#666',
          cursor: 'pointer',
          padding: '4px',
        }}
      >
        <X size={18} />
      </button>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div 
          style={{ 
            background: 'rgba(255, 16, 34, 0.1)', 
            borderRadius: '12px', 
            padding: '10px',
            color: '#ff1022'
          }}
        >
          <Info size={24} />
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 
            style={{ 
              fontFamily: "'Changa', sans-serif", 
              color: '#fff', 
              fontSize: '1.2rem', 
              fontWeight: 800,
              marginBottom: '10px'
            }}
          >
            أهلاً بك في Dx Media
          </h3>
          
          <div 
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderRight: '3px solid #ff1022',
              padding: '12px 16px',
              borderRadius: '4px 8px 8px 4px'
            }}
          >
            <p 
              style={{ 
                fontFamily: "'Changa', sans-serif", 
                color: '#ddd', 
                fontSize: '1.05rem', 
                lineHeight: 1.6,
                margin: 0
              }}
            >
              إذا قمت <span style={{ color: '#ff1022', fontWeight: 900 }}>بالضغط</span> على أيٍّ من المشاريع الخاصة بنا، سوف تنتقل مباشرة إلى التفاصيل الخاصة بكل مشروع لتحظى بمشاهدة ممتعة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
