// ============================================
// TSBC - SCRIPT PRINCIPAL
// Menu burger + animations + formulaires
// ============================================

'use strict';

// ATTENDRE QUE LE DOM SOIT CHARGÉ
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU BURGER (UNIVERSEL) =====
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Empêcher le scroll quand menu ouvert
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== FERMER LE MENU SI ON CLIQUE À L'EXTÉRIEUR =====
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInside = navLinks.contains(event.target) || burger.contains(event.target);
            if (!isClickInside) {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== LIEN ACTIF DANS LA NAVIGATION =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===== CHART.JS (si présent) =====
    const chartCanvas = document.getElementById('financeChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Croissance accompagnée (%)',
                    data: [5, 7, 12, 18, 25, 32, 42],
                    borderColor: '#d69e2e',
                    backgroundColor: 'rgba(214, 158, 46, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // ===== NEWSLETTER =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('Merci pour votre inscription !');
                form.reset();
            }
        });
    });
    
    // ===== BACK TO TOP =====
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== ANIMATIONS FADE-IN =====
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    }
    
    console.log('✅ TSBC - Site chargé avec succès !');
});




// ===== GESTION VIDÉO POUR MOBILE =====
function handleMobileVideo() {
    const video = document.querySelector('.background-video');
    const heroSection = document.querySelector('.hero-video');
    
    if (window.innerWidth <= 768) {
        if (video) {
            video.pause();
            video.style.display = 'none';
        }
        if (heroSection) {
            heroSection.style.background = 'linear-gradient(135deg, #1a365d, #0f2b4f)';
        }
    } else {
        if (video) {
            video.style.display = 'block';
            video.play().catch(function(e) {
                console.log('Autoplay bloqué:', e);
            });
        }
    }
}

// Exécuter au chargement
handleMobileVideo();

// Exécuter au redimensionnement
window.addEventListener('resize', handleMobileVideo);




// ===== FORCER LA LECTURE VIDÉO SUR MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.background-video');
    
    if (video) {
        // S'assurer que la vidéo se lance sur mobile
        const playVideo = function() {
            video.play().catch(function(e) {
                console.log('Vidéo en attente d\'interaction...');
                // Déclencher après le premier tap
                document.body.addEventListener('touchstart', function() {
                    video.play();
                }, { once: true });
            });
        };
        
        // Attendre un peu puis lancer
        setTimeout(playVideo, 100);
        
        // Gérer la visibilité de la page (quand on revient)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && video.paused) {
                video.play();
            }
        });
    }
});



