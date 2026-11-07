import s from '../styles/landing.module.scss';
import { SITE, whatsappHref } from '../config/site.js';
import { useEffect, useRef, useState } from 'react';
import { Counter, useLitSteps, prefersReducedMotion } from '../hooks/effects.jsx';
import { Shot, ShotFrame, Caption, ev } from './ui.jsx';

const Head = ({ eyebrow, title, lead, id, evIds }) => (
  <div className={s.head} data-reveal {...ev(evIds)}>
    <p className={s.eyebrow}>{eyebrow}</p>
    <h2 className={s.title} id={id}>{title}</h2>
    {lead && <p className={s.lead}>{lead}</p>}
  </div>
);

export function Hero({ C }) {
  const h = C.hero;
  return (
    <section className={s.hero} aria-labelledby="h1">
      <div className={s.mesh} aria-hidden="true"><span className={`${s.blob} ${s.blobA}`} /><span className={`${s.blob} ${s.blobB}`} /><span className={`${s.blob} ${s.blobC}`} /></div>
      <div className={s.gridBg} aria-hidden="true" />
      <div className={s.container}>
        <div className={s.heroText}>
          <p className={s.pill}>{h.eyebrow}</p>
          <h1 className={s.h1} id="h1" {...ev(['S1', 'S3.1'])}>{h.h1}</h1>
          <p className={s.heroSub} {...ev(h.ev)}>{h.sub}</p>
          <div className={s.btnRow}>
            <a className={`${s.btn} ${s.btnPrimary}`} href={SITE.CTA_URL}>{SITE.ctaPrimaryLabel}</a>
            <a className={`${s.btn} ${s.btnGhost}`} href={SITE.ctaSecondaryHref}>{SITE.ctaSecondaryLabel}</a>
          </div>
        </div>
        <figure className={s.heroFig}>
          <div className={s.stage}>
            <div className={s.stageGlow} aria-hidden="true" />
            <div className={s.tilt}>
              <ShotFrame name="hero" alt={h.shotAlt} eager sizes="(min-width: 1200px) 1100px, 100vw" />
            </div>
          </div>
          <Caption />
        </figure>
      </div>
    </section>
  );
}

export function Marquee({ C }) {
  const m = C.integrations;
  const group = (hidden) => (
    <ul className={s.marqueeGroup} aria-hidden={hidden || undefined}>
      {m.items.map((i) => (
        <li key={i.name} className={s.chip}>{i.name}{i.note && <small>{i.note}</small>}</li>
      ))}
    </ul>
  );
  return (
    <section className={s.marqueeWrap} aria-label="Integrações" {...ev(m.ev)}>
      <div className={s.container}>
        <div className={s.marqueeHead}><span className={s.marqueeLabel}>{m.label}</span><span className={s.marqueeLabel}>{m.legal}</span></div>
      </div>
      <div className={s.marquee}>{group(false)}{group(true)}</div>
    </section>
  );
}

