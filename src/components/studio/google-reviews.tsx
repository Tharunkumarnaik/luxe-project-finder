import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGoogleReviews, GOOGLE_PLACE_ID } from '@/lib/google-reviews.functions';

const MAPS_LINK = 'https://share.google/ZAkv1JNYrcq034ksu';
const WRITE_LINK = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
const GOOGLE_LOGO = 'https://developers.google.com/static/maps/documentation/images/google_on_white.png';

function Stars({ value }: { value: number }) {
  return <span className="g-stars" aria-label={`${value} out of 5 stars`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={15} className={i <= Math.round(value) ? 'on' : ''} />)}</span>;
}

export function GoogleReviews() {
  const { data, isLoading } = useQuery({ queryKey: ['google-reviews'], queryFn: () => getGoogleReviews(), staleTime: 3600_000 });
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: 'smooth' });
  const reviews = data?.reviews ?? [];
  return (
    <section className="section g-reviews" aria-labelledby="g-reviews-title">
      <div className="container">
        <div className="g-head">
          <div>
            <span className="eyebrow">GOOGLE REVIEWS</span>
            <h2 id="g-reviews-title">What Our <em>Clients Say</em></h2>
            {data?.rating != null && <div className="g-summary"><strong>{data.rating.toFixed(1)}</strong><Stars value={data.rating} /><span>{data.total} reviews on Google</span></div>}
          </div>
          <div className="g-brand"><img src={GOOGLE_LOGO} alt="Google" width={59} height={18} /><span>Powered by Google</span></div>
        </div>
        {isLoading ? <p className="g-note">Loading reviews…</p> : reviews.length === 0 ? (
          <p className="g-note">Reviews couldn’t be loaded right now. You can read them directly on Google Maps.</p>
        ) : (
          <div className="g-carousel">
            <div className="g-track" ref={track}>
              {reviews.map((r, i) => (
                <article className="g-card" key={i}>
                  <header>
                    {r.photo ? <img src={r.photo} alt="" width={44} height={44} referrerPolicy="no-referrer" loading="lazy" /> : <span className="g-avatar">{r.author[0]}</span>}
                    <div>
                      {r.authorUri ? <a href={r.authorUri} target="_blank" rel="noopener noreferrer">{r.author}</a> : <strong>{r.author}</strong>}
                      <small>{r.relative ?? (r.date ? new Date(r.date).toLocaleDateString('en-IN') : '')}</small>
                    </div>
                  </header>
                  <Stars value={r.rating} />
                  <p>{r.text}</p>
                </article>
              ))}
            </div>
            <div className="g-nav">
              <Button variant="editorial" size="icon" aria-label="Previous reviews" onClick={() => scroll(-1)}><ArrowLeft /></Button>
              <Button variant="editorial" size="icon" aria-label="Next reviews" onClick={() => scroll(1)}><ArrowRight /></Button>
            </div>
          </div>
        )}
        <div className="g-actions">
          <Button variant="studio" size="lg" asChild><a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Read All Reviews on Google <ArrowUpRight /></a></Button>
          <Button variant="editorial" size="lg" asChild><a href={WRITE_LINK} target="_blank" rel="noopener noreferrer">Write a Review <ArrowUpRight /></a></Button>
        </div>
      </div>
    </section>
  );
}
