import { hydrateRoot, createRoot } from 'react-dom/client';
import './styles/global.scss';
import { PAGES } from './pages/pages.jsx';
import { SITE } from './config/site.js';

const el = document.getElementById('root');
const page = PAGES[el.dataset.page] || PAGES.home;
if (el.children.length) hydrateRoot(el, page()); else createRoot(el).render(page());

// Analytics opcional e sem cookies. Desligado por padrao: nenhum script de terceiro e carregado.
const A = SITE.analytics;
if (A.enabled && A.src) {
  const sc = document.createElement('script');
  sc.defer = true;
  sc.src = A.src;
  if (A.dataDomain) sc.setAttribute('data-domain', A.dataDomain);
  document.head.appendChild(sc);
}

