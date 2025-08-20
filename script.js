document.addEventListener("DOMContentLoaded", () => {
  // ─── FADE-IN NO HERO ─────────────────────────────────────────────
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.classList.add("visible");
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * 0.2;
      hero.style.setProperty("--hero-offset", `${offset}px`);
    });
  }

  // ─── EFEITO DE DIGITAÇÃO NO TÍTULO ──────────────────────────────
  const titulo = document.getElementById("titulo-oferta");
  if (titulo) {
    const textoOriginal = titulo.textContent;
    titulo.textContent = "";
    let i = 0;
    (function digitar() {
      if (i < textoOriginal.length) {
        titulo.textContent += textoOriginal.charAt(i++);
        setTimeout(digitar, 80);
      }
    })();
  }

  // ─── CARREGAR PRODUTOS DA PLANILHA ──────────────────────────────
  const produtosContainer = document.getElementById("produtos-container");
  const endpointProdutos = "https://script.google.com/macros/s/AKfycbwXM1Hcjtm4DxAwUM5wzr1GfDGA9FstrQcZtqGJnUyXW-WIkijdIJYf_aKjtgtpU8ON/exec";

  fetch(endpointProdutos)
    .then(res => res.json())
    .then(produtos => {
      if (!produtosContainer) return;
      produtosContainer.innerHTML = "";

      produtos.forEach(produto => {
        const card = document.createElement("article");
        card.className = "produto-card";

        const seloPromocao = produto["Promocao"]?.toLowerCase() === "sim"
          ? '<div class="selo-promocao">🔥 Super Oferta</div>'
          : "";

        card.innerHTML = `
          ${seloPromocao}
          <img src="${produto["Imagem"]}" alt="${produto["Descricao"]}" />
          <h2 class="produto-titulo">${produto["Titulo"]}</h2>
          <a href="${produto["Link"]}" class="botao-link" target="_blank" rel="noopener noreferrer">
            Comprar na Amazon
          </a>
        `;
        produtosContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));

  // ─── NOTIFICAÇÃO DE COMPRA ───────────────────────────────────────
  const nomes = ["João", "Maria", "Carlos", "Fernanda", "Rafael", "Juliana", "Lucas", "Patrícia"];
  const cidades = ["SP", "RJ", "BH", "POA", "Curitiba", "Salvador"];
  const produtosFake = ["Grill Elétrico", "Fone Bluetooth", "Smartwatch", "Air Fryer", "Teclado Gamer", "Echo Dot"];
  const caixa = document.getElementById("notificacao-compra");

  function mostrarNotificacao() {
    if (!caixa) return;
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const cidade = cidades[Math.floor(Math.random() * cidades.length)];
    const produto = produtosFake[Math.floor(Math.random() * produtosFake.length)];
    caixa.textContent = `${nome} de ${cidade} acabou de comprar um ${produto}!`;
    caixa.style.animation = "none";
    void caixa.offsetWidth; // Reinicia animação
    caixa.style.animation = "slideFadeInOut 6s ease-in-out";
  }

  setTimeout(mostrarNotificacao, 5000);
  setInterval(mostrarNotificacao, 30000);

  // ─── CHAT SIMULADO ───────────────────────────────────────────────
  const openChatBtn = document.getElementById("open-chat");
  const closeChatBtn = document.getElementById("close-chat");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const sendChatBtn = document.getElementById("send-chat");
  const chatBody = document.getElementById("chat-body");

  if (openChatBtn && closeChatBtn && chatWindow && chatInput && sendChatBtn && chatBody) {
    openChatBtn.addEventListener("click", () => {
      chatWindow.classList.remove("hidden");
      chatInput.focus();
    });

    closeChatBtn.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });

    function enviarMensagem() {
      const mensagem = chatInput.value.trim();
      if (!mensagem) return;

      const userMsg = document.createElement("div");
      userMsg.className = "user-message";
      userMsg.textContent = mensagem;
      chatBody.appendChild(userMsg);

      chatInput.value = "";

      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-message";
        botMsg.innerHTML = gerarResposta(mensagem);
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 600);
    }

    sendChatBtn.addEventListener("click", enviarMensagem);
    chatInput.addEventListener("keypress", e => {
      if (e.key === "Enter") enviarMensagem();
    });

    function gerarResposta(msg) {
      msg = msg.toLowerCase();

      if (msg.includes("frete")) {
        return "📦 O frete é grátis para compras acima de R$199!";
      }
      if (msg.includes("desconto")) {
        return "🎉 Você pode usar o cupom PROMO10 para 10% de desconto.";
      }
      if (msg.includes("prazo")) {
        return "⏱️ O prazo de entrega varia entre 3 a 7 dias úteis.";
      }

      return `🤖 Não tenho uma resposta automática para isso...<br>
      Você pode falar diretamente com nosso atendimento pelo WhatsApp:<br>
      👉 <a href="https://wa.me/5551983098650?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20loja" target="_blank">Clique aqui para conversar</a>`;
    }
  }

  // ─── ENVIO DE EMAIL ───────────────────────────────────────────────
  const form = document.getElementById("email-form");
  const overlay = document.getElementById("overlay-email");
  const status = document.getElementById("mensagem-status");
  const fecharBtn = document.getElementById("fechar-overlay");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email-input").value;

    status.textContent = "⏳ Enviando e-mail...";

    fetch("https://script.google.com/macros/s/AKfycbwXM1Hcjtm4DxAwUM5wzr1GfDGA9FstrQcZtqGJnUyXW-WIkijdIJYf_aKjtgtpU8ON/exec", {
      method: "POST",
      body: new URLSearchParams({ email })
    })
      .then(res => res.text())
      .then(msg => {
        status.textContent = "✅ E-mail enviado com sucesso!";
        setTimeout(() => esconderOverlay(), 2000);
      })
      .catch(err => {
        status.textContent = "❌ Erro ao enviar e-mail. Tente novamente.";
        console.error(err);
      });
  });

  function esconderOverlay() {
    overlay.classList.add("hidden");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 300);
  }

  fecharBtn.addEventListener("click", () => {
    esconderOverlay();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      esconderOverlay();
    }
  });

  // ─── AMAZON VITRINE ──────────────────────────────────────────────
 const vitrineContainer = document.getElementById("amazon-vitrine");

  if (vitrineContainer) {
    // Configuração Amazon Afiliados
    window.amzn_assoc_placement = "adunit0";
    window.amzn_assoc_tracking_id = "rafaelioppi-20"; // seu ID afiliado
    window.amzn_assoc_ad_mode = "search";
    window.amzn_assoc_ad_type = "smart";
    window.amzn_assoc_marketplace = "amazon";
    window.amzn_assoc_region = "BR"; // Região Brasil
    window.amzn_assoc_default_search_phrase = "eletrônicos";
    window.amzn_assoc_default_category = "All";
    window.amzn_assoc_linkid = "1234567890abcdef"; // pode ser deixado vazio

    // Carregar script da Amazon
    const existingScript = document.querySelector(
      'script[src="https://z-na.amazon-adsystem.com/widgets/onejs"]'
    );

    if (!existingScript) {
      const scriptAmazonLoader = document.createElement("script");
      scriptAmazonLoader.src = "https://z-na.amazon-adsystem.com/widgets/onejs";
      scriptAmazonLoader.async = true;
      document.body.appendChild(scriptAmazonLoader);
    }
  }
  });