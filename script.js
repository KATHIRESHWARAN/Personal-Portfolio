document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Terminal text animation
    const terminalTexts = [
        "> Welcome to my portfolio...",
        "> Hello World!",
        "> Let's build the future...",
        "> Full Stack Developer...",
        "> AI & Data Science Enthusiast..."
    ];
    
    const terminalElement = document.querySelector('.terminal-text');
    let currentIndex = 0;
    
    function typeNextText() {
        const text = terminalTexts[currentIndex];
        let i = 0;
        
        terminalElement.textContent = '';
        terminalElement.style.animation = 'none';
        void terminalElement.offsetWidth; // Trigger reflow
        terminalElement.style.animation = null;
        
        function type() {
            if (i < text.length) {
                terminalElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (terminalElement.textContent.length > 0) {
                terminalElement.textContent = terminalElement.textContent.slice(0, -1);
                setTimeout(erase, 50);
            } else {
                currentIndex = (currentIndex + 1) % terminalTexts.length;
                setTimeout(typeNextText, 500);
            }
        }
        
        type();
    }
    
    // Start the animation
    setTimeout(typeNextText, 1000);
    
    // Animate skill progress bars
    function animateSkills() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width;
        });
    }
    
    // Add scroll animation to elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .project-card, .timeline-content, .coding-profile-card, .skill-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Animate skills when skills section is in view
                if (element.classList.contains('skill-item')) {
                    animateSkills();
                }
            }
        });
    };
    
    // Initialize elements with hidden state
    const animatedElements = document.querySelectorAll('.about-content, .project-card, .timeline-content, .coding-profile-card, .skill-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize skill progress bars with 0 width
    const skillProgresses = document.querySelectorAll('.skill-progress');
    skillProgresses.forEach(progress => {
        progress.style.width = '0';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Add glow effect to coding profile cards
    const profileCards = document.querySelectorAll('.coding-profile-card');
    profileCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px var(--primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 247, 255, 0.2)';
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Add theme toggle functionality (optional)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '100';
    themeToggle.style.background = 'rgba(0, 247, 255, 0.1)';
    themeToggle.style.border = '1px solid var(--primary)';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.color = 'var(--primary)';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.fontSize = '1.2rem';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            document.documentElement.style.setProperty('--dark', '#f0f0f0');
            document.documentElement.style.setProperty('--light', '#0a0a14');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.documentElement.style.setProperty('--dark', '#0a0a14');
            document.documentElement.style.setProperty('--light', '#f0f0f0');
        }
    });
});