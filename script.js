// Aguarda DOM antes de executar qualquer interação
window.addEventListener("DOMContentLoaded", () => {
  // ===== BANNER DE SLIDES =====
  function slide1() {
    document.getElementById("banner").src = "imagens/logo/inter.png";
    setTimeout(slide2, 1000);
  }

  function slide2() {
    document.getElementById("banner").src = "imagens/logo/Juventude.png";
    setTimeout(slide3, 1000);
  }

  function slide3() {
    document.getElementById("banner").src = "imagens/logo/Ypiranga.png";
    setTimeout(slide4, 1000);
  }

  function slide4() {
    document.getElementById("banner").src = "imagens/logo/Avenida.png";
    setTimeout(slide5, 1000);
  }

  function slide5() {
    document.getElementById("banner").src = "imagens/logo/aimore.png";
    setTimeout(slide6, 1000);
  }

  function slide6() {
    document.getElementById("banner").src = "imagens/logo/CAXIAS.png";
    setTimeout(slide7, 1000);
  }

  function slide7() {
    document.getElementById("banner").src = "imagens/logo/SaoJose.png";
    setTimeout(slide1, 1000);
  }

  // Inicia slides
  const banner = document.getElementById("banner");
  if (banner) slide1();

  // ===== CARROSSEL DE IMAGENS =====
  const imgs = document.getElementById("imagem");
  const img = document.querySelectorAll("#imagem img");
  let idx = 0;

  function carrossel() {
    if (!imgs) return;
    idx++;
    if (idx > img.length - 1) idx = 0;
    imgs.style.transform = `translateX(${-idx * 200}px)`;
  }

  setInterval(carrossel, 1500);

  // ===== EFEITO DE PARTÍCULAS NO BOTÃO =====
  const botao = document.querySelector(".botao-link");
  if (botao) {
    const particleContainer = document.createElement("span");
    particleContainer.classList.add("particle-container");
    botao.appendChild(particleContainer);

    botao.addEventListener("mousemove", e => {
      const particle = document.createElement("span");
      particle.classList.add("particle");
      particle.style.left = `${e.offsetX}px`;
      particle.style.top = `${e.offsetY}px`;
      particleContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    });
  }
});

// ===== FUNÇÃO DE CHAT COM GEMINI VIA RAILWAY =====
async function sendMessage() {
  const inputField = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = inputField.value.trim();

  if (!message) return;

  // Exibe a mensagem do usuário
  chatBox.innerHTML += `<p><strong>Você:</strong> ${message}</p>`;
  inputField.value = "";

  // Exibe indicador de carregamento
  const loading = document.createElement("p");
  loading.innerHTML = `<em>Gemini está digitando...</em>`;
  chatBox.appendChild(loading);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://authentic-adaptation-production-c12e.up.railway.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    loading.remove();
    chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.reply}</p>`;
  } catch (error) {
    loading.remove();
    chatBox.innerHTML += `<p><strong>Erro:</strong> ${error.message}</p>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
