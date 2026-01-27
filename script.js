/**
 * TFG Dossier - JavaScript
 * Alba Colomer
 */

// ===== Mobile Menu Toggle =====
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// ===== Language Selector =====
function changeLanguage(lang) {
    // Remove active class from all buttons and content
    const allButtons = document.querySelectorAll('.lang-btn');
    const allContent = document.querySelectorAll('.lang-content');

    allButtons.forEach(btn => btn.classList.remove('active'));
    allContent.forEach(content => content.classList.remove('active'));

    // Add active class to selected button and content
    const selectedContent = document.getElementById('lang-' + lang);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Find and activate the corresponding button
    allButtons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(getLangLabel(lang).toLowerCase())) {
            btn.classList.add('active');
        }
    });

    // Alternative: activate button by index
    const langIndex = { 'ca': 0, 'es': 1, 'en': 2 };
    if (allButtons[langIndex[lang]]) {
        allButtons[langIndex[lang]].classList.add('active');
    }
}

function getLangLabel(lang) {
    const labels = {
        'ca': 'Català',
        'es': 'Castellà',
        'en': 'English'
    };
    return labels[lang] || lang;
}

// ===== Close mobile menu when clicking outside =====
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navMenu && menuToggle) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// ===== Smooth scroll for internal links =====
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ===== Modal / Popup per a imatges =====
function openModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalFullscreen = document.getElementById('modalFullscreen');

    if (modal && modalImage && modalTitle) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalFullscreen.href = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tancar modal clicant fora del contingut
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Tancar modal amb tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
