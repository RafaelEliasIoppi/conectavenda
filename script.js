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
  const endpointProdutos = "https://script.google.com/macros/s/AKfycbyLO47bTPH0PxABP-KR3O6zFHqFgV21eWknyk0wpRyGrEgI7o1WJ90Bb5soE9Z5upEH/exec";

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

    const lines = fmMatch[1].split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) continue;

      const key = line.substring(0, separatorIndex).trim();
      let value = line.substring(separatorIndex + 1).trim();

      // Remove aspas caso existam
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }

      // 🔹 Trata folded block (>, >-) do YAML
      if (value === ">" || value === ">-") {
        value = "";
        i++; // próxima linha do bloco
        while (i < lines.length && lines[i].startsWith("  ")) {
          value += lines[i].trim() + " "; // concatena com espaço
          i++;
        }
        value = value.trim();
        i--; // ajusta índice para o for
      }

      // 🔹 Sanitização: limpa caracteres inválidos se for data
      if (key === "date") {
        value = value.replace(/[^0-9T:\-Z.]/g, ""); // mantém apenas caracteres válidos ISO8601
      }

      meta[key] = value;
    }
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
        const excerpt = meta.excerpt || (body
                  .substring(0, 140)
                  .replace(/[^\wÀ-ÿ0-9\s.,!?-]+$/g, "") // remove símbolos estranhos no final
                  .trim() + "..."
              );
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
    // 🔹 Sanitiza a data antes de renderizar
    const cleanDate = new Date(p.date);
    const isoDate = !isNaN(cleanDate) ? cleanDate.toISOString() : "";
    const brDate = !isNaN(cleanDate) ? cleanDate.toLocaleDateString("pt-BR") : "";

    return `
      <article class="post-card">
        ${p.image ? `<img class="featured" src="${p.image}" alt="${p.title}">` : ""}
        <h3><a href="post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a></h3>
        ${isoDate ? `<time datetime="${isoDate}" class="data-com-padding">${brDate}</time>` : ""}
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
// 📤 Rastreamento de links externos
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (!link.href.includes(location.hostname)) {
    link.addEventListener('click', () => {
      plausible('Outbound Link: Click', {props: {url: link.href}});
    });
  }
});

// 📁 Downloads de arquivos
document.querySelectorAll('a[href$=".pdf"], a[href$=".zip"], a[href$=".docx"]').forEach(link => {
  link.addEventListener('click', () => {
    plausible('File Download', {props: {file: link.href}});
  });
});

// 🚫 Página 404 (supondo que o título contenha "404")
if (document.title.includes('404')) {
  plausible('404 Error', {props: {path: window.location.pathname}});
}

// 🔒 Hash na URL
if (window.location.hash) {
  plausible('Hashed Page Path', {props: {hash: window.location.hash}});
}

// 🎯 Evento personalizado (exemplo: clique em botão de compra)
document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', () => {
    plausible('Compra Iniciada', {props: {produto: btn.dataset.produto}});
  });
});

// 🧩 Propriedades personalizadas
plausible('User Type', {props: {tipo: 'visitante'}});

// 💰 Receita de ecommerce (exemplo fictício)
plausible('Ecommerce Revenue', {props: {valor: 'R$199.90', produto: 'Curso Online'}});



document.getElementById("login-ml").addEventListener("click", function () {
  const clientId = "7159101551123966";
  const redirectUri = "https://vendasonliners.netlify.app/callback/"; // Substitua pela sua URL de retorno
  const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  window.location.href = authUrl;
});

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

if (code) {
  fetch("https://api.mercadolibre.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "7159101551123966",
      client_secret: "0pLGC0C3UbFKnk8Uf3UVG1yO8PFAExcq",
      code: code,
      redirect_uri: "http://vendasonliners.netlify.app/callback/"
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Access Token:", data.access_token);
    // Aqui você pode salvar o token ou fazer chamadas à API
  })
  .catch(err => console.error("Erro ao obter token:", err));
}
