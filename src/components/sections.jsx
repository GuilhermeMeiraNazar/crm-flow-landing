import s from '../styles/landing.module.scss';
import { SITE, whatsappHref } from '../config/site.js';
import { Counter, useLitSteps } from '../hooks/effects.jsx';
import { Shot, ev } from './ui.jsx';

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
          <p className={s.heroNote}>{h.note}</p>
        </div>
        <div className={s.stage} data-parallax>
          <div className={s.stageGlow} aria-hidden="true" />
          <div className={s.tilt}>
            <Shot name="pipeline" alt={h.shotAlt} eager sizes="(min-width: 1200px) 1100px, 100vw" />
          </div>
        </div>
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

function Demo({ id }) {
  if (id === 'inbox') return (
    <div className={s.demo} aria-hidden="true"><div className={s.msgs}>
      <span className={s.msg}>Olá, vocês têm o kit iniciante?</span>
      <span className={s.msg}>Temos sim! Posso passar os detalhes.</span>
      <span className={s.msg}>Consigo parcelar?<span className={s.typing} style={{ marginLeft: 8 }}><i /><i /><i /></span></span>
      <span className={s.msg}>Em até 6 vezes.</span>
    </div></div>
  );
  if (id === 'kanban') return (
    <div className={s.demo} aria-hidden="true"><div className={s.kan}>
      {['Novo', 'Proposta', 'Ganho'].map((c, i) => (
        <div key={c} className={s.kcol}><b>{c}</b>{i < 2 && <span className={s.kcard} />}{i === 0 && <span className={s.kcard} />}</div>
      ))}
      <span className={s.kmove} />
    </div></div>
  );
  if (id === 'ai') return (
    <div className={s.demo} aria-hidden="true"><div className={s.flow}>
      <span className={`${s.node} ${s.nodeOn}`}>IA responde</span><span className={s.arrow}>→</span>
      <span className={`${s.node} ${s.nodeOn}`}>Cliente pede atendente</span><span className={s.arrow}>→</span>
      <span className={`${s.node} ${s.nodeOn}`}>Equipe assume</span>
    </div></div>
  );
  if (id === 'reports') return (
    <div className={s.demo} aria-hidden="true">
      <svg className={s.chart} viewBox="0 0 300 110" preserveAspectRatio="none">
        <path className={s.chartArea} d="M0 90 L50 70 L100 78 L150 45 L200 52 L250 24 L300 14 L300 110 L0 110Z" />
        <path className={s.chartLine} d="M0 90 L50 70 L100 78 L150 45 L200 52 L250 24 L300 14" pathLength="400" />
      </svg>
    </div>
  );
  if (id === 'auto') return (
    <div className={s.demo} aria-hidden="true"><div className={s.chips}>
      <span className={`${s.tag} ${s.tagLive}`}>Ao entrar na etapa</span><span className={s.tag}>Após X dias parado</span>
      <span className={s.tag}>Enviar template</span><span className={s.tag}>Notificar atendente</span><span className={s.tag}>Agendar lembrete</span>
    </div></div>
  );
  if (id === 'lead') return (
    <div className={s.demo} aria-hidden="true"><div className={s.chips}>
      <span className={s.tag}>nome</span><span className={s.tag}>telefone</span><span className={s.tag}>e-mail</span><span className={s.tag}>orçamento</span><span className={s.tag}>interesse</span>
      <span className={`${s.tag} ${s.tagLive}`}>→ negócio criado</span>
    </div></div>
  );
  return null;
}

