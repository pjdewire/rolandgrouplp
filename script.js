// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle navigation clicks for single-page layout
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Get target section
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    // Function to show/hide sections
    function showSection(sectionName) {
        console.log('Switching to section:', sectionName);

        // Hide all sections
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.classList.remove('active');
            console.log('Hiding section:', section.id);
        });

        // Show target section
        const targetElement = document.getElementById(sectionName + '-content');
        console.log('Target element found:', targetElement);

        if (targetElement) {
            targetElement.classList.add('active');
            console.log('Section switched to:', targetElement.id);
        } else {
            console.error('Target section not found:', sectionName + '-content');
        }
    }

    // Keep navbar background consistent (green)
    const navbar = document.querySelector('.navbar');
    navbar.style.background = 'rgba(27, 94, 32, 0.95)';

    // Handle logo click to return to home
    const logo = document.getElementById('logo-click');
    if (logo) {
        logo.addEventListener('click', function() {
            showSection('home');
        });
    } else {
        console.error('Logo element not found');
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your message. We will get back to you soon!', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    }


    // Team accordion functionality - simplified
    document.addEventListener('click', function(e) {
        const accordionHeader = e.target.closest('.accordion-header');
        if (accordionHeader) {
            e.preventDefault();

            const targetId = accordionHeader.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const accordionItem = accordionHeader.closest('.accordion-item');

            if (targetContent && accordionItem) {
                const isCurrentlyOpen = accordionItem.classList.contains('open');

                // Close all accordion items
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('open');
                });
                document.querySelectorAll('.accordion-content').forEach(content => {
                    content.classList.remove('open');
                });

                // If this one wasn't open, open it
                if (!isCurrentlyOpen) {
                    accordionItem.classList.add('open');
                    targetContent.classList.add('open');
                }
            }
        }
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show notifications
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        transform: translateX(100%);
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Helper function to animate counters
function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        current += increment;
        step++;
        element.textContent = Math.floor(current) + suffix;
        
        if (step >= steps) {
            element.textContent = text;
            clearInterval(timer);
        }
    }, duration / steps);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Initial body styles for loading animation
document.body.style.cssText += `
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
`;