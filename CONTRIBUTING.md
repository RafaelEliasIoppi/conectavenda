# Guia de Contribuição 🤝

Obrigado pelo interesse em contribuir com o ConectaVenda! Este guia vai te ajudar a entender como você pode colaborar com o projeto.

## 🎯 Como posso ajudar?

### Para todos os níveis

#### 📝 **Conteúdo e Documentação**
- Melhorar textos e descrições
- Corrigir erros de português
- Adicionar novos posts ao blog
- Criar tutoriais e guias
- Traduzir conteúdo

#### 🐛 **Testes e Bugs**
- Reportar bugs encontrados
- Testar em diferentes navegadores
- Testar responsividade mobile
- Validar funcionalidades

### Para desenvolvedores iniciantes

#### 🎨 **Design e CSS**
- Melhorar cores e temas
- Adicionar animações CSS
- Otimizar responsividade
- Criar variações de layout

#### 📱 **Funcionalidades Simples**
- Adicionar validações de formulário
- Melhorar mensagens de erro
- Implementar loading states
- Adicionar tooltips e ajudas

### Para desenvolvedores intermediários

#### ⚡ **JavaScript e Interatividade**
- Implementar novas funcionalidades
- Melhorar o sistema de chat
- Adicionar filtros e busca
- Integrar APIs externas

#### 🔧 **Otimizações**
- Melhorar performance
- Implementar lazy loading
- Adicionar cache strategies
- Otimizar bundle size

### Para desenvolvedores avançados

#### 🏗️ **Arquitetura**
- Implementar sistema de e-commerce
- Criar dashboard administrativo
- Desenvolver API backend
- Implementar microserviços

#### 🤖 **IA e Automação**
- Integrar chat bot com IA
- Implementar recomendações
- Criar analytics avançados
- Automatizar processos

## 🚀 Primeiros passos

### 1. **Configuração do ambiente**

```bash
# Fork o repositório no GitHub
git clone https://github.com/SEU_USUARIO/conectavenda.git
cd conectavenda

# Instale dependências (se houver)
npm install

# Execute localmente
python3 -m http.server 8000
```

### 2. **Estrutura do projeto**

```
├── index.html          # Página principal - HTML principal
├── script.js           # JavaScript - Lógica da aplicação
├── style.css           # CSS - Estilos e layout
├── post.html           # Template para posts do blog
├── admin/              # Netlify CMS
│   ├── config.yml      # Configuração do CMS
│   └── index.html      # Interface administrativa
├── content/posts/      # Posts em Markdown
├── static/img/         # Imagens do CMS
└── imagens/           # Assets estáticos
```

### 3. **Padrões de código**

#### HTML
- Use semantic HTML5
- Inclua atributos ARIA para acessibilidade
- Mantenha indentação de 2 espaços
- Use comentários para seções importantes

```html
<!-- ✅ Bom -->
<section class="produtos" aria-label="Lista de produtos">
  <h2>Nossos Produtos</h2>
  <!-- Produtos dinâmicos carregados via JS -->
</section>

<!-- ❌ Evite -->
<div class="produtos">
  <div>Nossos Produtos</div>
</div>
```

#### CSS
- Use nomenclatura BEM quando possível
- Organize por componentes
- Use variáveis CSS para cores e tamanhos
- Mobile-first approach

```css
/* ✅ Bom */
.produto-card {
  background: var(--cor-fundo);
  border-radius: 8px;
}

.produto-card__titulo {
  font-size: 1.2rem;
  color: var(--cor-texto-primario);
}

.produto-card--promocao {
  border: 2px solid var(--cor-promocao);
}

/* ❌ Evite */
.produtocard {
  background: #ffffff;
  border-radius: 8px;
}
```

#### JavaScript
- Use ES6+ features
- Prefira const/let ao invés de var
- Use arrow functions quando apropriado
- Comente códigos complexos

```javascript
// ✅ Bom
const carregarProdutos = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    const produtos = await response.json();
    renderizarProdutos(produtos);
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    mostrarMensagemErro();
  }
};

// ❌ Evite
function carregarProdutos() {
  fetch(API_ENDPOINT).then(function(response) {
    return response.json();
  }).then(function(produtos) {
    renderizarProdutos(produtos);
  });
}
```

## 🔄 Processo de contribuição

