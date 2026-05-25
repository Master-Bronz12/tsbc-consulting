// ============================================
// TSBC - SCRIPT PRINCIPAL
// MENU BURGER + ANIMATIONS + FORMULAIRES
// ============================================

'use strict';

// ATTENDRE QUE LE DOM SOIT CHARGÉ
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✅ TSBC - Script chargé');
    
    // ===== MENU BURGER =====
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    if (burger && navLinks) {
        console.log('✅ Burger et navLinks trouvés');
        
        // Ouvrir/fermer le menu
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Empêcher le scroll quand menu ouvert
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('🍔 Menu ouvert');
            } else {
                document.body.style.overflow = '';
                console.log('🍔 Menu fermé');
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                console.log('🔗 Lien cliqué, menu fermé');
            });
        });
        
        // Fermer le menu si on clique à l'extérieur
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active')) {
                const isClickInside = navLinks.contains(event.target) || burger.contains(event.target);
                if (!isClickInside) {
                    burger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    console.log('🖱️ Clic extérieur, menu fermé');
                }
            }
        });
        
    } else {
        console.log('❌ Burger ou navLinks non trouvés');
        console.log('burger:', burger);
        console.log('navLinks:', navLinks);
    }
    
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
    
    // ===== LIEN ACTIF =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
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
    
    // ===== BACK TO TOP =====
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== NEWSLETTER =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert('✅ Merci pour votre inscription à la newsletter !');
                form.reset();
            } else {
                alert('❌ Veuillez entrer une adresse email valide.');
            }
        });
    });
    
    console.log('✅ TSBC - Toutes les fonctionnalités sont prêtes !');
});

