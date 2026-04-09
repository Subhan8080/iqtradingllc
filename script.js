// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Set active nav link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Match the current page with the nav link
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call the function when page loads
setActiveNavLink();

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would normally send the form data to a server
        // For now, we'll just show a success message
        alert(`Thank you, ${name}! We received your message and will get back to you soon.`);
        
        // Reset form
        this.reset();
    });
}

// Add scroll animation for elements
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

// Observe all cards and sections
document.querySelectorAll('.service-card, .product-card, .feature, .info-card, .featured-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navigation highlight on scroll (only on homepage)
const currentPageForScroll = window.location.pathname.split('/').pop() || 'index.html';

if (currentPageForScroll === 'index.html' || currentPageForScroll === '') {
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--secondary-color) !important;
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

// Our Brands slider navigation with auto-scroll
document.querySelectorAll('.brands-slider').forEach(slider => {
    const brandsTrack = slider.querySelector('.brands-track');
    const brandsPrev = slider.querySelector('.brands-nav-prev');
    const brandsNext = slider.querySelector('.brands-nav-next');

    if (brandsTrack && brandsPrev && brandsNext) {
        const scrollBrands = (direction) => {
            const firstCard = brandsTrack.querySelector('.brand-circle');
            const cardStep = firstCard ? firstCard.offsetWidth + 19 : 190;

            brandsTrack.scrollBy({
                left: direction * cardStep,
                behavior: 'smooth'
            });
            
            // Reset auto-scroll timer when manually scrolled
            clearInterval(autoScrollInterval);
            startAutoScroll();
        };

        brandsPrev.addEventListener('click', () => scrollBrands(-1));
        brandsNext.addEventListener('click', () => scrollBrands(1));

        // Auto-scroll functionality
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                const firstCard = brandsTrack.querySelector('.brand-circle');
                const cardStep = firstCard ? firstCard.offsetWidth + 19 : 190;
                
                brandsTrack.scrollBy({
                    left: cardStep,
                    behavior: 'smooth'
                });

                // Loop back to start when reaching the end
                setTimeout(() => {
                    if (brandsTrack.scrollLeft >= brandsTrack.scrollWidth - brandsTrack.clientWidth - 50) {
                        brandsTrack.scrollLeft = 0;
                    }
                }, 600);
            }, 5000);
        };

        startAutoScroll();

        // Pause auto-scroll on hover
        brandsTrack.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        brandsTrack.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }
});

// =====================================================
// PRODUCT SHOWCASE TABS FUNCTIONALITY
// =====================================================

// Tab switching for Industrial & Premium Products
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            
            // Activate corresponding tab content
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// =====================================================
// FAQ PAGE FUNCTIONALITY
// =====================================================

// Toggle FAQ items
function toggleFAQ(element) {
    const faqHeader = element;
    const faqAnswer = faqHeader.nextElementSibling;
    
    // Close other open items in the same category
    const siblingItems = faqHeader.closest('.faq-items').querySelectorAll('.faq-header');
    siblingItems.forEach(item => {
        if (item !== faqHeader) {
            item.classList.remove('active');
            item.nextElementSibling.style.display = 'none';
        }
    });
    
    // Toggle current item
    faqHeader.classList.toggle('active');
    if (faqAnswer.style.display === 'none' || !faqAnswer.style.display) {
        faqAnswer.style.display = 'block';
    } else {
        faqAnswer.style.display = 'none';
    }
}

// FAQ Search functionality
const faqSearchInput = document.querySelector('.faq-search input');
if (faqSearchInput) {
    faqSearchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item-main');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-header h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Click outside FAQ to close
document.addEventListener('click', function(event) {
    const faqHeader = event.target.closest('.faq-header');
    if (!faqHeader && event.target.closest('.faq-item-main')) {
        return;
    }
});

