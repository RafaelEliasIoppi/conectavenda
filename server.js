const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

// --- Verificação Crítica da Chave da API ---
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERRO: A variável de ambiente GEMINI_API_KEY não foi definida.");
  console.error("Verifique se você criou um arquivo .env e adicionou sua chave.");
  process.exit(1); // Impede o servidor de iniciar sem a chave
}

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); 
app.options("*", cors());
app.use(express.json());
app.use(express.static(__dirname));

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Rota GET opcional para teste direto via navegador
app.get("/chat", (req, res) => {
  res.send("🧠 Endpoint de chat ativo! Envie mensagens com POST.");
});

// Inicializa a IA Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rota de chat (POST)
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ reply: "❗ Mensagem vazia. Digite algo antes de enviar." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error("Erro na chamada para a API Gemini:", err);
    res.status(500).json({
      reply: "❌ Ocorreu um erro ao se comunicar com a API Gemini. Verifique os logs do servidor.",
    });
  }
});

// Inicia o servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});
