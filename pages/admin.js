import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';

const ADMIN_PASSWORD = 'vans2024';

const emptyVan = () => ({
  id: Date.now().toString(),
  title: '', price: '', year: new Date().getFullYear(),
  mileage: '', fuel: 'Дизел', transmission: 'Рачен',
  description: '', images: [], status: 'available',
});

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [vans, setVans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('adea_admin') === '1') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadVans();
  }, [authed]);

  const loadVans = async () => {
    const { data } = await supabase.from('vans').select('*').order('created_at', { ascending: false });
    setVans(data || []);
  };

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem('adea_admin', '1');
      setAuthed(true);
    } else {
      setPwError(true);
    }
  };

  const showToast = (msg, color = '#16a34a') => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (van) => {
    const payload = { ...van, price: Number(van.price), mileage: Number(van.mileage) };
    const exists = vans.find(v => v.id === van.id);
    if (exists) {
      await supabase.from('vans').update(payload).eq('id', van.id);
    } else {
      await supabase.from('vans').insert(payload);
    }
    setEditing(null);
    await loadVans();
    showToast('Возилото е зачувано.');
  };

  const handleDelete = async (id) => {
    if (!confirm('Дали сте сигурни?')) return;
    await supabase.from('vans').delete().eq('id', id);
    await loadVans();
    showToast('Возилото е избришано.', '#dc2626');
  };

  const handleToggleStatus = async (id, current) => {
    await supabase.from('vans').update({ status: current === 'sold' ? 'available' : 'sold' }).eq('id', id);
    await loadVans();
    showToast('Статусот е ажуриран.');
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 20 }}>
        <Head><title>Администрација — ADEA Autos</title></Head>
        <img src="/logo.jpg" alt="ADEA Autos" style={{ height: 50, objectFit: 'contain' }} />
        <div style={{ background: '#fff', border: '1px solid #e5e5e2', borderRadius: 12, padding: '32px 28px', width: '100%', maxWidth: 360 }}>
          <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>Администрација</p>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>Внесете ја лозинката за да продолжите</p>
          <input
            type="password" placeholder="Лозинка" value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', border: `1px solid ${pwError ? '#dc2626' : '#ddd'}`, borderRadius: 6, padding: '10px 14px', fontSize: 14, outline: 'none', marginBottom: 10, background: '#fafaf9' }}
            autoFocus
          />
          {pwError && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 10 }}>Погрешна лозинка.</p>}
          <button onClick={login} style={{ width: '100%', background: '#111', color: '#fff', border: 'none', padding: '11px', borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            Влези
          </button>
        </div>
        <a href="/" style={{ color: '#888', fontSize: 13 }}>← Назад кон сајтот</a>
      </div>
    );
  }

  return (
    <>
      <Head><title>Администрација — ADEA Autos</title></Head>
      <div style={{ minHeight: '100vh', background: '#f5f5f3' }}>
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e5e2', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a href="/"><img src="/logo.jpg" alt="ADEA Autos" style={{ height: 38, objectFit: 'contain' }} /></a>
              <span style={{ color: '#ddd', fontSize: 20 }}>|</span>
              <span style={{ color: '#888', fontSize: 14, fontWeight: 500 }}>Администрација</span>
            </div>
            <button onClick={() => setEditing(emptyVan())} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              + Додај возило
            </button>
          </div>
        </header>

        <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e2' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', display: 'flex', gap: 32 }}>
            {[
              { label: 'Вкупно', val: vans.length, color: '#111' },
              { label: 'Достапни', val: vans.filter(v => v.status === 'available').length, color: '#16a34a' },

            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', color: '#aaa', textTransform: 'uppercase', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {vans.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa', fontSize: 14 }}>
              Нема возила. Кликнете „Додај возило" за да почнете.
            </div>
          )}
          {vans.map(van => (
            <div key={van.id} style={{ background: '#fff', border: '1px solid #e5e5e2', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ width: 78, height: 52, borderRadius: 6, overflow: 'hidden', background: '#f0efed', flexShrink: 0 }}>
                {van.images?.[0]
                  ? <img src={van.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 11 }}>—</div>
                }
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{van.title}</p>
                <p style={{ color: '#888', fontSize: 12 }}>{van.year} · {van.mileage ? `${Number(van.mileage).toLocaleString()} км` : '—'} · {van.fuel}</p>
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#111', minWidth: 100 }}>€{Number(van.price).toLocaleString()}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setEditing({ ...van })} style={{ background: '#f5f5f3', border: '1px solid #e5e5e2', color: '#444', borderRadius: 5, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Уреди
                </button>
                <button onClick={() => handleDelete(van.id)} style={{ background: '#fff', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 5, padding: '5px 14px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                  Избриши
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && <EditModal initialVan={editing} onSave={handleSave} onClose={() => setEditing(null)} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 500, background: toast.color, color: '#fff', padding: '12px 22px', borderRadius: 8, fontWeight: 600, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          {toast.msg}
        </div>
      )}
    </>
  );
}

