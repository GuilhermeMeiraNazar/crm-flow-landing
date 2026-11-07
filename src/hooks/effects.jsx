import { useEffect, useState } from 'react';
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Revelacao no scroll com stagger (--i definido no JSX). Sem IntersectionObserver ou com reduced-motion, mostra tudo.
export function usePageEffects() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [threshold]);
  return scrolled;
}
