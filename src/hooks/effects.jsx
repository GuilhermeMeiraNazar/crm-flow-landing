import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Revelacao no scroll com stagger (--i definido no JSX). Sem IntersectionObserver, mostra tudo.
export function usePageEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const els = [...document.querySelectorAll('[data-reveal]')];
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      els.forEach((e) => io.observe(e));
    }

    // Spotlight que segue o cursor nos cartoes
    const onMove = (ev) => {
      const card = ev.target.closest && ev.target.closest('[data-spot]');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${ev.clientX - r.left}px`);
      card.style.setProperty('--my', `${ev.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });

    // Inclinacao do mockup do hero: 0 (inclinado) a 1 (plano) nos primeiros 420 px de scroll
    let raf = 0;
    const stage = document.querySelector('[data-parallax]');
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (stage && !prefersReducedMotion()) stage.style.setProperty('--p', Math.min(window.scrollY / 420, 1).toFixed(3));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // ja define --p se a pagina abrir rolada (ex.: recarregar no meio)
    return () => { document.removeEventListener('pointermove', onMove); window.removeEventListener('scroll', onScroll); };
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

// Contador animado. Renderiza o valor final no servidor/sem JS; anima ao entrar na tela.
export function Counter({ value }) {
  const ref = useRef(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    setN(0);
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 900;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}</span>;
}

// Passos "se acendem" conforme passam pelo centro da tela; ficam acesos depois.
export function useLitSteps(count) {
  const refs = useRef([]);
  const [lit, setLit] = useState(() => Array(count).fill(true));
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
    setLit(Array(count).fill(false));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const i = refs.current.indexOf(en.target);
          setLit((prev) => prev.map((v, k) => v || k <= i));
        }
      });
    }, { rootMargin: '-30% 0px -30% 0px' });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return { refs, lit };
}