### 1. **Escolha uma tarefa**
- Veja as [Issues abertas](https://github.com/RafaelEliasIoppi/conectavenda/issues)
- Procure por labels como `good first issue` ou `help wanted`
- Comente na issue para avisar que vai trabalhar nela

### 2. **Desenvolva sua contribuição**
```bash
# Crie uma branch para sua feature
git checkout -b feature/nova-funcionalidade

# Faça suas mudanças
git add .
git commit -m "feat: adiciona nova funcionalidade X"

# Push para seu fork
git push origin feature/nova-funcionalidade
```

### 3. **Teste suas mudanças**
- Teste em diferentes navegadores
- Verifique responsividade mobile
- Valide acessibilidade básica
- Teste com JavaScript desabilitado (quando aplicável)

### 4. **Abra um Pull Request**
- Use título descritivo
- Explique o que foi feito
- Inclua screenshots se necessário
- Referencie issues relacionadas

## 📋 Checklist antes de enviar

### ✅ Geral
- [ ] Código funciona localmente
- [ ] Não há erros no console
- [ ] Responsivo em mobile
- [ ] Acessibilidade básica validada

### ✅ HTML
- [ ] Validação W3C passa
- [ ] Semantic HTML usado
- [ ] Atributos ARIA incluídos
- [ ] Meta tags apropriadas

### ✅ CSS
- [ ] Não há estilos inline desnecessários
- [ ] Variáveis CSS usadas para cores
- [ ] Responsividade testada
- [ ] Performance adequada

### ✅ JavaScript
- [ ] Sem erros de sintaxe
- [ ] Tratamento de erros implementado
- [ ] Performance adequada
- [ ] Compatibilidade com navegadores

## 🎨 Ideias de contribuição por nível

### 🟢 Iniciante
1. **Melhorar textos do site**
   - Corrigir erros de português
   - Melhorar CTAs (Call to Actions)
   - Adicionar descrições de produtos

2. **Ajustar cores e estilos**
   - Criar tema escuro
   - Melhorar paleta de cores
   - Adicionar animações CSS simples

3. **Criar novos posts**
   - Escrever artigos para o blog
   - Adicionar imagens relevantes
   - Criar conteúdo sobre produtos

### 🟡 Intermediário
1. **Sistema de busca**
   - Implementar busca no blog
   - Adicionar filtros por categoria
   - Criar autocomplete

2. **Melhorar chat bot**
   - Adicionar mais respostas automáticas
   - Implementar histórico de conversas
   - Integrar com APIs de mensagem

3. **Analytics e tracking**
   - Implementar Google Analytics
   - Adicionar eventos de conversão
   - Criar dashboard básico

### 🔴 Avançado
1. **E-commerce completo**
   - Sistema de carrinho
   - Gateway de pagamento
   - Gestão de pedidos

2. **PWA (Progressive Web App)**
   - Service Worker
   - App manifest
   - Funcionamento offline

3. **IA no chat**
   - Integrar Google Generative AI
   - Respostas inteligentes
   - Análise de sentimento

## 🏷️ Sistema de labels

- `good first issue` - Ideal para iniciantes
- `help wanted` - Precisamos de ajuda
- `bug` - Correção de bugs
- `enhancement` - Nova funcionalidade
- `documentation` - Melhorias na documentação
- `design` - Relacionado a UI/UX
- `performance` - Otimizações de performance

## 💬 Comunicação

- **Issues:** Para reportar bugs e sugerir features
- **Discussions:** Para dúvidas e discussões gerais
- **WhatsApp:** [+55 51 9 8309-8650](https://wa.me/5551983098650) para contato direto

## 🏆 Reconhecimento

Todos os contribuidores serão:
- Listados no README principal
- Mencionados nos releases
- Creditados nos commits

## 📚 Recursos úteis

### Documentação
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

### Ferramentas
- [Can I Use](https://caniuse.com/) - Compatibilidade de navegadores
- [WebAIM](https://webaim.org/) - Acessibilidade
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance

### Design
- [Figma](https://figma.com/) - Design de interfaces
- [Coolors](https://coolors.co/) - Paletas de cores
- [Google Fonts](https://fonts.google.com/) - Fontes web

---

**Obrigado por contribuir com o ConectaVenda! 🚀**

Sua contribuição faz a diferença para todo o ecossistema de e-commerce brasileiro.