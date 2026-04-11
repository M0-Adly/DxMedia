'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { X, Upload, Star, Loader2, File as FileIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Project, ProjectCategory } from '@/lib/types';

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: 'graphic', label: 'جرافيك' },
  { value: 'motion', label: 'موشن جرافيك' },
  { value: 'video', label: 'مونتاج فيديو' },
  { value: 'ads', label: 'إعلانات ممولة' },
  { value: 'web', label: 'تطوير مواقع' },
  { value: 'ai', label: 'ذكاء اصطناعي' },
  { value: 'other', label: 'أخرى' },
];

interface UploadModalProps {
  onClose: () => void;
  onSuccess: (project: Project) => void;
  editProject?: Project | null;
}

export default function UploadModal({ onClose, onSuccess, editProject }: UploadModalProps) {
  const [title, setTitle] = useState(editProject?.title || '');
  const [description, setDescription] = useState(editProject?.description || '');
  const [category, setCategory] = useState<ProjectCategory>(editProject?.category || 'graphic');
  const [projectUrl, setProjectUrl] = useState(editProject?.project_url || '');
  const [featured, setFeatured] = useState(editProject?.featured || false);
  const [isArchived, setIsArchived] = useState(editProject?.is_archived || false);
  const [orderIndex, setOrderIndex] = useState(editProject?.order_index || 0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(editProject?.image_url || '');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'file'>(
    (editProject?.image_url?.match(/\.(mp4|webm|mov)$/i)) ? 'video' : 
    (editProject?.image_url?.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) ? 'image' : 'file'
  );
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setError('');
    
    if (file.type.startsWith('video/')) {
      setMediaType('video');
      setImagePreview(URL.createObjectURL(file));
    } else if (file.type.startsWith('image/')) {
      setMediaType('image');
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setMediaType('file');
      setImagePreview(file.name); // Using name as preview indicator
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSave = async () => {
    if (!title) return setError('اسم المشروع مطلوب');
    if (!category) return setError('التصنيف مطلوب');

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const supabase = createClient();
      let imageUrl = editProject?.image_url || '';

      if (imageFile) {
        const ext = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${ext}`;
        setUploadProgress(30);

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(fileName, imageFile, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;
        setUploadProgress(70);

        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      setUploadProgress(90);

      const payload = { 
        title, 
        description: description || null, 
        category, 
        project_url: projectUrl || null, 
        featured, 
        is_archived: isArchived,
        order_index: Number(orderIndex),
        image_url: imageUrl || null 
      };

      if (editProject) {
        const { data, error: dbError } = await supabase
          .from('projects').update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', editProject.id).select().single();
        if (dbError) throw dbError;
        onSuccess(data as Project);
      } else {
        const { data, error: dbError } = await supabase.from('projects').insert([payload]).select().single();
        if (dbError) throw dbError;
        onSuccess(data as Project);
      }

      setUploadProgress(100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px 20px 0 0',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '2rem',
        animation: 'slideUp 0.35s ease',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <h2 style={{ fontFamily: "'Changa', sans-serif", color: '#ffffff', fontWeight: 800, fontSize: '1.15rem' }}>
            {editProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#777', cursor: 'pointer', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Information Notice */}
          <div style={{ background: 'rgba(255,16,34,0.05)', border: '1px solid rgba(255,16,34,0.15)', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ff1022', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={16} color="#fff" />
            </div>
            <p style={{ fontFamily: "'Changa', sans-serif", fontSize: '0.8rem', color: '#ccc', margin: 0 }}>
              يمكنك الآن رفع <b>صور</b>، <b>فيديوهات</b> (MP4)، أو <b>ملفات</b> (PDF, ZIP, إلخ). سيتم عرض أيقونة مناسبة للملفات تلقائياً.
            </p>
          </div>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}>
              اسم المشروع *
            </label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="اسم المشروع" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}>
              الوصف
            </label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="وصف مختصر للمشروع" rows={3}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
          </div>

          {/* Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}>
                التصنيف *
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value as ProjectCategory)} style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}>
                رابط المشروع
              </label>
              <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} placeholder="https://..." style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ff1022')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label style={{ display: 'block', fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.85rem', marginBottom: '6px' }}>
              ملف المشروع (صورة، فيديو، أو أي ملف آخر)
            </label>
            <div
              ref={dragRef}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: '2px dashed rgba(255,255,255,0.12)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: '#1a1a1a',
                transition: 'all 0.3s',
                minHeight: imagePreview ? 'auto' : '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,16,34,0.4)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
            >
              {imagePreview ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
                  {mediaType === 'video' ? (
                    <video src={imagePreview} autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : mediaType === 'image' ? (
                    <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ 
                      width: '100%', height: '100%', display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', color: '#ff1022', background: '#111'
                    }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(255,16,34,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <FileIcon size={40} />
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>ملف مشروع</span>
                      <span style={{ fontSize: '0.75rem', marginTop: '6px', color: '#666', padding: '0 20px', textAlign: 'center', maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{imagePreview}</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.3s',
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <span style={{ fontFamily: "'Changa', sans-serif", color: '#fff', fontWeight: 700 }}>تغيير الميديا</span>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={32} color="#555" />
                  <p style={{ fontFamily: "'Changa', sans-serif", color: '#777', fontSize: '0.9rem' }}>اسحب وأفلت الصورة أو الفيديو هنا</p>
                  <p style={{ fontFamily: "'Changa', sans-serif", color: '#555', fontSize: '0.8rem' }}>أو اضغط للاختيار</p>
                </>
              )}
            </div>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
          </div>

          {/* Progress bar */}
          {uploading && (
            <div style={{ background: '#1a1a1a', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: '#ff1022',
                width: `${uploadProgress}%`,
                borderRadius: '8px',
                transition: 'width 0.4s ease',
              }} />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
              <div
                onClick={() => setIsArchived(!isArchived)}
                style={{
                  width: '44px', height: '24px',
                  background: isArchived ? '#666' : '#333',
                  borderRadius: '12px',
                  position: 'relative',
                  transition: 'background 0.3s',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: isArchived ? '2px' : '22px',
                  width: '20px', height: '20px',
                  background: '#fff',
                  borderRadius: '50%',
                  transition: 'right 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }} />
              </div>
              <span style={{ fontFamily: "'Changa', sans-serif", color: isArchived ? '#ff1022' : '#aaa', fontSize: '0.9rem', fontWeight: isArchived ? 700 : 400 }}>
                أرشفة المشروع
              </span>
            </label>
          </div>

          {/* Featured toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div
              onClick={() => setFeatured(!featured)}
              style={{
                width: '44px', height: '24px',
                background: featured ? '#ff1022' : '#333',
                borderRadius: '12px',
                position: 'relative',
                transition: 'background 0.3s',
                cursor: 'pointer',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2px',
                right: featured ? '2px' : '22px',
                width: '20px', height: '20px',
                background: '#fff',
                borderRadius: '50%',
                transition: 'right 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }} />
            </div>
            <span style={{ fontFamily: "'Changa', sans-serif", color: '#aaa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={14} color={featured ? '#ff1022' : '#555'} fill={featured ? '#ff1022' : 'none'} />
              مشروع مميز
            </span>
          </label>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(255,16,34,0.08)', border: '1px solid rgba(255,16,34,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#f87171', fontFamily: "'Changa', sans-serif", fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button onClick={onClose} style={{
              flex: 1, background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '13px', fontFamily: "'Changa', sans-serif", fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            }}>
              إلغاء
            </button>
            <button onClick={handleSave} disabled={uploading} style={{
              flex: 2, background: uploading ? '#8b1c18' : '#ff1022', color: '#fff', border: 'none',
              borderRadius: '10px', padding: '13px', fontFamily: "'Changa', sans-serif", fontWeight: 800, fontSize: '0.95rem',
              cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.3s',
            }}>
              {uploading ? <><Loader2 size={18} style={{ animation: 'spin 0.7s linear infinite' }} />جاري الرفع...</> : 'حفظ المشروع'}
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  padding: '12px 14px',
  color: '#ffffff',
  fontFamily: "'Changa', sans-serif",
  fontSize: '0.9rem',
  outline: 'none',
  minHeight: '44px',
  transition: 'border-color 0.3s',
};
