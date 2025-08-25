// script.js
document.addEventListener("DOMContentLoaded", () => {
  // ─── 1. FADE-IN NO HERO ──────────────────────────────────────────
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.classList.add("visible");
    window.addEventListener("scroll", () => {
      const offset = window.scrollY * 0.2;
      hero.style.setProperty("--hero-offset", `${offset}px`);
    });
  }

  // ─── 2. EFEITO DE DIGITAÇÃO NO TÍTULO ────────────────────────────
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

  // ─── 3. CARREGAR PRODUTOS DA PLANILHA ───────────────────────────
  const produtosContainer = document.getElementById("produtos-container");
  const endpointProdutos =
    "https://script.google.com/macros/s/AKfycbwXM1Hcjtm4DxAwUM5wzr1GfDGA9FstrQcZtqGJnUyXW-WIkijdIJYf_aKjtgtpU8ON/exec";

  if (produtosContainer) {
    fetch(endpointProdutos)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((produtos) => {
        produtosContainer.innerHTML = "";
        if (produtos.length === 0) {
          produtosContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
          return;
        }
        produtos.forEach((produto) => {
          const card = document.createElement("article");
          card.className = "produto-card";

          const seloPromocao =
            produto["Promocao"]?.toLowerCase() === "sim"
              ? 	'<div class="selo-promocao">🔥 Super Oferta</div>'
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
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        produtosContainer.innerHTML = "<p>Erro ao carregar produtos.</p>";
      });
  }

  // ─── 4. NOTIFICAÇÃO DE COMPRA ────────────────────────────────────
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
    void caixa.offsetWidth; // reinicia animação
    caixa.style.animation = "slideFadeInOut 6s ease-in-out";
  }

  // Inicia a notificação após 5 segundos e repete a cada 30 segundos
  setTimeout(mostrarNotificacao, 5000);
  setInterval(mostrarNotificacao, 30000);

  // ─── 5. CHAT SIMULADO ───────────────────────────────────────────
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
      
      // Adiciona mensagem do usuário
      const userMsg = document.createElement("div");
      userMsg.className = "user-message";
      userMsg.textContent = mensagem;
      chatBody.appendChild(userMsg);
      chatInput.value = "";
      
      // Scroll para o final
      chatBody.scrollTop = chatBody.scrollHeight;
      
      // Mostra indicador de digitação
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "bot-message typing-indicator";
      typingIndicator.innerHTML = `
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <small>Assistente está digitando...</small>
      `;
      chatBody.appendChild(typingIndicator);
      chatBody.scrollTop = chatBody.scrollHeight;
      
      // Simula tempo de resposta mais realista
      const tempoResposta = Math.random() * 1000 + 800; // 800ms a 1800ms
      
      setTimeout(() => {
        // Remove indicador de digitação
        chatBody.removeChild(typingIndicator);
        
        // Adiciona resposta do bot
        const botMsg = document.createElement("div");
        botMsg.className = "bot-message";
        botMsg.innerHTML = gerarResposta(mensagem);
        chatBody.appendChild(botMsg);
        
        // Scroll para o final
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Adiciona sugestões rápidas se for a primeira mensagem
        if (chatBody.children.length <= 3) {
          adicionarSugestoesRapidas();
        }
      }, tempoResposta);
    }
    
    function adicionarSugestoesRapidas() {
      const suggestionsContainer = document.createElement("div");
      suggestionsContainer.className = "chat-suggestions";
      suggestionsContainer.innerHTML = `
        <div class="suggestions-title">Perguntas frequentes:</div>
        <button class="suggestion-btn" data-msg="Como funciona o frete?">📦 Frete</button>
        <button class="suggestion-btn" data-msg="Quais são os descontos?">🎉 Descontos</button>
        <button class="suggestion-btn" data-msg="Formas de pagamento">💳 Pagamento</button>
        <button class="suggestion-btn" data-msg="Contato WhatsApp">📞 Contato</button>
      `;
      chatBody.appendChild(suggestionsContainer);
      chatBody.scrollTop = chatBody.scrollHeight;
      
      // Adiciona event listeners para as sugestões
      suggestionsContainer.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const msg = btn.getAttribute('data-msg');
          chatInput.value = msg;
          enviarMensagem();
          suggestionsContainer.remove();
        });
      });
    }

    sendChatBtn.addEventListener("click", enviarMensagem);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") enviarMensagem();
    });
  }

  function gerarResposta(msg) {
    msg = msg.toLowerCase();
    
    // Saudações
    if (msg.includes("oi") || msg.includes("olá") || msg.includes("bom dia") || msg.includes("boa tarde") || msg.includes("boa noite")) {
      return "👋 Olá! Seja bem-vindo(a) ao ConectaVenda! Como posso te ajudar hoje?";
    }
    
    // Informações sobre frete
    if (msg.includes("frete") || msg.includes("entrega") || msg.includes("envio")) {
      return `📦 <strong>Informações sobre frete:</strong><br>
        • Frete GRÁTIS para compras acima de R$ 199<br>
        • Entrega em todo o Brasil<br>
        • Prazo: 3 a 7 dias úteis<br>
        • Rastreamento incluído`;
    }
    
    // Descontos e promoções
    if (msg.includes("desconto") || msg.includes("promoção") || msg.includes("cupom") || msg.includes("oferta")) {
      return `🎉 <strong>Promoções ativas:</strong><br>
        • PROMO10: 10% de desconto<br>
        • FRETEGRATIS: Frete grátis em qualquer valor<br>
        • PRIMEIRA: 15% OFF na primeira compra<br>
        📧 Cadastre seu e-mail para ofertas exclusivas!`;
    }
    
    // Prazo de entrega
    if (msg.includes("prazo") || msg.includes("quando chega") || msg.includes("demora")) {
      return `⏱️ <strong>Prazos de entrega:</strong><br>
        • Região Sudeste: 2-4 dias úteis<br>
        • Região Sul: 3-5 dias úteis<br>
        • Demais regiões: 5-7 dias úteis<br>
        📍 Informe seu CEP para cálculo exato!`;
    }
    
    // Pagamento
    if (msg.includes("pagamento") || msg.includes("pagar") || msg.includes("cartão") || msg.includes("pix") || msg.includes("boleto")) {
      return `💳 <strong>Formas de pagamento:</strong><br>
        • PIX (desconto de 5%)<br>
        • Cartão de crédito (até 12x)<br>
        • Boleto bancário<br>
        🔒 Pagamento 100% seguro pela Amazon`;
    }
    
    // Produtos
    if (msg.includes("produto") || msg.includes("item") || msg.includes("comprar")) {
      return `🛍️ <strong>Nossos produtos:</strong><br>
        • Eletrônicos e gadgets<br>
        • Casa e cozinha<br>
        • Moda e acessórios<br>
        📱 Todos os produtos são vendidos pela Amazon`;
    }
    
    // Suporte/Ajuda
    if (msg.includes("ajuda") || msg.includes("suporte") || msg.includes("problema") || msg.includes("dúvida")) {
      return `🆘 <strong>Como posso te ajudar:</strong><br>
        • Informações sobre produtos<br>
        • Dúvidas sobre entrega<br>
        • Promoções e descontos<br>
        • Suporte técnico<br>
        💬 Continue conversando ou fale no WhatsApp!`;
    }
    
    // Contato
    if (msg.includes("contato") || msg.includes("telefone") || msg.includes("whatsapp")) {
      return `📞 <strong>Nossos canais de atendimento:</strong><br>
        • WhatsApp: <a href="https://wa.me/5551983098650" target="_blank">+55 51 9 8309-8650</a><br>
        • Horário: Segunda a sexta, 9h às 18h<br>
        • E-mail: Através do formulário do site<br>
        ⚡ Resposta rápida garantida!`;
    }
    
    // Agradecimento
    if (msg.includes("obrigad") || msg.includes("valeu") || msg.includes("thanks")) {
      return `😊 <strong>De nada!</strong><br>
        Fico feliz em ajudar! Se precisar de mais alguma coisa, é só chamar.<br>
        🎯 Aproveite nossas ofertas especiais!`;
    }
    
    // Despedida
    if (msg.includes("tchau") || msg.includes("bye") || msg.includes("até logo") || msg.includes("adeus")) {
      return `👋 <strong>Até mais!</strong><br>
        Obrigado pela visita! Volte sempre ao ConectaVenda.<br>
        💌 Não esqueça de se cadastrar para receber ofertas exclusivas!`;
    }
    
    // Resposta padrão mais inteligente
    return `🤖 <strong>Interessante pergunta!</strong><br>
      Ainda estou aprendendo sobre isso. Mas posso te ajudar com:<br>
      • 📦 Frete e entrega<br>
      • 🎉 Descontos e promoções<br>
      • 💳 Formas de pagamento<br>
      • 🛍️ Informações sobre produtos<br><br>
      💬 Para dúvidas específicas, fale no WhatsApp:<br>
      👉 <a href="https://wa.me/5551983098650?text=Olá!%20Tenho%20uma%20dúvida%20sobre%20a%20loja" target="_blank">Clique aqui para conversar</a>`;
  }

  // ─── 6. ENVIO DE EMAIL ──────────────────────────────────────────
  const form = document.getElementById("email-form");
  const overlay = document.getElementById("overlay-email");
  const status = document.getElementById("mensagem-status");
  const fecharBtn = document.getElementById("fechar-overlay");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("email-input");
      const email = emailInput.value.trim();

      if (!email) {
        status.textContent = "❌ Por favor, insira um e-mail válido.";
        return;
      }

      status.textContent = "⏳ Enviando e-mail...";
      try {
        const res = await fetch(endpointProdutos, {
          method: "POST",
          body: new URLSearchParams({ email }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        status.textContent = "✅ E-mail enviado com sucesso!";
        emailInput.value = ""; // Limpa o campo de e-mail
        setTimeout(() => esconderOverlay(), 2000);
      } catch (err) {
        status.textContent = "❌ Erro ao enviar e-mail. Tente novamente.";
        console.error("Erro ao enviar e-mail:", err);
      }
    });

    fecharBtn.addEventListener("click", esconderOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) esconderOverlay();
    });
  }

  function esconderOverlay() {
    overlay.classList.add("hidden");
    setTimeout(() => (overlay.style.display = "none"), 300);
  }
});


