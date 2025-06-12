/**
 * RoboDog Run - Validação e Ajustes de Experiência de Jogo
 * Este script complementa o jogo principal, adicionando funcionalidades para
 * melhorar a experiência do usuário e validar o equilíbrio das fases
 */

document.addEventListener("DOMContentLoaded", () => {
    // Aguardar o carregamento do jogo principal
    const checkGameLoaded = setInterval(() => {
        if (document.getElementById("gameCanvas")) {
            clearInterval(checkGameLoaded);
            enhanceGameExperience();
        }
    }, 100);

    function enhanceGameExperience() {
        // Referências aos elementos do DOM
        const phaseDots = document.querySelectorAll('.phase-dot');
        const currentPhaseNameElement = document.getElementById('current-phase-name');
        const highScoreElement = document.getElementById('high-score');
        const gameCanvas = document.getElementById('gameCanvas');
        const gameContainer = document.getElementById('robodog-run-game');
        
        // Armazenar o recorde localmente
        let highScore = localStorage.getItem('robodogHighScore') || 0;
        highScoreElement.textContent = `Recorde: ${highScore}`;
        
        // Adicionar evento personalizado para atualização de fase
        window.addEventListener('phase-change', (e) => {
            // Atualizar indicadores visuais de fase
            phaseDots.forEach(dot => {
                const phase = parseInt(dot.getAttribute('data-phase'));
                dot.classList.remove('active', 'completed');
                
                if (phase < e.detail.phase) {
                    dot.classList.add('completed');
                } else if (phase === e.detail.phase) {
                    dot.classList.add('active');
                }
            });
            
            // Atualizar nome da fase
            currentPhaseNameElement.textContent = `Fase Atual: ${e.detail.phaseName}`;
            
            // Aplicar efeitos visuais baseados na fase atual
            gameContainer.className = '';
            gameContainer.classList.add(`phase-${e.detail.phase}-effect`);
            
            // Adicionar classe de transição para animação
            gameContainer.classList.add('phase-transition');
            setTimeout(() => {
                gameContainer.classList.remove('phase-transition');
            }, 500);
        });
        
        // Adicionar evento personalizado para atualização de pontuação
        window.addEventListener('score-update', (e) => {
            // Verificar se é um novo recorde
            if (e.detail.score > highScore) {
                highScore = e.detail.score;
                localStorage.setItem('robodogHighScore', highScore);
                highScoreElement.textContent = `Recorde: ${highScore}`;
                highScoreElement.classList.add('new-record');
                setTimeout(() => {
                    highScoreElement.classList.remove('new-record');
                }, 2000);
            }
        });
        
        // Adicionar controles de toque para dispositivos móveis
        gameCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // Disparar evento de espaço para simular pulo
            const spaceEvent = new KeyboardEvent('keydown', {
                code: 'Space',
                key: ' ',
                keyCode: 32,
                which: 32,
                bubbles: true
            });
            document.dispatchEvent(spaceEvent);
        });
        
        // Adicionar ajustes de dificuldade baseados em feedback do jogador
        let consecutiveFailures = 0;
        let consecutiveSuccesses = 0;
        
        window.addEventListener('game-over', (e) => {
            // Se o jogador falhar muito no início de uma fase, reduzir ligeiramente a dificuldade
            if (e.detail.score < 5) {
                consecutiveFailures++;
                consecutiveSuccesses = 0;
                
                if (consecutiveFailures >= 3) {
                    // Reduzir dificuldade temporariamente
                    window.dispatchEvent(new CustomEvent('adjust-difficulty', {
                        detail: { factor: 0.9 } // Reduzir em 10%
                    }));
                    consecutiveFailures = 0;
                }
            }
        });
        
        window.addEventListener('phase-complete', (e) => {
            // Se o jogador completar uma fase facilmente, aumentar o desafio na próxima
            consecutiveSuccesses++;
            consecutiveFailures = 0;
            
            if (consecutiveSuccesses >= 2) {
                // Aumentar dificuldade na próxima fase
                window.dispatchEvent(new CustomEvent('adjust-difficulty', {
                    detail: { factor: 1.1 } // Aumentar em 10%
                }));
                consecutiveSuccesses = 0;
            }
        });
        
        // Adicionar dicas contextuais baseadas no desempenho
        let tipShown = false;
        
        window.addEventListener('game-progress', (e) => {
            // Mostrar dica se o jogador estiver tendo dificuldade com um tipo específico de obstáculo
            if (e.detail.obstacleType === 'laser_high' && e.detail.failCount > 2 && !tipShown) {
                showGameTip("Dica: Pule mais cedo para evitar os lasers altos!");
                tipShown = true;
                setTimeout(() => { tipShown = false; }, 30000); // Evitar mostrar dicas muito frequentemente
            }
            
            if (e.detail.obstacleType === 'drone_swarm' && e.detail.failCount > 2 && !tipShown) {
                showGameTip("Dica: Os enxames de drones têm padrões previsíveis. Observe antes de pular!");
                tipShown = true;
                setTimeout(() => { tipShown = false; }, 30000);
            }
        });
        
        function showGameTip(message) {
            const tipElement = document.createElement('div');
            tipElement.className = 'game-tip';
            tipElement.textContent = message;
            
            gameContainer.appendChild(tipElement);
            
            setTimeout(() => {
                tipElement.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                tipElement.classList.remove('show');
                setTimeout(() => {
                    gameContainer.removeChild(tipElement);
                }, 500);
            }, 5000);
        }
        
        // Adicionar estilo para as dicas
        const tipStyle = document.createElement('style');
        tipStyle.textContent = `
            .game-tip {
                position: absolute;
                bottom: -50px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 194, 168, 0.9);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                font-family: 'Georgia', serif;
                font-size: 14px;
                opacity: 0;
                transition: all 0.5s ease;
                z-index: 100;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            }
            
            .game-tip.show {
                bottom: 20px;
                opacity: 1;
            }
            
            .new-record {
                animation: pulse 1s infinite alternate;
                color: #00c2a8;
                font-weight: bold;
            }
            
            @keyframes pulse {
                from { transform: scale(1); }
                to { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(tipStyle);
        
        console.log("RoboDog Run - Melhorias de experiência carregadas com sucesso!");
    }
});
