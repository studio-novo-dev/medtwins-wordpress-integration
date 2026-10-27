import { prepararCaptura, abrirAcesso } from '../../../assets/simulados.js?v=1.3.0';
// Formulário (porte de ../medtwins-simulados/main.js): duas etapas no mesmo card,
// máscara de telefone, validação, envio em JSON, evento de Lead e gaveta no celular.
// Também cuida de quem chama o formulário: os CTAs [data-ir-form] das dobras 2 e 3
// (no desktop rolam até o card e focam o primeiro campo vazio; no celular abrem a
// gaveta), os botões [data-abrir-form] e a barra fixa que aparece depois do hero.
import { REDUZIDO } from './globais/movimento.js?v=1.3.0';
import { CONFIG } from './dados/simulacao.js?v=1.3.0';
import { rolarPara, travarRolagem } from './globais/rolagem.js?v=1.3.0';


// Valor do campo "pagina" do lead: vem da configuração da página (js/dados/simulacao.js)
const PAGINA = CONFIG.pagina;

/* Microcopy de interface que não veio na copy aprovada (a mesma da v2).
   Fica aqui, num lugar só, para revisão e aprovação. */
const MICROCOPY = {
  nomeVazio: 'Digite seu nome.',
  telefoneVazio: 'Digite seu WhatsApp com DDD.',
  telefoneInvalido: 'Confira o número: DDD e 9 dígitos.',
  emailVazio: 'Digite seu e-mail.',
  emailInvalido: 'Confira o e-mail.',
  escolha: 'Escolha uma opção.',
  falhaRede: 'Não conseguimos enviar agora. Confira sua conexão.',
  tentarDeNovo: 'Tentar de novo',
};

const TEMPO_TROCA_PASSO = 170;   // ms, saída da etapa antes da entrada da próxima
const TEMPO_REDIRECIONAR = 1700; // ms, do confirmado até abrir REDIRECT_URL (se houver)

const MOBILE = matchMedia('(max-width: 1099px)');