(async function loadPosts({ limit = 6 } = {}) {
  const postsContainer = document.getElementById("posts-grid");
  if (!postsContainer) return;

  postsContainer.innerHTML = "<p>Carregando posts…</p>";

  // 🔹 Função única para normalizar imagens
  function resolveImagePath(path) {
    if (!path) return "";
    path = path.trim();

    if (path.startsWith("http")) return path;              // já é link externo
    if (path.startsWith("static/img/uploads/")) return "/" + path; // já contém static
    return `/static/img/uploads/${path}`;                  // relativo simples
  }

  // Função para parsear o frontmatter de um arquivo Markdown
  function parseFrontmatter(mdContent) {
    const fmMatch = mdContent.match(/^---\s*([\s\S]*?)\s*---/);
    let meta = {};
    let body = mdContent;

    if (fmMatch) {
      body = mdContent.replace(fmMatch[0], "").trim();
      fmMatch[1].split("\n").forEach((line) => {
        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) return;

        const key = line.substring(0, separatorIndex).trim();
        let value = line.substring(separatorIndex + 1).trim();

        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        meta[key] = value;
      });
    }
    return { meta, body };
  }

  try {
    // 1) Lista arquivos MD via GitHub API
    const res = await fetch(
      "https://api.github.com/repos/RafaelEliasIoppi/conectavenda/contents/content/posts?ref=main"
    );
    if (!res.ok) throw new Error(`Erro ao listar posts: ${res.statusText}`);
    const files = await res.json();

    // 2) Filtra arquivos .md
    const mdFiles = files.filter((f) => f.name.endsWith(".md"));

    // 3) Baixa conteúdos e monta objetos
    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const mdContent = await fetch(file.download_url).then((r) => {
          if (!r.ok) throw new Error(`Erro ao baixar ${file.name}: ${r.statusText}`);
          return r.text();
        });

        const { meta, body } = parseFrontmatter(mdContent);

        const title = meta.title || "Sem título";
        const date = meta.date ? new Date(meta.date) : new Date();
        const excerpt = meta.excerpt || (body.substring(0, 140).trim() + "...");
        const image = meta.image ? resolveImagePath(meta.image) : "";

        const slug = file.name.replace(/\.md$/i, "");

        return { slug, title, date, excerpt, image };
      })
    );

    // 4) Ordena por data e aplica limite
    posts.sort((a, b) => b.date - a.date);
    const sliced = posts.slice(0, limit);

    // 5) Renderiza HTML
    if (sliced.length === 0) {
      postsContainer.innerHTML = "<p>Nenhum post encontrado.</p>";
    } else {
      postsContainer.innerHTML = sliced
        .map((p) => {
          return `
            <article class="post-card">
              ${p.image ? `<img class="featured" src="${p.image}" alt="${p.title}">` : ""}
              <h3><a href="post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
              <time datetime="${p.date.toISOString()}">${p.date.toLocaleDateString("pt-BR")}</time>
              <p>${p.excerpt}</p>
              <a href="post.html?slug=${encodeURIComponent(p.slug)}" class="read-more">Leia mais →</a>
            </article>
          `;
        })
        .join("");
    }
  } catch (err) {
    console.error("Erro ao carregar posts:", err);
    postsContainer.innerHTML = "<p>Erro ao carregar posts.</p>";
  }
})();

