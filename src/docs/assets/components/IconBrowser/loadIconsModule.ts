import { PACKS } from './consts';

const loading: string[] = [];

export function loadIconModule(name: keyof typeof PACKS) {
  window.exports = {};

  if (loading.includes(name)) return;
  // @ts-ignore
  if (window[name] && window[name].allIconNames.length > 0) return;

  //@ts-ignore
  window[name] = {
    allIconNames: []
  };
  loading.push(name);

  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = `https://unpkg.com/icon-packs/${name}`;
  s.onload = () => {
    //@ts-ignore
    window[name] = window.exports;
    window.exports = {};
  };

  document.head.append(s);
}
