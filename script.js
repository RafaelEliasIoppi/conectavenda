
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

  // Inicia o ciclo de slides
  slide1();

  // ===== CARROSSEL DE IMAGENS =====
  const imgs = document.getElementById('imagem');
  const img = document.querySelectorAll('#imagem img');
  let idx = 0;

  function carrossel() {
    idx++;
    if (idx > img.length - 1) idx = 0;
    imgs.style.transform = `translateX(${-idx * 200}px)`;
  }

  setInterval(carrossel, 1500);

  // ===== EFEITO DE PARTÍCULAS NO BOTÃO =====
  const botao = document.querySelector('.botao-link');
  const particleContainer = document.createElement('span');
  particleContainer.classList.add('particle-container');
  botao.appendChild(particleContainer);

  botao.addEventListener('mousemove', e => {
    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.style.left = `${e.offsetX}px`;
    particle.style.top = `${e.offsetY}px`;
    particleContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  });
  async function sendMessage() {
  const input = document.getElementById("user-input").value;
  if (!input) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p><strong>Você:</strong> ${input}</p>`;
  document.getElementById("user-input").value = "";

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await response.json();
    chatBox.innerHTML += `<p><strong>Gemini:</strong> ${data.reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<p><strong>Erro:</strong> Não foi possível se conectar ao servidor.</p>`;
  }
}


