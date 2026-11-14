const raiz = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const L = {
  pt: {
    continuar: 'Continuar', voltar: 'Voltar', escuro: 'Modo escuro', claro: 'Modo claro',
    menu: 'Menu', contato: 'Contato', sobre: 'Sobre', curriculo: 'Currículo',
    navegacao: 'Navegação das seções', anterior: 'Seção anterior', proxima: 'Próxima seção',
    descricao: 'Portfólio de Dennis Ferreira: designer UX/UI e desenvolvedor frontend. Conheça projetos digitais em design e desenvolvimento web.',
    locale: 'pt_BR',
    projetoRedacted: 'Projeto [REDACTED]', projetoCaptar: 'Projeto Captar',
    regiao: 'Seções do portfólio',
    mapa: 'Mapa de projetos',
    redactedMobile: 'Aplicativo [REDACTED] exibido em um smartphone',
    redactedVisual: 'Identidade visual do projeto [REDACTED]',
    redactedDesktop: 'Site [REDACTED] exibido em um computador',
    captarMobile: 'Projeto Captar exibido em um smartphone',
    captarVisual: 'Identidade visual do projeto Captar',
    captarDesktop: 'Site do projeto Captar exibido em um computador',
    secoes: ['Sobre', 'Projeto [REDACTED]', 'Projeto Captar', 'Contato'],
    esq: 'Olá, me chamo Dennis Ferreira e trabalho com design e desenvolvimento frontend. Minha base técnica e capacidade de comunicação me permitem adaptar ao seu processo e a sua equipe de forma rápida e orgânica.',
    dir: 'Transformo a presença digital da sua empresa. Crio e revitalizo identidades e páginas web estudando o seu público-alvo para reconectar sua marca com os clientes, entre em contato para alavancar seus resultados.'
  },
  en: {
    continuar: 'Continue', voltar: 'Back', escuro: 'Dark mode', claro: 'Light mode',
    menu: 'Menu', contato: 'Contact', sobre: 'About', curriculo: 'Resume',
    navegacao: 'Section navigation', anterior: 'Previous section', proxima: 'Next section',
    descricao: "Dennis Ferreira's portfolio: UX/UI designer and frontend developer. Explore digital design and web development projects.",
    locale: 'en_US',
    projetoRedacted: '[REDACTED] project', projetoCaptar: 'Captar project',
    regiao: 'Portfolio sections',
    mapa: 'Project navigation',
    redactedMobile: '[REDACTED] app displayed on a smartphone',
    redactedVisual: '[REDACTED] project visual identity',
    redactedDesktop: '[REDACTED] website displayed on a computer',
    captarMobile: 'Captar project displayed on a smartphone',
    captarVisual: 'Captar project visual identity',
    captarDesktop: 'Captar project website displayed on a computer',
    secoes: ['About', 'Project [REDACTED]', 'Captar project', 'Contact'],
    esq: "Hello, I'm Dennis Ferreira, a designer and frontend dev. My technical background and communication skills allow me to adapt to your process and your team in a fast and organic way.",
    dir: "I can transform your company's digital presence, create and revamp identities and web pages by studying your target audience so you can reconnect your brand with its customers. Get in touch to boost your results."
  }
};

const slides = $$('.slide');
const itens = $$('.mapa button');
const imagensGemas = $$('.flutuante img');
const trilha = $('.trilha');
const mobile = matchMedia('(max-width: 760px)');
const btnContato = $('#btn-contato');
const btnContinuar = $('#btn-continuar');
const ultimo = slides.length - 1;
let idioma = 'pt', atual = 0, voltarPara = null, travado = false, rodaMobileTravada = false;

const span = (classe, texto = '') => Object.assign(document.createElement('span'), { className: classe, textContent: texto });

const escrever = () => $$('.txt').forEach(el => {
  const texto = L[idioma][el.dataset.t];
  const visual = span('');
  visual.setAttribute('aria-hidden', 'true');
  let i = 0;

  texto.split(' ').forEach((palavra, n) => {
    const p = span('palavra');
    for (const c of palavra) {
      const letra = span('letra', c);
      letra.style.setProperty('--i', i++);
      p.append(letra);
    }
    visual.append(n ? ' ' : '', p);
  });

  el.replaceChildren(span('sr', texto), visual);
});

const traduzir = () => {
  $$('[data-t]:not(.txt)').forEach(el => el.textContent = L[idioma][el.dataset.t]);
  $$('[data-alt]').forEach(el => { el.alt = L[idioma][el.dataset.alt]; });
  $('#btn-curriculo').href = `docs/${idioma === 'pt' ? 'curriculo' : 'resume'}.pdf`;
  $('meta[name="description"]').content = L[idioma].descricao;
  $('meta[property="og:description"]').content = L[idioma].descricao;
  $('meta[property="og:locale"]').content = L[idioma].locale;
  trilha.setAttribute('aria-label', L[idioma].regiao);
  $('.botoes').setAttribute('aria-label', L[idioma].menu);
  $('.mapa').setAttribute('aria-label', L[idioma].mapa);
  $('.setas').setAttribute('aria-label', L[idioma].navegacao);
  $('#btn-anterior').setAttribute('aria-label', L[idioma].anterior);
  $('#btn-proximo').setAttribute('aria-label', L[idioma].proxima);
  $('#slide-status').textContent = L[idioma].secoes[atual];
};