function EditModal({ initialVan, onSave, onClose }) {
  const [van, setVan] = useState(initialVan);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const set = (k, v) => setVan(prev => ({ ...prev, [k]: v }));
  const removeImg = (i) => setVan(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'xp7gmuof');
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/ditbmhejd/image/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.secure_url) {
          setVan(prev => ({ ...prev, images: [...(prev.images || []), data.secure_url] }));
        }
      } catch { alert('Грешка при качување.'); }
    }
    setUploading(false);
  };

  const handleSubmit = () => {
    if (!van.title.trim() || !van.price) return alert('Насловот и цената се задолжителни.');
    onSave({ ...van, price: Number(van.price), mileage: Number(van.mileage) });
  };

  const inputStyle = { width: '100%', border: '1px solid #ddd', borderRadius: 6, padding: '9px 13px', fontSize: 14, outline: 'none', background: '#fafaf9', color: '#111' };
  const labelStyle = { fontSize: 11, fontWeight: 600, color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5, display: 'block' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 14, maxWidth: 580, width: '100%', maxHeight: '92vh', overflowY: 'auto', padding: '30px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <p style={{ fontWeight: 700, fontSize: 18 }}>{van.title ? 'Уреди возило' : 'Додај возило'}</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: 26, lineHeight: 1, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Наслов *</label>
            <input value={van.title} onChange={e => set('title', e.target.value)} placeholder="пр. 2021 Ford Transit Custom 280" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Цена (€) *</label>
              <input type="number" value={van.price} onChange={e => set('price', e.target.value)} placeholder="22900" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Година</label>
              <input type="number" value={van.year} onChange={e => set('year', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Километри</label>
              <input type="number" value={van.mileage} onChange={e => set('mileage', e.target.value)} placeholder="54000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Статус</label>
              <select value={van.status} onChange={e => set('status', e.target.value)} style={inputStyle}>
                <option value="available">Достапно</option>
                <option value="sold">Продадено</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Гориво</label>
              <select value={van.fuel} onChange={e => set('fuel', e.target.value)} style={inputStyle}>
                <option>Дизел</option>
                <option>Бензин</option>
                <option>Електрично</option>
                <option>Хибрид</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Менувач</label>
              <select value={van.transmission} onChange={e => set('transmission', e.target.value)} style={inputStyle}>
                <option>Рачен</option>
                <option>Автоматски</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Опис</label>
            <textarea value={van.description} onChange={e => set('description', e.target.value)} rows={4} placeholder="Опишете ја состојбата, опремата, историјата..." style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Слики</label>
            {(van.images || []).filter(Boolean).length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {(van.images || []).filter(Boolean).map((img, i) => (
                  <div key={i} style={{ position: 'relative', width: 80, height: 60 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e5e2' }} />
                    <button onClick={() => removeImg(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#dc2626', border: 'none', color: '#fff', borderRadius: '50%', width: 20, height: 20, fontSize: 12, lineHeight: 1, cursor: 'pointer' }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
            <button
              type="button"
              onClick={() => fileRef.current.click()}
              disabled={uploading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'none', border: '1.5px dashed #ddd', color: uploading ? '#aaa' : '#555', borderRadius: 6, padding: '12px', fontSize: 14, width: '100%', fontWeight: 500, cursor: uploading ? 'not-allowed' : 'pointer' }}
            >
              {uploading ? '⏳ Се качува...' : '📁 Избери слики од компјутер'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ background: '#f5f5f3', border: '1px solid #e5e5e2', color: '#555', borderRadius: 6, padding: '10px 20px', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Откажи</button>
          <button type="button" onClick={handleSubmit} style={{ background: '#f97316', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Зачувај</button>
        </div>
      </div>
    </div>
  );
}