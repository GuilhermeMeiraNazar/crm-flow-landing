import { useEffect, useState } from 'react';
import s from '../styles/landing.module.scss';
import { SITE, whatsappHref } from '../config/site.js';
import { useScrolled } from '../hooks/effects.jsx';
import dims from '../assets/capturas/manifest.json';
import { CAPTION } from '../content/pt-BR.js';

// Atributos de rastreabilidade: ids de evidencia (CONTEUDO.md) e marca de revisao do dono (classe B).
export const ev = (ids, review) => ({ 'data-ev': (ids || []).join(' '), ...(review ? { 'data-review': 'B' } : {}) });

const assets = import.meta.glob('../assets/capturas/*.{webp,avif}', { eager: true, query: '?url', import: 'default' });
const url = (file) => assets[`../assets/capturas/${file}`];

// Legenda UNICA, usada sob todas as capturas (inclusive a do hero).
export function Caption() {
  return <figcaption className={s.caption} data-caption>{CAPTION}</figcaption>;
}

// Moldura da captura: tema escuro e claro, AVIF com WebP de reserva, 1x e 2x. Dimensoes vem do manifesto gerado na captura.
export function ShotFrame({ name, alt, eager = false, sizes = '(min-width: 1200px) 720px, 100vw', bar = true }) {
  const [w, h] = dims[name];
  const pic = (theme, loading) => {
    const n = `${name}-${theme}`;
    return (
      <picture className={`${s.pic} ${theme === 'dark' ? s.imgDark : s.imgLight}`}>
        <source type="image/avif" srcSet={`${url(`${n}.avif`)} ${w}w, ${url(`${n}@2x.avif`)} ${w * 2}w`} sizes={sizes} />
        <img
          src={url(`${n}.webp`)}
          srcSet={`${url(`${n}.webp`)} ${w}w, ${url(`${n}@2x.webp`)} ${w * 2}w`}
          sizes={sizes}
          width={w}
          height={h}
          alt={alt}
          loading={loading}
          decoding="async"
          {...(loading === 'eager' ? { fetchpriority: 'high' } : {})}
        />
      </picture>
    );
  };
  return (
    <div className={s.shot}>
      {bar && <div className={s.shotBar} aria-hidden="true"><i /><i /><i /></div>}
      {pic('dark', eager ? 'eager' : 'lazy')}
      {pic('light', 'lazy')}
    </div>
  );
}

export function Shot({ name, alt, sizes }) {
  const [w] = dims[name];
  return (
    <figure className={s.fig} style={{ maxWidth: w }}>
      <ShotFrame name={name} alt={alt} sizes={sizes} />
      <Caption />
    </figure>
  );
}

export function Brand() {
  return (
    <a className={s.brand} href="/">
      <span className={s.brandMark} aria-hidden="true">{SITE.monogram}</span>
      <span>{SITE.name}</span>
    </a>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'dark'); }, []);
  const next = theme === 'dark' ? 'light' : 'dark';
  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('conversia.theme', next); } catch (e) { /* sem storage */ }
    setTheme(next);
  };
  return (
    <button type="button" className={s.iconBtn} onClick={toggle} aria-label={`Mudar para o tema ${next === 'dark' ? 'escuro' : 'claro'}`}>
      {theme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      )}
    </button>
  );
}

export function Navbar({ links, home = true }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const href = (h) => (home ? h : `/${h}`);
  return (
    <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <div className={`${s.container} ${s.navInner}`}>
        <Brand />
        <nav className={s.navLinks} aria-label="Principal">
          {links.map((l) => <a key={l.href} className={s.navLink} href={href(l.href)}>{l.label}</a>)}
        </nav>
        <div className={s.navActions}>
          <ThemeToggle />
          <a className={`${s.btn} ${s.btnPrimary} ${s.navCta}`} href={SITE.CTA_URL}>{SITE.ctaPrimaryLabel}</a>
          <button type="button" className={`${s.iconBtn} ${s.menuBtn}`} aria-expanded={open} aria-controls="menu-movel" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((v) => !v)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-movel" className={s.menuPanel} aria-label="Menu">
          {links.map((l) => <a key={l.href} className={s.navLink} href={href(l.href)} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a className={`${s.btn} ${s.btnPrimary}`} href={SITE.CTA_URL} style={{ marginTop: 8 }}>{SITE.ctaPrimaryLabel}</a>
        </nav>
      )}
    </header>
  );
}

export function Footer({ C }) {
  const wa = whatsappHref();
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footGrid}>
          <div>
            <Brand />
            <p style={{ marginTop: 12, maxWidth: '36ch' }}>{SITE.tagline}</p>
            <p style={{ marginTop: 8 }}>{SITE.company.legalName} · CNPJ {SITE.company.cnpj}</p>
          </div>
          <div>
            <p className={s.footTitle}>Contato</p>
            <ul className={s.footLinks}>
              <li><a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></li>
              {wa && <li><a href={wa} rel="noopener noreferrer">WhatsApp</a></li>}
            </ul>
          </div>
          <div>
            <p className={s.footTitle}>Legal</p>
            <ul className={s.footLinks}>
              {C.footer.legal.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
        </div>
        <p className={s.marks}>{C.footer.marks}</p>
      </div>
    </footer>
  );
}