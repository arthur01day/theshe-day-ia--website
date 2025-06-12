// Código JavaScript para criar e controlar as animações para cada coluna do site
document.addEventListener('DOMContentLoaded', function() {
    // Criar animações para cada seção
    createCityAnimation();
    createDataFlowAnimation();
    createNeuralNetworkAnimation();
    createMatrixAnimation();
    createKnowledgeWavesAnimation();
    createGeopoliticsAnimation();
    
    // Recriar animações a cada 15 segundos
    setInterval(function() {
        createCityAnimation();
        createDataFlowAnimation();
        createNeuralNetworkAnimation();
        createMatrixAnimation();
        createKnowledgeWavesAnimation();
        createGeopoliticsAnimation();
    }, 15000);
    
    // 1. Animação de Cidade Futurística para seção de destaque
    function createCityAnimation() {
        const containers = document.querySelectorAll('.city-animation-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const cityAnimation = document.createElement('div');
            cityAnimation.className = 'city-animation restart-animation';
            container.appendChild(cityAnimation);
            
            // Adicionar céu com estrelas
            const stars = document.createElement('div');
            stars.className = 'stars';
            cityAnimation.appendChild(stars);
            
            // Adicionar lua
            const moon = document.createElement('div');
            moon.className = 'moon';
            cityAnimation.appendChild(moon);
            
            // Adicionar nuvens
            const clouds = document.createElement('div');
            clouds.className = 'clouds';
            cityAnimation.appendChild(clouds);
            
            // Adicionar edifícios
            const buildingCount = Math.floor(Math.random() * 5) + 10; // 10-15 edifícios
            
            for (let i = 0; i < buildingCount; i++) {
                const building = document.createElement('div');
                building.className = 'building';
                
                // Posição aleatória
                const left = (i / buildingCount * 100) + (Math.random() * 5 - 2.5);
                building.style.left = `${left}%`;
                
                // Tamanho aleatório
                const width = Math.random() * 30 + 20; // 20-50px
                const height = Math.random() * 150 + 50; // 50-200px
                building.style.width = `${width}px`;
                building.style.height = `${height}px`;
                
                // Animação de surgimento com atraso baseado na posição
                building.style.animation = `building-rise 1.5s ease-out ${i * 0.1}s forwards`;
                building.style.opacity = '0';
                building.style.transform = 'scaleY(0)';
                
                // Adicionar luzes aos edifícios
                const lights = document.createElement('div');
                lights.className = 'building-lights';
                building.appendChild(lights);
                
                cityAnimation.appendChild(building);
            }
            
            // Adicionar veículos voadores
            const vehicleCount = Math.floor(Math.random() * 5) + 5; // 5-10 veículos
            
            for (let i = 0; i < vehicleCount; i++) {
                const vehicle = document.createElement('div');
                vehicle.className = 'flying-vehicle';
                
                // Posição aleatória
                const top = Math.random() * 150 + 50; // 50-200px do topo
                vehicle.style.top = `${top}px`;
                
                // Velocidade aleatória
                const duration = Math.random() * 5 + 10; // 10-15s
                
                // Direção aleatória
                const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
                
                // Atraso aleatório
                const delay = Math.random() * 5;
                
                vehicle.style.animation = `vehicle-move ${duration}s linear ${delay}s infinite ${direction}`;
                
                cityAnimation.appendChild(vehicle);
            }
            
            // Adicionar hologramas
            const hologramCount = Math.floor(Math.random() * 3) + 2; // 2-5 hologramas
            
            for (let i = 0; i < hologramCount; i++) {
                const hologram = document.createElement('div');
                hologram.className = 'hologram';
                
                // Posição aleatória
                const left = Math.random() * 80 + 10; // 10-90% da largura
                const bottom = Math.random() * 20 + 20; // 20-40px do fundo
                hologram.style.left = `${left}%`;
                hologram.style.bottom = `${bottom}px`;
                
                cityAnimation.appendChild(hologram);
            }
            
            // Adicionar luzes da cidade
            const cityLights = document.createElement('div');
            cityLights.className = 'city-lights';
            cityAnimation.appendChild(cityLights);
        });
    }
    
    // 2. Animação de Fluxo de Dados para seção de notícias
    function createDataFlowAnimation() {
        const containers = document.querySelectorAll('.data-flow-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const dataFlow = document.createElement('div');
            dataFlow.className = 'data-flow restart-animation';
            container.appendChild(dataFlow);
            
            // Adicionar linhas de dados
            const lineCount = Math.floor(Math.random() * 5) + 10; // 10-15 linhas
            
            for (let i = 0; i < lineCount; i++) {
                const line = document.createElement('div');
                line.className = 'data-line';
                
                // Posição aleatória
                const top = Math.random() * 100; // 0-100% do topo
                line.style.top = `${top}%`;
                
                // Atraso aleatório
                const delay = Math.random() * 10;
                line.style.animationDelay = `${delay}s`;
                
                dataFlow.appendChild(line);
            }
            
            // Adicionar nós de dados
            const nodeCount = Math.floor(Math.random() * 10) + 15; // 15-25 nós
            
            for (let i = 0; i < nodeCount; i++) {
                const node = document.createElement('div');
                node.className = 'data-node';
                
                // Posição aleatória
                const left = Math.random() * 100; // 0-100% da largura
                const top = Math.random() * 100; // 0-100% do topo
                node.style.left = `${left}%`;
                node.style.top = `${top}%`;
                
                // Atraso aleatório
                const delay = Math.random() * 15;
                node.style.animationDelay = `${delay}s`;
                
                dataFlow.appendChild(node);
            }
            
            // Adicionar pacotes de dados
            const packetCount = Math.floor(Math.random() * 5) + 8; // 8-13 pacotes
            
            for (let i = 0; i < packetCount; i++) {
                const packet = document.createElement('div');
                packet.className = 'data-packet';
                
                // Posição aleatória
                const top = Math.random() * 100; // 0-100% do topo
                packet.style.top = `${top}%`;
                
                // Velocidade aleatória
                const duration = Math.random() * 5 + 10; // 10-15s
                
                // Atraso aleatório
                const delay = Math.random() * 10;
                
                packet.style.animation = `packet-move ${duration}s linear ${delay}s infinite`;
                
                dataFlow.appendChild(packet);
            }
        });
    }
    
    // 3. Animação de Rede Neural para seção de categorias
    function createNeuralNetworkAnimation() {
        const containers = document.querySelectorAll('.neural-network-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const neuralNetwork = document.createElement('div');
            neuralNetwork.className = 'neural-network restart-animation';
            container.appendChild(neuralNetwork);
            
            // Adicionar neurônios
            const neuronCount = Math.floor(Math.random() * 10) + 20; // 20-30 neurônios
            const neurons = [];
            
            for (let i = 0; i < neuronCount; i++) {
                const neuron = document.createElement('div');
                neuron.className = 'neuron';
                
                // Posição aleatória
                const left = Math.random() * 100; // 0-100% da largura
                const top = Math.random() * 100; // 0-100% do topo
                neuron.style.left = `${left}%`;
                neuron.style.top = `${top}%`;
                
                // Atraso aleatório
                const delay = Math.random() * 15;
                neuron.style.animationDelay = `${delay}s`;
                
                neuralNetwork.appendChild(neuron);
                neurons.push({element: neuron, x: left, y: top});
            }
            
            // Adicionar conexões entre neurônios
            const connectionCount = Math.floor(Math.random() * 20) + 30; // 30-50 conexões
            
            for (let i = 0; i < connectionCount; i++) {
                // Selecionar dois neurônios aleatórios
                const neuron1 = neurons[Math.floor(Math.random() * neurons.length)];
                const neuron2 = neurons[Math.floor(Math.random() * neurons.length)];
                
                if (neuron1 !== neuron2) {
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    
                    // Posicionar na origem
                    connection.style.left = `${neuron1.x}%`;
                    connection.style.top = `${neuron1.y}%`;
                    
                    // Calcular ângulo e comprimento
                    const dx = neuron2.x - neuron1.x;
                    const dy = neuron2.y - neuron1.y;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    
                    connection.style.width = `${length}%`;
                    connection.style.transform = `rotate(${angle}deg)`;
                    
                    // Atraso aleatório
                    const delay = Math.random() * 15;
                    connection.style.animationDelay = `${delay}s`;
                    
                    neuralNetwork.appendChild(connection);
                    
                    // Adicionar pulso de ativação
                    if (Math.random() > 0.7) { // 30% de chance
                        const pulse = document.createElement('div');
                        pulse.className = 'activation-pulse';
                        
                        // Posicionar na origem
                        pulse.style.left = `${neuron1.x}%`;
                        pulse.style.top = `${neuron1.y}%`;
                        
                        // Atraso aleatório
                        const pulseDelay = Math.random() * 10;
                        pulse.style.animationDelay = `${pulseDelay}s`;
                        
                        neuralNetwork.appendChild(pulse);
                    }
                }
            }
        });
    }
    
    // 4. Animação de Matrix Digital para seção de teorias
    function createMatrixAnimation() {
        const containers = document.querySelectorAll('.matrix-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const matrix = document.createElement('div');
            matrix.className = 'matrix restart-animation';
            container.appendChild(matrix);
            
            // Adicionar colunas de código
            const columnCount = Math.floor(Math.random() * 10) + 15; // 15-25 colunas
            
            for (let i = 0; i < columnCount; i++) {
                const column = document.createElement('div');
                column.className = 'code-column';
                
                // Posição aleatória
                const left = (i / columnCount * 100) + (Math.random() * 5 - 2.5);
                column.style.left = `${left}%`;
                
                // Velocidade aleatória
                const duration = Math.random() * 5 + 10; // 10-15s
                
                // Atraso aleatório
                const delay = Math.random() * 10;
                
                column.style.animation = `code-fall ${duration}s linear ${delay}s infinite`;
                
                // Adicionar caracteres
                const charCount = Math.floor(Math.random() * 10) + 10; // 10-20 caracteres
                
                for (let j = 0; j < charCount; j++) {
                    const char = document.createElement('div');
                    char.className = 'code-char';
                    
                    // Posição vertical
                    const top = (j / charCount * 100);
                    char.style.top = `${top}%`;
                    
                    // Caractere aleatório (0 ou 1)
                    char.textContent = Math.random() > 0.5 ? '1' : '0';
                    
                    // Atraso aleatório
                    const charDelay = Math.random() * 15;
                    char.style.animationDelay = `${charDelay}s`;
                    
                    column.appendChild(char);
                }
                
                matrix.appendChild(column);
            }
            
            // Adicionar glitches
            const glitchCount = Math.floor(Math.random() * 5) + 5; // 5-10 glitches
            
            for (let i = 0; i < glitchCount; i++) {
                const glitch = document.createElement('div');
                glitch.className = 'glitch';
                
                // Posição aleatória
                const left = Math.random() * 100; // 0-100% da largura
                const top = Math.random() * 100; // 0-100% do topo
                glitch.style.left = `${left}%`;
                glitch.style.top = `${top}%`;
                
                // Tamanho aleatório
                const width = Math.random() * 50 + 10; // 10-60px
                const height = Math.random() * 5 + 2; // 2-7px
                glitch.style.width = `${width}px`;
                glitch.style.height = `${height}px`;
                
                // Atraso aleatório
                const delay = Math.random() * 15;
                glitch.style.animationDelay = `${delay}s`;
                
                matrix.appendChild(glitch);
            }
        });
    }
    
    // 5. Animação de Ondas de Conhecimento para seção sobre
    function createKnowledgeWavesAnimation() {
        const containers = document.querySelectorAll('.knowledge-waves-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const knowledgeWaves = document.createElement('div');
            knowledgeWaves.className = 'knowledge-waves restart-animation';
            container.appendChild(knowledgeWaves);
            
            // Adicionar ondas de conhecimento
            const waveCount = Math.floor(Math.random() * 5) + 5; // 5-10 ondas
            
            for (let i = 0; i < waveCount; i++) {
                const wave = document.createElement('div');
                wave.className = 'knowledge-wave';
                
                // Posição central
                const left = 50;
                const top = 50;
                wave.style.left = `${left}%`;
                wave.style.top = `${top}%`;
                
                // Atraso aleatório
                const delay = i * 1.5; // Ondas sequenciais
                wave.style.animationDelay = `${delay}s`;
                
                knowledgeWaves.appendChild(wave);
            }
            
            // Adicionar partículas de conhecimento
            const particleCount = Math.floor(Math.random() * 20) + 30; // 30-50 partículas
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'knowledge-particle';
                
                // Posição central
                const left = 50;
                const top = 50;
                particle.style.left = `${left}%`;
                particle.style.top = `${top}%`;
                
                // Movimento aleatório
                const x = (Math.random() * 200 - 100); // -100% a 100%
                const y = (Math.random() * 200 - 100); // -100% a 100%
                particle.style.setProperty('--x', `${x}%`);
                particle.style.setProperty('--y', `${y}%`);
                
                // Atraso aleatório
                const delay = Math.random() * 15;
                particle.style.animationDelay = `${delay}s`;
                
                knowledgeWaves.appendChild(particle);
            }
            
            // Adicionar conexões de conhecimento
            const connectionCount = Math.floor(Math.random() * 10) + 10; // 10-20 conexões
            
            for (let i = 0; i < connectionCount; i++) {
                const connection = document.createElement('div');
                connection.className = 'knowledge-connection';
                
                // Posição aleatória na parte inferior
                const left = Math.random() * 100; // 0-100% da largura
                connection.style.left = `${left}%`;
                connection.style.bottom = '0';
                
                // Altura aleatória
                const height = Math.random() * 100 + 50; // 50-150px
                connection.style.setProperty('--height', `${height}px`);
                
                // Atraso aleatório
                const delay = Math.random() * 15;
                connection.style.animationDelay = `${delay}s`;
                
                knowledgeWaves.appendChild(connection);
            }
        });
    }
    
    // 6. Animação de Geopolítica e Energia para nova seção
    function createGeopoliticsAnimation() {
        const containers = document.querySelectorAll('.geopolitics-animation-container');
        
        containers.forEach(container => {
            // Limpar conteúdo anterior
            container.innerHTML = '';
            
            // Criar elemento de animação
            const geopoliticsAnimation = document.createElement('div');
            geopoliticsAnimation.className = 'geopolitics-animation restart-animation';
            container.appendChild(geopoliticsAnimation);
            
            // Adicionar mapa mundial (representado por pontos)
            const worldMap = document.createElement('div');
            worldMap.className = 'world-map';
            geopoliticsAnimation.appendChild(worldMap);
            
            // Adicionar países (representados por círculos)
            const countryCount = Math.floor(Math.random() * 10) + 20; // 20-30 países
            
            for (let i = 0; i < countryCount; i++) {
                const country = document.createElement('div');
                country.className = 'country';
                
                // Posição aleatória
                const left = Math.random() * 90 + 5; // 5-95% da largura
                const top = Math.random() * 80 + 10; // 10-90% do topo
                country.style.left = `${left}%`;
                country.style.top = `${top}%`;
                
                // Tamanho aleatório (representa poder econômico)
                const size = Math.random() * 15 + 5; // 5-20px
                country.style.width = `${size}px`;
                country.style.height = `${size}px`;
                
                // Cor aleatória (representa tipo de energia)
                const colorTypes = [
                    'rgba(16, 185, 129, 0.8)', // Verde - Renovável
                    'rgba(239, 68, 68, 0.8)',  // Vermelho - Fóssil
                    'rgba(59, 130, 246, 0.8)', // Azul - Hidrelétrica
                    'rgba(245, 158, 11, 0.8)'  // Amarelo - Nuclear
                ];
                const color = colorTypes[Math.floor(Math.random() * colorTypes.length)];
                country.style.backgroundColor = color;
                
                // Pulso de energia
                country.style.animation = `country-pulse 15s infinite ${Math.random() * 15}s`;
                
                geopoliticsAnimation.appendChild(country);
            }
            
            // Adicionar conexões de energia entre países
            const connectionCount = Math.floor(Math.random() * 15) + 15; // 15-30 conexões
            
            for (let i = 0; i < connectionCount; i++) {
                const connection = document.createElement('div');
                connection.className = 'energy-connection';
                
                // Posições aleatórias para simular conexões entre países
                const x1 = Math.random() * 90 + 5;
                const y1 = Math.random() * 80 + 10;
                const x2 = Math.random() * 90 + 5;
                const y2 = Math.random() * 80 + 10;
                
                // Calcular ângulo e comprimento
                const dx = x2 - x1;
                const dy = y2 - y1;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                
                connection.style.left = `${x1}%`;
                connection.style.top = `${y1}%`;
                connection.style.width = `${length}%`;
                connection.style.transform = `rotate(${angle}deg)`;
                
                // Cor aleatória (representa tipo de recurso)
                const colorTypes = [
                    'rgba(16, 185, 129, 0.4)', // Verde - Tecnologia verde
                    'rgba(239, 68, 68, 0.4)',  // Vermelho - Petróleo
                    'rgba(59, 130, 246, 0.4)', // Azul - Dados
                    'rgba(245, 158, 11, 0.4)'  // Amarelo - Eletricidade
                ];
                const color = colorTypes[Math.floor(Math.random() * colorTypes.length)];
                connection.style.backgroundColor = color;
                
                // Animação de fluxo
                connection.style.animation = `connection-flow 15s infinite ${Math.random() * 15}s`;
                
                geopoliticsAnimation.appendChild(connection);
            }
            
            // Adicionar centros de inovação em IA
            const innovationCount = Math.floor(Math.random() * 5) + 5; // 5-10 centros
            
            for (let i = 0; i < innovationCount; i++) {
                const innovation = document.createElement('div');
                innovation.className = 'ai-innovation-center';
                
                // Posição aleatória
                const left = Math.random() * 90 + 5;
                const top = Math.random() * 80 + 10;
                innovation.style.left = `${left}%`;
                innovation.style.top = `${top}%`;
                
                // Pulso de inovação
                innovation.style.animation = `innovation-pulse 15s infinite ${Math.random() * 15}s`;
                
                geopoliticsAnimation.appendChild(innovation);
            }
        });
    }
});
