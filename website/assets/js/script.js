// =====================
// HAMBURGER MENU
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
    hamburger.style.animation = 'rotate 0.4s ease-in-out';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    });
});

// =====================
// SMOOTH SCROLLING
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================
// SCROLL ANIMATIONS
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .stakeholder-card, .problem-card, .step, .why-card, .phase-card, .verification-item, .payment-step, .payment-flow, .verification-info').forEach(el => {
    // Only set initial opacity/transform if the element doesn't already have animation
    if (!el.style.animation) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    }
});

// =====================
// PARALLAX SCROLLING
// =====================
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('[data-parallax]');
    elements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});

// =====================
// FLOATING ANIMATION
// =====================
document.querySelectorAll('.placeholder-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.animation = 'bounce 0.6s ease-in-out infinite';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.animation = 'float 4s ease-in-out infinite';
    });
});



// =====================
// BUTTON ANIMATIONS
// =====================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    btn.addEventListener('active', function() {
        this.style.transform = 'scale(0.95)';
    });
});

// =====================
// COUNTER ANIMATION WITH INTERSECTION OBSERVER
// =====================
function animateCounter(element, target) {
    let current = 0;
    const isDecimal = target % 1 !== 0;
    const increment = isDecimal ? target / 100 : target / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
    }, 20);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            document.querySelectorAll('.stat-card h3').forEach(stat => {
                const text = stat.textContent;
                if (text.includes('%')) {
                    animateCounter(stat, 100);
                } else if (text.includes('hrs')) {
                    stat.textContent = '24 hrs';
                } else if (text.includes('km')) {
                    stat.textContent = '30 km';
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// =====================
// NAVBAR BACKGROUND ON SCROLL
// =====================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'white';
    }
});

// =====================
// ACTIVE NAVIGATION LINK
// =====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class style in CSS if needed
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
        padding-bottom: 5px;
    }
    
    .btn-primary-large {
        padding: 15px 40px;
        font-size: 1.1rem;
    }
    
    .btn-secondary-large {
        padding: 15px 40px;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

// =====================
// LOADING ANIMATION
// =====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeInUp 0.8s ease-out';
});

// Set initial opacity
document.body.style.opacity = '0.95';

// =====================
// MOBILE MENU RESPONSIVE
// =====================
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'flex';
    }
}

window.addEventListener('resize', toggleMobileMenu);
toggleMobileMenu();

// =====================
// TEXT ANIMATION ON SCROLL
// =====================
const textObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('h2, h3').forEach(heading => {
    textObserver.observe(heading);
});

// =====================
// SECTION BACKGROUND ANIMATION
// =====================
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// =====================
// ADD RIPPLE EFFECT TO BUTTONS
// =====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// =====================
// SCROLL PROGRESS BAR
// =====================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    
    // Create or update progress bar
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B35 0%, #F7931E 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    progressBar.style.width = scrolled + '%';
});

console.log('🚀 BuildTender website loaded with enhanced animations!');