$$('[data-lang]').forEach(b => b.addEventListener('click', () => {
  idioma = b.dataset.lang;
  raiz.dataset.idioma = idioma;
  raiz.lang = idioma === 'pt' ? 'pt-BR' : 'en';
  raiz.dataset.etapa = 1;
  $$('[data-lang]').forEach(o => o.setAttribute('aria-pressed', o === b));
  traduzir();
  escrever();
}));

const definirTema = t => {
  raiz.dataset.tema = t;
  localStorage.setItem('tema', t);
  imagensGemas.forEach(img => {
    const claro = t === 'claro' ? '-claro' : '';
    img.src = `images/gema-${img.dataset.gema}${claro}.png`;
  });
  $$('[data-tema-btn]').forEach(b => b.setAttribute('aria-pressed', b.dataset.temaBtn === t));
};
$$('[data-tema-btn]').forEach(b => b.addEventListener('click', () => definirTema(b.dataset.temaBtn)));
definirTema(raiz.dataset.tema);

const vista = (v, moverFoco = false) => {
  raiz.dataset.vista = v;
  $('.intro').inert = v === 'portfolio';
  $('main').inert = v === 'menu';
  if (v === 'portfolio') escrever();
  if (moverFoco) (v === 'portfolio' ? trilha : btnContinuar).focus({ preventScroll: true });
};
btnContinuar.addEventListener('click', () => vista('portfolio', true));
$('#btn-menu').addEventListener('click', () => {
  btnContinuar.dataset.t = 'voltar';
  traduzir();
  vista('menu', true);
});

const atualizar = () => {
  raiz.style.setProperty('--atual', atual);
  slides.forEach((s, n) => {
    s.classList.toggle('ativo', n === atual);
    s.inert = n !== atual;
  });
  itens.forEach((b, n) => {
    b.dataset.dist = Math.abs(n - atual);
    b.setAttribute('aria-current', n === atual);
  });
  $('#btn-anterior').disabled = atual === 0;
  $('#btn-proximo').disabled = atual === ultimo;
  btnContato.dataset.t = atual < ultimo ? 'contato' : voltarPara === null ? 'sobre' : 'voltar';
  traduzir();
  if (atual === 0) escrever();
};

const ir = (i, peloBotaoContato = false) => {
  i = Math.max(0, Math.min(ultimo, i));
  if (i === atual) return;
  voltarPara = peloBotaoContato ? atual : null;
  atual = i;
  atualizar();
  if (mobile.matches) {
    trilha.scrollTo({ top: slides[i].offsetTop, behavior: 'smooth' });
  }
};

itens.forEach((b, n) => b.addEventListener('click', () => ir(n)));
$('#btn-anterior').addEventListener('click', () => ir(atual - 1));
$('#btn-proximo').addEventListener('click', () => ir(atual + 1));

btnContato.addEventListener('click', () => {
  if (atual < ultimo) ir(ultimo, true);
  else ir(voltarPara ?? 0);
});

addEventListener('wheel', e => {
  const delta = e.deltaY || e.deltaX;
  if (raiz.dataset.vista !== 'portfolio' || Math.abs(delta) < 8) return;
  if (mobile.matches) {
    e.preventDefault();
    if (rodaMobileTravada) return;
    rodaMobileTravada = true;
    setTimeout(() => rodaMobileTravada = false, 420);
    ir(atual + Math.sign(delta));
    return;
  }
  if (travado) return;
  travado = true;
  setTimeout(() => travado = false, 800);
  ir(atual + Math.sign(delta));
}, { passive: false });

trilha.addEventListener('scroll', () => {
  if (!mobile.matches || raiz.dataset.vista !== 'portfolio') return;
  const proximo = Math.round(trilha.scrollTop / trilha.clientHeight);
  if (proximo === atual) return;
  atual = proximo;
  voltarPara = null;
  atualizar();
}, { passive: true });

let inicioToque = null;
trilha.addEventListener('pointerdown', e => {
  if (mobile.matches && e.pointerType === 'touch') {
    inicioToque = { x: e.clientX, y: e.clientY };
  }
});
trilha.addEventListener('pointerup', e => {
  if (!inicioToque || raiz.dataset.vista !== 'portfolio') return;
  const dx = e.clientX - inicioToque.x;
  const dy = e.clientY - inicioToque.y;
  inicioToque = null;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    ir(atual + (dx < 0 ? 1 : -1));
  }
});
trilha.addEventListener('pointercancel', () => { inicioToque = null; });

addEventListener('keydown', e => {
  if (raiz.dataset.vista !== 'portfolio') return;
  if (e.key === 'ArrowRight') ir(atual + 1);
  if (e.key === 'ArrowLeft') ir(atual - 1);
});

const gemas = $('.gemas');
const cursor = $('.cursor');
let alvoX = 0, alvoY = 0, mx = 0, my = 0;

addEventListener('pointermove', e => {
  alvoX = e.clientX / innerWidth * 2 - 1;
  alvoY = e.clientY / innerHeight * 2 - 1;
  if (e.pointerType !== 'touch') {
    cursor.style.left = `${e.clientX - 3}px`;
    cursor.style.top = `${e.clientY - 2}px`;
    cursor.classList.add('visivel');
  }
});
document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('visivel'));

const seguir = () => {
  if (Math.abs(alvoX - mx) > .0005 || Math.abs(alvoY - my) > .0005) {
    mx += (alvoX - mx) * .03;
    my += (alvoY - my) * .03;
    gemas.style.setProperty('--mx', mx.toFixed(4));
    gemas.style.setProperty('--my', my.toFixed(4));
  }
  requestAnimationFrame(seguir);
};
seguir();

traduzir();
escrever();
atualizar();
vista('menu');
