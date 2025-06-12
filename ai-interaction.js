class AIInteractionWidget {
    constructor(articleText, containerId) {
        this.articleText = articleText;
        this.container = document.getElementById(containerId);
        this.backendUrl = 'https://5000-iqn94rxth0w8h9z3xirev-fc5f81ca.manus.computer';
        this.currentModel = 'openai';
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.render();
        this.attachEventListeners();
        this.loadSuggestions();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="ai-interaction-widget">
                <div class="ai-widget-header">
                    <svg class="ai-widget-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span class="ai-widget-title">💬 Converse com a IA sobre este artigo</span>
                </div>
                
                <div class="ai-model-selector">
                    <button class="ai-model-btn active" data-model="openai">
                        🚀 GPT-4o (Rápido)
                    </button>
                    <button class="ai-model-btn" data-model="claude">
                        🧠 Claude 4 (Analítico)
                    </button>
                </div>
                
                <div class="ai-suggestions">
                    <div class="ai-suggestions-title">💡 Sugestões de perguntas:</div>
                    <div class="ai-suggestions-grid" id="suggestions-grid">
                        <!-- Sugestões serão carregadas aqui -->
                    </div>
                </div>
                
                <div class="ai-input-container">
                    <textarea 
                        class="ai-input" 
                        id="ai-query-input"
                        placeholder="Digite sua pergunta sobre o artigo... (ex: 'Faça um resumo executivo' ou 'Explique como se eu tivesse 10 anos')"
                        rows="3"
                    ></textarea>
                    <button class="ai-send-btn" id="ai-send-btn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
                
                <div class="ai-response-container" id="ai-response">
                    <div class="ai-response-header">
                        <span id="response-model-indicator">🤖 GPT-4o</span>
                        <span style="margin-left: auto; font-size: 0.8rem; opacity: 0.7;" id="response-timestamp"></span>
                    </div>
                    <div class="ai-response-content" id="response-content"></div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        // Seletor de modelo
        const modelBtns = this.container.querySelectorAll('.ai-model-btn');
        modelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                modelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentModel = btn.dataset.model;
                this.updateModelIndicator();
            });
        });
        
        // Botão de envio
        const sendBtn = this.container.querySelector('#ai-send-btn');
        const input = this.container.querySelector('#ai-query-input');
        
        sendBtn.addEventListener('click', () => this.sendQuery());
        
        // Enter para enviar (Ctrl+Enter para nova linha)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.sendQuery();
            }
        });
        
        // Auto-resize do textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 120) + 'px';
        });
    }
    
    async loadSuggestions() {
        try {
            const response = await fetch(`${this.backendUrl}/api/suggestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    article_text: this.articleText
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                this.renderSuggestions(data.suggestions);
            }
        } catch (error) {
            console.warn('Erro ao carregar sugestões:', error);
            // Fallback para sugestões padrão
            this.renderSuggestions([
                "Faça um resumo executivo",
                "Explique como se eu tivesse 10 anos",
                "Quais são os prós e contras?",
                "Como isso afeta o Brasil?",
                "Quais são as implicações éticas?",
                "O que vem a seguir?"
            ]);
        }
    }
    
    renderSuggestions(suggestions) {
        const grid = this.container.querySelector('#suggestions-grid');
        grid.innerHTML = suggestions.map(suggestion => 
            `<button class="ai-suggestion-btn" data-suggestion="${suggestion}">
                ${suggestion}
            </button>`
        ).join('');
        
        // Adicionar event listeners para as sugestões
        grid.querySelectorAll('.ai-suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = this.container.querySelector('#ai-query-input');
                input.value = btn.dataset.suggestion;
                input.focus();
                // Auto-resize
                input.style.height = 'auto';
                input.style.height = Math.min(input.scrollHeight, 120) + 'px';
            });
        });
    }
    
    updateModelIndicator() {
        const indicator = this.container.querySelector('#response-model-indicator');
        if (this.currentModel === 'claude') {
            indicator.textContent = '🧠 Claude 4';
        } else {
            indicator.textContent = '🤖 GPT-4o';
        }
    }
    
    async sendQuery() {
        const input = this.container.querySelector('#ai-query-input');
        const query = input.value.trim();
        
        if (!query || this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            const response = await fetch(`${this.backendUrl}/api/interact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    article_text: this.articleText,
                    user_query: query,
                    model: this.currentModel
                })
            });
            
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            
            await this.handleStreamingResponse(response);
            
        } catch (error) {
            this.showError(`Erro ao processar sua pergunta: ${error.message}`);
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    async handleStreamingResponse(response) {
        const responseContainer = this.container.querySelector('#ai-response');
        const contentDiv = this.container.querySelector('#response-content');
        const timestampSpan = this.container.querySelector('#response-timestamp');
        
        // Mostrar container de resposta
        responseContainer.classList.add('visible');
        contentDiv.innerHTML = '';
        timestampSpan.textContent = new Date().toLocaleTimeString();
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            
                            if (data.content) {
                                contentDiv.innerHTML += data.content;
                                // Auto-scroll para o final
                                contentDiv.scrollTop = contentDiv.scrollHeight;
                            }
                            
                            if (data.done) {
                                this.formatResponse(contentDiv);
                                return;
                            }
                        } catch (e) {
                            console.warn('Erro ao parsear chunk:', e);
                        }
                    }
                }
            }
        } catch (error) {
            throw new Error('Erro na conexão de streaming');
        }
    }
    
    formatResponse(contentDiv) {
        let html = contentDiv.innerHTML;
        
        // Converter markdown básico para HTML
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^# (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^• (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        html = html.replace(/<p><\/p>/g, '');
        
        contentDiv.innerHTML = html;
    }
    
    showLoading() {
        const sendBtn = this.container.querySelector('#ai-send-btn');
        const responseContainer = this.container.querySelector('#ai-response');
        const contentDiv = this.container.querySelector('#response-content');
        
        sendBtn.disabled = true;
        responseContainer.classList.add('visible');
        contentDiv.innerHTML = `
            <div class="ai-loading">
                <div class="ai-typing-indicator"></div>
                <div class="ai-typing-indicator"></div>
                <div class="ai-typing-indicator"></div>
                <span style="margin-left: 0.5rem;">Processando sua pergunta<span class="ai-loading-dots"></span></span>
            </div>
        `;
    }
    
    hideLoading() {
        const sendBtn = this.container.querySelector('#ai-send-btn');
        sendBtn.disabled = false;
    }
    
    showError(message) {
        const responseContainer = this.container.querySelector('#ai-response');
        const contentDiv = this.container.querySelector('#response-content');
        
        responseContainer.classList.add('visible');
        contentDiv.innerHTML = `<div class="ai-error">❌ ${message}</div>`;
    }
}

