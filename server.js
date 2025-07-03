const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Carrega variáveis do .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware padrão
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Inicializa Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rota de chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ reply: "❗ Mensagem vazia. Digite algo antes de enviar." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);

    const reply =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ Resposta não disponível no momento. Tente novamente em instantes.";

    res.json({ reply });
  } catch (err) {
    console.error("Erro Gemini:", err.message);
    res.status(500).json({
      reply: "❌ Não foi possível se comunicar com o Gemini. Verifique sua conexão ou limite de uso.",
    });
  }
});

// 🚀 Inicia o servidor (somente 1 vez)
app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
