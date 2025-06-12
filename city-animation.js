// Código JavaScript para criar e controlar as animações de cidades futurísticas
document.addEventListener('DOMContentLoaded', function() {
    // Função para criar a animação da cidade futurística
    function createCityAnimation() {
        const cityContainers = document.querySelectorAll('.city-animation-container');
        
        cityContainers.forEach(container => {
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
    
    // Criar animação inicial
    createCityAnimation();
    
    // Recriar animação a cada 15 segundos
    setInterval(createCityAnimation, 15000);
});
