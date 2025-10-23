import datetime
import os
import random

# Gerar data atual
hoje = datetime.date.today().isoformat()

# Frases motivacionais ou dicas variadas
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

# Seleciona uma frase aleatória
dica = random.choice(frases)

# Criar conteúdo do post
titulo = f"Dica do dia – {hoje}"
conteudo = f"""---
title: "{titulo}"
date: "{hoje}"
---

💡 {dica}
"""

# Caminho do post
caminho = f"content/posts/{hoje}-dica.md"

# Verifica se o post já existe
if not os.path.exists(caminho):
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(conteudo)
    print(f"✅ Post criado: {caminho}")
else:
    print("ℹ️ Post já existe. Nenhuma ação necessária.")
