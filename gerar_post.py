import datetime
import random
import os

# Frases motivacionais
frases = [
    "Use imagens de alta qualidade para destacar seus produtos.",
    "Ofereça frete grátis acima de um valor mínimo para aumentar o ticket médio.",
    "Responda rápido no WhatsApp: agilidade gera confiança.",
    "Crie urgência com ofertas limitadas: 'só hoje' funciona!",
    "Invista em depoimentos reais para aumentar credibilidade.",
    "Use cupons de desconto para atrair novos clientes.",
    "Divulgue seus produtos nos grupos certos: onde seu público está.",
    "Teste diferentes títulos e descrições para ver o que converte mais.",
    "Mostre o produto em uso: vídeos vendem mais que fotos estáticas.",
    "Simplifique o checkout: menos cliques, mais vendas."
]

# Lista de imagens reais da pasta conectavenda/imagens
imagens = [
    "Cafeteira.jpg", "Chaleira.jpg", "NexGard2.jpg", "Scalibor.jpg", "Seresto.jpg", "air.jpg",
    "android-chrome-192x192.png", "android-chrome-512x512.png", "aparador.jpg", "apple-touch-icon.png",
    "bravecto.jpg", "confort pads.jpg", "creatina.jpg", "favicon-16x16.png", "favicon-32x32.png",
    "favicon.ico", "favicon.png", "fone.jpg", "fone2.jpg", "grill.jpg", "liquidificador.jpg",
    "luna6.png", "luna9.png", "macaco.jpg", "nexxt.jpg", "tapete.jpg"
]

# Seleciona frase e imagem aleatória
dica = random.choice(frases)
imagem = random.choice(imagens)

# Data atual
hoje = datetime.date.today().isoformat()

# Caminho relativo para uso no site
imagem_url = f"/imagens/{imagem}"

# Gera conteúdo do post
titulo = f"Dica do dia - {hoje}"
conteudo = f"""---
title: "{titulo}"
date: "{hoje}"
image: "{imagem_url}"
---

![Imagem da dica]({imagem_url})

💡 {dica}
"""

# Caminho do post
caminho_post = f"content/posts/{hoje}-dica.md"

# Salva o post
if not os.path.exists(caminho_post):
    with open(caminho_post, "w", encoding="utf-8") as f:
        f.write(conteudo)
    print(f"✅ Post criado: {caminho_post}")
else:
    print("ℹ️ Post já existe. Nenhuma ação necessária.")
