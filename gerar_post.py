import datetime

# Gerar data atual
hoje = datetime.date.today().isoformat()

# Criar conteúdo do post
titulo = f"Dica do dia – {hoje}"
conteudo = f"""---
title: "{titulo}"
date: "{hoje}"
---

Hoje trazemos uma dica rápida para melhorar suas vendas online. Fique atento às tendências!
"""

# Salvar arquivo
caminho = f"content/posts/{hoje}-dica.md"
with open(caminho, "w", encoding="utf-8") as f:
    f.write(conteudo)

print(f"Post criado: {caminho}")
