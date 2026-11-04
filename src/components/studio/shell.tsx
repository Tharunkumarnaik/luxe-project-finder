import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/architectique-mark-white.png.asset.json';
import { address, phone } from '@/lib/studio-data';

const navigation = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Design Styles', '/design-styles'],
  ['Projects', '/projects'],
  ['Reviews', '/reviews'],
  ['Contact', '/contact'],
] as const;

const explore = [
  ['Projects', '/projects'],
  ['Reviews', '/reviews'],
  ['About Us', '/about'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: state => state.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <span className="header-side" aria-hidden="true" />
          <Link to="/" className="brand" aria-label="Architectique Interiors home">
            <span className="logo-symbol"><img src={logo.url} alt="Architectique Interiors" /></span>
          </Link>
          <Link to="/contact" className="header-quote">Get a Quote <ArrowUpRight size={13} /></Link>
        </div>
      </header>

      <div className={open ? 'menu-overlay show' : 'menu-overlay'} onClick={() => setOpen(false)} aria-hidden="true" />

      <div className={open ? 'menu-layer show' : 'menu-layer'}>
        <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open}>
          <span className="menu-label">Menu</span>
          <nav className="menu-nav" aria-label="Menu navigation">
            {navigation.map(([label, to], index) => (
              <Link
                key={to}
                to={to}
                tabIndex={open ? 0 : -1}
                activeOptions={{ exact: to === '/' }}
                activeProps={{ className: 'active' }}
                style={{ transitionDelay: open ? `${90 + index * 45}ms` : '0ms' }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="menu-info">
            <div>
              <span className="menu-info-label">Explore</span>
              {explore.map(([label, to]) => (
                <Link key={to} to={to} tabIndex={open ? 0 : -1}>{label}</Link>
              ))}
            </div>
            <div>
              <span className="menu-info-label">Contact</span>
              <a href={`tel:${phone}`} tabIndex={open ? 0 : -1}>{phone}</a>
              <p>{address}</p>
            </div>
          </div>
          <Button asChild variant="studio" className="menu-cta" tabIndex={open ? 0 : -1}>
            <Link to="/contact">Get a Quote <ArrowUpRight /></Link>
          </Button>
        </div>
        <button
          type="button"
          className="menu-close"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="float-nav" aria-label="Primary navigation">
        <Link to="/" className="float-brand" aria-label="Architectique Interiors home">
          <img src={logo.url} alt="" />
        </Link>
        <Link to="/" className="float-home" activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>Home</Link>
        <button
          type="button"
          className={open ? 'float-toggle open' : 'float-toggle'}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </nav>
    </>
  );
}

export function Footer() {
  return (
    <>
      <section className="closing-cta">
        <div className="container closing-inner">
          <span className="eyebrow">THE NEXT CHAPTER IS YOURS</span>
          <h2>Let's create something<br /><em>beautiful, together.</em></h2>
          <Button variant="editorial" asChild size="lg"><Link to="/contact">Discuss Your Project <ArrowUpRight /></Link></Button>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand"><span className="logo-symbol"><img src={logo.url} alt="Architectique Interiors" /></span></Link>
            <p>Designing spaces.<br />Building possibilities.</p>
            <span className="footer-descriptor">ARCHITECTURE · INTERIORS · CONSTRUCTION</span>
          </div>
          <div>
            <h3>Explore</h3>
            {navigation.slice(1).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
          </div>
          <div>
            <h3>Our Expertise</h3>
            <Link to="/services/$slug" params={{ slug: 'residential-interiors' }}>Residential Interiors</Link>
            <Link to="/services/$slug" params={{ slug: 'architecture' }}>Architecture</Link>
            <Link to="/services/$slug" params={{ slug: 'commercial-interiors' }}>Commercial Interiors</Link>
            <Link to="/services/$slug" params={{ slug: 'modular-kitchens' }}>Kitchens & Wardrobes</Link>
            <Link to="/services/$slug" params={{ slug: 'construction-management' }}>Construction Management</Link>
          </div>
          <div>
            <h3>Find Us</h3>
            <p className="footer-address"><MapPin size={16} />{address}</p>
            <a className="footer-phone" href={`tel:${phone}`}><Phone size={14} />{phone}<ArrowUpRight size={14} /></a>
            <p className="coverage">Serving South India, subject to project scope.</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Architectique Interiors. All rights reserved.</span>
          <div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link></div>
        </div>
      </footer>
    </>
  );
}
