/**
 * RoboDog Run - Jogo 2D estilo Gendino com cachorro robótico e 10 fases futurísticas evolutivas
 * Para o site Theshe.Day.IA - Versão com fácil inicialização
 */

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("robodog-run-game");
    if (!gameContainer) {
        console.error("Elemento container do jogo não encontrado!");
        return;
    }

    // Criar botão de inicialização fácil
    const gameInitButton = document.createElement("button");
    gameInitButton.id = "game-init-btn";
    gameInitButton.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">🤖</span>
            <div>
                <div style="font-weight: bold; font-size: 18px;">RoboDog Run</div>
                <div style="font-size: 12px; opacity: 0.8;">10 Fases Futurísticas</div>
            </div>
            <span style="font-size: 16px;">▶️</span>
        </div>
    `;
    gameInitButton.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 15px;
        cursor: pointer;
        font-family: Georgia, serif;
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        transition: all 0.3s ease;
        margin: 20px 0;
        width: 100%;
        max-width: 300px;
    `;
    
    gameInitButton.addEventListener('mouseenter', () => {
        gameInitButton.style.transform = 'translateY(-2px)';
        gameInitButton.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
    });
    
    gameInitButton.addEventListener('mouseleave', () => {
        gameInitButton.style.transform = 'translateY(0)';
        gameInitButton.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
    });

    // Adicionar botão ao container
    gameContainer.appendChild(gameInitButton);

    // Função para abrir jogo em nova aba/janela
    function openGameInNewTab() {
        const gameWindow = window.open('', '_blank', 'width=900,height=600,scrollbars=no,resizable=yes');
        gameWindow.document.write(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>RoboDog Run - 10 Fases Futurísticas | Theshe.Day.IA</title>
                <style>
                    body {
                        margin: 0;
                        padding: 20px;
                        background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                        font-family: Georgia, serif;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-height: 100vh;
                    }
                    #game-header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    #game-header h1 {
                        margin: 0;
                        font-size: 28px;
                        background: linear-gradient(45deg, #667eea, #764ba2);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    #game-header p {
                        margin: 5px 0;
                        opacity: 0.8;
                        font-size: 14px;
                    }
                    #gameCanvas {
                        border: 2px solid #667eea;
                        border-radius: 10px;
                        box-shadow: 0 0 30px rgba(102, 126, 234, 0.3);
                        background: #000;
                    }
                    #game-info {
                        margin-top: 15px;
                        text-align: center;
                        font-size: 12px;
                        opacity: 0.7;
                    }
                    .phase-indicator {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(0,0,0,0.7);
                        padding: 10px;
                        border-radius: 8px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div id="game-header">
                    <h1>🤖 RoboDog Run</h1>
                    <p>Jornada através de 10 fases da evolução tecnológica</p>
                    <p>Pressione <strong>ESPAÇO</strong> para pular e iniciar</p>
                </div>
                <div style="position: relative;">
                    <canvas id="gameCanvas" width="800" height="400"></canvas>
                    <div class="phase-indicator" id="phase-indicator">Fase 1/10</div>
                </div>
                <div id="game-info">
                    <p>Uma experiência interativa do universo Theshe.Day.IA</p>
                </div>
                <script>
                    ${getGameScript()}
                </script>
            </body>
            </html>
        `);
        gameWindow.document.close();
    }

    // Event listener para o botão
    gameInitButton.addEventListener('click', openGameInNewTab);

    // Função que retorna o script completo do jogo
    function getGameScript() {
        return `
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const phaseIndicator = document.getElementById("phase-indicator");

        // --- Configurações das 10 Fases Evolutivas ---        // Configuração das fases com dificuldade progressiva
        const phases = [
            {
                name: "Subúrbio Digital",
                description: "Primeiros sinais de automação residencial",
                duration: 3000,
                baseSpeed: 4,
                obstacleFrequency: 150,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23001122'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.4'%3E%3Crect x='50' y='250' width='60' height='100' fill='%23334155'/%3E%3Crect x='150' y='200' width='80' height='150' fill='%23475569'/%3E%3Crect x='280' y='220' width='70' height='130' fill='%23334155'/%3E%3Crect x='400' y='180' width='90' height='170' fill='%23475569'/%3E%3Crect x='550' y='240' width='65' height='110' fill='%23334155'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.6'%3E%3Ccircle cx='70' cy='280' r='2' fill='%23fbbf24'/%3E%3Ccircle cx='180' cy='230' r='2' fill='%23fbbf24'/%3E%3Ccircle cx='310' cy='250' r='2' fill='%23fbbf24'/%3E%3Ccircle cx='440' cy='210' r='2' fill='%23fbbf24'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["basic_box", "small_drone"],
                scoreMultiplier: 1.0,
                jumpPower: 15,
                gravity: 0.8
            },
            {
                name: "Distrito Neon",
                description: "Luzes digitais e primeiros hologramas urbanos",
                duration: 3200,
                baseSpeed: 5,
                obstacleFrequency: 140,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23000a1a'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow1'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.5'%3E%3Crect x='80' y='200' width='80' height='150' fill='%231e293b' stroke='%2306b6d4' stroke-width='2' filter='url(%23glow1)'/%3E%3Crect x='200' y='150' width='100' height='200' fill='%231e293b' stroke='%23ec4899' stroke-width='2' filter='url(%23glow1)'/%3E%3Crect x='350' y='180' width='90' height='170' fill='%231e293b' stroke='%2306b6d4' stroke-width='2' filter='url(%23glow1)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.8'%3E%3Ccircle cx='120' cy='250' r='3' fill='%2306b6d4'/%3E%3Ccircle cx='250' cy='200' r='3' fill='%23ec4899'/%3E%3Ccircle cx='390' cy='220' r='3' fill='%2306b6d4'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["neon_barrier", "small_drone"],
                scoreMultiplier: 1.2,
                jumpPower: 15,
                gravity: 0.8
            },
            {
                name: "Torres Celestes",
                description: "Arranha-céus inteligentes tocando as nuvens",
                duration: 3400,
                baseSpeed: 6,
                obstacleFrequency: 130,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23000814'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow2'%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.6'%3E%3Crect x='100' y='50' width='60' height='300' fill='%23164e63' stroke='%2367e8f9' stroke-width='3' filter='url(%23glow2)'/%3E%3Crect x='250' y='20' width='80' height='330' fill='%23164e63' stroke='%2367e8f9' stroke-width='3' filter='url(%23glow2)'/%3E%3Crect x='400' y='80' width='70' height='270' fill='%23164e63' stroke='%2367e8f9' stroke-width='3' filter='url(%23glow2)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.9'%3E%3Ccircle cx='130' cy='100' r='2' fill='%2367e8f9'/%3E%3Ccircle cx='290' cy='70' r='2' fill='%2367e8f9'/%3E%3Ccircle cx='430' cy='130' r='2' fill='%2367e8f9'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["sky_barrier", "drone_basic", "laser_low"],
                scoreMultiplier: 1.4,
                jumpPower: 16,
                gravity: 0.75
            },
            {
                name: "Metrópole Orbital",
                description: "Cidade suspensa entre terra e espaço",
                duration: 3600,
                baseSpeed: 7,
                obstacleFrequency: 120,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23030712'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow3'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.7'%3E%3Ccircle cx='150' cy='100' r='40' fill='none' stroke='%23a855f7' stroke-width='4' filter='url(%23glow3)'/%3E%3Ccircle cx='400' cy='150' r='60' fill='none' stroke='%237c3aed' stroke-width='4' filter='url(%23glow3)'/%3E%3Ccircle cx='650' cy='80' r='35' fill='none' stroke='%23a855f7' stroke-width='4' filter='url(%23glow3)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.8'%3E%3Ccircle cx='100' cy='50' r='1' fill='%23c084fc'/%3E%3Ccircle cx='300' cy='30' r='1.5' fill='%23c084fc'/%3E%3Ccircle cx='500' cy='60' r='1' fill='%23c084fc'/%3E%3Ccircle cx='700' cy='40' r='1.5' fill='%23c084fc'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["orbital_ring", "drone_basic", "laser_low"],
                scoreMultiplier: 1.6,
                jumpPower: 17,
                gravity: 0.7
            },
            {
                name: "Nexus Quântico",
                description: "Computação quântica integrada à arquitetura urbana",
                duration: 3800,
                baseSpeed: 8,
                obstacleFrequency: 110,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23000508'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow4'%3E%3CfeGaussianBlur stdDeviation='5'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.7'%3E%3Cpath d='M50 400 Q 100 100 150 400' stroke='%2306b6d4' stroke-width='3' fill='none' filter='url(%23glow4)'/%3E%3Cpath d='M250 400 Q 300 50 350 400' stroke='%2306b6d4' stroke-width='3' fill='none' filter='url(%23glow4)'/%3E%3Cpath d='M450 400 Q 500 80 550 400' stroke='%230891b2' stroke-width='3' fill='none' filter='url(%23glow4)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.9'%3E%3Ccircle cx='200' cy='100' r='1' fill='%2367e8f9'/%3E%3Ccircle cx='400' cy='80' r='1.5' fill='%2367e8f9'/%3E%3Ccircle cx='600' cy='120' r='1' fill='%2367e8f9'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["quantum_barrier", "drone_basic", "laser_mid", "energy_ring"],
                scoreMultiplier: 1.8,
                jumpPower: 18,
                gravity: 0.65
            },
            {
                name: "Biosfera Sintética",
                description: "Natureza artificial e vida programada",
                duration: 4000,
                baseSpeed: 9,
                obstacleFrequency: 100,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23001a0a'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow5'%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.6'%3E%3Ccircle cx='100' cy='300' r='30' fill='%2322c55e' filter='url(%23glow5)'/%3E%3Ccircle cx='250' cy='280' r='40' fill='%2316a34a' filter='url(%23glow5)'/%3E%3Ccircle cx='400' cy='320' r='25' fill='%2322c55e' filter='url(%23glow5)'/%3E%3Ccircle cx='550' cy='290' r='35' fill='%2316a34a' filter='url(%23glow5)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.8'%3E%3Cpath d='M0 350 Q 200 320 400 350 T 800 350' stroke='%2334d399' stroke-width='2' fill='none'/%3E%3Ccircle cx='150' cy='200' r='2' fill='%2334d399'/%3E%3Ccircle cx='350' cy='180' r='1.5' fill='%2334d399'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["bio_vine", "drone_swarm", "laser_mid", "energy_ring"],
                scoreMultiplier: 2.0,
                jumpPower: 19,
                gravity: 0.6
            },
            {
                name: "Matriz Neural",
                description: "Redes neurais físicas conectando toda a cidade",
                duration: 4200,
                baseSpeed: 10,
                obstacleFrequency: 90,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23050208'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow6'%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.7'%3E%3Cpath d='M0 200 L100 150 L200 200 L300 100 L400 200 L500 120 L600 200 L700 80 L800 200' stroke='%23a855f7' stroke-width='2' fill='none' filter='url(%23glow6)'/%3E%3Cpath d='M0 250 L150 300 L300 250 L450 320 L600 250 L800 280' stroke='%237c3aed' stroke-width='2' fill='none' filter='url(%23glow6)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.9'%3E%3Ccircle cx='100' cy='150' r='3' fill='%23c084fc'/%3E%3Ccircle cx='300' cy='100' r='2' fill='%23c084fc'/%3E%3Ccircle cx='500' cy='120' r='3' fill='%23c084fc'/%3E%3Ccircle cx='700' cy='80' r='2' fill='%23c084fc'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["neural_pulse", "drone_swarm", "quantum_barrier", "energy_ring"],
                scoreMultiplier: 2.2,
                jumpPower: 20,
                gravity: 0.55
            },
            {
                name: "Singularidade Urbana",
                description: "IA e humanos fundidos em uma consciência coletiva",
                duration: 4400,
                baseSpeed: 11,
                obstacleFrequency: 80,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23030103'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow7'%3E%3CfeGaussianBlur stdDeviation='6'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.8'%3E%3Ccircle cx='200' cy='200' r='80' fill='none' stroke='%23fbbf24' stroke-width='4' filter='url(%23glow7)'/%3E%3Ccircle cx='600' cy='150' r='60' fill='none' stroke='%23f59e0b' stroke-width='3' filter='url(%23glow7)'/%3E%3Cpath d='M100 300 Q 400 100 700 300' stroke='%23fbbf24' stroke-width='3' fill='none' filter='url(%23glow7)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='1'%3E%3Ccircle cx='200' cy='200' r='2' fill='%23fde047'/%3E%3Ccircle cx='400' cy='150' r='3' fill='%23fde047'/%3E%3Ccircle cx='600' cy='180' r='2' fill='%23fde047'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["singularity_wave", "drone_swarm", "neural_pulse", "quantum_barrier"],
                scoreMultiplier: 2.5,
                jumpPower: 21,
                gravity: 0.5
            },
            {
                name: "Dimensão Paralela",
                description: "Realidades sobrepostas e física alterada",
                duration: 4600,
                baseSpeed: 12,
                obstacleFrequency: 70,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23020002'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow8'%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.9'%3E%3Cpath d='M0 0 Q 400 400 800 0' stroke='%23ec4899' stroke-width='5' fill='none' filter='url(%23glow8)'/%3E%3Cpath d='M0 400 Q 400 0 800 400' stroke='%23be185d' stroke-width='4' fill='none' filter='url(%23glow8)'/%3E%3Cpath d='M200 0 Q 200 400 200 0' stroke='%23ec4899' stroke-width='3' fill='none' filter='url(%23glow8)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='1'%3E%3Ccircle cx='100' cy='100' r='4' fill='%23f9a8d4'/%3E%3Ccircle cx='300' cy='300' r='3' fill='%23f9a8d4'/%3E%3Ccircle cx='500' cy='150' r='5' fill='%23f9a8d4'/%3E%3Ccircle cx='700' cy='250' r='3' fill='%23f9a8d4'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["dimension_rift", "phase_drone", "singularity_wave", "neural_pulse"],
                scoreMultiplier: 3.0,
                jumpPower: 22,
                gravity: 0.45
            },
            {
                name: "Transcendência Final",
                description: "Além da compreensão humana - pura energia consciente",
                duration: 5000,
                baseSpeed: 15,
                obstacleFrequency: 60,
                backgrounds: {
                    bg1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23ffffff'/%3E%3C/svg%3E",
                    bg2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cdefs%3E%3Cfilter id='glow9'%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3C/defs%3E%3Cg opacity='0.7'%3E%3Ccircle cx='400' cy='200' r='150' fill='none' stroke='%23000000' stroke-width='8' filter='url(%23glow9)'/%3E%3Ccircle cx='400' cy='200' r='100' fill='none' stroke='%23374151' stroke-width='6' filter='url(%23glow9)'/%3E%3Ccircle cx='400' cy='200' r='50' fill='none' stroke='%23000000' stroke-width='4' filter='url(%23glow9)'/%3E%3C/g%3E%3C/svg%3E",
                    bg3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Cg opacity='0.8'%3E%3Ccircle cx='200' cy='100' r='6' fill='%23000000'/%3E%3Ccircle cx='400' cy='200' r='8' fill='%23000000'/%3E%3Ccircle cx='600' cy='300' r='6' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E"
                },
                obstacleTypes: ["transcendence_beam", "void_portal", "dimension_rift", "phase_drone"],
                scoreMultiplier: 4.0,
                jumpPower: 25,
                gravity: 0.4
            }
        ];       ];

        let currentPhaseIndex = 0;
        let phaseFrameCounter = 0;
        let totalScore = 0;

        // Imagens dos obstáculos
        let roboDogImg = new Image();
        let obstacleImages = {};

        // Background images
        let backgroundImg1 = new Image();
        let backgroundImg2 = new Image();
        let backgroundImg3 = new Image();

        let imagesToLoadForPhase = 3;
        let imagesLoadedCount = 0;
        let globalAssetsLoaded = 0;
        const totalGlobalAssets = 1; // apenas roboDog

        function onAllImagesLoaded() {
            if (gameStarted) {
                if (!gameOver) gameLoop();
            } else {
                initGameControls();
                showStartScreen();
            }
        }

        function loadPhaseAssets(phaseIndex, callback) {
            imagesLoadedCount = 0;
            const phase = phases[phaseIndex];
            
            backgroundImg1.onload = () => { imagesLoadedCount++; if(imagesLoadedCount === imagesToLoadForPhase) callback(); };
            backgroundImg2.onload = () => { imagesLoadedCount++; if(imagesLoadedCount === imagesToLoadForPhase) callback(); };
            backgroundImg3.onload = () => { imagesLoadedCount++; if(imagesLoadedCount === imagesToLoadForPhase) callback(); };
            
            backgroundImg1.src = phase.backgrounds.bg1;
            backgroundImg2.src = phase.backgrounds.bg2;
            backgroundImg3.src = phase.backgrounds.bg3;
        }

        function globalAssetLoaded() {
            globalAssetsLoaded++;
            if (globalAssetsLoaded === totalGlobalAssets) {
                loadPhaseAssets(currentPhaseIndex, onAllImagesLoaded);
            }
        }

        roboDogImg.onload = globalAssetLoaded;
        roboDogImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cstyle%3E.dog-body%7Bfill:white;stroke:%234A4A4A;stroke-width:1.5px;%7D.dog-accent%7Bfill:%2300c2a8;%7D.dog-eye%7Bfill:%2323D0D0;%7D%3C/style%3E%3Cpath class='dog-body' d='M75,65 C85,65 90,55 90,45 C90,30 80,20 65,20 C55,20 50,25 50,35 L50,60 C50,70 60,75 70,75'/%3E%3Cpath class='dog-body' d='M50,60 L30,60 C20,60 15,70 15,80 C15,90 25,95 35,95 L65,95 C70,95 75,90 75,85 L75,65'/%3E%3Ccircle class='dog-body' cx='30' cy='85' r='10'/%3E%3Ccircle class='dog-body' cx='65' cy='85' r='10'/%3E%3Cpath class='dog-body' d='M60,20 Q65,10 70,20'/%3E%3Cpath class='dog-body' d='M75,22 Q80,12 85,22'/%3E%3Crect class='dog-eye' x='70' y='30' width='15' height='8' rx='2'/%3E%3Ccircle class='dog-accent' cx='65' cy='50' r='8'/%3E%3Ccircle class='dog-accent' cx='38' cy='75' r='5'/%3E%3Cpath class='dog-body' d='M20,40 L10,35 L10,45 L20,50 Z'/%3E%3C/svg%3E";

        const roboDog = {
            x: 50,
            y: canvas.height - 90,
            width: 50,
            height: 50,
            velocityY: 0,
            gravity: 0.8,
            jumpForce: 18,
            grounded: true,
            draw() {
                ctx.drawImage(roboDogImg, this.x, this.y, this.width, this.height);
            },
            jump() {
                if (this.grounded) {
                    this.velocityY = -this.jumpForce;
                    this.grounded = false;
                }
            },
            update() {
                this.velocityY += this.gravity;
                this.y += this.velocityY;
                if (this.y + this.height >= canvas.height - 20) {
                    this.y = canvas.height - 20 - this.height;
                    this.velocityY = 0;
                    this.grounded = true;
                }
            }
        };

        const obstacles = [];
        let frame = 0;
        let score = 0;
        let gameSpeed = 5;
        let gameOver = false;
        let gameStarted = false;

        const bgLayer1 = { x: 0, speed: 0.5 };
        const bgLayer2 = { x: 0, speed: 1 };
        const bgLayer3 = { x: 0, speed: 1.5 };

        function drawBackground() {
            ctx.drawImage(backgroundImg1, bgLayer1.x, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg1, bgLayer1.x + canvas.width, 0, canvas.width, canvas.height);
            bgLayer1.x -= bgLayer1.speed * (gameSpeed / phases[currentPhaseIndex].baseSpeed);
            if (bgLayer1.x <= -canvas.width) bgLayer1.x = 0;

            ctx.drawImage(backgroundImg2, bgLayer2.x, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg2, bgLayer2.x + canvas.width, 0, canvas.width, canvas.height);
            bgLayer2.x -= bgLayer2.speed * (gameSpeed / phases[currentPhaseIndex].baseSpeed);
            if (bgLayer2.x <= -canvas.width) bgLayer2.x = 0;
            
            ctx.drawImage(backgroundImg3, bgLayer3.x, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg3, bgLayer3.x + canvas.width, 0, canvas.width, canvas.height);
            bgLayer3.x -= bgLayer3.speed * (gameSpeed / phases[currentPhaseIndex].baseSpeed);
            if (bgLayer3.x <= -canvas.width) bgLayer3.x = 0;
        }

        function spawnObstacle() {
            const phase = phases[currentPhaseIndex];
            const obstacleType = phase.obstacleTypes[Math.floor(Math.random() * phase.obstacleTypes.length)];
            
            let newObstacle = {
                x: canvas.width,
                type: obstacleType,
                passed: false,
                draw() {
                    ctx.fillStyle = getObstacleColor(this.type);
                    switch(this.type) {
                        case "simple_barrier":
                            this.width = 30; this.height = 60; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "laser_low":
                            this.width = 80; this.height = 20; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "drone_basic":
                            this.width = 40; this.height = 40; this.y = canvas.height - 20 - this.height - 30;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "laser_mid":
                            this.width = 80; this.height = 20; this.y = canvas.height - 20 - this.height - 50;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "energy_ring":
                            this.width = 60; this.height = 60; this.y = canvas.height - 20 - this.height - 20;
                            ctx.strokeStyle = this.fillStyle || ctx.fillStyle;
                            ctx.lineWidth = 5;
                            ctx.strokeRect(this.x, this.y, this.width, this.height);
                            break;
                        case "quantum_barrier":
                            this.width = 40; this.height = 80; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "drone_swarm":
                            this.width = 100; this.height = 50; this.y = canvas.height - 20 - this.height - 40;
                            for(let i = 0; i < 5; i++) {
                                ctx.fillRect(this.x + i*20, this.y + Math.sin(frame*0.1 + i)*10, 15, 15);
                            }
                            break;
                        case "bio_vine":
                            this.width = 25; this.height = 100; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "neural_pulse":
                            this.width = 60; this.height = 30; this.y = canvas.height - 20 - this.height - 60;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "singularity_wave":
                            this.width = 120; this.height = 40; this.y = canvas.height - 20 - this.height - 30;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "dimension_rift":
                            this.width = 50; this.height = 120; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "phase_drone":
                            this.width = 45; this.height = 45; this.y = canvas.height - 20 - this.height - 50;
                            ctx.globalAlpha = 0.7;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            ctx.globalAlpha = 1;
                            break;
                        case "transcendence_beam":
                            this.width = 100; this.height = 30; this.y = canvas.height - 20 - this.height - 70;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                            break;
                        case "void_portal":
                            this.width = 80; this.height = 80; this.y = canvas.height - 20 - this.height - 10;
                            ctx.strokeStyle = ctx.fillStyle;
                            ctx.lineWidth = 8;
                            ctx.strokeRect(this.x, this.y, this.width, this.height);
                            break;
                        default:
                            this.width = 40; this.height = 60; this.y = canvas.height - 20 - this.height;
                            ctx.fillRect(this.x, this.y, this.width, this.height);
                    }
                }
            };
            obstacles.push(newObstacle);
        }

        function getObstacleColor(type) {
            const colors = {
                "simple_barrier": "#6b7280",
                "laser_low": "#00c2a8",
                "drone_basic": "#4f46e5",
                "laser_mid": "#f43f5e",
                "energy_ring": "#e11d48",
                "quantum_barrier": "#06b6d4",
                "drone_swarm": "#eab308",
                "bio_vine": "#22c55e",
                "neural_pulse": "#a855f7",
                "singularity_wave": "#fbbf24",
                "dimension_rift": "#ec4899",
                "phase_drone": "#be185d",
                "transcendence_beam": "#000000",
                "void_portal": "#374151"
            };
            return colors[type] || "#ff0000";
        }

        function updateObstacles() {
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].x -= gameSpeed;
                obstacles[i].draw();
                
                // Detecção de colisão
                if (roboDog.x < obstacles[i].x + (obstacles[i].width || 50) &&
                    roboDog.x + roboDog.width > obstacles[i].x &&
                    roboDog.y < obstacles[i].y + (obstacles[i].height || 50) &&
                    roboDog.y + roboDog.height > obstacles[i].y) {
                    gameOver = true;
                }
                
                // Verificar se o obstáculo foi ultrapassado
                if (!obstacles[i].passed && obstacles[i].x + (obstacles[i].width || 50) < roboDog.x) {
                    obstacles[i].passed = true;
                }
            }
            
            // Remover obstáculos que saíram da tela e atualizar pontuação
            if (obstacles.length > 0 && obstacles[0].x + (obstacles[0].width || 50) < 0) {
                obstacles.shift();
                score++;
                totalScore++;
            }
        }

        function updatePhase() {
            phaseFrameCounter++;
            
            // Verificar se deve avançar para a próxima fase
            if (phaseFrameCounter >= phases[currentPhaseIndex].duration && currentPhaseIndex < phases.length - 1) {
                currentPhaseIndex++;
                phaseFrameCounter = 0;
                gameSpeed = phases[currentPhaseIndex].baseSpeed;
                
                // Carregar assets da nova fase
                loadPhaseAssets(currentPhaseIndex, () => {
                    // Continuar o jogo após carregar os assets
                });
                
                // Atualizar indicador de fase
                phaseIndicator.textContent = \`Fase \${currentPhaseIndex + 1}/10\`;
                
                // Mostrar transição de fase
                showPhaseTransition();
            }
        }

        function showPhaseTransition() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.font = "24px Georgia, serif";
            ctx.textAlign = "center";
            ctx.fillText(phases[currentPhaseIndex].name, canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "16px Georgia, serif";
            ctx.fillText(phases[currentPhaseIndex].description, canvas.width / 2, canvas.height / 2 + 20);
            ctx.textAlign = "left";
        }

        function drawUI() {
            ctx.fillStyle = "#FFF";
            ctx.font = "18px Georgia, serif";
            ctx.fillText("Score: " + totalScore, canvas.width - 150, 30);
            ctx.fillText(phases[currentPhaseIndex].name, 20, 30);
            ctx.font = "12px Georgia, serif";
            ctx.fillText(phases[currentPhaseIndex].description, 20, 50);
        }

        function showStartScreen() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();
            roboDog.draw();
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.font = "32px Georgia, serif";
            ctx.textAlign = "center";
            ctx.fillText("RoboDog Run", canvas.width / 2, canvas.height / 2 - 60);
            ctx.font = "20px Georgia, serif";
            ctx.fillText("Jornada através de 10 fases evolutivas", canvas.width / 2, canvas.height / 2 - 20);
            ctx.font = "16px Georgia, serif";
            ctx.fillText("Pressione ESPAÇO para iniciar", canvas.width / 2, canvas.height / 2 + 20);
            ctx.fillText("Fase Atual: " + phases[currentPhaseIndex].name, canvas.width / 2, canvas.height / 2 + 50);
            ctx.textAlign = "left";
        }

        function showGameOverScreen() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFF";
            ctx.font = "40px Georgia, serif";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
            ctx.font = "20px Georgia, serif";
            ctx.fillText("Score Final: " + totalScore, canvas.width / 2, canvas.height / 2);
            ctx.fillText("Fase Alcançada: " + (currentPhaseIndex + 1) + "/10", canvas.width / 2, canvas.height / 2 + 30);
            ctx.fillText("(" + phases[currentPhaseIndex].name + ")", canvas.width / 2, canvas.height / 2 + 55);
            ctx.fillText("Pressione ESPAÇO para reiniciar", canvas.width / 2, canvas.height / 2 + 90);
            ctx.textAlign = "left";
        }

        function resetGame() {
            currentPhaseIndex = 0;
            phaseFrameCounter = 0;
            score = 0;
            totalScore = 0;
            gameSpeed = phases[0].baseSpeed;
            gameOver = false;
            gameStarted = false;
            obstacles.length = 0;
            frame = 0;
            roboDog.y = canvas.height - 90;
            roboDog.velocityY = 0;
            roboDog.grounded = true;
            phaseIndicator.textContent = "Fase 1/10";
            loadPhaseAssets(currentPhaseIndex, showStartScreen);
        }

        function gameLoop() {
            if (!gameStarted) {
                showStartScreen();
                return;
            }

            if (gameOver) {
                showGameOverScreen();
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawBackground();
            roboDog.update();
            roboDog.draw();
            updateObstacles();
            updatePhase();
            drawUI();

            // Spawn obstáculos
            if (frame % phases[currentPhaseIndex].obstacleFrequency === 0) {
                spawnObstacle();
            }

            frame++;
            requestAnimationFrame(gameLoop);
        }

        function initGameControls() {
            document.addEventListener("keydown", (e) => {
                if (e.code === "Space") {
                    e.preventDefault();
                    if (!gameStarted && !gameOver) {
                        gameStarted = true;
                        gameLoop();
                    } else if (gameOver) {
                        resetGame();
                    } else {
                        roboDog.jump();
                    }
                }
            });

            // Controles touch para mobile
            canvas.addEventListener("touchstart", (e) => {
                e.preventDefault();
                if (!gameStarted && !gameOver) {
                    gameStarted = true;
                    gameLoop();
                } else if (gameOver) {
                    resetGame();
                } else {
                    roboDog.jump();
                }
            });

            canvas.addEventListener("click", (e) => {
                if (!gameStarted && !gameOver) {
                    gameStarted = true;
                    gameLoop();
                } else if (gameOver) {
                    resetGame();
                } else {
                    roboDog.jump();
                }
            });
        }
        `;
    }
});

