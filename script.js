const botao = document.getElementById('btn-tema');
const raiz = document.documentElement;

botao.addEventListener('click', () => {
  const novo = raiz.dataset.tema === 'escuro' ? 'claro' : 'escuro';
  raiz.dataset.tema = novo;
  localStorage.setItem('tema', novo);
});