import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { indiaStates, INDIA_VIEWBOX, project } from '@/lib/india-map-paths';
import { filterLocations, locationFilters, projectLocations, regionCards, type LocationFilter } from '@/lib/project-locations';

const stateFilter: Record<string, LocationFilter> = { 'Andhra Pradesh': 'Andhra Pradesh', Karnataka: 'Karnataka', 'Tamil Nadu': 'Other South Indian Locations', Kerala: 'Other South Indian Locations' };

export function ProjectMap() {
  const [filter, setFilter] = useState<LocationFilter>('All Locations');
  const visible = useMemo(() => filterLocations(filter), [filter]);
  const [activeId, setActiveId] = useState('hyderabad');
  const active = visible.find(l => l.id === activeId) ?? visible[0];
  const choose = (f: LocationFilter) => { setFilter(f); const first = filterLocations(f)[0]; if (first) setActiveId(first.id); };
  const focus = useMemo(() => {
    const pts = visible.map(l => project(l.lon, l.lat));
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const pad = 70, minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
    const w = Math.max(Math.max(...xs) - minX + pad, 230), h = Math.max(Math.max(...ys) - minY + pad, 230);
    return `${minX} ${minY} ${Math.max(w, h)} ${Math.max(w, h)}`;
  }, [visible]);

  const vb = filter === 'All Locations' ? '150 300 330 330' : focus;
  const k = Number(vb.split(' ')[2]) / 330;
  return (
    <section className="section map-section" aria-labelledby="map-title">
      <div className="container">
        <div className="map-head">
          <span className="eyebrow">OUR PROJECTS ACROSS SOUTH INDIA</span>
          <p className="map-stat"><strong>250+</strong> Projects Delivered</p>
          <h2 id="map-title">Our Work, <em>Across South India</em></h2>
          <p>Transforming spaces across cities, delivering thoughtful design and exceptional interiors wherever our clients need us.</p>
        </div>
        <div className="map-filters" role="group" aria-label="Filter project locations">
          {locationFilters.map(f => <button key={f} type="button" aria-pressed={filter === f} onClick={() => choose(f)}>{f}</button>)}
        </div>
        <div className="map-layout">
          <div className="map-canvas">
            <svg viewBox={vb} role="img" aria-label="Map of South India showing project locations">
              {indiaStates.map(s => {
                const f = stateFilter[s.name];
                return <path key={s.id} d={s.d} className={s.south ? 'state south' : 'state'} data-active={f ? filterLocations(filter).some(l => l.state === s.name) || undefined : undefined} onClick={f ? () => choose(f) : undefined}><title>{s.name}</title></path>;
              })}
              {visible.map(l => { const { x, y } = project(l.lon, l.lat); const on = active?.id === l.id; return (
                <g key={l.id} className={`pin${l.hub ? ' hub' : ''}${on ? ' on' : ''}`} transform={`translate(${x} ${y}) scale(${k})`} tabIndex={0} role="button" aria-label={`${l.city}, ${l.state}`} aria-pressed={on}
                  onMouseEnter={() => setActiveId(l.id)} onFocus={() => setActiveId(l.id)} onClick={() => setActiveId(l.id)}>
                  <circle className="pulse" r={l.hub ? 9 : 6} /><circle className="dot" r={l.hub ? 4.5 : 3} />
                  {(l.hub || on) && <text y={-10}>{l.city}</text>}
                </g>); })}
            </svg>
          </div>
          <div className="map-side">
            {active && <div className="map-card" key={active.id} aria-live="polite">
              <span className="eyebrow">{active.state}</span>
              <h3>{active.city}</h3>
              <p>{active.description}</p>
              <p className="map-meta">{active.verified && active.projects ? `${active.projects} projects` : active.verified ? 'Studio location' : 'Suggested location · pending verification'}</p>
              <Link to="/projects" className="text-link">View Projects <ArrowUpRight size={16} /></Link>
            </div>}
            <ul className="map-list">
              {visible.map(l => <li key={l.id}><button type="button" aria-pressed={active?.id === l.id} onClick={() => setActiveId(l.id)}><MapPin size={14} />{l.city}<span>{l.state}</span></button></li>)}
            </ul>
          </div>
        </div>
        <div className="region-cards">
          {regionCards.map(c => <button type="button" key={c.title} className="region-card" aria-pressed={filter === c.filter} onClick={() => { choose(c.filter); if (c.title !== 'Andhra Pradesh') setActiveId(c.title.toLowerCase()); }}>
            <img src={c.image} alt="" loading="lazy" width={600} height={400} /><span className="image-note">DESIGN INSPIRATION</span>
            <div><h3>{c.title}</h3><p>{c.description}</p></div>
          </button>)}
        </div>
        <p className="map-note">Locations and counts are configurable and shown pending verification of project records. {projectLocations.length} locations listed.</p>
      </div>
    </section>
  );
}
