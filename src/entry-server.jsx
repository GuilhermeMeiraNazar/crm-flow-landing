import { renderToString } from 'react-dom/server';
import { PAGES } from './pages/pages.jsx';

export function render(page) {
  const fn = PAGES[page] || PAGES.home;
  return renderToString(fn());
}
