// Cena 3 · a virada da mesa (dobra 3)
// Quando a foto dos fundadores entra na tela (uma vez): ela se abre por clip-path, a imagem
// assenta e os nomes sobem sobre cada um (tudo em CSS, disparado pela classe .mesa--entrou).
// Sem JS, sem IntersectionObserver ou com movimento reduzido: tudo já no lugar.
import { REDUZIDO } from '../globais/movimento.js?v=1.3.0';

export function iniciarMesa() {
  const mesa = document.querySelector('[data-mesa]');
  const foto = mesa?.querySelector('[data-foto]');
  if (!foto) return;

  const entrar = () => mesa.classList.add('mesa--entrou');
  if (REDUZIDO.matches || !('IntersectionObserver' in window)) {
    entrar();
    return;
  }

  const observador = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    observador.disconnect();
    entrar();
  }, { rootMargin: '0px 0px -22% 0px' });
  observador.observe(foto);
}
