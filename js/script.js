'use strict';

// ============================================
// TSBC - THE SOCIETY FOR BUSINESS CREATIVITY
// SCRIPT PROFESSIONNEL
// Version: 2.0
// ============================================

// ===== ATTENDRE QUE LE DOM SOIT CHARGÉ =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
    
    // ===== MENU BURGER (MOBILE) =====
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fermer le menu au clic sur un lien
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== LIEN ACTIF DANS LA NAVIGATION =====
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navAnchors = document.querySelectorAll('.nav-links a');
    
    navAnchors.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
    
    // ===== GRAPHIQUE CHART.JS (SECTION À PROPOS) =====
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
                    pointRadius: 4,
                    pointBackgroundColor: '#d69e2e',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1a365d',
                        titleColor: '#ffffff',
                        bodyColor: '#e2e8f0',
                        borderColor: '#d69e2e',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0'
                        },
                        title: {
                            display: true,
                            text: 'Taux de croissance (%)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Années'
                        }
                    }
                }
            }
        });
    }
    
    // ===== SYSTÈME DE NOTIFICATION TOAST =====
    function showNotification(message, type = 'success') {
        // Supprimer les notifications existantes
        const existingToasts = document.querySelectorAll('.toast-notification');
        existingToasts.forEach(toast => toast.remove());
        
        // Créer la notification
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        // Icône selon le type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i> ';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i> ';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i> ';
                break;
            default:
                icon = '';
        }
        
        toast.innerHTML = icon + message;
        
        // Styles de la notification
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 14px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Inter', sans-serif;
        `;
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Disparition automatique
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
    
    // ===== NEWSLETTER =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput?.value.trim();
            const submitBtn = form.querySelector('button');
            
            if (!email) {
                showNotification('Veuillez entrer une adresse email', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            // Simuler l'envoi (à remplacer par appel API réel)
            const originalText = submitBtn?.textContent;
            if (submitBtn) {
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
            }
            
            setTimeout(() => {
                showNotification(`✅ Merci pour votre inscription ! Un email de confirmation a été envoyé à ${email}`, 'success');
                form.reset();
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    });
    
    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[placeholder="Nom complet"]')?.value;
            const email = contactForm.querySelector('input[placeholder="Email"]')?.value;
            const message = contactForm.querySelector('textarea')?.value;
            
            if (!name || !email || !message) {
                showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            showNotification('📨 Message envoyé avec succès ! Notre équipe vous répondra sous 24h.', 'success');
            contactForm.reset();
        });
    }
    
    // ===== DEMANDE DE DEVIS =====
    const devisForm = document.getElementById('devisForm');
    if (devisForm) {
        devisForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nom = devisForm.querySelector('input[placeholder*="Nom"]')?.value;
            const email = devisForm.querySelector('input[type="email"]')?.value;
            
            if (!nom || !email) {
                showNotification('Veuillez remplir les champs obligatoires', 'error');
                return;
            }
            
            showNotification('✅ Demande de devis reçue ! Un consultant vous contactera sous 24h.', 'success');
            devisForm.reset();
        });
    }
    
    // ===== RETOUR EN HAUT =====
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
        });
    }
    
    // ===== ANIMATION AU SCROLL (FADE-IN) =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(el => {
            el.classList.add('fade-in');
            fadeObserver.observe(el);
        });
    }
    
    // ===== SMOOTH SCROLL POUR LES ANCRES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                if (navLinks?.classList.contains('active')) {
                    burger?.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ===== LIENS "EN SAVOIR PLUS" EXPERTISE =====
    const expertiseLinks = document.querySelectorAll('.expertise-box a');
    const expertisePages = {
        0: 'gouvernance.html',
        1: 'finance.html', 
        2: 'strategie.html',
        3: 'developpement.html'
    };
    
    expertiseLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        if (href === '#' || href === '') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (expertisePages[index]) {
                    window.location.href = expertisePages[index];
                } else {
                    showNotification('Cette page sera bientôt disponible', 'info');
                }
            });
        }
    });
    
    // ===== BOUTON "VOIR TOUS LES ARTICLES" =====
    const blogButton = document.querySelector('.blog-section .btn-outline-dark, .blog-section button');
    if (blogButton) {
        blogButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'blog.html';
        });
    }
    
    // ===== CHIFFRES ANIMÉS (Compteur) =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateNumber = (element, target) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        };
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const rawText = element.textContent;
                    let target = parseInt(rawText);
                    
                    if (!isNaN(target)) {
                        if (rawText.includes('+')) {
                            element.textContent = '0+';
                            setTimeout(() => animateNumber(element, target), 100);
                        } else {
                            element.textContent = '0';
                            setTimeout(() => animateNumber(element, target), 100);
                        }
                    }
                    statsObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }
    
    // ===== GESTION DES VIDÉOS (autoplay sur mobile) =====
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            videos.forEach(other => {
                if (other !== video && !other.paused) {
                    other.pause();
                }
            });
        });
    });
    
    // ===== DÉTECTION DU MODE SOMBRE (optionnel) =====
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode-prefers');
    }
    
    // ===== CONSOLE FRIENDLY (pour le dev) =====
    console.log('✅ TSBC - Site chargé avec succès !');
});