document.addEventListener('DOMContentLoaded', () => {
  // ─── FADE-IN NO HERO ─────────────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('visible');
    window.addEventListener('scroll', () => {
      const offset = window.scrollY * 0.2;
      hero.style.setProperty('--hero-offset', `${offset}px`);
    });
  }

  // ─── EFEITO DE DIGITAÇÃO NO TÍTULO ──────────────────────────────
  const titulo = document.getElementById('titulo-oferta');
  if (titulo) {
    const textoOriginal = titulo.textContent;
    titulo.textContent = '';
    let i = 0;
    (function digitar() {
      if (i < textoOriginal.length) {
        titulo.textContent += textoOriginal.charAt(i++);
        setTimeout(digitar, 80);
      }
    })();
  }

  // ─── CARREGAR PRODUTOS DA PLANILHA ──────────────────────────────
const produtosContainer = document.getElementById('produtos-container');
const endpointProdutos = 'https://script.google.com/macros/s/AKfycbwXM1Hcjtm4DxAwUM5wzr1GfDGA9FstrQcZtqGJnUyXW-WIkijdIJYf_aKjtgtpU8ON/exec';

fetch(endpointProdutos)
  .then(res => res.json())
  .then(produtos => {
    if (!produtosContainer) return;
    produtosContainer.innerHTML = '';

    produtos.forEach(produto => {
      const card = document.createElement('article');
      card.className = 'produto-card';

      const seloPromocao = produto['Promocao']?.toLowerCase() === 'sim'
        ? '<div class="selo-promocao">🔥 Super Oferta</div>'
        : '';

      card.innerHTML = `
        ${seloPromocao}
        <img src="${produto['Imagem']}" alt="${produto['Descricao']}" />
        <h2 class="produto-titulo">${produto['Titulo']}</h2>
        <a href="${produto['Link']}" class="botao-link" target="_blank" rel="noopener noreferrer">
          Comprar na Amazon
        </a>
      `;
      produtosContainer.appendChild(card);
    });
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));


  // ─── NOTIFICAÇÃO DE COMPRA ───────────────────────────────────────
  const nomes    = ["João","Maria","Carlos","Fernanda","Rafael","Juliana","Lucas","Patrícia"];
  const cidades  = ["SP","RJ","BH","POA","Curitiba","Salvador"];
  const produtosFake = ["Grill Elétrico","Fone Bluetooth","Smartwatch","Air Fryer","Teclado Gamer","Echo Dot"];
  const caixa    = document.getElementById("notificacao-compra");

  function mostrarNotificacao() {
    if (!caixa) return;
    const nome    = nomes[Math.floor(Math.random() * nomes.length)];
    const cidade  = cidades[Math.floor(Math.random() * cidades.length)];
    const produto = produtosFake[Math.floor(Math.random() * produtosFake.length)];
    caixa.textContent = `${nome} de ${cidade} acabou de comprar um ${produto}!`;
    caixa.style.animation = 'none';
    void caixa.offsetWidth;
    caixa.style.animation = 'slideFadeInOut 6s ease-in-out';
  }

  setTimeout(mostrarNotificacao, 5000);
  setInterval(mostrarNotificacao, 30000);


  // ─── CHAT SIMULADO ───────────────────────────────────────────────
  const openChatBtn  = document.getElementById('open-chat');
  const closeChatBtn = document.getElementById('close-chat');
  const chatWindow   = document.getElementById('chat-window');
  const chatInput    = document.getElementById('chat-input');
  const sendChatBtn  = document.getElementById('send-chat');
  const chatBody     = document.getElementById('chat-body');

  if (openChatBtn && closeChatBtn && chatWindow && chatInput && sendChatBtn && chatBody) {
    openChatBtn.addEventListener('click', () => {
      chatWindow.classList.remove('hidden');
      chatInput.focus();
    });

    closeChatBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });

    function enviarMensagem() {
      const mensagem = chatInput.value.trim();
      if (!mensagem) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'user-message';
      userMsg.textContent = mensagem;
      chatBody.appendChild(userMsg);

      chatInput.value = '';

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        botMsg.innerHTML = gerarResposta(mensagem);
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 600);
    }


    sendChatBtn.addEventListener('click', enviarMensagem);
    chatInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') enviarMensagem();
    });

    
  // ─── ENVIO DE EMAIL ───────────────────────────────────────────────
  document.getElementById('email-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  const status = document.getElementById('mensagem-status');

  status.textContent = '⏳ Enviando e-mail...';

  fetch('https://script.google.com/macros/s/AKfycbwXM1Hcjtm4DxAwUM5wzr1GfDGA9FstrQcZtqGJnUyXW-WIkijdIJYf_aKjtgtpU8ON/exec', {
    method: 'POST',
    body: new URLSearchParams({ email })
  })
  .then(res => res.text())
  .then(msg => {
    status.textContent = '✅ E-mail enviado com sucesso!';
  })
  .catch(err => {
    status.textContent = '❌ Erro ao enviar e-mail. Tente novamente.';
    console.error(err);
  });
});

const form = document.getElementById('email-form');
const overlay = document.getElementById('overlay-email');
const status = document.getElementById('mensagem-status');
const fecharBtn = document.getElementById("fechar-overlay");

// Função para esconder o overlay suavemente
function esconderOverlay() {
  overlay.classList.add('hidden');
  // Opcional: depois da animação, remove do display
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300); // 300ms corresponde à duração da animação
}

// Evento de envio do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault(); // previne reload da página

  const email = document.getElementById('email-input').value;

  // Simulação de envio
  status.textContent = "E-mail enviado com sucesso! ✅";

  // Após 2 segundos, esconder overlay
  setTimeout(() => {
    esconderOverlay();
  }, 2000);
});

// Fechar clicando no botão "X"
fecharBtn.addEventListener("click", () => {
  esconderOverlay();
});

// Fechar clicando fora do modal
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    esconderOverlay();
  }
});


    function gerarResposta(msg) {
      msg = msg.toLowerCase();

      if (msg.includes('frete')) {
        return '📦 O frete é grátis para compras acima de R$199!';
      }
      if (msg.includes('desconto')) {
        return '🎉 Você pode usar o cupom PROMO10 para 10% de desconto.';
      }
      if (msg.includes('prazo')) {
        return '⏱️ O prazo de entrega varia entre 3 a 7 dias úteis.';
      }

      return `🤖 Não tenho uma resposta automática para isso...<br>
      Você pode falar diretamente com nosso atendimento pelo WhatsApp:<br>
      👉 <a href="https://wa.me/5551983098650?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20loja" target="_blank">Clique aqui para conversar</a>`;
    }
  }
});



const luna = document.getElementById('luna');
let scratching = false;

const imgCoçando = new Image();
imgCoçando.src = "https://github.com/RafaelEliasIoppi/conectavenda/blob/1875c72b6ccb975e47fd1613356ac10bf25ab931/imagens/luna9.png?raw=true";

// A cada 15s Luna se coça
setInterval(() => {
  if (!scratching) {
    scratching = true;

    // ativa coceira + troca imagem
    luna.classList.add("luna-coçando");
    luna.src = imgCoçando.src;

    // volta ao normal em 3s
    setTimeout(() => {
      luna.classList.remove("luna-coçando");
      luna.src = "https://github.com/RafaelEliasIoppi/conectavenda/blob/3c95ad92f1cc61c7d8e4173a2cab25c03510260f/imagens/luna6.png?raw=true";
      scratching = false;
    }, 3000);
  }
}, 1500);
