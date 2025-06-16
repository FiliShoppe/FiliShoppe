// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    // Evitar execução duplicada verificando se o script já foi inicializado
    if (window.menuInitialized) return;
    window.menuInitialized = true;
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');
    
    // Criar overlay elemento uma única vez
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    if (menuToggle && navLinks) {
        // Handler de clique para o botão do menu
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Animação do hamburguer para X
            bars.forEach((bar, index) => {
                if (navLinks.classList.contains('active')) {
                    if (index === 0) {
                        bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    } else if (index === 1) {
                        bar.style.opacity = '0';
                    } else if (index === 2) {
                        bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    }
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // Fechar o menu quando clicar no overlay
        overlay.addEventListener('click', function() {
            closeMenu();
        });
        
        // Fechar menu ao clicar em um link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && 
                !navLinks.contains(event.target) && 
                !event.target.classList.contains('menu-overlay')) {
                closeMenu();
            }
        });
        
        // Função para fechar o menu
        function closeMenu() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
        
        // Melhorar navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });
    }
    
    // ===== ANIMAÇÕES DOS CARDS DE PRODUTOS =====
    class ProductCardAnimations {
        constructor() {
            this.init();
        }
        
        init() {
            this.observeCards();
            this.addHoverEffects();
        }
        
        observeCards() {
            const cards = document.querySelectorAll('.product-card');
            if (cards.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        }
        
        addHoverEffects() {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
    }
    
    // ===== CONTROLES DE VÍDEO =====
    class VideoControls {
        constructor() {
            this.init();
        }
        
        init() {
            this.setupVideoControls();
            this.observeVideos();
        }
        
        setupVideoControls() {
            const videos = document.querySelectorAll('.video-item video');
            if (videos.length === 0) return;
            
            videos.forEach(video => {
                // Configurações padrão
                video.controls = false;
                video.muted = true;
                video.loop = true;
                video.autoplay = true;
                video.playsInline = true;
                video.preload = 'auto';
                video.volume = 0;
                
                // Reprodução automática ao entrar na tela
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error('Erro ao reproduzir o vídeo:', error);
                    });
                }
                
                // Remover cliques e interação
                video.style.pointerEvents = 'none';
            });
        }
        
        observeVideos() {
            const videoItems = document.querySelectorAll('.video-item');
            if (videoItems.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const video = entry.target.querySelector('video');
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Reproduzir novamente se estiver pausado
                        if (video && video.paused) {
                            video.play().catch(err => {
                                console.error('Erro ao reproduzir vídeo em viewport:', err);
                            });
                        }
                    }
                });
            }, { threshold: 0.2 });
            
            videoItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                observer.observe(item);
            });
        }
    }
    
    // ===== SMOOTH SCROLL =====
    class SmoothScroll {
        constructor() {
            this.init();
        }
        
        init() {
            // Scroll suave para links internos
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
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
    }
    
    // ===== LOADING ANIMATION =====
    class LoadingAnimation {
        constructor() {
            this.init();
        }
        
        init() {
            // Fade in da página
            document.body.style.opacity = '0';
            window.addEventListener('load', () => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            });
            
            // Lazy loading para imagens
            this.setupLazyLoading();
        }
        
        setupLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            if (images.length === 0) return;
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // ===== UTILITÁRIOS =====
    class Utils {
        static throttle(func, limit) {
            let inThrottle = false;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    }
    
    // ===== INICIALIZAÇÃO =====
    // Inicializar todas as funcionalidades
    try {
        new ProductCardAnimations();
        new VideoControls();
        new SmoothScroll();
        new LoadingAnimation();
        
        // Otimizar scroll events
        const optimizedScroll = Utils.throttle(() => {
            // Adicionar efeitos de scroll aqui se necessário
        }, 16);
        
        window.addEventListener('scroll', optimizedScroll);
        console.log('🎨 FiliShoppe - Todas as funcionalidades carregadas!');
    } catch (error) {
        console.error('Erro ao inicializar funcionalidades:', error);
    }
});
// Fim do script.js
// ===== FIM DO SCRIPT =====