// Função para inicializar widgets de IA em artigos
function initializeAIWidgets() {
    // Encontrar todos os artigos de notícias
    const newsCards = document.querySelectorAll('.news-card, .featured-card');
    
    newsCards.forEach((card, index) => {
        // Extrair texto do artigo
        const titleElement = card.querySelector('h3');
        const contentElement = card.querySelector('p:not(.news-meta)');
        
        if (titleElement && contentElement) {
            const articleText = titleElement.textContent + '\n\n' + contentElement.textContent;
            
            // Criar container para o widget
            const widgetContainer = document.createElement('div');
            widgetContainer.id = `ai-widget-${index}`;
            widgetContainer.style.marginTop = '1rem';
            
            // Criar botão para mostrar/esconder widget
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'ai-toggle-btn';
            toggleBtn.innerHTML = '🤖 Conversar com IA sobre este artigo';
            toggleBtn.style.cssText = `
                background: linear-gradient(45deg, #8b5cf6, #3b82f6);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                margin-top: 0.5rem;
                transition: all 0.3s ease;
            `;
            
            let widgetInitialized = false;
            
            toggleBtn.addEventListener('click', () => {
                if (!widgetInitialized) {
                    new AIInteractionWidget(articleText, `ai-widget-${index}`);
                    widgetInitialized = true;
                    toggleBtn.style.display = 'none';
                } else {
                    const widget = widgetContainer.querySelector('.ai-interaction-widget');
                    widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
                }
            });
            
            toggleBtn.addEventListener('mouseenter', () => {
                toggleBtn.style.transform = 'translateY(-2px)';
                toggleBtn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
            });
            
            toggleBtn.addEventListener('mouseleave', () => {
                toggleBtn.style.transform = 'translateY(0)';
                toggleBtn.style.boxShadow = 'none';
            });
            
            // Adicionar botão e container ao card
            card.appendChild(toggleBtn);
            card.appendChild(widgetContainer);
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que todo o conteúdo foi carregado
    setTimeout(initializeAIWidgets, 1000);
});

// Também inicializar se o script for carregado após o DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeAIWidgets, 1000);
    });
} else {
    setTimeout(initializeAIWidgets, 1000);
}

