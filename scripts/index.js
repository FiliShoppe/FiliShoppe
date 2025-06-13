// ===== MENU MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

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

    // Fechar menu ao clicar em um link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('active');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
}

});
// ===== SLIDER DE IMAGENS =====
class ImageSlider {
    constructor() {
        this.slides = document.querySelector('.slides');
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.autoSlideInterval = null;
        this.isAnimating = false;
    this.init();
}

init() {
    if (this.slides) {
        this.startAutoSlide();
        this.addEventListeners();
    }
}

startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
}

stopAutoSlide() {
    if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
    }
}

nextSlide() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();

    setTimeout(() => {
            this.isAnimating = false;
        }, 500);
}

prevSlide() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
    this.updateSlidePosition();

    setTimeout(() => {
        this.isAnimating = false;
    }, 500);
}

updateSlidePosition() {
    const translateX = -this.currentSlide * (100 / this.totalSlides);
    this.slides.style.transform = `translateX(${translateX}%)`;
}

addEventListeners() {
    // Pausar auto-slide ao passar o mouse
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
                    this.stopAutoSlide();
                });
        
                sliderContainer.addEventListener('mouseleave', () => {
                    this.startAutoSlide();
                });
    }
}

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

    videos.forEach(video => {
            // Configurações padrão
            video.controls = true;
            video.preload = 'metadata';
            video.volume = 0.5;
    
            // Play/pause ao clicar
            video.addEventListener('click', (e) => {
                e.preventDefault();
                if (video.paused) {
                    this.pauseAllVideos();
                    video.play();
                } else {
                    video.pause();
                }
            });
    
            // Efeitos visuais
            const videoItem = video.closest('.video-item');
    
            video.addEventListener('play', () => {
                videoItem.style.border = '3px solid #c8b6a6';
            });
    
            video.addEventListener('pause', () => {
                videoItem.style.border = 'none';
            });
    
            video.addEventListener('ended', () => {
                videoItem.style.border = 'none';
            });
        });
}

pauseAllVideos() {
    const videos = document.querySelectorAll('.video-item video');
    videos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
}

observeVideos() {
    const videoItems = document.querySelectorAll('.video-item');
    const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    // Pausar vídeo quando sair da tela
                    const video = entry.target.querySelector('video');
                    if (video && !video.paused) {
                        video.pause();
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
// ===== BANNER PARALLAX =====
class BannerParallax {
    constructor() {
        this.banner = document.querySelector('.banner-image');
        this.init();
    }
init() {
    if (this.banner) {
        window.addEventListener('scroll', () => {
                    this.updateParallax();
                });
    }
}

updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    this.banner.style.transform = `translateY(${parallax}px)`;
}

}
// ===== UTILITÁRIOS =====
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
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
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    new ImageSlider();
    new ProductCardAnimations();
    new VideoControls();
    new SmoothScroll();
    new LoadingAnimation();
    new BannerParallax();
    // Otimizar scroll events
    const optimizedScroll = Utils.throttle(() => {
        // Adicionar efeitos de scroll aqui se necessário
    }, 16);

    window.addEventListener('scroll', optimizedScroll);

    // Console log para debug
    console.log('🎨 FiliShoppe - Todas as funcionalidades carregadas!');
});
// ===== PERFORMANCE OPTIMIZATION =====
// Preload de recursos críticos
const preloadResources = () => {
    const criticalResources = [
        'https://images.pexels.com/photos/3737640/pexels-photo-3737640.jpeg'
    ];
criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    document.head.appendChild(link);
});

};
// Executar preload
preloadResources();
// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.warn('Erro capturado:', e.error);
});
// ===== ACCESSIBILITY =====
// Melhorar navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Fechar menu mobile se estiver aberto
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    // Pausar todos os vídeos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
}

});