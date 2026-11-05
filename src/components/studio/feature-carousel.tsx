import { useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { services } from '@/lib/studio-data';

const picks = ['residential-interiors', 'architecture', 'modular-kitchens', 'commercial-interiors', 'false-ceilings-lighting', 'construction-management', 'pooja-room-design'];
const cards = picks.map(slug => services.find(s => s.slug === slug)!).filter(Boolean);

export function FeatureCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const scroll = (dir: number) => {
    const el = track.current; if (!el) return;
    const card = el.querySelector<HTMLElement>('.fc-card');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: 'smooth' });
  };

  const item = active === null ? null : cards[active];

  return (
    <section className="section fc-section">
      <div className="container"><h2 className="fc-title">Get to know Architectique.</h2></div>
      <div
        ref={track}
        className="fc-track"
        onPointerDown={e => { if (e.pointerType !== 'mouse' || !track.current) return; drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }; }}
        onPointerMove={e => { const d = drag.current; if (!d || !track.current) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; track.current.scrollLeft = d.left - dx; }}
        onPointerUp={() => { setTimeout(() => { drag.current = null; }, 0); }}
        onPointerLeave={() => { drag.current = null; }}
        onClickCapture={e => { if (drag.current?.moved) { e.preventDefault(); e.stopPropagation(); } }}
      >
        {cards.map((s, i) => (
          <article key={s.slug} className={i % 2 ? 'fc-card dark' : 'fc-card'}>
            <span className="fc-cat">{s.title}</span>
            <h3>{s.short}</h3>
            <img src={s.image} alt={`${s.title} — illustrative design inspiration`} loading="lazy" draggable={false} />
            <button type="button" className="fc-plus" aria-label={`More about ${s.title}`} onClick={() => setActive(i)}><Plus size={20} /></button>
          </article>
        ))}
      </div>
      <div className="container fc-controls">
        <button type="button" aria-label="Previous" onClick={() => scroll(-1)}><ChevronLeft size={20} /></button>
        <button type="button" aria-label="Next" onClick={() => scroll(1)}><ChevronRight size={20} /></button>
      </div>
      {item && (
        <div className="fc-modal" role="dialog" aria-modal="true" aria-label={item.title} onClick={() => setActive(null)}>
          <div className="fc-modal-panel" onClick={e => e.stopPropagation()}>
            <button type="button" className="fc-close" aria-label="Close" onClick={() => setActive(null)}><X size={18} /></button>
            <span className="fc-cat">{item.title}</span>
            <h3>{item.short}</h3>
            <p>{item.description}</p>
            <ul>{item.items.map(x => <li key={x}>{x}</li>)}</ul>
            <Link to="/services/$slug" params={{ slug: item.slug }} className="fc-link">Explore service</Link>
          </div>
        </div>
      )}
    </section>
  );
}
