document.addEventListener('DOMContentLoaded', () => {
  // ─── FADE-IN NO HERO ─────────────────────────────────────────────
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');

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

  // ─── PARALLAX NO SCROLL ──────────────────────────────────────────
  window.addEventListener('scroll', () => {
    if (!hero) return;
    const offset = window.scrollY * 0.2;
    hero.style.setProperty('--hero-offset', `${offset}px`);
  });

  // ─── NOTIFICAÇÃO DE COMPRA ───────────────────────────────────────
  const nomes    = ["João","Maria","Carlos","Fernanda","Rafael","Juliana","Lucas","Patrícia"];
  const cidades  = ["SP","RJ","BH","POA","Curitiba","Salvador"];
  const produtos = ["Grill Elétrico","Fone Bluetooth","Smartwatch","Air Fryer","Teclado Gamer","Echo Dot"];
  const caixa    = document.getElementById("notificacao-compra");

  function mostrarNotificacao() {
    if (!caixa) return;
    const nome    = nomes[Math.floor(Math.random() * nomes.length)];
    const cidade  = cidades[Math.floor(Math.random() * cidades.length)];
    const produto = produtos[Math.floor(Math.random() * produtos.length)];
    caixa.textContent = `${nome} de ${cidade} acabou de comprar um ${produto}!`;
    caixa.style.animation = 'none';
    void caixa.offsetWidth; // força reflow
    caixa.style.animation = 'slideFadeInOut 6s ease-in-out';
  }

  setTimeout(mostrarNotificacao, 5000);
  setInterval(mostrarNotificacao, 30000);

  // ─── POP-UP DE CAPTURA DE E-MAIL ─────────────────────────────────
  const emailModal    = document.getElementById('email-modal');
  const closeEmailBtn = document.getElementById('close-email-modal');
  const emailForm     = document.getElementById('email-form');
  const emailInput    = document.getElementById('email-input');
  const modalKey      = 'emailModalShown';

  if (emailModal && closeEmailBtn && emailForm && emailInput) {
    function showEmailModal() {
      if (!localStorage.getItem(modalKey)) {
        emailModal.classList.remove('hidden');
      }
    }

    closeEmailBtn.addEventListener('click', () => {
      emailModal.classList.add('hidden');
      localStorage.setItem(modalKey, 'true');
    });

    // exit-intent
    document.addEventListener('mouseout', e => {
      if (e.clientY < 10) showEmailModal();
    });

    // tempo de exibição
    setTimeout(showEmailModal, 5000);

    emailForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;

      const coupon = 'PROMO10-' + Math.random().toString(36).substr(2, 5).toUpperCase();
      alert(`Obrigado! Seu cupom é ${coupon}`);
      emailModal.classList.add('hidden');
      localStorage.setItem(modalKey, 'true');

      // Envia para Google Sheets via Apps Script
      fetch('https://script.google.com/macros/s/AKfycbwQNTPIMzEbp4FxLJtCgwO7Ktdkf5kGCWYY-n-2O1n4cJTloUQEOU5qkrl_mnzmgbZp/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, coupon })
      })
      .then(() => console.log('Email enviado para o Google Sheets'))
      .catch(err => console.error('Erro ao enviar:', err));
    });
  } else {
    console.error('Elementos do pop-up não encontrados: verifique os IDs');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const openChatBtn  = document.getElementById('open-chat');
  const closeChatBtn = document.getElementById('close-chat');
  const chatWindow   = document.getElementById('chat-window');
  const chatInput    = document.getElementById('chat-input');
  const sendChatBtn  = document.getElementById('send-chat');
  const chatBody     = document.getElementById('chat-body');

  // Abrir chat
  openChatBtn.addEventListener('click', () => {
    chatWindow.classList.remove('hidden');
    chatInput.focus();
  });

  // Fechar chat
  closeChatBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  // Enviar mensagem
  function enviarMensagem() {
    const mensagem = chatInput.value.trim();
    if (!mensagem) return;

    // Adiciona mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = mensagem;
    chatBody.appendChild(userMsg);

    chatInput.value = '';

    // Resposta automática do bot
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'bot-message';
      botMsg.innerHTML = gerarResposta(mensagem); // permite HTML
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
  }

  // Gatilhos de envio
  sendChatBtn.addEventListener('click', enviarMensagem);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') enviarMensagem();
  });

  // Respostas automáticas simples
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

    // Resposta padrão com link para WhatsApp
    return `🤖 Não tenho uma resposta automática para isso...<br>
    Você pode falar diretamente com nosso atendimento pelo WhatsApp:<br>
    👉 <a href="https://wa.me/5551983098650?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20loja" target="_blank">Clique aqui para conversar</a>`;
  }
});


