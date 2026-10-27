// Home MedTwins · ponto de entrada (ES module, sem build)
// Inicializa o que é global; cada seção com interação própria entra como módulo em js/secoes/.
import { iniciarRolagem, iniciarAncoras } from './globais/rolagem.js?v=1.2.2';
import { iniciarNavegacao } from './globais/navegacao.js?v=1.2.2';
import { iniciarMarcaTexto } from './globais/marca-texto.js?v=1.2.2';
import { iniciarSurge } from './globais/surge.js?v=1.2.2';
import { iniciarRodape } from './globais/rodape.js?v=1.2.2';
import { iniciarBotoes } from './globais/botoes.js?v=1.2.2';
import { iniciarHero } from './secoes/01-hero.js?v=1.2.2';
import { iniciarJornadas } from './secoes/02-jornadas.js?v=1.2.2';
import { iniciarIdentificacao } from './secoes/03-identificacao.js?v=1.2.2';
import { iniciarMetodologia } from './secoes/05-metodologia.js?v=1.2.2';
import { iniciarPrimeiraEtapa } from './secoes/06-primeira-etapa.js?v=1.2.2';
import { iniciarSegundaEtapa } from './secoes/07-segunda-etapa.js?v=1.2.2';
import { iniciarAcompanhamento } from './secoes/09-acompanhamento.js?v=1.2.2';
import { iniciarDepoimentos } from './secoes/10-depoimentos.js?v=1.2.2';
import { iniciarParaQuem } from './secoes/11-para-quem.js?v=1.2.2';
import { iniciarFechamento } from './secoes/13-fechamento.js?v=1.2.2';

// Os módulos carregaram: a partir daqui as animações que começam escondidas podem rodar
// (sem isto, ex. aberto como arquivo local ou com erro de rede, tudo fica no estado final)
document.documentElement.classList.add('js-pronto');

iniciarRolagem();
iniciarAncoras();
iniciarNavegacao();
iniciarMarcaTexto();
iniciarSurge();
iniciarRodape();
iniciarBotoes();
iniciarHero();
iniciarJornadas();
iniciarIdentificacao();
iniciarMetodologia();
iniciarPrimeiraEtapa();
iniciarSegundaEtapa();
iniciarAcompanhamento();
iniciarDepoimentos();
iniciarParaQuem();
iniciarFechamento();
