/**
 * DEEPAK - Premium Entertainment Portfolio
 * Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initPreloader();
    initNavigation();
    initParticles();
    initScrollAnimations();
    initCounterAnimation();
    initTestimonialsCarousel();
    initPortfolioCarousel();
    initSmoothScroll();
    initBackToTop();
    initHoFCarousel();

});

/**
 * Preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });

    // Fallback - hide after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);
}

/**
 * Navigation
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

/**
 * Particle Animation
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';

    // Random delay and duration
    const delay = Math.random() * 6;
    const duration = 4 + Math.random() * 4;

    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';

    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    container.appendChild(particle);
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered delay for sibling elements
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                siblings.forEach((sibling, index) => {
                    if (sibling === entry.target) {
                        sibling.style.transitionDelay = `${index * 0.1}s`;
                    }
                });
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
        if (animated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });

        animated = true;
    }

    // Observe hero section for counter animation
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        }, { threshold: 0.5 });

        observer.observe(heroStats);
    }
}

/**
 * Testimonials Carousel
 */
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    const totalSlides = cards.length - cardsPerView + 1;

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot${i === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function getCardsPerView() {
        if (window.innerWidth <= 992) return 1;
        return 2;
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 30; // Including gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Handle resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        createDots();
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        updateCarousel();
    });

    // Auto-play
    let autoPlay = setInterval(nextSlide, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
        autoPlay = setInterval(nextSlide, 5000);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    createDots();
}

/**
 * Portfolio Carousel
 */
function initPortfolioCarousel() {
    const track = document.getElementById('portfolioTrack');
    const prevBtn = document.getElementById('portfolioPrev');
    const nextBtn = document.getElementById('portfolioNext');
    const dotsContainer = document.getElementById('portfolioDots');

    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.portfolio-item');
    let currentIndex = 0;

    // Calculate items per view
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1200) return 2;
        return 3;
    }

    let itemsPerView = getItemsPerView();
    const totalSlides = Math.max(0, items.length - itemsPerView + 1); // Simple linear scroll

    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const dotCount = items.length - itemsPerView + 1; // Dots for possible starting positions

        // Limit dots for large numbers of items
        const numDots = Math.min(dotCount, 5);

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = `dot${i === 0 ? ' active' : ''}`;
            // Simple mapping for demo
            dot.addEventListener('click', () => goToSlide(i * Math.floor(dotCount / numDots)));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const itemWidth = items[0].offsetWidth + 30; // Width + gap
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Update dots (approximate)
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            const dotIndex = Math.min(currentIndex, dots.length - 1);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === dotIndex);
            });
        }

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= items.length - itemsPerView ? '0.5' : '1';
    }

    function nextSlide() {
        if (currentIndex < items.length - itemsPerView) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, items.length - itemsPerView));
        updateCarousel();
    }

    // Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    window.addEventListener('resize', () => {
        itemsPerView = getItemsPerView();
        createDots();
        currentIndex = Math.min(currentIndex, Math.max(0, items.length - itemsPerView));
        updateCarousel();
    });

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }, { passive: true });

    createDots();
    updateCarousel();
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
}

/**
 * Additional Enhancements
 */

// Parallax effect for stage lights
window.addEventListener('mousemove', (e) => {
    const lights = document.querySelectorAll('.light');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    lights.forEach((light, index) => {
        const speed = (index + 1) * 0.5;
        light.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Gallery item hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.gallery-placeholder').style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.gallery-placeholder').style.transform = 'scale(1)';
    });
});

// Service card tilt effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Magnetic button effect for CTA buttons
document.querySelectorAll('.btn-primary, .btn-submit').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Text reveal animation for hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';

    setTimeout(() => {
        heroTitle.innerHTML = text;
    }, 100);
}

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
Object.assign(cursorGlow.style, {
    position: 'fixed',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '1',
    transform: 'translate(-50%, -50%)',
    transition: 'opacity 0.3s ease'
});
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Hide cursor glow on mobile
if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
}


/**
 * Hall of Fame Carousel
 */
function initHoFCarousel() {
    const track = document.getElementById('hofTrack');
    const prevBtn = document.getElementById('hofPrev');
    const nextBtn = document.getElementById('hofNext');

    if (!track || !prevBtn || !nextBtn) return;

    const slides = track.querySelectorAll('.hof-slide');
    let currentIndex = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        if (!document.hidden) {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide();
        }
    }, 5000);
}

console.log('🎭 Deepak Portfolio - Ready to rock the stage!');
