import { useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';

const revealTargets = '.section-heading, .about-visual, .about-content, .service-card, .style-card, .project-card, .process-grid > div, .values-grid > div, .story-grid > div, .trust-section, .contact-info, .enquiry-form, .faq-item, .closing-inner, .footer-grid > div, .cover-wrap';

/** Progressive enhancement: content stays visible if motion or observers are unavailable. */
export function StudioMotion() {
  const pathname = useRouterState({ select: state => state.location.pathname });

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window)) return;
    const main = document.getElementById('main-content');
    if (!main) return;
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const play = (element: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    play(main, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, easing: 'ease-out' });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const siblings = entry.target.parentElement ? Array.from(entry.target.parentElement.children) : [];
        const delay = Math.max(0, siblings.indexOf(entry.target) % 4) * 65;
        play(entry.target, [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 780, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' });
      });
    }, { threshold: 0.08 });

    const scan = () => document.querySelectorAll(revealTargets).forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      observer.observe(element);
    });
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(main, { childList: true, subtree: true });
    const stop = () => {
      if (!preference.matches) return;
      observer.disconnect();
      mutations.disconnect();
      animations.forEach(animation => animation.cancel());
    };
    preference.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', stop);
    };
  }, [pathname]);

  return null;
}