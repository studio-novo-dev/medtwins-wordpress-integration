// Páginas de liberação (liberacao.html e liberacao-6-areas.html)
// Os links dos simulados ainda não têm endereço: ficam com href="#" e data-pendente.
// Enquanto estiverem assim, o clique não navega (dentro do iframe, um "#" com target="_top"
// tiraria a pessoa da página do WordPress). Quando o endereço chegar, troca-se o href e
// tira-se o data-pendente; o target="_top" já está no HTML para o link abrir fora do iframe,
// na mesma aba, como na página de liberação antiga.
export function iniciarLiberacao() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-pendente]');
    if (!link) return;
    e.preventDefault();
    console.info(`Link do simulado ainda não definido (${link.textContent.trim()}).`);
  });
}
