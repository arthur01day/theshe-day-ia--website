document.addEventListener('DOMContentLoaded', function() {
    // Filtrar notícias por categoria
    const categoryTags = document.querySelectorAll('.category-tag');
    const newsCards = document.querySelectorAll('.news-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Remover classe ativa de todas as tags
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe ativa à tag clicada
            this.classList.add('active');
            
            // Filtrar notícias
            if (category) {
                newsCards.forEach(card => {
                    const cardCategories = card.querySelector('.news-categories');
                    
                    if (cardCategories) {
                        const hasCategory = Array.from(cardCategories.querySelectorAll('.category-tag'))
                            .some(tag => tag.getAttribute('data-category') === category);
                        
                        if (hasCategory) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            } else {
                // Mostrar todas as notícias
                newsCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        });
    });
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação para cards de notícias
    const animateOnScroll = () => {
        const cards = document.querySelectorAll('.news-card, .theory-card');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.classList.add('animate');
            }
        });
    };
    
    // Adicionar classe CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .news-card, .theory-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s, transform 0.5s;
        }
        
        .news-card.animate, .theory-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Adicionar data atual
    const updateDateElement = document.querySelector('.update-date');
    if (updateDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date().toLocaleDateString('pt-BR', options);
        updateDateElement.textContent = `Atualizado em: ${currentDate}`;
    }
});