export function iniciarFormulario() {
  const lead = document.querySelector('[data-lead]');
  if (!lead) return;
  const cartao = lead.querySelector('.lead__card');
  const form = lead.querySelector('[data-form]');
  const etapaNum = lead.querySelector('[data-etapa-num]');
  const botaoVoltar = lead.querySelector('[data-voltar]');
  const botaoEnviar = lead.querySelector('[data-enviar]');
  const falha = lead.querySelector('[data-falha]');
  const falhaTexto = lead.querySelector('[data-falha-texto]');
  const botaoTentar = lead.querySelector('[data-tentar]');
  const campos = { nome: form.elements.nome, telefone: form.elements.telefone, email: form.elements.email };
  const perguntas = [...form.querySelectorAll('[data-pergunta]')];

  let passoAtual = 1;
  let enviando = false;

  /* ---------- Validação ---------- */
  const somenteDigitos = (v) => v.replace(/\D/g, '');

  function mascaraTelefone(v) {
    const d = somenteDigitos(v).slice(0, 11);
    if (!d) return '';
    if (d.length < 3) return `(${d}`;
    if (d.length < 8) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  function mensagemCampo(nome) {
    const v = campos[nome].value.trim();
    if (nome === 'nome') return v.length >= 2 && /\p{L}/u.test(v) ? '' : MICROCOPY.nomeVazio;
    if (nome === 'telefone') {
      const d = somenteDigitos(v);
      if (!d) return MICROCOPY.telefoneVazio;
      return d.length === 11 && Number(d.slice(0, 2)) >= 11 && d[2] === '9' ? '' : MICROCOPY.telefoneInvalido;
    }
    if (nome === 'email') {
      if (!v) return MICROCOPY.emailVazio;
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : MICROCOPY.emailInvalido;
    }
    return '';
  }

  function mostrarErro(alvo, msg, input) {
    alvo.classList.toggle('campo--erro', Boolean(msg));
    const p = alvo.querySelector('[data-erro]');
    p.replaceChildren();
    if (msg) {
      const icone = document.createElement('span');
      icone.className = 'icone icone--alerta';
      icone.setAttribute('aria-hidden', 'true');
      const texto = document.createElement('span');
      texto.textContent = msg;
      p.append(icone, texto);
    }
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validarCampo(nome) {
    const msg = mensagemCampo(nome);
    mostrarErro(campos[nome].closest('[data-campo]'), msg, campos[nome]);
    return !msg;
  }

  function validarPasso1() {
    const invalidos = Object.keys(campos).filter((n) => !validarCampo(n));
    if (invalidos.length) campos[invalidos[0]].focus();
    return invalidos.length === 0;
  }

  function validarPergunta(fs) {
    const ok = Boolean(fs.querySelector('input:checked'));
    mostrarErro(fs, ok ? '' : MICROCOPY.escolha);
    return ok;
  }

  function validarPasso2() {
    const invalidas = perguntas.filter((fs) => !validarPergunta(fs));
    if (invalidas.length) {
      invalidas[0].querySelector('input').focus();
      invalidas[0].scrollIntoView({ block: 'nearest', behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
    }
    return invalidas.length === 0;
  }

  Object.entries(campos).forEach(([nome, input]) => {
    input.addEventListener('input', () => {
      if (nome === 'telefone') input.value = mascaraTelefone(input.value);
      if (input.closest('[data-campo]').classList.contains('campo--erro')) validarCampo(nome);
    });
    input.addEventListener('blur', () => {
      if (input.value.trim()) validarCampo(nome);
    });
  });

  perguntas.forEach((fs) => fs.addEventListener('change', () => validarPergunta(fs)));

  /* ---------- Etapas ---------- */
  const tituloDoPasso = (n) => form.querySelector(`[data-passo="${n}"] [tabindex="-1"]`);

  function irPara(n) {
    const atual = form.querySelector('[data-passo]:not([hidden])');
    const proximo = form.querySelector(`[data-passo="${n}"]`);
    if (!proximo || atual === proximo) return;
    passoAtual = n;

    lead.classList.toggle('lead--etapa-2', n === 2);
    lead.classList.toggle('lead--sucesso', n === 3);
    etapaNum.textContent = String(Math.min(n, 2)).padStart(2, '0');
    botaoVoltar.hidden = n !== 2;
    lead.setAttribute('aria-labelledby', tituloDoPasso(n).id);

    const trocar = () => {
      atual.hidden = true;
      atual.classList.remove('passo--saindo');
      proximo.hidden = false;
      proximo.classList.add('passo--entrando');
      void proximo.offsetWidth;
      proximo.classList.remove('passo--entrando');
      cartao.scrollTop = 0;
      tituloDoPasso(n).focus({ preventScroll: true });
    };

    if (REDUZIDO.matches) { trocar(); return; }
    atual.classList.add('passo--saindo');
    setTimeout(trocar, TEMPO_TROCA_PASSO);
  }

  botaoVoltar.addEventListener('click', () => irPara(1));

  /* ---------- Envio ---------- */
  function lerUtms() {
    const utms = {};
    new URLSearchParams(location.search).forEach((v, k) => {
      if (k.toLowerCase().startsWith('utm_')) utms[k] = v;
    });
    return utms;
  }

  function montarPayload() {
    const respostas = {};
    const respostasTexto = [];
    perguntas.forEach((fs) => {
      const marcada = fs.querySelector('input:checked');
      const pergunta = fs.querySelector('legend > span:last-child').textContent.trim();
      respostas[fs.dataset.pergunta] = marcada ? marcada.value : null;
      respostasTexto.push({ pergunta, resposta: marcada ? marcada.value : null });
    });
    return {
      nome: campos.nome.value.trim(),
      telefone: campos.telefone.value,
      telefone_digitos: somenteDigitos(campos.telefone.value),
      email: campos.email.value.trim().toLowerCase(),
      respostas,
      respostas_texto: respostasTexto,
      utms: lerUtms(),
      url: location.href,
      data: new Date().toISOString(),
      pagina: PAGINA,
    };
  }

  function dispararLead(dados) {
    try {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: 'Lead', lead_origem: PAGINA, prova_inep: dados.respostas.prova_inep });
      }
    } catch { /* rastreio nunca bloqueia o fluxo */ }
    try {
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: CONFIG.leadNome });
    } catch { /* idem */ }
  }

  function mostrarFalha() {
    falhaTexto.textContent = MICROCOPY.falhaRede;
    botaoTentar.textContent = MICROCOPY.tentarDeNovo;
    falha.hidden = false;
  }

  const espera = (ms) => new Promise((r) => setTimeout(r, ms));

  async function enviar() {
    if (enviando) return;
    enviando = true;
    falha.hidden = true;
    botaoEnviar.classList.add('enviando');
    botaoEnviar.setAttribute('aria-busy', 'true');
    const dados = montarPayload();

    try {
      await prepararCaptura();
      // A captura usa o submit nativo observado pelo RD, sem POST fictício.
      await espera(600);
      sucesso(dados);
    } catch (erro) {
      console.error('[MedTwins] Falha no envio do lead:', erro);
      mostrarFalha();
      botaoTentar.focus({ preventScroll: true });
      cartao.scrollTo({ top: cartao.scrollHeight, behavior: REDUZIDO.matches ? 'auto' : 'smooth' });
    } finally {
      enviando = false;
      botaoEnviar.classList.remove('enviando');
      botaoEnviar.removeAttribute('aria-busy');
    }
  }

  let capturaPronta = false;
  const prepararEnvio = async () => {
    botaoEnviar.disabled = true;
    botaoEnviar.setAttribute('aria-busy', 'true');
    try { await prepararCaptura(); capturaPronta = true; }
    catch { capturaPronta = false; }
    finally { botaoEnviar.disabled = false; botaoEnviar.removeAttribute('aria-busy'); }
  };
  prepararEnvio();
  botaoTentar.addEventListener('click', async () => {
    await prepararEnvio();
    if (capturaPronta) form.requestSubmit(botaoEnviar);
    else mostrarFalha();
  });

  function sucesso(dados) {
    dispararLead(dados);
    irPara(3);
    document.dispatchEvent(new CustomEvent('lead:enviado'));
    setTimeout(abrirAcesso, TEMPO_REDIRECIONAR);
  }

  const continuar = () => { if (validarPasso1()) irPara(2); };
  form.querySelector('[data-teste="continuar"]').addEventListener('click', continuar);
  form.addEventListener('keydown', (e) => {
    if (passoAtual === 1 && e.key === 'Enter') { e.preventDefault(); continuar(); }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passoAtual !== 2) { e.stopImmediatePropagation(); return; }
    if (!validarPasso2() || !capturaPronta || enviando) {
      e.stopImmediatePropagation();
      if (!capturaPronta) mostrarFalha();
      return;
    }
    enviar();
  });

  /* ---------- Gaveta (celular) ---------- */
  const veu = document.querySelector('[data-veu]');
  const botaoFechar = lead.querySelector('[data-fechar]');
  const abridores = [...document.querySelectorAll('[data-abrir-form]')];
  const barra = document.querySelector('[data-barra-cta]');
  let gavetaAberta = false;
  let quemAbriu = null;

  function aplicarModo() {
    if (MOBILE.matches) {
      lead.setAttribute('role', 'dialog');
      lead.setAttribute('aria-modal', 'true');
      lead.inert = !gavetaAberta;
    } else {
      fecharGaveta(false);
      lead.removeAttribute('role');
      lead.removeAttribute('aria-modal');
      lead.inert = false;
    }
  }

  function abrirGaveta(origem) {
    if (gavetaAberta) return;
    gavetaAberta = true;
    quemAbriu = origem || abridores[0];
    lead.inert = false;
    veu.hidden = false;
    requestAnimationFrame(() => {
      veu.classList.add('veu--ativo');
      lead.classList.add('lead--aberto');
    });
    travarRolagem(true);
    barra?.classList.remove('barra-cta--visivel');
    abridores.forEach((b) => b.setAttribute('aria-expanded', 'true'));
    setTimeout(() => tituloDoPasso(passoAtual).focus({ preventScroll: true }), 80);
  }

  function fecharGaveta(devolverFoco = true) {
    if (!gavetaAberta) return;
    gavetaAberta = false;
    lead.classList.remove('lead--aberto');
    veu.classList.remove('veu--ativo');
    setTimeout(() => { if (!gavetaAberta) veu.hidden = true; }, 320);
    travarRolagem(false);
    abridores.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    if (MOBILE.matches) lead.inert = true;
    atualizarBarra();
    if (devolverFoco) quemAbriu?.focus({ preventScroll: true });
  }

  abridores.forEach((b) => b.addEventListener('click', () => abrirGaveta(b)));
  botaoFechar.addEventListener('click', () => fecharGaveta());
  veu.addEventListener('click', () => fecharGaveta());

  document.addEventListener('keydown', (e) => {
    if (!gavetaAberta) return;
    if (e.key === 'Escape') { fecharGaveta(); return; }
    if (e.key !== 'Tab') return;
    const focaveis = [...lead.querySelectorAll('button, input, [tabindex="0"]')]
      .filter((el) => !el.disabled && el.offsetParent !== null);
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && (document.activeElement === primeiro || !lead.contains(document.activeElement))) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primeiro.focus();
    }
  });

  /* ---------- Barra fixa do celular: a partir do fim do hero ---------- */
  const fimHero = document.querySelector('[data-hero-fim]');
  let passouHero = false;

  function atualizarBarra() {
    barra?.classList.toggle('barra-cta--visivel', MOBILE.matches && passouHero && !gavetaAberta);
  }

  if (fimHero && barra) {
    new IntersectionObserver(([e]) => {
      passouHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      atualizarBarra();
    }).observe(fimHero);
  }

  /* ---------- CTAs das dobras 2 e 3 ---------- */
  function chamarNoDesktop() {
    const hero = lead.closest('section') || lead;
    const primeiroVazio = passoAtual === 1
      ? Object.values(campos).find((c) => !c.value.trim()) || campos.nome
      : tituloDoPasso(passoAtual);
    rolarPara(hero, {
      aoTerminar: () => {
        primeiroVazio?.focus({ preventScroll: true });
        lead.classList.remove('lead--chamado');
        void lead.offsetWidth;
        lead.classList.add('lead--chamado');
      },
    });
  }

  document.addEventListener('click', (e) => {
    const cta = e.target.closest('[data-ir-form]');
    if (!cta) return;
    e.preventDefault();
    if (MOBILE.matches) abrirGaveta(cta);
    else chamarNoDesktop();
  });

  lead.addEventListener('animationend', (e) => {
    if (e.animationName === 'lead-chamado') lead.classList.remove('lead--chamado');
  });

  /* ---------- Início ---------- */
  aplicarModo();
  MOBILE.addEventListener('change', () => { aplicarModo(); atualizarBarra(); });
  requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add('gaveta-pronta')));
}
