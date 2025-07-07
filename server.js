const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔐 Carrega variáveis do .env
dotenv.config();

// 🔑 Verifica a chave da API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ ERRO: A variável GEMINI_API_KEY não foi definida no .env.");
  process.exit(1);
}

// 🚀 Inicializa a IA do Gemini
const genAI = new GoogleGenerativeAI(apiKey);
const app = express();
const PORT = process.env.PORT || 8080;

// 🧱 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname)));

// 🌐 Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// 🩺 Rota de teste
app.get("/chat", (req, res) => {
  res.send("🧠 Endpoint de chat ativo! Envie mensagens usando POST.");
});

// 💬 Rota principal para interação com Gemini
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({
      reply: "⚠️ Mensagem inválida. Envie um texto válido.",
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message.trim());
    const text = result.response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("❌ Erro ao gerar conteúdo:", error.message);
    res.status(500).json({
      reply: "Erro ao tentar processar a mensagem. Verifique o console do servidor.",
    });
  }
});

// 🟢 Inicializa o servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando em https://rafael-production.up.railway.app:${PORT}`);
});
