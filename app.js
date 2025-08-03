// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeWebsite();
});

// DOM elements
let navToggle, navMenu, navLinks, header;

function initializeWebsite() {
    // Get DOM elements
    navToggle = document.getElementById('nav-toggle');
    navMenu = document.getElementById('nav-menu');
    navLinks = document.querySelectorAll('.nav__link');
    header = document.getElementById('header');

    // Initialize all functionality
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupContactHandlers();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.6s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    console.log('Portfolio website loaded successfully!');
}

// Navigation functionality
function setupNavigation() {
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    
    // Toggle between menu and close icons
    if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    // Recreate icons to apply the change
    lucide.createIcons();
}

function handleNavClick(e) {
    e.preventDefault();
    
    // Close mobile menu if open
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
    
    // Get target section
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll effects
function setupScrollEffects() {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
        updateActiveNavLink();
    }, 100));
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + (header ? header.offsetHeight : 80) + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Animation setup
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.card, .skill__item, .contact__item, .hero__content'
    );
    
    animateElements.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
    
    // Add loaded class with delay for staggered animation
    setTimeout(() => {
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('loaded');
            }, index * 100);
        });
    }, 300);
}

// Contact handlers
function setupContactHandlers() {
    // Phone link click tracking
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            showNotification('Opening phone dialer...', 'info');
        });
    }
    
    // Email link click tracking
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            showNotification('Opening email client...', 'info');
        });
    }

    // Contact Me button in hero section
    const contactBtn = document.querySelector('a[href="#contact"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', handleNavClick);
    }
}

// CV Download function
function downloadCV() {
    try {
        // Create a comprehensive CV content
        const cvContent = `BHANU MITRA BHARTI
Chief Sales Manager

CONTACT INFORMATION
Phone: 7004389470
Email: bhanumitrabharti@gmail.com
Address: SVM, Shiv Mandir Road, Chandrapura, Bokaro, JH, 828403

PROFESSIONAL SUMMARY
Dedicated professional committed to collaborative growth. Eager to leverage my skills and continuously learn to contribute to both organizational success and personal development.

PROFESSIONAL EXPERIENCE

Chief Sales Manager | ICICI Securities "Acquisition" | OCT 2022 – Present
• Manage Sales and Service, including lead Conversion, Customer inquiries resulting in increase sales and customer satisfaction
• Managing associates who is based in different locations within Jharkhand
• Conducted training sessions to enhance product knowledge and promote effective sales techniques
• Conducted regular visits to multiple ICICI Bank branches to develop and maintain business relationships

Assistant Manager | Kotak Securities "Equity Dealer" | April 2022 – September 2022
• Executed trade order on behalf of customers in a accurate manner using trading terminals, ensuring compliance with regulatory requirements and providing efficient customer service
• Generated leads for demat accounts and insurance through cold calling and customer visit
• Generated brokerage revenue through mapped clients through providing company equity trading calls

Sales Executive | Sharekhan | Nov 2021 – April 2022
• Open Market sales

EDUCATION
Bachelor of Computer Application | C.V. Raman University | 2016 – 2019

CERTIFICATIONS
• NISM Series V 'A' Mutual Fund Distributors (April 2025 - 2028)
• NISM Series VIII Equity Derivatives (OCT 2022 - 2024)

SKILLS
• Sales and Marketing
• Leadership
• Financial Sector
• Stock Trading
• Technical Analysis

LANGUAGES
• Hindi
• English
`;

        // Create and download the file
        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Bhanu_Mitra_Bharti_CV.txt';
        link.style.display = 'none';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Show download confirmation
        showNotification('CV downloaded successfully!', 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i data-lucide="${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification if not already present
    if (!document.querySelector('#notification-styles')) {
        addNotificationStyles();
    }
    
    document.body.appendChild(notification);
    
    // Recreate icons for the notification
    lucide.createIcons();
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'x-circle';
        case 'warning': return 'alert-triangle';
        default: return 'info';
    }
}

function addNotificationStyles() {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: var(--space-16);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform var(--duration-normal) var(--ease-standard);
            max-width: 300px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: var(--space-8);
            color: var(--color-text);
            font-weight: var(--font-weight-medium);
            font-size: var(--font-size-sm);
        }
        
        .notification--success .notification__content i {
            color: var(--color-success);
        }
        
        .notification--error .notification__content i {
            color: var(--color-error);
        }
        
        .notification--warning .notification__content i {
            color: var(--color-warning);
        }
        
        .notification--info .notification__content i {
            color: var(--color-info);
        }
        
        @media (max-width: 480px) {
            .notification {
                right: 10px;
                left: 10px;
                max-width: none;
                transform: translateY(-100%);
            }
            
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        }
    }
});

// Handle form submissions if any forms are added later
function handleFormSubmit(event) {
    event.preventDefault();
    showNotification('Message sent successfully!', 'success');
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Make downloadCV function globally available
window.downloadCV = downloadCV;