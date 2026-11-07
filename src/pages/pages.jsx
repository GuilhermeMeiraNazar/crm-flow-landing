import s from '../styles/landing.module.scss';
import { SITE } from '../config/site.js';
import { copy } from '../content/pt-BR.js';
import { legal } from '../content/legal.js';
import { Navbar, Footer } from '../components/ui.jsx';
import { Hero, Marquee, Problem, Bento, AiSection, Showcase, How, Pricing, Faq, FinalCta } from '../components/sections.jsx';
import { usePageEffects } from '../hooks/effects.jsx';

export function Home() {
  const C = copy(SITE);
  usePageEffects();
  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Navbar links={C.nav} home />
      <main id="main">
        <Hero C={C} />
        <Marquee C={C} />
        <Problem C={C} />
        <Bento C={C} />
        <AiSection C={C} />
        <Showcase C={C} />
        <How C={C} />
        <Pricing C={C} />
        <Faq C={C} />
        <FinalCta C={C} />
      </main>
      <Footer C={C} />
    </>
  );
}

export function Legal({ doc }) {
  const C = copy(SITE);
  const L = legal(SITE)[doc];
  usePageEffects();
  return (
    <>
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Navbar links={C.nav} home={false} />
      <main id="main" className={`${s.container} ${s.legalMain}`}>
        {SITE.legalDraft && <p className={s.draft} role="note">RASCUNHO: revisar com advogado antes de publicar. Este texto não afirma conformidade com nenhuma norma.</p>}
        <h1>{L.title}</h1>
        <p className={s.legalMeta}>Última atualização: {SITE.legalUpdatedAt}</p>
        <p>{L.intro}</p>
        {L.sections.map((sec) => (
          <section key={sec.h}>
            <h2>{sec.h}</h2>
            {sec.p.map((t, i) => <p key={i}>{t}</p>)}
          </section>
        ))}
      </main>
      <Footer C={C} />
    </>
  );
}

export const PAGES = { home: () => <Home />, termos: () => <Legal doc="termos" />, privacidade: () => <Legal doc="privacidade" />, reembolso: () => <Legal doc="reembolso" /> };