export function Bento({ C }) {
  const b = C.bento;
  return (
    <section className={s.section} id={b.id} aria-labelledby="bento-t">
      <div className={s.container}>
        <Head eyebrow={b.eyebrow} title={b.title} id="bento-t" evIds={b.ev} />
        <div className={s.bento}>
          {b.cards.map((c, k) => (
            <article key={c.id} className={`${s.card} ${s[`size_${c.size}`]}`} data-spot data-reveal style={{ '--i': k % 3 }} {...ev(c.ev)}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
              <Demo id={c.id} />
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
        <div className={s.aiGrid}>
          <div>
            <Head eyebrow={a.eyebrow} title={a.title} lead={a.lead} id="ia-t" evIds={a.ev} />
            <div className={s.pillars}>
              {a.pillars.map((p, k) => (
                <article key={p.t} className={s.card} data-spot data-reveal style={{ '--i': k }} {...ev(p.ev)}><h3>{p.t}</h3><p>{p.d}</p></article>
              ))}
            </div>
            <p className={s.notice} data-reveal {...ev(a.privacyEv)}>{a.privacy}</p>
          </div>
          <div data-reveal><Shot name="ia" alt={a.shotAlt} /></div>
        </div>
      </div>
    </section>
  );
}

export function Showcase({ C }) {
  return (
    <section className={`${s.section} ${s.sectionLine}`} aria-label="Telas do produto">
      <div className={s.container}>
        {C.showcase.map((r, i) => (
          <div key={r.id} id={r.id} className={`${s.row} ${i % 2 ? s.rowFlip : ''}`}>
            <div className={s.rowText} data-reveal>
              <p className={s.eyebrow}>{r.eyebrow}</p>
              <h3>{r.title}</h3>
              <p>{r.d}</p>
              <ul className={s.ticks}>
                {r.bullets.map((b) => (
                  <li key={b.t} {...ev(b.ev, b.review)}>{b.t}{b.review && <span className={s.review}>revisão do dono</span>}</li>
                ))}
              </ul>
            </div>
            <div data-reveal style={{ '--i': 1 }}><Shot name={r.shot} alt={r.alt} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Ownership({ C }) {
  const o = C.ownership;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={o.id} aria-labelledby="own-t">
      <div className={s.container}>
        <Head eyebrow={o.eyebrow} title={o.title} lead={o.lead} id="own-t" evIds={o.ev} />
        <div className={s.own}>
          {o.items.map((i, k) => (
            <article key={i.t} className={s.card} data-spot data-reveal style={{ '--i': k % 3 }} {...ev(i.ev)}><h3>{i.t}</h3><p>{i.d}</p></article>
          ))}
        </div>
        <p className={s.notice} data-reveal {...ev(['S3.1'])}>{o.privacy}</p>
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

export function Requirements({ C }) {
  const r = C.requirements;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={r.id} aria-labelledby="req-t">
      <div className={s.container}>
        <Head eyebrow={r.eyebrow} title={r.title} lead={r.lead} id="req-t" evIds={r.ev} />
        <dl className={s.reqTable} data-reveal {...ev(r.ev)}>
          {r.rows.map(([k, v]) => <div key={k} className={s.reqRow}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <p className={s.foot} {...ev(r.footnoteEv)}>{r.footnote}</p>
      </div>
    </section>
  );
}

const brl = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: SITE.pricing.currency }).format(n);
export function Pricing({ C }) {
  const p = C.pricing;
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={p.id} aria-labelledby="price-t">
      <div className={s.container}>
        <Head eyebrow={p.eyebrow} title={p.title} lead={p.lead} id="price-t" />
        <div className={s.priceWrap}>
          {SITE.pricing.plans.map((pl) => (
            <article key={pl.id} className={`${s.plan} ${pl.highlight ? s.planHi : ''}`} data-reveal>
              <h3 className={s.planName}>{pl.name}</h3>
              <p className={s.price}>{pl.price == null ? 'A definir' : brl(pl.price)}</p>
              <p className={s.billing}>{pl.billing}</p>
              <ul className={s.ticks}>{pl.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a className={`${s.btn} ${s.btnPrimary}`} href={SITE.CTA_URL} style={{ marginTop: 24 }}>{SITE.ctaPrimaryLabel}</a>
              <p className={s.placeholder}>Garantia: {SITE.pricing.guarantee}</p>
              <p className={s.placeholder}>Reemissão da licença: {SITE.pricing.reissuePolicy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ C }) {
  const f = C.faq;
  const extra = { install: SITE.pricing.installService, reissue: SITE.pricing.reissuePolicy, updates: null };
  return (
    <section className={`${s.section} ${s.sectionLine}`} id={f.id} aria-labelledby="faq-t">
      <div className={s.container}>
        <Head eyebrow={f.eyebrow} title={f.title} id="faq-t" />
        <div className={s.faq}>
          {f.items.map((it) => (
            <details key={it.q} className={s.faqItem} {...ev(it.ev)}>
              <summary>{it.q}</summary>
              <p className={s.faqAns}>{it.a}{it.extra && extra[it.extra] ? extra[it.extra] : ''}</p>
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
