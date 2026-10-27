import { pronto } from '../../../assets/simulados.js?v=1.3.0';
await pronto;
// Simulado Nacional MedTwins · ponto de entrada (ES module, sem build)
// Liga o que é global (movimento reduzido e pausa com a aba oculta, Lenis e a ponte
// com o ScrollTrigger, entradas ao rolar, botões) e inicia os módulos da página.
// O módulo de cada parte só carrega quando a página tem essa parte: as LPs têm todas;
// as páginas de liberação têm só o hero com a parede e a lista de links.
import { iniciarMovimento } from './globais/movimento.js?v=1.3.0';
import { iniciarRolagem, usarScrollTrigger } from './globais/rolagem.js?v=1.3.0';
import { iniciarSurge } from './globais/surge.js?v=1.3.0';
import { iniciarBotoes } from './globais/botoes.js?v=1.3.0';

const tem = (seletor) => document.querySelector(seletor) !== null;
const modulos = Promise.all([
  tem('[data-lead]') ? import('./formulario.js?v=1.3.0') : null,
  tem('[data-parede]') ? import('./cenas/prova.js?v=1.3.0') : null,
  tem('[data-resultado]') ? import('./cenas/resultado.js?v=1.3.0') : null,
  tem('[data-provas]') ? import('./cenas/provas.js?v=1.3.0') : null,
  tem('[data-mesa]') ? import('./cenas/mesa.js?v=1.3.0') : null,
  tem('[data-liberacao]') ? import('./liberacao.js?v=1.3.0') : null,
]);

// Os módulos carregaram: a partir daqui o que começa escondido pode animar
// (sem isto, aberto como arquivo ou com erro de rede, tudo fica no estado final)
document.documentElement.classList.add('js-pronto');

iniciarMovimento();
iniciarRolagem();
iniciarSurge();
iniciarBotoes();

const [formulario, parede, jornada, bloco, mesa, liberacao] = await modulos;
formulario?.iniciarFormulario();
const prova = parede?.iniciarProva();
jornada?.iniciarResultado(prova);
bloco?.iniciarProvas();
mesa?.iniciarMesa();
liberacao?.iniciarLiberacao();

// O ScrollTrigger entra depois do carregamento, já ligado ao Lenis, para as cenas fixadas
// (as páginas sem cena fixada não precisam dele)
if (jornada || bloco) {
  const ligarScrollTrigger = () => usarScrollTrigger().catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(ligarScrollTrigger, { timeout: 2500 });
  else setTimeout(ligarScrollTrigger, 1200);
}
