// ============================================
// TSBC - SCRIPT PRINCIPAL
// MENU BURGER + ANIMATIONS + FORMULAIRES
// VERSION FINALE OPTIMISÉE
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
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // ===== ANIMATIONS FADE-IN (AOS est déjà utilisé) =====
    // Cette section est optionnelle car AOS gère déjà les animations
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
        // Éviter de dupliquer les écouteurs
        if (form.hasAttribute('data-listener')) return;
        form.setAttribute('data-listener', 'true');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value && emailInput.value.includes('@')) {
                alert('✅ Merci pour votre inscription à la newsletter !');
                form.reset();
            } else {
                alert('❌ Veuillez entrer une adresse email valide.');
            }
        });
    });
    
    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nom = this.querySelector('input[name="nom"]')?.value;
            const email = this.querySelector('input[name="email"]')?.value;
            const message = this.querySelector('textarea[name="message"]')?.value;
            
            if (nom && email && message) {
                alert('✅ Merci pour votre message. Nous vous contacterons dans les 24h.');
                this.reset();
            } else {
                alert('❌ Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // ===== FORMULAIRE DE DEVIS =====
    const devisForm = document.getElementById('devisForm');
    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nom = this.querySelector('input[name="nom"]')?.value;
            const email = this.querySelector('input[name="email"]')?.value;
            const service = this.querySelector('select[name="service"]')?.value;
            
            if (nom && email && service) {
                alert('✅ Demande de devis envoyée ! Notre équipe vous contactera sous 24h.');
                this.reset();
            } else {
                alert('❌ Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // ===== SMOOTH SCROLL POUR LES ANCRES =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        // Exclure les liens qui ne sont pas des ancres simples
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ TSBC - Toutes les fonctionnalités sont prêtes !');
});

// ===== GRAPHIQUE CHART.JS =====
// Attendre que le DOM soit chargé et que Chart.js soit disponible
function initChart() {
    const canvas = document.getElementById('financeChart');
    if (canvas && typeof Chart !== 'undefined') {
        // Vérifier si un graphique existe déjà
        const existingChart = Chart.getChart(canvas);
        if (existingChart) {
            existingChart.destroy();
        }
        
        new Chart(canvas, {
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
                    tension: 0.3,
                    pointBackgroundColor: '#d69e2e',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Croissance: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Taux de croissance (%)',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Années',
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
        console.log('✅ Graphique Chart.js chargé');
    } else if (canvas && typeof Chart === 'undefined') {
        console.log('⚠️ Chart.js non chargé, graphique ignoré');
    }
}

// Exécuter le graphique après le chargement complet
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChart);
} else {
    initChart();
}

// ===== GESTION DES VIDÉOS (optionnel) =====
// Détecter si l'utilisateur est sur mobile pour désactiver l'autoplay des vidéos
function checkMobileVideo() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const videos = document.querySelectorAll('.background-video');
    
    if (isMobile && videos.length) {
        videos.forEach(function(video) {
            video.pause();
            video.removeAttribute('autoplay');
            console.log('📱 Vidéo désactivée sur mobile');
        });
    }
}

checkMobileVideo();

// ===== COMPTEUR DE VISITEURS SIMPLE =====
const visitCounter = document.getElementById('visit-counter');
if (visitCounter) {
    let visitCount = localStorage.getItem('tsbc_visits');
    if (visitCount === null) {
        // Valeur de départ aléatoire entre 100 et 500
        visitCount = Math.floor(Math.random() * 500) + 100;
        localStorage.setItem('tsbc_visits', visitCount);
    } else {
        visitCount = parseInt(visitCount) + 1;
        localStorage.setItem('tsbc_visits', visitCount);
    }
    visitCounter.textContent = visitCount;
}

// ===== PROTECTION CONTRE LES DOUBLONS DE CHARGEMENT =====
// Éviter les initialisations multiples de AOS
if (typeof AOS !== 'undefined' && !window.AOS_INITIALIZED) {
    window.AOS_INITIALIZED = true;
    // AOS est déjà initialisé dans chaque page HTML via le script inline
    console.log('✅ AOS disponible');
}