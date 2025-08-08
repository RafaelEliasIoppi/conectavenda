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
      fetch('https://script.google.com/macros/s/AKfycbyVKvNGwmU77ru-6S0Boz1pOLK_VX1zCpFXyWmkQQoEQ-CfO7SvkFRAcgojOinarI3-Tw/exec', {
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
