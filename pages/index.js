import { useState, useRef } from 'react';
import Head from 'next/head';
import { vans as allVans } from '../lib/vans';

const WA1 = 'https://wa.me/38972599436';
const WA2 = 'https://wa.me/38970424069';

const vans = allVans.filter(v => v.status === 'available');

export default function Home() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <VanPage van={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <Head>
        <title>ADEA Autos — Увоз на Товарни Возила</title>
        <meta name="description" content="Товарни возила за продажба. ADEA Autos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @media (min-width: 768px) {
            .hero-inner {
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              gap: 40px !important;
            }
            .hero-buttons {
              flex-direction: row !important;
              justify-content: flex-end !important;
              flex-shrink: 0 !important;
            }
            .hero-btn { width: 200px !important; }
            .van-grid {
              grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
            }
            .footer-inner {
              max-width: 1100px !important;
              margin: 0 auto !important;
              display: flex !important;
              justify-content: space-between !important;
              align-items: flex-start !important;
              flex-wrap: wrap !important;
              gap: 20px !important;
            }
          }
        `}</style>
      </Head>

      <div style={{ minHeight: '100vh', background: '#f5f5f3', fontFamily: 'Inter, sans-serif' }}>

        {/* HERO */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e2', padding: '20px 24px' }}>
          <div className="hero-inner" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div>
              <img src="/logo.jpg" alt="ADEA Autos" style={{ width: '100%', maxWidth: 340, height: 'auto', display: 'block', marginBottom: 16 }} />
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', color: '#f97316', textTransform: 'uppercase', marginBottom: 6 }}>
                Увоз на товарни возила
              </p>
              <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: '#111', marginBottom: 16 }}>
                Товарни возила за продажба
              </h1>
            </div>
            <div className="hero-buttons" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={WA1} target="_blank" rel="noopener noreferrer" className="hero-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '13px 20px', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                <WhatsAppIcon /> 072 599 436
              </a>
              <a href={WA2} target="_blank" rel="noopener noreferrer" className="hero-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '13px 20px', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                <WhatsAppIcon /> 070 424 069
              </a>
            </div>
          </div>
        </div>

        {/* VAN LIST */}
        <div className="van-grid" style={{ padding: '24px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {vans.length === 0 && <p style={{ textAlign: 'center', color: '#aaa', padding: '60px 0', fontSize: 15 }}>Во моментов нема достапни возила.</p>}
          {vans.map(van => (
            <VanCard key={van.id} van={van} onClick={() => setSelected(van)} />
          ))}
        </div>

        {/* FOOTER */}
        <footer style={{ background: '#111', color: '#aaa', marginTop: 8, padding: '24px' }}>
          <div className="footer-inner">
            <div style={{ marginBottom: 16 }}>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 2 }}>ADEA Autos</p>
              <p style={{ fontSize: 13 }}>Увоз на товарни возила</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, marginBottom: 16 }}>
              <a href="tel:+38972599436" style={{ color: '#f97316', fontWeight: 600 }}>072 599 436</a>
              <a href="tel:+38970424069" style={{ color: '#f97316', fontWeight: 600 }}>070 424 069</a>
              <a href="mailto:besartr1995@gmail.com" style={{ color: '#555', fontSize: 12 }}>besartr1995@gmail.com</a>
            </div>
            <div style={{ borderTop: '1px solid #222', paddingTop: 14, fontSize: 12, color: '#444', width: '100%' }}>
              <span>© {new Date().getFullYear()} ADEA Autos</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.847L.057 23.882l6.198-1.438A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.865 9.865 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
    </svg>
  );
}

function VanCard({ van, onClick }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', border: '1px solid #e5e5e2', borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 200, background: '#f0efed', overflow: 'hidden' }}>
        {van.images?.[0]
          ? <img src={van.images[0]} alt={van.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: 13 }}>Нема слика</div>
        }
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 10, color: '#111' }}>{van.title}</h2>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {[van.year, van.mileage ? `${Number(van.mileage).toLocaleString()} км` : null, van.fuel, van.transmission].filter(Boolean).map((tag, i) => (
            <span key={i} style={{ background: '#f5f5f3', border: '1px solid #e5e5e2', borderRadius: 4, padding: '3px 8px', fontSize: 12, color: '#666', fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
        <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {van.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#111' }}>{van.price ? "€" + Number(van.price).toLocaleString() : ""}</span>
          <span style={{ fontSize: 13, color: '#f97316', fontWeight: 600 }}>Погледни →</span>
        </div>
      </div>
    </div>
  );
}

function SmoothGallery({ images, onFullscreen }) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(null);
  const containerRef = useRef(null);

  const goTo = (index) => {
    setCurrent(Math.max(0, Math.min(images.length - 1, index)));
    setDragX(0);
  };

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; setDragging(true); };
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const diff = e.touches[0].clientX - startX.current;
    if ((current === 0 && diff > 0) || (current === images.length - 1 && diff < 0)) {
      setDragX(diff * 0.2);
    } else {
      setDragX(diff);
    }
  };
  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    setDragging(false);
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    else setDragX(0);
    startX.current = null;
  };

  const w = containerRef.current?.offsetWidth || 0;
  const translateX = -(current * w) + dragX;

  return (
    <div ref={containerRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden', background: '#111' }}>
      <div style={{
        display: 'flex', height: '100%',
        width: `${images.length * 100}%`,
        transform: `translateX(${translateX}px)`,
        transition: dragging ? 'none' : 'transform 0.3s ease',
        willChange: 'transform',
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ width: `${100 / images.length}%`, height: '100%', flexShrink: 0 }}>
            <img src={img} alt="" onClick={() => onFullscreen(i)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in', display: 'block' }} />
          </div>
        ))}
      </div>
      {current > 0 && (
        <button onClick={() => goTo(current - 1)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
      )}
      {current < images.length - 1 && (
        <button onClick={() => goTo(current + 1)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      )}
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 5 }}>
          {images.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} style={{ width: 6, height: 6, borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }} />
          ))}
        </div>
      )}
      <div style={{ position: 'absolute', top: 10, right: 12, background: 'rgba(0,0,0,0.45)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

function FullscreenViewer({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(null);

  const goTo = (index) => {
    setCurrent(Math.max(0, Math.min(images.length - 1, index)));
    setDragX(0);
  };

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; setDragging(true); };
  const onTouchMove = (e) => {
    if (startX.current === null) return;
    const diff = e.touches[0].clientX - startX.current;
    if ((current === 0 && diff > 0) || (current === images.length - 1 && diff < 0)) {
      setDragX(diff * 0.2);
    } else {
      setDragX(diff);
    }
  };
  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    setDragging(false);
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    else setDragX(0);
    startX.current = null;
  };

  // Use window.innerWidth for fullscreen - each slide is exactly 100vw
  const vw = typeof window !== 'undefined' ? window.innerWidth : 390;
  const translateX = -(current * vw) + dragX;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 500, overflow: 'hidden' }}
    >
      {/* Sliding strip — each slide is 100vw */}
      <div style={{
        display: 'flex',
        height: '100%',
        transform: `translateX(${translateX}px)`,
        transition: dragging ? 'none' : 'transform 0.3s ease',
        willChange: 'transform',
      }}>
        {images.map((img, i) => (
          <div key={i} style={{ width: '100vw', flexShrink: 0, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={img} alt="" style={{ maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 40, height: 40, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>×</button>

      {/* Counter */}
      <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: 13, fontWeight: 600, background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: 20, zIndex: 10 }}>
        {current + 1} / {images.length}
      </div>

      {/* Arrows */}
      {current > 0 && (
        <button onClick={() => goTo(current - 1)} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>‹</button>
      )}
      {current < images.length - 1 && (
        <button onClick={() => goTo(current + 1)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: 44, height: 44, fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>›</button>
      )}
    </div>
  );
}

function VanPage({ van, onBack }) {
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  return (
    <>
      <Head>
        <title>{van.title} — ADEA Autos</title>
        <style>{`body { margin: 0; font-family: Inter, sans-serif; background: #f5f5f3; }`}</style>
      </Head>
      <div style={{ minHeight: '100vh', background: '#f5f5f3', fontFamily: 'Inter, sans-serif' }}>

        {/* Sticky back header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff', borderBottom: '1px solid #e5e5e2', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="button" onClick={onBack} style={{ background: '#f5f5f3', border: '1px solid #e5e5e2', color: '#111', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '6px 14px', borderRadius: 8, fontWeight: 600 }}>← Назад</button>
          <span style={{ fontWeight: 600, fontSize: 15, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{van.title}</span>
        </div>

        {/* Gallery */}
        {van.images?.length > 0 && (
          <SmoothGallery images={van.images} onFullscreen={(i) => setFullscreenIndex(i)} />
        )}

        {/* Details */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px 40px' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: '#111' }}>{van.title}</h1>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {[van.year, van.mileage ? `${Number(van.mileage).toLocaleString()} км` : null, van.fuel, van.transmission].filter(Boolean).map((tag, i) => (
              <span key={i} style={{ background: '#fff', border: '1px solid #e5e5e2', borderRadius: 4, padding: '4px 10px', fontSize: 13, color: '#555', fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 34, fontWeight: 700, color: '#111' }}>{van.price ? "€" + Number(van.price).toLocaleString() : ""}</span>
          </div>
          <p style={{ color: '#555', lineHeight: 1.8, fontSize: 14, marginBottom: 28, whiteSpace: 'pre-wrap' }}>{van.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href={WA1} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '15px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              <WhatsAppIcon /> 072 599 436
            </a>
            <a href={WA2} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '15px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              <WhatsAppIcon /> 070 424 069
            </a>
          </div>
        </div>
      </div>

      {fullscreenIndex !== null && (
        <FullscreenViewer images={van.images} startIndex={fullscreenIndex} onClose={() => setFullscreenIndex(null)} />
      )}
    </>
  );
}