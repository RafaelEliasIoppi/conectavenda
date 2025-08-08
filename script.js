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
    const nome    = nomes[Math.floor(Math.random()*nomes.length)];
    const cidade  = cidades[Math.floor(Math.random()*cidades.length)];
    const produto = produtos[Math.floor(Math.random()*produtos.length)];
    caixa.textContent = `${nome} de ${cidade} acabou de comprar um ${produto}!`;
    caixa.style.animation = 'none';
    void caixa.offsetWidth; // force reflow
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

  if (emailModal) {
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

    setTimeout(showEmailModal, 5000);

    emailForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;
      const coupon = 'PROMO10-' + Math.random().toString(36).substr(2, 5).toUpperCase();
      alert(`Obrigado! Seu cupom é ${coupon}`);
      emailModal.classList.add('hidden');
      localStorage.setItem(modalKey, 'true');
      // TODO: envie email/cupom para sua API aqui
    });
  } else {
    console.error('Overlay de e-mail não encontrado: verifique o ID email-modal');
  }

  // ─── WIDGET DE CHATBOT / WHATSAPP ───────────────────────────────
  const openChat  = document.getElementById('open-chat');
  const chatWin   = document.getElementById('chat-window');
  const closeChat = document.getElementById('close-chat');
  const chatBody  = document.getElementById('chat-body');
  const chatInput = document.getElementById('chat-input');
  const sendChat  = document.getElementById('send-chat');

  if (openChat && closeChat && sendChat && chatBody) {
    openChat.addEventListener('click',  () => chatWin.classList.remove('hidden'));
    closeChat.addEventListener('click', () => chatWin.classList.add('hidden'));

    function appendMessage(text, sender = 'bot') {
      const div = document.createElement('div');
      div.className = sender === 'bot' ? 'bot-message' : 'user-message';
      div.textContent = text;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function appendLink(text, url) {
      const div = document.createElement('div');
      div.className = 'bot-message';
      div.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    sendChat.addEventListener('click', () => {
      const msg = chatInput.value.trim();
      if (!msg) return;
      appendMessage(msg, 'user');
      chatInput.value = '';

      const lower = msg.toLowerCase();
      if (lower.includes('frete') || lower.includes('entrega')) {
        appendMessage('Qual seu CEP para calcular o frete?');
      } else if (/promo|cupom|desconto/.test(lower)) {
        appendMessage('Enviei um cupom de 10% para o seu e-mail. Precisa de mais ajuda?');
      } else if (lower.includes('comprar')) {
        appendMessage('Claro! Qual produto gostaria de comprar?');
      } else {
        appendMessage('Vou te conectar com nosso WhatsApp. 🙂');
        const waLink = `https://wa.me/5551983098650?text=${encodeURIComponent('Olá, gostaria de mais informações.')}`;
        appendLink('Clique aqui para conversar no WhatsApp', waLink);
      }
    });
  }
});
