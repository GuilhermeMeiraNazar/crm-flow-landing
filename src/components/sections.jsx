import s from '../styles/landing.module.scss';
import { SITE, ctaHref } from '../config/site.js';
import { useRef, useState } from 'react';
import { Shot, ShotFrame, Caption, ev } from './ui.jsx';

const brl = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: SITE.pricing.currency }).format(n);

// Icones: um unico tracado (1.8) e o mesmo conjunto de formas em todas as secoes.
const Icon = ({ children, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const ICONS = {
  inbox: <><path d="M4 13l2-8h12l2 8" /><path d="M4 13v6h16v-6h-5l-1 2h-4l-1-2z" /></>,
  funnel: <path d="M3 5h18l-7 8v6l-4-2v-4z" />,
  bell: <><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z" /><path d="M10 21h4" /></>,
  lead: <path d="M4 6h16M4 12h10M4 18h6M18 14l2 2 4-4" />,
  audio: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  team: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" /></>,
  theme: <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />,
  gift: <path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z" />,
};

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
            <a className={`${s.btn} ${s.btnPrimary}`} href={ctaHref()}>{SITE.ctaPrimaryLabel}</a>
            <a className={`${s.btn} ${s.btnGhost}`} href={SITE.ctaSecondaryHref}>{SITE.ctaSecondaryLabel}</a>
          </div>
        </div>
        <figure className={s.heroFig}>
          <div className={s.stage}>
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

// "Funciona com": linha estatica de chips de texto (so itens classe A, sem logotipos de terceiros).
export function WorksWith({ C }) {
  const m = C.integrations;
  return (
    <section className={s.worksWith} aria-label={m.label} {...ev(m.ev)}>
      <div className={s.container}>
        <div className={s.worksRow}>
          <span className={s.worksLabel}>{m.label}</span>
          <ul className={s.chips}>
            {m.items.map((i) => <li key={i.name} className={s.chip}>{i.name}</li>)}
          </ul>
        </div>
        <p className={s.worksLegal}>{m.legal}</p>
      </div>
    </section>
  );
}

export function Problem({ C }) {
  const p = C.problem;
  return (
    <section className={s.section} aria-labelledby="problema">
      <div className={s.container}>
        <Head eyebrow={p.eyebrow} title={p.title} id="problema" evIds={p.ev} />
        <div className={s.grid3}>
          {p.items.map((i, k) => (
            <article key={i.t} className={s.tile} data-reveal style={{ '--i': k }} {...ev(i.ev)}>
              <span className={s.tileIcon}><Icon>{ICONS[i.icon]}</Icon></span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// "O produto": abas com a tela real de cada area. Todos os paineis ficam no HTML; so o ativo aparece.
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
        <div className={s.seg} role="tablist" aria-label="Áreas do produto" onKeyDown={onKey}>
          {b.tabs.map((t, i) => (
            <button key={t.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`tab-${t.id}`} aria-selected={i === active} aria-controls={`painel-${t.id}`} tabIndex={i === active ? 0 : -1} className={`${s.segBtn} ${i === active ? s.segOn : ''}`} onClick={() => select(i)}>
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
        <h3 className={s.subTitle}>{b.alsoTitle}</h3>
        <div className={s.grid4}>
          {b.also.map((x) => (
            <article key={x.t} className={s.tile} {...ev(x.ev)}>
              <span className={s.tileIcon}><Icon>{ICONS[x.icon]}</Icon></span>
              <h4>{x.t}</h4>
              <p>{x.d}</p>
            </article>
          ))}
        </div>
        <div className={s.numbers} {...ev(C.numbers.ev)}>
          {C.numbers.items.map((n) => (
            <div key={n.label} className={s.num} {...ev(n.ev)}><b>{n.value}</b><span>{n.label}</span></div>
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

// Como funciona: passos horizontais, uma captura por passo e uma unica legenda.
export function How({ C }) {
  const h = C.how;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={h.id} aria-labelledby="how-t">
      <div className={s.container}>
        <Head eyebrow={h.eyebrow} title={h.title} id="how-t" evIds={h.ev} />
        <figure className={s.fig}>
          <ol className={s.steps}>
            {h.steps.map((st, i) => (
              <li key={st.t} className={s.step} data-reveal style={{ '--i': i }} {...ev(st.ev)}>
                <div className={s.stepShot}><ShotFrame name={st.shot} alt={st.alt} bar={false} sizes="(min-width: 900px) 280px, 90vw" /></div>
                <span className={s.stepNum} aria-hidden="true">{i + 1}</span>
                <h3>{st.t}</h3>
                <p>{st.d}</p>
              </li>
            ))}
          </ol>
          <Caption />
        </figure>
      </div>
    </section>
  );
}

// Hospedado ou no seu servidor: quem cuida do servidor, o que o cliente faz e onde ficam os dados.
export function Models({ C }) {
  const m = C.models;
  const req = C.pricing.selfReq;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={m.id} aria-labelledby="modelos-t">
      <div className={s.container}>
        <Head eyebrow={m.eyebrow} title={m.title} lead={m.lead} id="modelos-t" evIds={m.ev} />
        <div className={s.grid2}>
          {m.cards.map((c) => (
            <article key={c.id} className={s.tile} data-reveal {...ev(c.ev)}>
              <h3>{c.t}</h3>
              <dl className={s.kv}>
                {c.rows.map((r) => <div key={r.k}><dt>{r.k}</dt><dd>{r.v}</dd></div>)}
              </dl>
              {c.id === 'self' && (
                <details className={s.reqDetails} {...ev(req.ev)}>
                  <summary>{req.title}</summary>
                  <dl className={s.kv}>
                    {req.rows.map((r) => <div key={r.t} {...ev(r.ev)}><dt>{r.t}</dt><dd>{r.d}</dd></div>)}
                  </dl>
                  <p className={s.foot}>{req.footnote}</p>
                </details>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const Mark = ({ ok, label }) => (
  <span className={ok ? s.yes : s.no}><span className="sr-only">{label}</span></span>
);

function PlanCard({ p, pl, group }) {
  const c = p.plans[pl.id];
  const model = group.id === 'hosted' ? 'hospedado por vocês' : 'no meu servidor';
  const msg = `Olá! Quero o plano ${pl.tier} (${model}) do ${SITE.name}.`;
  return (
    <article className={`${s.plan} ${pl.highlight ? s.planHi : ''}`}>
      {pl.highlight && <span className={s.planBadge}>{p.labels.badge}</span>}
      <p className={s.planTier}>{pl.tier}</p>
      <h4 className={s.planName}>{pl.name}</h4>
      <p className={s.planTag} {...ev(c.taglineEv)}>{c.tagline}</p>
      {pl.monthly > 0
        ? <p className={s.price}>{brl(pl.monthly)} <small>/ {p.labels.monthly}</small></p>
        : <p className={s.price}>{brl(pl.setup)} <small>{p.labels.setup.toLowerCase()}</small></p>}
      <p className={s.billing}>{pl.monthly > 0 ? `${p.labels.setup}: ${brl(pl.setup)}` : p.labels.noMonthly}</p>
      <ul className={s.ticks}>
        {c.features.map((f) => <li key={f.t} className={f.no ? s.no : undefined} {...ev(f.ev)}>{f.t}</li>)}
      </ul>
      <a className={`${s.btn} ${pl.highlight ? s.btnPrimary : s.btnGhost} ${s.planCta}`} href={ctaHref(msg)}>{p.labels.choose} {pl.tier}</a>
    </article>
  );
}

function Compare({ p, g, plans, open, setOpen }) {
  const L = p.labels;
  return (
    <div className={s.compare}>
      <div className={s.compareHead}>
        <h3>{L.compareTitle}</h3>
        <button type="button" className={s.compareBtn} aria-expanded={open} aria-controls={`cmp-${g.id}`} onClick={() => setOpen(!open)}>{open ? L.compareClose : L.compareOpen}</button>
      </div>
      <div id={`cmp-${g.id}`} className={`${s.compareBody} ${open ? s.compareOpen : ''}`}>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <caption className="sr-only">{L.compareTitle}: {g.tab}</caption>
            <thead>
              <tr><th scope="col">{L.feature}</th>{plans.map((pl) => <th scope="col" key={pl.id}>{pl.tier}</th>)}</tr>
            </thead>
            <tbody>
              <tr><th scope="row">{L.setupRow}</th>{plans.map((pl) => <td key={pl.id}>{brl(pl.setup)}</td>)}</tr>
              <tr><th scope="row">{L.monthlyRow}</th>{plans.map((pl) => <td key={pl.id}>{pl.monthly > 0 ? brl(pl.monthly) : L.noMonthly}</td>)}</tr>
              {g.compare.map((r) => (
                <tr key={r.t} {...ev(r.ev)}>
                  <th scope="row">{r.t}</th>
                  {r.v.map((v, i) => <td key={plans[i].id}>{typeof v === 'boolean' ? <Mark ok={v} label={v ? L.yes : L.no} /> : v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Pricing({ C }) {
  const p = C.pricing;
  const [line, setLine] = useState('hosted');
  const [open, setOpen] = useState(false);
  const tabs = useRef([]);
  const pick = (i, focus) => {
    const n = (i + p.groups.length) % p.groups.length;
    setLine(p.groups[n].id);
    if (focus && tabs.current[n]) tabs.current[n].focus();
  };
  const idx = p.groups.findIndex((g) => g.id === line);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); pick(idx + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); pick(idx - 1, true); }
  };
  const rm = p.roadmap;
  const ln = p.launch;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={p.id} aria-labelledby="price-t">
      <div className={s.container}>
        <Head eyebrow={p.eyebrow} title={p.title} lead={p.lead} id="price-t" evIds={p.leadEv} />
        <div className={s.seg} role="tablist" aria-label={p.selectorLabel} onKeyDown={onKey}>
          {p.groups.map((g, i) => (
            <button key={g.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`tab-${g.id}`} aria-selected={g.id === line} aria-controls={`painel-${g.id}`} tabIndex={g.id === line ? 0 : -1} className={`${s.segBtn} ${g.id === line ? s.segOn : ''}`} onClick={() => pick(i)}>
              {g.tab}
            </button>
          ))}
        </div>
        {p.groups.map((g) => {
          const plans = g.plans.map((id) => SITE.pricing.plans.find((x) => x.id === id));
          return (
            <div key={g.id} id={`painel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} hidden={g.id !== line} {...ev(g.ev)}>
              <div className={s.grid2}>
                <div className={s.infoBox}><h3>{g.who.t}</h3><p>{g.who.d}</p></div>
                <div className={s.infoBox}><h3>{g.does.t}</h3><p>{g.does.d}</p></div>
              </div>
              <div className={`${s.planGrid} ${plans.length === 2 ? s.planGrid2 : ''}`} style={{ '--n': plans.length }}>
                {plans.map((pl) => <PlanCard key={pl.id} p={p} pl={pl} group={g} />)}
              </div>
              {g.note && <p className={s.foot} {...ev(g.noteEv)}>{g.note}</p>}
              <Compare p={p} g={g} plans={plans} open={open} setOpen={setOpen} />
            </div>
          );
        })}

        <div id={rm.id} className={s.roadmap} {...ev(rm.ev)}>
          <h3 className={s.subTitle}>{rm.title}</h3>
          <p className={s.groupLead}>{rm.lead}</p>
          <div className={s.grid3}>
            {rm.items.map((x) => (
              <article key={x.id} className={s.tile} data-roadmap {...ev(x.ev)}>
                <h4>{x.t}</h4>
                <p>{x.d}</p>
                <p className={s.meta}>{x.where}</p>
                <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href={ctaHref(`Olá! Quero ser avisado quando "${x.t}" for lançado no ${SITE.name}.`)}>{rm.cta}</a>
              </article>
            ))}
          </div>
          <p className={s.foot}>{rm.note}</p>
        </div>

        <aside className={s.launch} {...ev(ln.ev)}>
          <div className={s.launchBig} aria-hidden="true"><b>{ln.big}</b><span>{ln.bigLabel}</span></div>
          <div className={s.launchBody}>
            <span className={s.launchBadge}>{ln.badge}</span>
            <h3>{ln.title}</h3>
            <p className={s.launchLead}>{ln.lead}</p>
            <ul className={s.perks}>
              {ln.perks.map((x) => (
                <li key={x.t} {...ev(x.ev)}>
                  <span className={s.tileIcon} aria-hidden="true"><Icon>{ICONS.gift}</Icon></span>
                  <div><h4>{x.t}</h4><p>{x.d}</p></div>
                </li>
              ))}
            </ul>
            <p className={s.termsNote}>{ln.terms} <a href="/reembolso/">Ver a política</a></p>
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

// Servicos opcionais: faixa de tres linhas de texto (valores em SITE.pricing.services).
export function Services({ C }) {
  const sv = C.services;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={sv.id} aria-labelledby="serv-t" {...ev(sv.ev)}>
      <div className={s.container}>
        <p className={s.eyebrow}>{sv.eyebrow}</p>
        <h2 className={s.stripTitle} id="serv-t">{sv.title}</h2>
        <p className={s.lead}>{sv.lead}</p>
        <ul className={s.strip}>
          {SITE.pricing.services.map((x) => {
            const c = sv.items[x.id];
            return (
              <li key={x.id} {...ev(c.ev)}>
                <div><b>{c.t}</b><span>{c.d}</span></div>
                <p className={s.stripPrice}>{brl(x.price)} <small>{c.unit}</small></p>
                <a className={s.stripLink} href={ctaHref(`Olá! Quero saber mais sobre: ${c.t}.`)}>{sv.more}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta({ C }) {
  const c = C.finalCta;
  return (
    <section className={`${s.section} ${s.cta}`} aria-labelledby="cta-t">
      <div className={s.container}>
        <div className={s.ctaBox} data-reveal>
          <h2 id="cta-t">{c.title}</h2>
          <p>{c.sub}</p>
          <div className={s.btnRow}>
            <a className={`${s.btn} ${s.btnPrimary}`} href={ctaHref()}>{SITE.ctaPrimaryLabel}</a>
            <a className={`${s.btn} ${s.btnGhost}`} href={SITE.ctaSecondaryHref}>{SITE.ctaSecondaryLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
