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
      .then((res) => res.json())
      .then((produtos) => {
        produtosContainer.innerHTML = "";
        produtos.forEach((produto) => {
          const card = document.createElement("article");
          card.className = "produto-card";

          const seloPromocao =
            produto["Promocao"]?.toLowerCase() === "sim"
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
      .catch((err) => console.error("Erro ao carregar produtos:", err));
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
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") enviarMensagem();
    });
  }

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

  // ─── 6. ENVIO DE EMAIL ──────────────────────────────────────────
  const form = document.getElementById("email-form");
  const overlay = document.getElementById("overlay-email");
  const status = document.getElementById("mensagem-status");
  const fecharBtn = document.getElementById("fechar-overlay");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email-input").value;
      status.textContent = "⏳ Enviando e-mail...";
      fetch(endpointProdutos, {
        method: "POST",
        body: new URLSearchParams({ email }),
      })
        .then((res) => res.text())
        .then(() => {
          status.textContent = "✅ E-mail enviado com sucesso!";
          setTimeout(() => esconderOverlay(), 2000);
        })
        .catch((err) => {
          status.textContent = "❌ Erro ao enviar e-mail. Tente novamente.";
          console.error(err);
        });
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

  
  function resolveImagePath(filename) {
  const BASE_URL = "https://raw.githubusercontent.com/RafaelEliasIoppi/conectavenda/refs/heads/main/static/img/uploads/";
  if (!filename) return "";
  return BASE_URL + filename.trim();
}

 (async function loadPosts({ limit = 6 } = {}) {
    const postsContainer = document.getElementById("posts-grid");
    if (!postsContainer) return;

    postsContainer.innerHTML = "<p>Carregando posts…</p>";

    try {
      // 1) Lista arquivos MD via GitHub API
      const res = await fetch(
        "https://api.github.com/repos/RafaelEliasIoppi/conectavenda/contents/content/posts?ref=main"
      );
      if (!res.ok) throw new Error("Erro ao listar posts");
      const files = await res.json();

      // 2) Filtra arquivos .md
      const mdFiles = files.filter((f) => f.name.endsWith(".md"));

      // 3) Baixa conteúdos e monta objetos já com slug = nome do arquivo
      const posts = await Promise.all(
        mdFiles.map(async (file) => {
          const md = await fetch(file.download_url).then((r) => {
            if (!r.ok) throw new Error(`Erro ao baixar ${file.name}`);
            return r.text();
          });

          // Frontmatter
          const fm = md.match(/^---\s*([\s\S]*?)\s*---/);
          let meta = {};
          let body = md;
          if (fm) {
            body = md.replace(fm[0], "").trim();
            fm[1].split("\n").forEach((line) => {
              const [k, ...vals] = line.split(":");
              if (!k || !vals.length) return;
              meta[k.trim()] = vals.join(":").trim().replace(/^"|"$/g, "");
            });
          }

          const slug = file.name.replace(/\.md$/i, ""); // slug = nome do arquivo

          return {
            slug,
            title: meta.title || "Sem título",
            date: meta.date ? new Date(meta.date) : new Date(),
            excerpt: meta.excerpt || (body.substring(0, 140).trim() + "..."),
            image: meta.image ? resolveImagePath(meta.image) : ""
          };
        })
      );

      // 4) Ordena por data (mais recente primeiro) e aplica limite
      posts.sort((a, b) => b.date - a.date);
      const sliced = posts.slice(0, limit);

      // 5) Renderiza HTML dos posts
      if (sliced.length === 0) {
        postsContainer.innerHTML = "<p>Nenhum post encontrado.</p>";
      } else {
        postsContainer.innerHTML = sliced
          .map(
            (p) => `
            <article class="post-card">
              ${p.image ? `<img class="featured" src="${p.image}" alt="${p.title}">` : ""}
              <h3><a href="post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
              <time datetime="${p.date.toISOString()}">${p.date.toLocaleDateString("pt-BR")}</time>
              <p>${p.excerpt}</p>
              <a href="post.html?slug=${encodeURIComponent(p.slug)}" class="read-more">Leia mais →</a>
            </article>`
          )
          .join("");
      }
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      postsContainer.innerHTML = "<p>Erro ao carregar posts.</p>";
    }
  })();
  }); 