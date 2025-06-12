/**
 * IA Quiz - Um jogo de conhecimento sobre IA para o site Theshe.Day.IA
 * Inspirado nos jogos interativos do New York Times
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do jogo
    const gameConfig = {
        title: "IA Quiz: Teste Seus Conhecimentos",
        description: "Quanto você sabe sobre inteligência artificial e seu impacto no mundo? Responda às perguntas e descubra!",
        levels: ["Iniciante", "Intermediário", "Especialista"],
        currentLevel: 0,
        currentQuestion: 0,
        score: 0,
        maxQuestions: 5,
        timePerQuestion: 20, // segundos
        timer: null,
        timeLeft: 0,
        gameStarted: false,
        gameEnded: false
    };

    // Banco de perguntas por nível
    const questions = [
        // Nível Iniciante
        [
            {
                question: "O que significa a sigla 'IA'?",
                options: [
                    "Inteligência Avançada",
                    "Inteligência Artificial",
                    "Interface Automatizada",
                    "Integração Algorítmica"
                ],
                correct: 1,
                explanation: "IA significa Inteligência Artificial, que é a simulação de processos de inteligência humana por sistemas computacionais."
            },
            {
                question: "Qual destas NÃO é uma aplicação comum de IA?",
                options: [
                    "Reconhecimento facial",
                    "Tradução de idiomas",
                    "Substituição completa de médicos em cirurgias",
                    "Recomendação de produtos em lojas online"
                ],
                correct: 2,
                explanation: "Embora a IA auxilie em procedimentos médicos, a substituição completa de médicos em cirurgias ainda não é uma realidade, pois requer supervisão humana."
            },
            {
                question: "Qual foi um dos primeiros assistentes virtuais de IA amplamente adotados?",
                options: [
                    "Siri (Apple)",
                    "Alexa (Amazon)",
                    "Google Assistant",
                    "Cortana (Microsoft)"
                ],
                correct: 0,
                explanation: "A Siri, lançada pela Apple em 2011, foi um dos primeiros assistentes virtuais de IA a ganhar ampla adoção em dispositivos móveis."
            },
            {
                question: "O que é um 'chatbot'?",
                options: [
                    "Um robô físico que conversa",
                    "Um programa de computador que simula conversas humanas",
                    "Um dispositivo de tradução instantânea",
                    "Um sistema de segurança para redes sociais"
                ],
                correct: 1,
                explanation: "Um chatbot é um programa de computador projetado para simular conversas com usuários humanos, especialmente pela internet."
            },
            {
                question: "Qual destas empresas NÃO é conhecida por seus avanços em IA?",
                options: [
                    "Google",
                    "Nintendo",
                    "Microsoft",
                    "OpenAI"
                ],
                correct: 1,
                explanation: "Embora a Nintendo seja uma gigante dos videogames, ela não é primariamente conhecida por pesquisa e desenvolvimento em IA como as outras empresas listadas."
            }
        ],
        // Nível Intermediário
        [
            {
                question: "O que é 'aprendizado de máquina' (machine learning)?",
                options: [
                    "Ensinar computadores a programar a si mesmos",
                    "Um subconjunto da IA que permite sistemas aprenderem com dados",
                    "Robôs aprendendo a operar máquinas industriais",
                    "O processo de transferir conhecimento humano para computadores"
                ],
                correct: 1,
                explanation: "Aprendizado de máquina é um subconjunto da IA que permite que sistemas aprendam e melhorem automaticamente a partir da experiência sem serem explicitamente programados."
            },
            {
                question: "O que é um 'modelo de linguagem grande' (LLM)?",
                options: [
                    "Um dicionário digital com milhões de palavras",
                    "Um sistema de tradução que suporta mais de 100 idiomas",
                    "Um modelo de IA treinado em vastos conjuntos de texto para gerar conteúdo semelhante ao humano",
                    "Um software que analisa e corrige gramática em textos"
                ],
                correct: 2,
                explanation: "Um modelo de linguagem grande (LLM) é um tipo de modelo de IA treinado em enormes conjuntos de dados textuais, permitindo-o gerar texto, responder perguntas e realizar outras tarefas relacionadas à linguagem."
            },
            {
                question: "Qual destas é uma preocupação ética legítima relacionada à IA?",
                options: [
                    "IAs se tornando conscientes e dominando o mundo",
                    "Viés algorítmico perpetuando desigualdades sociais",
                    "Computadores desenvolvendo emoções humanas",
                    "IAs criando sua própria linguagem incompreensível"
                ],
                correct: 1,
                explanation: "O viés algorítmico é uma preocupação real e documentada, onde sistemas de IA podem perpetuar ou amplificar preconceitos existentes nos dados de treinamento."
            },
            {
                question: "O que é 'computação quântica' e como se relaciona com IA?",
                options: [
                    "É apenas um termo de marketing sem relação com IA",
                    "É um tipo de IA que usa física quântica para pensar",
                    "É uma tecnologia que pode potencialmente acelerar certos algoritmos de IA",
                    "É um método para transferir consciência humana para computadores"
                ],
                correct: 2,
                explanation: "A computação quântica é uma tecnologia emergente que utiliza princípios da física quântica e pode potencialmente acelerar drasticamente certos tipos de cálculos usados em algoritmos de IA."
            },
            {
                question: "O que é 'GPT' no contexto de IA?",
                options: [
                    "Gerador de Programas de Treinamento",
                    "Transformador Generativo Pré-treinado",
                    "Tecnologia de Processamento Gráfico",
                    "Teste Global de Programação"
                ],
                correct: 1,
                explanation: "GPT significa 'Generative Pre-trained Transformer' (Transformador Generativo Pré-treinado), uma arquitetura de modelo de linguagem que revolucionou o processamento de linguagem natural."
            }
        ],
        // Nível Especialista
        [
            {
                question: "Qual destas técnicas é usada para evitar o 'overfitting' em modelos de aprendizado de máquina?",
                options: [
                    "Aumento de dados (data augmentation)",
                    "Treinamento distribuído",
                    "Regularização",
                    "Quantização de modelo"
                ],
                correct: 2,
                explanation: "A regularização é uma técnica que penaliza a complexidade do modelo para evitar que ele se ajuste demais aos dados de treinamento (overfitting), melhorando sua capacidade de generalização."
            },
            {
                question: "O que é 'aprendizado por reforço' (reinforcement learning)?",
                options: [
                    "Treinar modelos usando apenas exemplos positivos",
                    "Um paradigma de aprendizado onde agentes aprendem por tentativa e erro com base em recompensas",
                    "Forçar um modelo a aprender repetindo os mesmos exemplos",
                    "Usar múltiplos modelos para reforçar as previsões uns dos outros"
                ],
                correct: 1,
                explanation: "Aprendizado por reforço é um tipo de aprendizado de máquina onde um agente aprende a tomar decisões interagindo com um ambiente e recebendo recompensas ou penalidades por suas ações."
            },
            {
                question: "Qual é o significado de 'explainable AI' (XAI)?",
                options: [
                    "IA que pode explicar conceitos complexos para humanos",
                    "Modelos de IA que podem ser facilmente entendidos por não especialistas",
                    "Técnicas que permitem entender como modelos de IA chegam a determinadas decisões",
                    "IA que pode gerar explicações automáticas para fenômenos científicos"
                ],
                correct: 2,
                explanation: "Explainable AI (XAI) refere-se a técnicas e métodos que tornam os sistemas de IA mais transparentes e interpretáveis, permitindo que humanos entendam como e por que o sistema chegou a uma determinada conclusão."
            },
            {
                question: "O que é 'transferência de aprendizado' (transfer learning)?",
                options: [
                    "Transferir conhecimento de um professor humano para uma IA",
                    "Mover modelos de IA entre diferentes plataformas de hardware",
                    "Reutilizar um modelo treinado em uma tarefa como ponto de partida para outra tarefa relacionada",
                    "Transferir dados de treinamento entre diferentes organizações"
                ],
                correct: 2,
                explanation: "Transferência de aprendizado é uma técnica onde um modelo pré-treinado em uma tarefa é reutilizado como ponto de partida para um modelo em uma segunda tarefa relacionada, economizando tempo e recursos computacionais."
            },
            {
                question: "Qual destas é uma aplicação de 'IA generativa'?",
                options: [
                    "Sistemas de recomendação em plataformas de streaming",
                    "Detecção de fraudes em transações financeiras",
                    "Geração de imagens realistas a partir de descrições textuais",
                    "Previsão de falhas em equipamentos industriais"
                ],
                correct: 2,
                explanation: "IA generativa refere-se a algoritmos que podem gerar novos conteúdos, como imagens, música ou texto. A geração de imagens a partir de descrições textuais (como DALL-E ou Midjourney) é um exemplo proeminente."
            }
        ]
    ];

    // Criar elementos do jogo
    function createGameElements() {
        // Criar seção do jogo
        const gameSection = document.createElement('section');
        gameSection.id = 'ia-quiz';
        gameSection.innerHTML = `
            <h2>IA Quiz</h2>
            <div class="game-container">
                <div class="game-intro active">
                    <h3>${gameConfig.title}</h3>
                    <p>${gameConfig.description}</p>
                    <div class="level-selection">
                        <p>Escolha o nível:</p>
                        <div class="level-buttons">
                            <button class="level-btn active" data-level="0">Iniciante</button>
                            <button class="level-btn" data-level="1">Intermediário</button>
                            <button class="level-btn" data-level="2">Especialista</button>
                        </div>
                    </div>
                    <button class="start-btn">Iniciar Quiz</button>
                </div>
                <div class="game-play">
                    <div class="game-header">
                        <div class="game-progress">
                            <div class="progress-bar">
                                <div class="progress-fill"></div>
                            </div>
                            <div class="question-counter">Pergunta <span class="current">1</span>/<span class="total">5</span></div>
                        </div>
                        <div class="game-score">
                            Pontuação: <span>0</span>
                        </div>
                        <div class="game-timer">
                            Tempo: <span>20</span>s
                        </div>
                    </div>
                    <div class="question-container">
                        <h3 class="question-text"></h3>
                        <div class="options-container"></div>
                    </div>
                    <div class="feedback-container">
                        <div class="feedback-content">
                            <div class="feedback-icon"></div>
                            <h4 class="feedback-title"></h4>
                            <p class="feedback-explanation"></p>
                            <button class="next-btn">Próxima Pergunta</button>
                        </div>
                    </div>
                </div>
                <div class="game-results">
                    <h3>Resultado Final</h3>
                    <div class="results-score">
                        <div class="score-circle">
                            <span class="final-score">0</span>/<span class="max-score">5</span>
                        </div>
                        <p class="score-text">Pontuação</p>
                    </div>
                    <div class="results-message"></div>
                    <div class="results-actions">
                        <button class="restart-btn">Jogar Novamente</button>
                        <button class="share-btn">Compartilhar Resultado</button>
                    </div>
                </div>
            </div>
        `;

        // Inserir antes do footer
        const footer = document.querySelector('footer');
        document.querySelector('main').insertBefore(gameSection, footer);

        // Adicionar estilos específicos do jogo
        const gameStyles = document.createElement('style');
        gameStyles.textContent = `
            #ia-quiz {
                margin: 3rem 0;
            }
            
            .game-container {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                position: relative;
            }
            
            .game-intro, .game-play, .game-results {
                padding: 2rem;
                display: none;
            }
            
            .active {
                display: block;
            }
            
            .level-selection {
                margin: 1.5rem 0;
            }
            
            .level-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
            }
            
            .level-btn {
                padding: 0.5rem 1rem;
                border: 2px solid #3730a3;
                background: transparent;
                color: #3730a3;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .level-btn.active, .level-btn:hover {
                background: #3730a3;
                color: white;
            }
            
            .start-btn, .next-btn, .restart-btn, .share-btn {
                padding: 0.8rem 1.5rem;
                background: linear-gradient(135deg, #3730a3 0%, #4f46e5 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                margin-top: 1rem;
            }
            
            .start-btn:hover, .next-btn:hover, .restart-btn:hover, .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
            }
            
            .game-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .game-progress {
                flex: 1;
                min-width: 200px;
            }
            
            .progress-bar {
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3730a3 0%, #4f46e5 100%);
                width: 20%;
                transition: width 0.5s;
            }
            
            .question-counter {
                font-size: 0.9rem;
                color: #64748b;
            }
            
            .game-score, .game-timer {
                font-weight: 600;
                color: #1e293b;
            }
            
            .game-timer {
                color: #ef4444;
            }
            
            .question-container {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                margin-bottom: 1.5rem;
            }
            
            .question-text {
                margin-bottom: 1.5rem;
                color: #1e293b;
                font-size: 1.3rem;
            }
            
            .options-container {
                display: grid;
                gap: 1rem;
            }
            
            .option {
                padding: 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
            }
            
            .option:hover {
                border-color: #3730a3;
                background: #f8fafc;
            }
            
            .option.selected {
                border-color: #3730a3;
                background: #eff6ff;
            }
            
            .option.correct {
                border-color: #10b981;
                background: #ecfdf5;
            }
            
            .option.incorrect {
                border-color: #ef4444;
                background: #fef2f2;
            }
            
            .option-letter {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #e2e8f0;
                color: #64748b;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                margin-right: 1rem;
                transition: all 0.3s;
            }
            
            .option:hover .option-letter {
                background: #3730a3;
                color: white;
            }
            
            .option.selected .option-letter {
                background: #3730a3;
                color: white;
            }
            
            .option.correct .option-letter {
                background: #10b981;
                color: white;
            }
            
            .option.incorrect .option-letter {
                background: #ef4444;
                color: white;
            }
            
            .feedback-container {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .feedback-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }
            
            .feedback-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin: 0 auto 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
            }
            
            .feedback-icon.correct {
                background: #ecfdf5;
                color: #10b981;
            }
            
            .feedback-icon.incorrect {
                background: #fef2f2;
                color: #ef4444;
            }
            
            .feedback-title {
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            
            .feedback-explanation {
                margin-bottom: 1.5rem;
                color: #4b5563;
                line-height: 1.6;
            }
            
            .game-results {
                text-align: center;
            }
            
            .results-score {
                margin: 2rem 0;
            }
            
            .score-circle {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3730a3 0%, #4f46e5 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: 700;
                margin: 0 auto 1rem;
                box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
            }
            
            .score-text {
                font-size: 1.2rem;
                color: #4b5563;
            }
            
            .results-message {
                margin-bottom: 2rem;
                font-size: 1.1rem;
                color: #1e293b;
                line-height: 1.6;
            }
            
            .results-actions {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .share-btn {
                background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            }
            
            .share-btn:hover {
                box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
            }
            
            @media (max-width: 768px) {
                .game-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .game-progress {
                    width: 100%;
                }
                
                .options-container {
                    grid-template-columns: 1fr;
                }
                
                .results-actions {
                    flex-direction: column;
                }
            }
            
            @media (min-width: 769px) {
                .options-container {
                    grid-template-columns: 1fr 1fr;
                }
            }
        `;
        document.head.appendChild(gameStyles);

        // Adicionar navegação para o jogo
        const navItem = document.createElement('li');
        navItem.innerHTML = '<a href="#ia-quiz">IA Quiz</a>';
        document.querySelector('nav ul').appendChild(navItem);
    }

    // Inicializar o jogo
    function initGame() {
        createGameElements();
        
        // Elementos do jogo
        const gameIntro = document.querySelector('.game-intro');
        const gamePlay = document.querySelector('.game-play');
        const gameResults = document.querySelector('.game-results');
        const levelButtons = document.querySelectorAll('.level-btn');
        const startButton = document.querySelector('.start-btn');
        const nextButton = document.querySelector('.next-btn');
        const restartButton = document.querySelector('.restart-btn');
        const shareButton = document.querySelector('.share-btn');
        const questionText = document.querySelector('.question-text');
        const optionsContainer = document.querySelector('.options-container');
        const progressFill = document.querySelector('.progress-fill');
        const questionCounter = document.querySelector('.question-counter .current');
        const totalQuestions = document.querySelector('.question-counter .total');
        const scoreDisplay = document.querySelector('.game-score span');
        const timerDisplay = document.querySelector('.game-timer span');
        const feedbackContainer = document.querySelector('.feedback-container');
        const feedbackIcon = document.querySelector('.feedback-icon');
        const feedbackTitle = document.querySelector('.feedback-title');
        const feedbackExplanation = document.querySelector('.feedback-explanation');
        const finalScore = document.querySelector('.final-score');
        const maxScore = document.querySelector('.max-score');
        const resultsMessage = document.querySelector('.results-message');

        // Configurar total de perguntas
        totalQuestions.textContent = gameConfig.maxQuestions;
        maxScore.textContent = gameConfig.maxQuestions;

        // Event listeners
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                gameConfig.currentLevel = parseInt(button.dataset.level);
            });
        });

        startButton.addEventListener('click', startGame);
        nextButton.addEventListener('click', nextQuestion);
        restartButton.addEventListener('click', resetGame);
        shareButton.addEventListener('click', shareResults);

        // Funções do jogo
        function startGame() {
            gameConfig.gameStarted = true;
            gameConfig.gameEnded = false;
            gameConfig.currentQuestion = 0;
            gameConfig.score = 0;
            
            // Atualizar UI
            gameIntro.classList.remove('active');
            gamePlay.classList.add('active');
            gameResults.classList.remove('active');
            
            // Carregar primeira pergunta
            loadQuestion();
        }

        function loadQuestion() {
            const currentQuestionData = questions[gameConfig.currentLevel][gameConfig.currentQuestion];
            
            // Atualizar texto da pergunta
            questionText.textContent = currentQuestionData.question;
            
            // Limpar opções anteriores
            optionsContainer.innerHTML = '';
            
            // Adicionar novas opções
            const letters = ['A', 'B', 'C', 'D'];
            currentQuestionData.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.dataset.index = index;
                optionElement.innerHTML = `
                    <span class="option-letter">${letters[index]}</span>
                    <span class="option-text">${option}</span>
                `;
                optionElement.addEventListener('click', () => selectOption(optionElement, index));
                optionsContainer.appendChild(optionElement);
            });
            
            // Atualizar progresso
            const progress = ((gameConfig.currentQuestion + 1) / gameConfig.maxQuestions) * 100;
            progressFill.style.width = `${progress}%`;
            questionCounter.textContent = gameConfig.currentQuestion + 1;
            
            // Iniciar timer
            startTimer();
        }

        function selectOption(optionElement, index) {
            // Parar o timer
            clearInterval(gameConfig.timer);
            
            // Marcar opção selecionada
            const options = document.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            optionElement.classList.add('selected');
            
            // Verificar resposta
            const currentQuestionData = questions[gameConfig.currentLevel][gameConfig.currentQuestion];
            const isCorrect = index === currentQuestionData.correct;
            
            // Atualizar UI com feedback
            if (isCorrect) {
                optionElement.classList.add('correct');
                gameConfig.score++;
                scoreDisplay.textContent = gameConfig.score;
                feedbackIcon.className = 'feedback-icon correct';
                feedbackIcon.innerHTML = '<i class="fas fa-check"></i>';
                feedbackTitle.textContent = 'Correto!';
            } else {
                optionElement.classList.add('incorrect');
                options[currentQuestionData.correct].classList.add('correct');
                feedbackIcon.className = 'feedback-icon incorrect';
                feedbackIcon.innerHTML = '<i class="fas fa-times"></i>';
                feedbackTitle.textContent = 'Incorreto!';
            }
            
            // Mostrar explicação
            feedbackExplanation.textContent = currentQuestionData.explanation;
            feedbackContainer.style.display = 'flex';
            
            // Desabilitar cliques nas opções
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        }

        function nextQuestion() {
            // Fechar feedback
            feedbackContainer.style.display = 'none';
            
            // Avançar para próxima pergunta ou finalizar
            gameConfig.currentQuestion++;
            
            if (gameConfig.currentQuestion < gameConfig.maxQuestions) {
                loadQuestion();
            } else {
                endGame();
            }
        }

        function startTimer() {
            // Resetar timer
            gameConfig.timeLeft = gameConfig.timePerQuestion;
            timerDisplay.textContent = gameConfig.timeLeft;
            
            // Iniciar contagem regressiva
            clearInterval(gameConfig.timer);
            gameConfig.timer = setInterval(() => {
                gameConfig.timeLeft--;
                timerDisplay.textContent = gameConfig.timeLeft;
                
                if (gameConfig.timeLeft <= 0) {
                    clearInterval(gameConfig.timer);
                    // Tempo esgotado, selecionar automaticamente uma opção incorreta
                    const options = document.querySelectorAll('.option');
                    const currentQuestionData = questions[gameConfig.currentLevel][gameConfig.currentQuestion];
                    const incorrectIndex = currentQuestionData.correct === 0 ? 1 : 0;
                    selectOption(options[incorrectIndex], incorrectIndex);
                }
            }, 1000);
        }

        function endGame() {
            gameConfig.gameEnded = true;
            
            // Atualizar UI
            gamePlay.classList.remove('active');
            gameResults.classList.add('active');
            
            // Mostrar pontuação final
            finalScore.textContent = gameConfig.score;
            
            // Mensagem baseada na pontuação
            let message = '';
            const percentage = (gameConfig.score / gameConfig.maxQuestions) * 100;
            
            if (percentage === 100) {
                message = `Impressionante! Você acertou todas as perguntas no nível ${gameConfig.levels[gameConfig.currentLevel]}. Você é um verdadeiro especialista em IA!`;
            } else if (percentage >= 80) {
                message = `Excelente! Você tem um ótimo conhecimento sobre IA no nível ${gameConfig.levels[gameConfig.currentLevel]}.`;
            } else if (percentage >= 60) {
                message = `Bom trabalho! Você tem um conhecimento sólido sobre IA no nível ${gameConfig.levels[gameConfig.currentLevel]}.`;
            } else if (percentage >= 40) {
                message = `Você está no caminho certo! Continue aprendendo mais sobre IA.`;
            } else {
                message = `Este é um ótimo começo para sua jornada de aprendizado sobre IA. Continue explorando este fascinante campo!`;
            }
            
            resultsMessage.textContent = message;
        }

        function resetGame() {
            // Voltar para a tela inicial
            gameResults.classList.remove('active');
            gameIntro.classList.add('active');
            
            // Resetar configurações
            gameConfig.gameStarted = false;
            gameConfig.gameEnded = false;
            gameConfig.currentQuestion = 0;
            gameConfig.score = 0;
            
            // Atualizar UI
            scoreDisplay.textContent = gameConfig.score;
        }

        function shareResults() {
            // Simular compartilhamento (em uma implementação real, isso usaria a Web Share API)
            const text = `Eu marquei ${gameConfig.score}/${gameConfig.maxQuestions} pontos no IA Quiz do Theshe.Day.IA no nível ${gameConfig.levels[gameConfig.currentLevel]}!`;
            
            // Verificar se o navegador suporta a Web Share API
            if (navigator.share) {
                navigator.share({
                    title: 'Meu resultado no IA Quiz',
                    text: text,
                    url: window.location.href
                })
                .catch(error => {
                    alert('Resultado copiado para a área de transferência!');
                    copyToClipboard(text);
                });
            } else {
                alert('Resultado copiado para a área de transferência!');
                copyToClipboard(text);
            }
        }

        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    // Inicializar o jogo quando o DOM estiver carregado
    initGame();
});
