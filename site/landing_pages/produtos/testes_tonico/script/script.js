document.addEventListener('DOMContentLoaded', function() {
// Função para scroll suave nos links internos
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para accordion das fichas técnicas
function initAccordion() {
    const fichaButtons = document.querySelectorAll('.ficha');

    fichaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const panel = this.nextElementSibling;

            // Fecha todos os outros painéis
            fichaButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherButton.nextElementSibling.style.maxHeight = null;
                    otherButton.classList.remove('active');
                }
            });

            // Toggle do painel atual
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
                this.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
                this.classList.add('active');
            }
        });
    });
}

// Função para animação de entrada dos elementos
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.produto1, .produto2, .produto3, .produto4, .avaliacoes');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Função para tracking de cliques nos botões de compra
function initPurchaseTracking() {
    const purchaseButtons = document.querySelectorAll('.btn-compra');

    purchaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Analytics tracking (se disponível)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'purchase_button'
                });
            }

            // Console log para debug
            console.log('Botão de compra clicado');
        });
    });
}

// Função para lazy loading de imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Função para destacar benefícios em tempo real
function initBenefitsHighlight() {
    const benefitsList = document.querySelectorAll('.painel ul li');

    benefitsList.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Função para contador de visitantes (simulado)
function initVisitorCounter() {
    const counterElement = document.querySelector('.visitor-counter');
    if (counterElement) {
        let count = localStorage.getItem('visitorCount') || 1247;
        count = parseInt(count) + Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('visitorCount', count);
        counterElement.textContent = `${count} pessoas visualizaram este produto hoje`;
    }
}

// Função para otimizar performance em dispositivos móveis
function initMobileOptimizations() {
    // Detectar dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Reduzir animações em dispositivos móveis
        document.body.classList.add('mobile-device');

        // Otimizar scroll em dispositivos touch
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
}

// Função para preloader (se necessário)
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Função para navegação sticky do header (se aplicável)
function initStickyNavigation() {
    const header = document.querySelector('.big-header');
    if (header) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            if (currentScrollY >= 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    }
}

// Inicializar todas as funções
initSmoothScroll();
initAccordion();
initScrollAnimations();
initPurchaseTracking();
initLazyLoading();
initBenefitsHighlight();
initVisitorCounter();
initMobileOptimizations();
initPreloader();
initStickyNavigation();
initFormValidation();

// Log de inicialização
console.log('Landing Page Tônico Antiacne Sallve - Scripts carregados com sucesso!');

});
// Função para adicionar aos favoritos
function addToFavorites() {
    if (typeof(Storage) !== "undefined") {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const product = {
            name: 'Tônico Antiacne Sallve',
            url: window.location.href,
            timestamp: new Date().toISOString()
        };
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert('Produto adicionado aos favoritos!');
    }
}
// Event listeners adicionais para interações específicas
document.addEventListener('keydown', function(e) {
    // Atalho para ir direto à compra (Ctrl + B)
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        const purchaseButton = document.querySelector('.btn-compra');
        if (purchaseButton) {
            purchaseButton.click();
        }
    }
});
// Monitoramento de performance (opcional)
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
                // Corrigido: uso correto de template string
                console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
            }
        }
    });
    perfObserver.observe({ entryTypes: ['measure'] });
}
function toggleFaq(clickedBtn) {

    // Alterna a resposta clicada
    clickedBtn.classList.toggle("active");
    var clickedAnswer = clickedBtn.nextElementSibling;
    if (clickedAnswer.style.display === "block") {
        clickedAnswer.style.display = "none";
    } else {
        clickedAnswer.style.display = "block";
    }
}
document.getElementById('showClinicalTestBtn').onclick = function() {
    document.getElementById('clinicalTestModal').style.display = "block";
    document.body.style.overflow = 'hidden';
};
document.getElementById('closeModalBtn').onclick = function() {
    document.getElementById('clinicalTestModal').style.display = "none";
    document.body.style.overflow = '';
};
window.onclick = function(event) {
    const modal = document.getElementById('clinicalTestModal');
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }
};