export function Problem({ C }) {
  const p = C.problem;
  return (
    <section className={s.section} aria-labelledby="problema">
      <div className={s.container}>
        <Head eyebrow={p.eyebrow} title={p.title} id="problema" evIds={p.ev} />
        <div className={s.cols3}>
          {p.items.map((i, k) => (
            <div key={i.t} className={s.plain} data-reveal style={{ '--i': k }} {...ev(i.ev)}><h3>{i.t}</h3><p>{i.d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ICONS = {
  lead: <path d="M4 6h16M4 12h10M4 18h6M18 14l2 2 4-4" />,
  audio: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></>,
  theme: <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />,
};

// "O produto": abas com tela real de cada area. Todos os paineis ficam no HTML (so o ativo aparece).
export function Product({ C }) {
  const b = C.product;
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const select = (i, focus) => {
    const n = (i + b.tabs.length) % b.tabs.length;
    setActive(n);
    if (focus && tabs.current[n]) tabs.current[n].focus();
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select(active + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(active - 1, true); }
    if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    if (e.key === 'End') { e.preventDefault(); select(b.tabs.length - 1, true); }
  };
  return (
    <section className={s.section} id={b.id} aria-labelledby="produto-t">
      <div className={s.container}>
        <Head eyebrow={b.eyebrow} title={b.title} id="produto-t" evIds={b.ev} />
        <div className={s.prodTabs} role="tablist" aria-label="Áreas do produto" onKeyDown={onKey}>
          {b.tabs.map((t, i) => (
            <button key={t.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`tab-${t.id}`} aria-selected={i === active} aria-controls={`painel-${t.id}`} tabIndex={i === active ? 0 : -1} className={`${s.prodTab} ${i === active ? s.prodTabOn : ''}`} onClick={() => select(i)}>
              {t.label}
            </button>
          ))}
        </div>
        {b.tabs.map((t, i) => (
          <div key={t.id} id={`painel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={i !== active} className={s.prodPanel} {...ev(t.ev)}>
            <div className={s.prodText}>
              <h3>{t.title}</h3>
              <p>{t.d}</p>
              <ul className={s.ticks}>
                {t.bullets.map((x) => <li key={x.t} {...ev(x.ev)}>{x.t}</li>)}
              </ul>
            </div>
            <div className={s.prodShot}><Shot name={t.shot} alt={t.alt} /></div>
          </div>
        ))}
        <h3 className={s.alsoTitle}>{b.alsoTitle}</h3>
        <div className={s.also}>
          {b.also.map((x) => (
            <article key={x.t} className={s.alsoItem} {...ev(x.ev)}>
              <span className={s.alsoIcon} aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[x.icon]}</svg>
              </span>
              <h4>{x.t}</h4>
              <p>{x.d}</p>
            </article>
          ))}
        </div>
        <div className={s.numbers} data-reveal {...ev(C.numbers.ev)}>
          {C.numbers.items.map((n) => (
            <div key={n.label} className={s.num} {...ev(n.ev)}><b><Counter value={n.value} /></b><span>{n.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AiSection({ C }) {
  const a = C.ai;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={a.id} aria-labelledby="ia-t">
      <div className={s.container}>
        <Head eyebrow={a.eyebrow} title={a.title} lead={a.lead} id="ia-t" evIds={a.ev} />
        <div className={s.aiGrid}>
          <ol className={s.aiList}>
            {a.pillars.map((p, k) => (
              <li key={p.t} className={s.aiItem} data-reveal style={{ '--i': k }} {...ev(p.ev)}>
                <span className={s.aiNum} aria-hidden="true">{k + 1}</span>
                <div><h3>{p.t}</h3><p>{p.d}</p></div>
              </li>
            ))}
          </ol>
          <div className={s.aiShot} data-reveal><Shot name="ia" alt={a.shotAlt} /></div>
        </div>
        <p className={s.notice} data-reveal {...ev(a.privacyEv)}>{a.privacy}</p>
      </div>
    </section>
  );
}
export function How({ C }) {
  const h = C.how;
  const { refs, lit } = useLitSteps(h.steps.length);
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={h.id} aria-labelledby="how-t">
      <div className={s.container}>
        <Head eyebrow={h.eyebrow} title={h.title} id="how-t" evIds={h.ev} />
        <ol className={s.steps}>
          {h.steps.map((st, i) => (
            <li key={st.t} ref={(el) => { refs.current[i] = el; }} className={`${s.step} ${lit[i] ? s.stepLit : ''}`} {...ev(st.ev)}>
              <h3>{st.t}</h3><p>{st.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const ADDON_ICONS = {
  agenda: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 15l2.5 2.5L16 13" /></>,
  financeiro: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" /></>,
  copiloto: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0M17 3l.8 1.7L19.5 5.5l-1.7.8L17 8l-.8-1.7-1.7-.8 1.7-.8z" /></>,
  instancia: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></>,
};
const brl = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: SITE.pricing.currency }).format(n);

// Carrossel de planos de uma linha. Quando os cartoes cabem na largura (desktop), todos aparecem lado a lado e
// os controles somem. Abaixo disso, faixa com rolagem por snap (toque e teclado), setas, abas e foco gerenciado.
function PlanCarousel({ p, plans, group }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [scrolls, setScrolls] = useState(false);
  const region = `${p.carousel.region}: ${group.title}`;

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolls(el.scrollWidth - el.clientWidth > 4);
      const kids = [...el.children];
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) { setActive(kids.length - 1); return; }
      const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      let best = 0; let dist = Infinity;
      kids.forEach((c, i) => { const d = Math.abs(c.offsetLeft - pad - el.scrollLeft); if (d < dist) { dist = d; best = i; } });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.addEventListener('scroll', onScroll, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null;
    if (ro) ro.observe(el);
    update();
    return () => { el.removeEventListener('scroll', onScroll); if (ro) ro.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const go = (i) => {
    const el = track.current;
    const idx = Math.max(0, Math.min(plans.length - 1, i));
    const slide = el && el.children[idx];
    if (!slide) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    setActive(idx);
    el.scrollTo({ left: slide.offsetLeft - pad, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.carouselBar}>
          <div className={s.planTabs} role="group" aria-label={region}>
            {plans.map((pl, i) => (
              <button key={pl.id} type="button" className={`${s.planTab} ${i === active ? s.planTabOn : ''}`} aria-current={i === active ? 'true' : undefined} aria-label={`${p.carousel.goto} ${pl.tier}`} onClick={() => go(i)}>
                {pl.name}
              </button>
            ))}
          </div>
          <div className={s.carouselArrows}>
            <button type="button" className={s.iconBtn} onClick={() => go(active - 1)} disabled={active === 0} aria-label={`${p.carousel.prev}: ${group.title}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className={s.iconBtn} onClick={() => go(active + 1)} disabled={active === plans.length - 1} aria-label={`${p.carousel.next}: ${group.title}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${s.carouselWrap} ${scrolls ? s.scrolls : s.fits}`} style={{ '--n': Math.max(plans.length, 3) }}>
        <div className={s.track} ref={track} role="region" aria-roledescription="carrossel" aria-label={region} tabIndex={0} onKeyDown={onKey}>
          {plans.map((pl, i) => {
            const c = p.plans[pl.id];
            return (
              <article key={pl.id} className={`${s.plan} ${pl.highlight ? s.planHi : ''} ${i === active ? s.planOn : ''}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} de ${plans.length}: ${pl.tier}`}>
                <p className={s.planTier}>{pl.tier}{pl.highlight && <span className={s.planBadge}>{p.labels.badge}</span>}</p>
                <h4 className={s.planName}>{pl.name}</h4>
                <p className={s.planTag} {...ev(c.taglineEv)}>{c.tagline}</p>
                {pl.monthly > 0
                  ? <p className={s.price}>{brl(pl.monthly)} <small>/ {p.labels.monthly}</small></p>
                  : <p className={s.price}>{brl(pl.setup)} <small>{p.labels.setupNote}</small></p>}
                <p className={s.billing}>{pl.monthly > 0 ? `${p.labels.setup}: ${brl(pl.setup)} (${p.labels.setupNote})` : `${p.labels.setup} ${p.labels.noMonthly}`}</p>
                <ul className={s.ticks}>
                  {c.features.map((f) => <li key={f.t} className={f.no ? s.no : undefined} {...ev(f.ev)}>{f.t}{f.soon && <span className={s.soon}>{p.labels.soon}</span>}</li>)}
                </ul>
                {c.note && <p className={s.planNote}>{c.note}</p>}
                <a className={`${s.btn} ${s.btnPrimary} ${s.planCta}`} href={SITE.CTA_URL}>{SITE.ctaPrimaryLabel}</a>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function Pricing({ C }) {
  const p = C.pricing;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={p.id} aria-labelledby="price-t">
      <div className={s.container}>
        <Head eyebrow={p.eyebrow} title={p.title} lead={p.lead} id="price-t" evIds={p.leadEv} />
      </div>
      {p.groups.map((g) => {
        const plans = g.plans.map((id) => SITE.pricing.plans.find((x) => x.id === id));
        return (
          <div key={g.id} id={`planos-${g.id}`} className={s.planGroup}>
            <div className={s.container}>
              <h3 className={s.groupTitle} {...ev(g.ev)}>{g.title}</h3>
              <p className={s.groupLead}>{g.lead}</p>
            </div>
            <PlanCarousel p={p} plans={plans} group={g} />
            {g.note && <div className={s.container}><p className={s.foot} {...ev(g.noteEv)}>{g.note}</p></div>}
            {g.id === 'self' && (
              <div className={s.container}>
                <div className={s.selfReq} {...ev(p.selfReq.ev)}>
                  <h4>{p.selfReq.title}</h4>
                  <dl className={s.reqTable}>
                    {p.selfReq.rows.map((r) => <div key={r.t} className={s.reqRow} {...ev(r.ev)}><dt>{r.t}</dt><dd>{r.d}</dd></div>)}
                  </dl>
                  <p className={s.foot}>{p.selfReq.footnote}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div id={p.addons.id} className={s.planGroup}>
        <div className={s.container}>
          <h3 className={s.groupTitle} {...ev(p.addons.ev)}>{p.addons.title}</h3>
          <p className={s.groupLead}>{p.addons.lead}</p>
          <div className={s.addons}>
            {SITE.pricing.addons.map((a) => {
              const c = p.addons.items[a.id];
              return (
                <article key={a.id} className={s.addon} {...ev(c.ev)}>
                  <span className={s.alsoIcon} aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ADDON_ICONS[c.icon]}</svg></span>
                  <h4>{c.t}{c.soon && <span className={s.soon}>{p.labels.soon}</span>}</h4>
                  <p>{c.d}</p>
                  <p className={s.addonPrice}>+ {brl(a.monthly)} <small>/ {p.labels.monthly}</small></p>
                </article>
              );
            })}
          </div>
          <p className={s.foot}>{p.addons.note}</p>
        </div>
      </div>
      <div className={s.container}>
        <aside className={s.launch} data-reveal {...ev(p.launch.ev)}>
          <span className={s.launchGlow} aria-hidden="true" />
          <div className={s.launchBig} aria-hidden="true"><b>{p.launch.big}</b><span>{p.launch.bigLabel}</span></div>
          <div className={s.launchBody}>
            <span className={s.launchBadge}>{p.launch.badge}</span>
            <h3>{p.launch.title}</h3>
            <p className={s.launchLead}>{p.launch.lead}</p>
            <ul className={s.perks}>
              {p.launch.perks.map((x) => (
                <li key={x.t} {...ev(x.ev)}>
                  <span className={s.perkIcon} aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" /></svg></span>
                  <div><h4>{x.t}{x.soon && <span className={s.soon}>{p.labels.soon}</span>}</h4><p>{x.d}</p></div>
                </li>
              ))}
            </ul>
            <a className={`${s.btn} ${s.btnPrimary}`} href={SITE.CTA_URL}>{SITE.ctaPrimaryLabel}</a>
          </div>
        </aside>
        <p className={s.placeholder}>Garantia: {SITE.pricing.guarantee}</p>
      </div>
    </section>
  );
}
export function Faq({ C }) {
  const f = C.faq;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={f.id} aria-labelledby="faq-t">
      <div className={s.container}>
        <Head eyebrow={f.eyebrow} title={f.title} id="faq-t" />
        <div className={s.faq}>
          {f.items.map((it) => (
            <details key={it.q} className={s.faqItem} {...ev(it.ev)}>
              <summary>{it.q}</summary>
              <p className={s.faqAns}>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ C }) {
  const c = C.finalCta;
  const wa = whatsappHref();
  return (
    <section className={`${s.section} ${s.cta}`} aria-labelledby="cta-t">
      <div className={s.container}>
        <div className={s.ctaBox} data-reveal>
          <span className={s.ctaGlow} aria-hidden="true" />
          <h2 id="cta-t">{c.title}</h2>
          <p>{c.sub}</p>
          <div className={s.btnRow}>
            <a className={`${s.btn} ${s.btnPrimary}`} href={SITE.CTA_URL}>{SITE.ctaPrimaryLabel}</a>
            {wa && <a className={`${s.btn} ${s.btnGhost}`} href={wa} rel="noopener noreferrer">Falar no WhatsApp</a>}
          </div>
        </div>
      </div>
    </section>
  );
}