// ─── 7. SISTEMA DE BUSCA DO BLOG ────────────────────────────────────
(function initBlogSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const resultsCount = document.getElementById('search-results-count');
  const postsContainer = document.getElementById('posts-grid');
  let allPosts = []; // Armazena todos os posts carregados
  
  if (!searchInput || !postsContainer) return;
  
  // Observa mudanças no container de posts para capturar posts carregados
  const observer = new MutationObserver(() => {
    captureLoadedPosts();
  });
  
  observer.observe(postsContainer, { childList: true });
  
  function captureLoadedPosts() {
    // Captura todos os posts carregados
    const postCards = postsContainer.querySelectorAll('.post-card');
    allPosts = Array.from(postCards).map(card => {
      const title = card.querySelector('h3')?.textContent || '';
      const excerpt = card.querySelector('p')?.textContent || '';
      const content = title + ' ' + excerpt;
      return {
        element: card,
        content: content.toLowerCase(),
        title: title,
        excerpt: excerpt
      };
    });
    
    if (allPosts.length > 0) {
      updateResultsCount(allPosts.length, allPosts.length);
    }
  }
  
  function updateResultsCount(shown, total) {
    if (total === 0) {
      resultsCount.textContent = '';
    } else if (shown === total) {
      resultsCount.textContent = `📄 ${total} artigo${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
    } else {
      resultsCount.textContent = `🔍 ${shown} de ${total} artigo${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
    }
  }
  
  function performSearch(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
      // Mostra todos os posts
      allPosts.forEach(post => {
        post.element.style.display = '';
      });
      updateResultsCount(allPosts.length, allPosts.length);
      return;
    }
    
    let visibleCount = 0;
    
    allPosts.forEach(post => {
      const isMatch = post.content.includes(query);
      
      if (isMatch) {
        post.element.style.display = '';
        highlightSearchTerms(post.element, query);
        visibleCount++;
      } else {
        post.element.style.display = 'none';
      }
    });
    
    updateResultsCount(visibleCount, allPosts.length);
    
    // Mostra mensagem se nenhum resultado
    if (visibleCount === 0 && allPosts.length > 0) {
      if (!document.querySelector('.no-search-results')) {
        const noResults = document.createElement('div');
        noResults.className = 'no-search-results';
        noResults.innerHTML = `
          <div style="text-align: center; padding: 40px; color: #666;">
            <p style="font-size: 1.2rem; margin-bottom: 10px;">🔍 Nenhum artigo encontrado</p>
            <p style="font-size: 0.9rem;">Tente palavras-chave diferentes ou remova filtros</p>
          </div>
        `;
        postsContainer.appendChild(noResults);
      }
    } else {
      // Remove mensagem de "nenhum resultado"
      const noResults = document.querySelector('.no-search-results');
      if (noResults) {
        noResults.remove();
      }
    }
  }
  
  function highlightSearchTerms(postElement, query) {
    // Remove highlights anteriores
    const highlighted = postElement.querySelectorAll('.search-highlight');
    highlighted.forEach(el => {
      el.outerHTML = el.innerHTML;
    });
    
    // Adiciona novos highlights
    const titleEl = postElement.querySelector('h3 a');
    const excerptEl = postElement.querySelector('p');
    
    if (titleEl) {
      titleEl.innerHTML = highlightText(titleEl.textContent, query);
    }
    
    if (excerptEl) {
      excerptEl.innerHTML = highlightText(excerptEl.textContent, query);
    }
  }
  
  function highlightText(text, query) {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }
  
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Event listeners
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300); // Debounce de 300ms
  });
  
  // Limpa busca com Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      performSearch('');
      searchInput.blur();
    }
  });
  
  // Foco inicial no campo se não há posts carregados
  setTimeout(() => {
    if (postsContainer.textContent.includes('Erro ao carregar posts')) {
      searchInput.placeholder = '🔍 Busca disponível após carregar artigos...';
      searchInput.disabled = true;
    }
  }, 2000);
})();

