import datetime
import random
import os
import re
import shutil

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

# Caminhos
origem_pasta = "imagens"
destino_pasta = "static/img/uploads"
os.makedirs(destino_pasta, exist_ok=True)

# Lista de imagens reais da pasta origem
imagens = [f for f in os.listdir(origem_pasta) if os.path.isfile(os.path.join(origem_pasta, f))]

# Seleciona frase e imagem aleatória
dica = random.choice(frases)
imagem_original = random.choice(imagens)

# Renomeia imagem se tiver espaços ou letras maiúsculas
imagem_normalizada = re.sub(r'\s+', '-', imagem_original).lower()
origem_imagem = os.path.join(origem_pasta, imagem_original)
destino_imagem = os.path.join(destino_pasta, imagem_normalizada)

# Copia imagem para static/img/uploads/
shutil.copy2(origem_imagem, destino_imagem)

# Data e hora atual
agora = datetime.datetime.now()
data = agora.date().isoformat()
hora = agora.strftime("%H%M")

# Slug da dica para nome do arquivo
slug = re.sub(r'\W+', '-', dica[:30].lower()).strip('-')

# Caminho público da imagem
imagem_url = f"/img/uploads/{imagem_normalizada}"

# Gera conteúdo do post
titulo = f"Dica do dia - {data}"
conteudo = f"""---
title: "{titulo}"
date: "{data}"
image: "{imagem_url}"
---

![Imagem da dica]({imagem_url})

💡 {dica}
"""

# Caminho do post com identificador único
caminho_post = f"content/posts/{data}-dica-{hora}-{slug}.md"
os.makedirs(os.path.dirname(caminho_post), exist_ok=True)

# Salva o post
with open(caminho_post, "w", encoding="utf-8") as f:
    f.write(conteudo)

print(f"✅ Post criado: {caminho_post}")
print(f"📁 Imagem copiada para: {destino_imagem}")
