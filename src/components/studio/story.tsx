import {useEffect,useRef,useState} from 'react';
import {images} from '@/lib/studio-data';

const chapters=[
  {eyebrow:'01 · LISTEN',title:'It begins with how you live.',text:'We study your routines, rituals and aspirations before drawing a single line.',image:images.living},
  {eyebrow:'02 · SHAPE',title:'Architecture with intention.',text:'Light, proportion and flow are planned so every room feels effortless.',image:images.villa},
  {eyebrow:'03 · CRAFT',title:'Materials you can feel.',text:'Warm woods, honest stone and considered storage, chosen for daily life.',image:images.kitchen},
  {eyebrow:'04 · DELIVER',title:'A space that is yours.',text:'Coordinated execution brings the vision to a calm, finished home.',image:images.bedroom},
];

/** Pinned visual with scroll-synced chapters. Uses CSS sticky, so scrolling is never trapped. */
export function StoryScroll(){
  const [active,setActive]=useState(0);
  const refs=useRef<(HTMLDivElement|null)[]>([]);
  useEffect(()=>{
    if(!('IntersectionObserver' in window))return;
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(Number((e.target as HTMLElement).dataset['index']));}),{rootMargin:'-45% 0px -45% 0px'});
    refs.current.forEach(el=>el&&io.observe(el));
    return()=>io.disconnect();
  },[]);
  return <section className="story-scroll" aria-label="Our approach">
    <div className="container story-layout">
      <div className="story-visual">
        {chapters.map((c,i)=><img key={c.title} src={c.image} alt="" aria-hidden="true" loading="lazy" className={i===active?'is-active':''}/>)}
        <span className="image-note">DESIGN INSPIRATION</span>
        <div className="story-progress">{chapters.map((c,i)=><span key={c.title} className={i<=active?'on':''}/>)}</div>
      </div>
      <div className="story-steps">
        {chapters.map((c,i)=><div key={c.title} data-index={i} ref={el=>{refs.current[i]=el}} className={i===active?'story-step is-active':'story-step'}>
          <span className="eyebrow">{c.eyebrow}</span><h2>{c.title}</h2><p>{c.text}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

/** Subtle hero parallax; disabled for reduced motion. */
export function useHeroParallax(){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const img=document.querySelector<HTMLElement>('.hero-image');const inner=document.querySelector<HTMLElement>('.hero-inner');
    if(!img)return;let raf=0;
    const update=()=>{raf=0;const y=Math.min(window.scrollY,900);img.style.transform=`translate3d(0,${y*0.25}px,0) scale(${1.06+y*0.0002})`;if(inner){inner.style.transform=`translate3d(0,${y*-0.08}px,0)`;inner.style.opacity=String(Math.max(0,1-y/650));}};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update();window.addEventListener('scroll',onScroll,{passive:true});
    const header=document.querySelector('.site-header');const onHeader=()=>header?.classList.toggle('scrolled',window.scrollY>12);onHeader();window.addEventListener('scroll',onHeader,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('scroll',onHeader);cancelAnimationFrame(raf);img.style.transform='';if(inner){inner.style.transform='';inner.style.opacity='';}};
  },[]);
}
