'use client';

import Image from 'next/image';
import { Pencil, Trash2, ExternalLink, Star } from 'lucide-react';
import { Project } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  images: 'صور', motion: 'موشن', video: 'فيديو', ads: 'إعلانات',
  web: 'مواقع', ai: 'ذكاء اصطناعي', data: 'بيانات', other: 'أخرى',
};

const CATEGORY_COLORS: Record<string, string> = {
  images: '#6366f1', motion: '#8b5cf6', video: '#ec4899',
  ads: '#f97316', web: '#06b6d4', ai: '#14b8a6', data: '#22c55e', other: '#777',
};

interface ProjectCardProps {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
}

export default function ProjectCard({ project, onEdit, onDelete, onToggleFeatured }: ProjectCardProps) {
  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(128,0,0,0.25)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#111' }}>
        {project.image_url ? (
          project.image_url.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={project.image_url} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          ) : (
            <Image src={project.image_url} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
          )
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem', opacity: 0.3 }}>🖼️</span>
          </div>
        )}
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '8px', right: '8px',
          background: CATEGORY_COLORS[project.category] || '#777',
          color: '#fff', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px',
          fontFamily: "'Changa', sans-serif", fontWeight: 800,
        }}>
          {CATEGORY_LABELS[project.category] || project.category}
        </span>
        {project.featured && (
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            background: 'rgba(0,0,0,0.7)', color: '#800000',
            fontSize: '0.72rem', padding: '3px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px',
          }}>
            <Star size={10} fill="#800000" /> مميز
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontFamily: "'Changa', sans-serif", color: '#f0f0f0', fontWeight: 800, fontSize: '0.95rem', margin: 0 }}>
          {project.title}
        </h3>
        {project.description && (
          <p style={{ fontFamily: "'Changa', sans-serif", color: '#666', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
            {project.description.length > 80 ? project.description.slice(0, 80) + '...' : project.description}
          </p>
        )}
        {project.project_url && (
          <a href={project.project_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#4d9cf8', fontFamily: "'Changa', sans-serif", fontSize: '0.78rem', textDecoration: 'none' }}>
            <ExternalLink size={12} /> فتح الرابط
          </a>
        )}
      </div>

      {/* Actions */}
      <div style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
      }}>
        {/* Featured toggle */}
        <button
          onClick={() => onToggleFeatured(project.id, !project.featured)}
          title={project.featured ? 'إلغاء التمييز' : 'تمييز المشروع'}
          style={{
            background: project.featured ? 'rgba(128,0,0,0.1)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${project.featured ? 'rgba(128,0,0,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
            color: project.featured ? '#800000' : '#666',
            display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Changa', sans-serif", fontSize: '0.78rem', transition: 'all 0.3s',
          }}
        >
          <Star size={13} fill={project.featured ? '#800000' : 'none'} />
        </button>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => onEdit(project)}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#aaa',
            display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Changa', sans-serif", fontSize: '0.8rem', transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4d9cf8'; e.currentTarget.style.color = '#4d9cf8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#aaa'; }}
        >
          <Pencil size={13} /> تعديل
        </button>

        <button
          onClick={() => {
            if (window.confirm(`هل أنت متأكد من حذف "${project.title}"؟`)) onDelete(project.id);
          }}
          style={{
            background: 'rgba(128,0,0,0.08)', border: '1px solid rgba(128,0,0,0.15)',
            borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', color: '#800000',
            display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Changa', sans-serif", fontSize: '0.8rem', transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(128,0,0,0.2)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(128,0,0,0.08)'; }}
        >
          <Trash2 size={13} /> حذف
        </button>
      </div>
    </div>
  );
}
