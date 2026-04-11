'use client';

import Image from 'next/image';
import { Pencil, Trash2, ExternalLink, Star, ChevronUp, ChevronDown, File as FileIcon } from 'lucide-react';
import { Project } from '@/lib/types';

const CATEGORY_LABELS: Record<string, string> = {
  graphic: 'جرافيك', motion: 'موشن', video: 'فيديو', ads: 'إعلانات',
  web: 'مواقع وتطبيقات', ai: 'ذكاء اصطناعي', other: 'أخرى',
};

const CATEGORY_COLORS: Record<string, string> = {
  graphic: '#6366f1', motion: '#8b5cf6', video: '#ec4899',
  ads: '#f97316', web: '#06b6d4', ai: '#14b8a6', other: '#777',
};

interface ProjectCardProps {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, featured: boolean) => void;
  onMove?: (id: string, direction: 'up' | 'down') => void;
}

export default function ProjectCard({ project, onEdit, onDelete, onToggleFeatured, onMove }: ProjectCardProps) {
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
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,16,34,0.25)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#111' }}>
        {project.image_url ? (
          project.image_url.match(/\.(mp4|webm|mov)$/i) ? (
            <video src={project.image_url} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          ) : project.image_url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) ? (
            <Image src={project.image_url} alt={project.title} fill style={{ objectFit: 'cover' }} sizes="400px" />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ff1022' }}>
              <FileIcon size={40} />
              <span style={{ fontSize: '0.6rem', color: '#555', marginTop: '4px' }}>ملف</span>
            </div>
          )
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem', opacity: 0.3 }}>📁</span>
          </div>
        )}
        
        {/* badges */}
        <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          <span style={{
            background: CATEGORY_COLORS[project.category] || '#777',
            color: '#fff', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px',
            fontFamily: "'Changa', sans-serif", fontWeight: 800,
          }}>
            {CATEGORY_LABELS[project.category] || project.category}
          </span>
          {project.order_index !== undefined && project.order_index > 0 && project.order_index < 1000000 && (
            <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px' }}>
              الترتيب: {project.order_index}
            </span>
          )}
        </div>

        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {project.featured && (
            <span style={{
              background: 'rgba(0,0,0,0.7)', color: '#ff1022',
              fontSize: '0.72rem', padding: '3px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <Star size={10} fill="#ff1022" /> مميز
            </span>
          )}
          {project.is_archived && (
            <span style={{
              background: '#333', color: '#ff1022',
              fontSize: '0.72rem', padding: '3px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px',
              border: '1px solid #ff1022'
            }}>
              مؤرشف 📁
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontWeight: 800, fontSize: '0.95rem', margin: 0 }}>
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
      <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onMove?.(project.id, 'up')}
            title="تحريك للأعلى"
            style={{ padding: '6px', background: '#222', color: '#888', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={() => onMove?.(project.id, 'down')}
            title="تحريك للأسفل"
            style={{ padding: '6px', background: '#222', color: '#888', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
          >
            <ChevronDown size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onToggleFeatured(project.id, !project.featured)}
            style={{ color: project.featured ? '#ff1022' : '#555', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <Star size={18} fill={project.featured ? '#ff1022' : 'none'} />
          </button>
          <button onClick={() => onEdit(project)}
            style={{ color: '#888', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <Pencil size={18} />
          </button>
          <button onClick={() => { if(confirm('حذف؟')) onDelete(project.id)}}
            style={{ color: '#ff1022', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
