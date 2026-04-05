'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.push('/admin/dashboard');
    } catch {
      setError('بيانات الدخول غير صحيحة، يرجى المحاولة مجدداً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(208,0,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Card */}
        <div style={{
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#fff', letterSpacing: '2px' }}>Dx</span>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#D00000', letterSpacing: '2px' }}>Media</span>
            </div>
            <h1 style={{
              fontFamily: "'Almarai', sans-serif",
              fontSize: '1.1rem',
              color: '#888',
              fontWeight: 500,
            }}>
              لوحة التحكم
            </h1>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '2rem' }} />

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Almarai', sans-serif",
                color: '#aaa',
                fontSize: '0.875rem',
                marginBottom: '8px',
              }}>
                البريد الإلكتروني
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dxmedia.sa"
                required
                style={{
                  width: '100%',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '13px 16px',
                  color: '#f0f0f0',
                  fontFamily: "'Almarai', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  minHeight: '48px',
                  direction: 'ltr',
                  textAlign: 'left',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#D00000')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'Almarai', sans-serif",
                color: '#aaa',
                fontSize: '0.875rem',
                marginBottom: '8px',
              }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '13px 48px 13px 16px',
                    color: '#f0f0f0',
                    fontFamily: "'Almarai', sans-serif",
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    minHeight: '48px',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#D00000')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(208,0,0,0.08)',
                border: '1px solid rgba(208,0,0,0.2)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#f87171',
                fontFamily: "'Almarai', sans-serif",
                fontSize: '0.875rem',
              }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#8b1c18' : '#D00000',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontFamily: "'Almarai', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                minHeight: '48px',
                marginTop: '0.5rem',
                boxShadow: '0 4px 20px rgba(208,0,0,0.3)',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#3b0000'; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#D00000'; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: '20px', height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                  جاري الدخول...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontFamily: "'Almarai', sans-serif",
            color: '#555',
            fontSize: '0.8rem',
          }}>
            للوصول إلى لوحة التحكم، يجب أن تكون مسجلاً في Supabase Auth
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
