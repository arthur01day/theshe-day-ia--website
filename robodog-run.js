/**
 * RoboDog Run - Jogo 2D estilo Gendino com cachorro robótico e cenário futurista em fases
 * Para o site Theshe.Day.IA
 */

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("robodog-run-game");
    if (!gameContainer) {
        console.error("Elemento container do jogo não encontrado!");
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.width = 800;
    canvas.height = 300; // Aumentar altura para mais espaço vertical nos cenários
    gameContainer.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    // --- Configurações das Fases ---
    const phases = [
        {
            name: "Distrito Neon (Fase 1)",
            duration: 3000, // frames para durar (aprox 50s a 60fps)
            baseSpeed: 5,
            obstacleFrequency: 150, // a cada X frames
            backgrounds: {
                bg1: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Crect width=\'800\' height=\'300\' fill=\'%230a0f2c\'/>%3C/svg%3E",
                bg2: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cdefs%3E%3Cfilter id=\'glow1\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'2\' result=\'coloredBlur\'/>%3CfeMerge%3E%3CfeMergeNode in=\'coloredBlur\'/>%3CfeMergeNode in=\'SourceGraphic\'/>%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cg opacity=\'0.4\'%3E%3Crect x=\'50\' y=\'150\' width=\'30\' height=\'150\' fill=\'%234f46e5\' filter=\'url(%23glow1)\'/%3E%3Crect x=\'150\' y=\'100\' width=\'40\' height=\'200\' fill=\'%234f46e5\' filter=\'url(%23glow1)\'/%3E%3Crect x=\'300\' y=\'170\' width=\'25\' height=\'130\' fill=\'%233730a3\' filter=\'url(%23glow1)\'/%3E%3Crect x=\'450\' y=\'130\' width=\'35\' height=\'170\' fill=\'%234f46e5\' filter=\'url(%23glow1)\'/%3E%3Crect x=\'600\' y=\'80\' width=\'50\' height=\'220\' fill=\'%233730a3\' filter=\'url(%23glow1)\'/%3E%3Crect x=\'700\' y=\'150\' width=\'30\' height=\'150\' fill=\'%234f46e5\' filter=\'url(%23glow1)\'/%3E%3C/g%3E%3C/svg%3E",
                bg3: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cg opacity=\'0.6\'%3E%3Ccircle cx=\'100\' cy=\'80\' r=\'2\' fill=\'%23e0e7ff\'/>%3Ccircle cx=\'250\' cy=\'110\' r=\'1\' fill=\'%23e0e7ff\'/>%3Ccircle cx=\'400\' cy=\'60\' r=\'1.5\' fill=\'%23e0e7ff\'/>%3Ccircle cx=\'550\' cy=\'130\' r=\'2\' fill=\'%23e0e7ff\'/>%3Ccircle cx=\'700\' cy=\'90\' r=\'1\' fill=\'%23e0e7ff\'/>%3C/g%3E%3C/svg%3E"
            },
            obstacleTypes: ["laser_low", "drone_mid"]
        },
        {
            name: "Torres Celestes (Fase 2)",
            duration: 4500, // aprox 75s
            baseSpeed: 6.5,
            obstacleFrequency: 120,
            backgrounds: {
                bg1: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Crect width=\'800\' height=\'300\' fill=\'%2305081a\'/>%3C/svg%3E", // Mais escuro
                bg2: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cdefs%3E%3Cfilter id=\'glow2\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'3\' result=\'coloredBlur\'/>%3CfeMerge%3E%3CfeMergeNode in=\'coloredBlur\'/>%3CfeMergeNode in=\'SourceGraphic\'/>%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cg opacity=\'0.5\'%3E%3Cpath d=\'M80 300 L100 50 L120 300 Z\' fill=\'%2300c2a8\' filter=\'url(%23glow2)\'/%3E%3Cpath d=\'M200 300 L230 20 L260 300 Z\' fill=\'%2300c2a8\' filter=\'url(%23glow2)\'/%3E%3Cpath d=\'M350 300 L370 80 L390 300 Z\' fill=\'%2300a18c\' filter=\'url(%23glow2)\'/%3E%3Cpath d=\'M500 300 L540 30 L580 300 Z\' fill=\'%2300c2a8\' filter=\'url(%23glow2)\'/%3E%3Cpath d=\'M650 300 L670 100 L690 300 Z\' fill=\'%2300a18c\' filter=\'url(%23glow2)\'/%3E%3C/g%3E%3C/svg%3E", // Torres altas e finas
                bg3: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cg opacity=\'0.7\'%3E%3Crect x=\'0\' y=\'280\' width=\'800\' height=\'20\' fill=\'%231e293b\'/%3E%3Cpath d=\'M50 280 Q 150 250 250 280 T 450 280 T 650 280\' stroke=\'%234f46e5\' stroke-width=\'2\' fill=\'none\'/%3E%3Ccircle cx=\'150\' cy=\'100\' r=\'1.5\' fill=\'%23a5b4fc\'/>%3Ccircle cx=\'350\' cy=\'150\' r=\'1\' fill=\'%23a5b4fc\'/>%3Ccircle cx=\'550\' cy=\'80\' r=\'2\' fill=\'%23a5b4fc\'/>%3C/g%3E%3C/svg%3E" // Nuvens baixas e estrelas mais brilhantes
            },
            obstacleTypes: ["laser_low", "drone_mid", "laser_high"]
        },
        {
            name: "Metrópole Orbital (Fase 3)",
            duration: 6000, // aprox 100s
            baseSpeed: 8,
            obstacleFrequency: 100,
            backgrounds: {
                bg1: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Crect width=\'800\' height=\'300\' fill=\'%2302040a\'/>%3C/svg%3E", // Quase preto
                bg2: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cdefs%3E%3Cfilter id=\'glow3\' x=\'-50%25\' y=\'-50%25\' width=\'200%25\' height=\'200%25\'%3E%3CfeGaussianBlur stdDeviation=\'4\' result=\'coloredBlur\'/>%3CfeMerge%3E%3CfeMergeNode in=\'coloredBlur\'/>%3CfeMergeNode in=\'SourceGraphic\'/>%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Cg opacity=\'0.6\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'50\' fill=\'none\' stroke=\'%23f43f5e\' stroke-width=\'3\' filter=\'url(%23glow3)\'/%3E%3Ccircle cx=\'300\' cy=\'150\' r=\'70\' fill=\'none\' stroke=\'%23f43f5e\' stroke-width=\'2\' filter=\'url(%23glow3)\' opacity=\'0.7\'/%3E%3Ccircle cx=\'550\' cy=\'80\' r=\'40\' fill=\'none\' stroke=\'%23e11d48\' stroke-width=\'4\' filter=\'url(%23glow3)\'/%3E%3Cpath d=\'M50 200 L150 100 L250 200\' stroke=\'%23f43f5e\' stroke-width=\'2\' fill=\'none\' filter=\'url(%23glow3)\'/%3E%3Cpath d=\'M400 250 L500 50 L600 250\' stroke=\'%23e11d48\' stroke-width=\'3\' fill=\'none\' filter=\'url(%23glow3)\'/%3E%3C/g%3E%3C/svg%3E", // Estruturas orbitais e anéis
                bg3: "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 300\'%3E%3Cg opacity=\'0.8\'%3E%3Cpath d=\'M0 150 Q 200 100 400 150 T 800 150\' stroke=\'%23fb7185\' stroke-width=\'1\' fill=\'none\' opacity=\'0.5\'/%3E%3Cpath d=\'M0 200 Q 200 250 400 200 T 800 200\' stroke=\'%23fb7185\' stroke-width=\'1\' fill=\'none\' opacity=\'0.5\'/%3E%3Ccircle cx=\'Math.random()*800\' cy=\'Math.random()*300\' r=\'0.5\' fill=\'%23fecaca\'/%3E%3Ccircle cx=\'Math.random()*800\' cy=\'Math.random()*300\' r=\'0.8\' fill=\'%23fecaca\'/%3E%3C/g%3E%3C/svg%3E" // Nebulosas e estrelas distantes
            },
            obstacleTypes: ["laser_low", "drone_mid", "laser_high", "drone_swarm"]
        }
    ];
    let currentPhaseIndex = 0;
    let phaseFrameCounter = 0;

    let roboDogImg = new Image();
    // Obstacle images (pode ser um array ou um sprite sheet)
    let laserLowImg = new Image();
    let droneMidImg = new Image();
    let laserHighImg = new Image(); // Novo obstáculo
    let droneSwarmImg = new Image(); // Novo obstáculo

    // Background images (serão carregadas dinamicamente por fase)
    let backgroundImg1 = new Image();
    let backgroundImg2 = new Image();
    let backgroundImg3 = new Image();

    let imagesToLoadForPhase = 3; // bg1, bg2, bg3. roboDog e obstáculos são globais
    let imagesLoadedCount = 0;

    function onAllImagesLoaded() {
        if (gameStarted) {
            // Se o jogo já começou (ex: transição de fase), não reseta tudo
            // Apenas continua o loop se não estiver em game over
            if (!gameOver) gameLoop();
        } else {
            // Primeira inicialização do jogo
            initGameControls(); 
            showStartScreen(); // Mostra a tela inicial primeiro
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

    // Carregar assets globais (RoboDog e tipos de obstáculos)
    let globalAssetsLoaded = 0;
    const totalGlobalAssets = 5; // roboDog, 4 tipos de obstaculos

    function globalAssetLoaded() {
        globalAssetsLoaded++;
        if (globalAssetsLoaded === totalGlobalAssets) {
            loadPhaseAssets(currentPhaseIndex, onAllImagesLoaded); // Carrega assets da primeira fase
        }
    }

    roboDogImg.onload = globalAssetLoaded;
    laserLowImg.onload = globalAssetLoaded;
    droneMidImg.onload = globalAssetLoaded;
    laserHighImg.onload = globalAssetLoaded;
    droneSwarmImg.onload = globalAssetLoaded;

    roboDogImg.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cstyle%3E.dog-body%7Bfill:white;stroke:%234A4A4A;stroke-width:1.5px;%7D.dog-accent%7Bfill:%2300c2a8;%7D.dog-eye%7Bfill:%2323D0D0;%7D%3C/style%3E%3Cpath class=\'dog-body\' d=\'M75,65 C85,65 90,55 90,45 C90,30 80,20 65,20 C55,20 50,25 50,35 L50,60 C50,70 60,75 70,75\'/%3E%3Cpath class=\'dog-body\' d=\'M50,60 L30,60 C20,60 15,70 15,80 C15,90 25,95 35,95 L65,95 C70,95 75,90 75,85 L75,65\'/%3E%3Ccircle class=\'dog-body\' cx=\'30\' cy=\'85\' r=\'10\'/><!--Pata Traseira-->%3E%3Ccircle class=\'dog-body\' cx=\'65\' cy=\'85\' r=\'10\'/><!--Pata Dianteira-->%3E%3Cpath class=\'dog-body\' d=\'M60,20 Q65,10 70,20\'/><!--Orelha1-->%3E%3Cpath class=\'dog-body\' d=\'M75,22 Q80,12 85,22\'/><!--Orelha2-->%3E%3Crect class=\'dog-eye\' x=\'70\' y=\'30\' width=\'15\' height=\'8\' rx=\'2\'/><!--Olho-->%3E%3Ccircle class=\'dog-accent\' cx=\'65\' cy=\'50\' r=\'8\'/><!--Detalhe corpo-->%3E%3Ccircle class=\'dog-accent\' cx=\'38\' cy=\'75\' r=\'5\'/><!--Detalhe corpo-->%3E%3Cpath class=\'dog-body\' d=\'M20,40 L10,35 L10,45 L20,50 Z\'/><!--Rabo-->%3E%3C/svg%3E";
    laserLowImg.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 80 30\'%3E%3Cdefs%3E%3ClinearGradient id=\'laserGradL\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'0%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%2300c2a8;stop-opacity:0.7\'/>%3Cstop offset=\'50%25\' style=\'stop-color:%2300f0ff;stop-opacity:1\'/>%3Cstop offset=\'100%25\' style=\'stop-color:%2300c2a8;stop-opacity:0.7\'/>%3C/linearGradient%3E%3C/defs%3E%3Crect x=\'0\' y=\'10\' width=\'80\' height=\'10\' fill=\'url(%23laserGradL)\'/%3E%3Crect x=\'0\' y=\'5\' width=\'10\' height=\'20\' fill=\'%23334155\' rx=\'2\'/>%3Crect x=\'70\' y=\'5\' width=\'10\' height=\'20\' fill=\'%23334155\' rx=\'2\'/>%3C/svg%3E";
    droneMidImg.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 50 50\'%3E%3Cstyle%3E.drone-body%7Bfill:%234b5563;%7D.drone-prop%7Bfill:%236b7280;%7D.drone-light%7Bfill:%23f43f5e;animation:blink 1s infinite;%7D@keyframes blink%7B50%25%7Bopacity:0.3;%7D%7D%3C/style%3E%3Crect class=\'drone-body\' x=\'10\' y=\'15\' width=\'30\' height=\'20\' rx=\'3\'/><!--Corpo-->%3E%3Crect class=\'drone-prop\' x=\'5\' y=\'10\' width=\'40\' height=\'5\' rx=\'2\'/><!--Hélice Superior-->%3E%3Crect class=\'drone-prop\' x=\'18\' y=\'5\' width=\'14\' height=\'40\' rx=\'2\'/><!--Hélice Vertical-->%3E%3Ccircle class=\'drone-light\' cx=\'25\' cy=\'25\' r=\'3\'/><!--Luz-->%3E%3C/svg%3E";
    laserHighImg.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 80 30\'%3E%3Cdefs%3E%3ClinearGradient id=\'laserGradH\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'0%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23f43f5e;stop-opacity:0.7\'/>%3Cstop offset=\'50%25\' style=\'stop-color:%23ff7281;stop-opacity:1\'/>%3Cstop offset=\'100%25\' style=\'stop-color:%23f43f5e;stop-opacity:0.7\'/>%3C/linearGradient%3E%3C/defs%3E%3Crect x=\'0\' y=\'0\' width=\'80\' height=\'10\' fill=\'url(%23laserGradH)\'/%3E%3Crect x=\'0\' y=\'0\' width=\'10\' height=\'15\' fill=\'%23334155\' rx=\'2\'/>%3Crect x=\'70\' y=\'0\' width=\'10\' height=\'15\' fill=\'%23334155\' rx=\'2\'/>%3C/svg%3E";
    droneSwarmImg.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 60\'%3E%3Cstyle%3E.drones%7Bfill:%23eab308;animation:swarm-move 0.5s infinite alternate;%7D@keyframes swarm-move%7Bto%7Btransform:translateY(3px);%7D%7D%3C/style%3E%3Ccircle class=\'drones\' cx=\'20\' cy=\'20\' r=\'8\'/><circle class=\'drones\' cx=\'50\' cy=\'15\' r=\'8\'/><circle class=\'drones\' cx=\'80\' cy=\'20\' r=\'8\'/><circle class=\'drones\' cx=\'35\' cy=\'40\' r=\'8\'/><circle class=\'drones\' cx=\'65\' cy=\'40\' r=\'8\'/></svg%3E";

    const roboDog = {
        x: 50,
        y: canvas.height - 70,
        width: 50, // Ajustado para novo SVG
        height: 50, // Ajustado para novo SVG
        velocityY: 0,
        gravity: 0.7,
        jumpForce: 16,
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
            if (this.y + this.height >= canvas.height - 10) {
                this.y = canvas.height - 10 - this.height;
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
            failCount: 0,
            draw() {
                let imgToDraw;
                switch(this.type) {
                    case "laser_low": imgToDraw = laserLowImg; this.width=80; this.height=30; this.y = canvas.height - 10 - this.height; break;
                    case "drone_mid": imgToDraw = droneMidImg; this.width=50; this.height=50; this.y = canvas.height - 10 - this.height - 20; break; // Voa um pouco mais alto
                    case "laser_high": imgToDraw = laserHighImg; this.width=80; this.height=30; this.y = canvas.height - 10 - this.height - 70; break; // Laser alto
                    case "drone_swarm": imgToDraw = droneSwarmImg; this.width=100; this.height=60; this.y = canvas.height - 10 - this.height - Math.random()*30; break;
                }
                if (imgToDraw && imgToDraw.complete && imgToDraw.naturalHeight !== 0) {
                     ctx.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
                } else {
                    // Fallback simples se a imagem não carregou ou é inválida
                    ctx.fillStyle = "red";
                    ctx.fillRect(this.x, this.y, this.width || 50, this.height || 50);
                }
            }
        };
        obstacles.push(newObstacle);
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
                
                // Registrar falha para este tipo de obstáculo
                obstacles[i].failCount++;
                
                // Disparar evento de game over com dados para análise
                window.dispatchEvent(new CustomEvent('game-over', {
                    detail: {
                        score: score,
                        phase: currentPhaseIndex + 1,
                        obstacleType: obstacles[i].type,
                        failCount: obstacles[i].failCount
                    }
                }));
            }
            
            // Verificar se o obstáculo foi ultrapassado (para estatísticas)
            if (!obstacles[i].passed && obstacles[i].x + (obstacles[i].width || 50) < roboDog.x) {
                obstacles[i].passed = true;
                
                // Disparar evento de progresso para análise
                window.dispatchEvent(new CustomEvent('game-progress', {
                    detail: {
                        obstacleType: obstacles[i].type,
                        failCount: window.obstacleStats ? 
                            (window.obstacleStats[obstacles[i].type] || 0) : 0
                    }
                }));
            }
        }
        
        // Remover obstáculos que saíram da tela e atualizar pontuação
        if (obstacles.length > 0 && obstacles[0].x + (obstacles[0].width || 50) < 0) {
            obstacles.shift();
            score++;
            
            // Disparar evento de atualização de pontuação
            window.dispatchEvent(new CustomEvent('score-update', {
                detail: { score: score }
            }));
        }
    }

    function drawUI() {
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Segoe UI, Arial, sans-serif";
        ctx.fillText("Score: " + score, canvas.width - 120, 30);
        ctx.fillText(phases[currentPhaseIndex].name, 20, 30);
    }

    function showStartScreen() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(); 
        roboDog.draw();
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.font = "30px Segoe UI, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("RoboDog Run: Multi-Phase", canvas.width / 2, canvas.height / 2 - 40);
        ctx.font = "20px Segoe UI, Arial, sans-serif";
        ctx.fillText("Pressione Espaço para Iniciar", canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText("Fase Atual: " + phases[currentPhaseIndex].name, canvas.width/2, canvas.height/2 + 40);
        ctx.textAlign = "left";
    }
    
    function showGameOverScreen() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";
        ctx.font = "40px Segoe UI, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = "20px Segoe UI, Arial, sans-serif";
        ctx.fillText("Score Final: " + score, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText("Fase Alcançada: " + phases[currentPhaseIndex].name, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText("Pressione Espaço para Reiniciar", canvas.width / 2, canvas.height / 2 + 80);
        ctx.textAlign = "left";
    }

    function gameLoop() {
        if (!gameStarted) {
            showStartScreen();
            requestAnimationFrame(gameLoop);
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

        const currentPhase = phases[currentPhaseIndex];
        if (frame % Math.floor(currentPhase.obstacleFrequency / (gameSpeed / currentPhase.baseSpeed)) === 0) {
            spawnObstacle();
        }

        updateObstacles();
        drawUI();

        frame++;
        phaseFrameCounter++;

        // Lógica de transição de fase
        if (phaseFrameCounter >= currentPhase.duration) {
            if (currentPhaseIndex < phases.length - 1) {
                // Disparar evento de fase completa
                window.dispatchEvent(new CustomEvent('phase-complete', {
                    detail: {
                        phase: currentPhaseIndex + 1,
                        score: score
                    }
                }));
                
                currentPhaseIndex++;
                phaseFrameCounter = 0;
                gameSpeed = phases[currentPhaseIndex].baseSpeed;
                obstacles.length = 0; // Limpa obstáculos da fase anterior
                
                // Mostrar tela de transição ou carregar novos assets
                gameStarted = false; // Pausa para carregar e mostrar tela de transição
                ctx.fillStyle = "rgba(0,0,0,0.8)";
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "24px Segoe UI, Arial, sans-serif";
                ctx.fillText("Fase Completa! Carregando " + phases[currentPhaseIndex].name + "...", canvas.width/2, canvas.height/2);
                ctx.textAlign = "left";
                
                // Disparar evento de mudança de fase para atualizar UI
                window.dispatchEvent(new CustomEvent('phase-change', {
                    detail: {
                        phase: currentPhaseIndex + 1,
                        phaseName: phases[currentPhaseIndex].name
                    }
                }));
                
                loadPhaseAssets(currentPhaseIndex, () => {
                    gameStarted = true; // Retoma o jogo
                    gameLoop(); 
                });
                return; // Sai do loop atual para esperar o carregamento
            } else {
                // Jogo completado (todas as fases)
                ctx.fillStyle = "rgba(0,0,0,0.8)";
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.fillStyle = "#00c2a8";
                ctx.textAlign = "center";
                ctx.font = "36px Segoe UI, Arial, sans-serif";
                ctx.fillText("PARABÉNS! VOCÊ COMPLETOU TODAS AS FASES!", canvas.width/2, canvas.height/2 - 40);
                ctx.fillStyle = "white";
                ctx.font = "24px Segoe UI, Arial, sans-serif";
                ctx.fillText("Score Final: " + score, canvas.width/2, canvas.height/2 + 10);
                ctx.fillText("Pressione Espaço para Jogar Novamente", canvas.width/2, canvas.height/2 + 50);
                ctx.textAlign = "left";
                gameOver = true;
            }
        }
        
        // Ajuste dinâmico de dificuldade
        window.addEventListener('adjust-difficulty', (e) => {
            if (e.detail && e.detail.factor) {
                gameSpeed = gameSpeed * e.detail.factor;
                // Limitar para não ficar muito fácil ou muito difícil
                const minSpeed = currentPhase.baseSpeed * 0.8;
                const maxSpeed = currentPhase.baseSpeed * 1.5;
                gameSpeed = Math.max(minSpeed, Math.min(maxSpeed, gameSpeed));
            }
        });
        
        // Aumentar a velocidade dentro da fase gradualmente
        if (frame % 600 === 0 && gameSpeed < currentPhase.baseSpeed + 5) { // Limite de aumento por fase
             gameSpeed += 0.2;
        }

        requestAnimationFrame(gameLoop);
    }

    function resetGame() {
        currentPhaseIndex = 0;
        phaseFrameCounter = 0;
        roboDog.y = canvas.height - 70;
        roboDog.velocityY = 0;
        roboDog.grounded = true;
        obstacles.length = 0;
        score = 0;
        gameSpeed = phases[currentPhaseIndex].baseSpeed;
        bgLayer1.speed = 0.5;
        bgLayer2.speed = 1;
        bgLayer3.speed = 1.5;
        frame = 0;
        gameOver = false;
        gameStarted = true;
        
        // Carrega os assets da primeira fase e inicia o loop
        loadPhaseAssets(currentPhaseIndex, gameLoop);
    }
    
    function initGameControls() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                if (!gameStarted) {
                    gameStarted = true;
                    resetGame();
                } else if (gameOver) {
                    resetGame();
                } else {
                    roboDog.jump();
                }
            }
        });
    }

    const gameStyle = document.createElement("style");
    gameStyle.textContent = `
        #robodog-run-game {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 2rem 0;
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        #gameCanvas {
            border: 2px solid #4f46e5;
            border-radius: 8px;
            background: #0f172a; /* Cor de fundo padrão do canvas */
        }
    `;
    document.head.appendChild(gameStyle);
});
