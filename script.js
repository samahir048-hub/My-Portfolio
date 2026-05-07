// Wait for the page to fully load before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // FIXED: Smooth Scrolling with Navbar Offset
    // ============================================
    
    // Get navbar height dynamically
    const navbar = document.querySelector('.navbar');
    const getNavbarHeight = () => {
        return navbar ? navbar.offsetHeight : 70;
    };
    
    // Function to scroll to element smoothly
    function scrollToElement(element) {
        if (!element) return;
        
        const navbarHeight = getNavbarHeight();
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                scrollToElement(targetElement);
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle initial page load with hash in URL
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                scrollToElement(targetElement);
            }
        }, 100);
    }

    // ============================================
    // Active navigation link highlighting
    // ============================================
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function updateActiveLink() {
        let current = '';
        const navbarHeight = getNavbarHeight();
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();

    // ============================================
    // FEATURE 1: Dark Mode Toggle
    // ============================================
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (darkModeToggle) {
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // ============================================
    // FEATURE 2: Download Resume (PDF)
    // ============================================
    
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // If you have a PDF file, put it in the same folder and uncomment below
            // const pdfUrl = 'Samahir_Usman_Resume.pdf';
            // const link = document.createElement('a');
            // link.href = pdfUrl;
            // link.download = 'Samahir_Usman_Resume.pdf';
            // link.click();
            
            // Temporary message until PDF is ready
            alert('📄 My resume is ready! Please contact me directly at samahir048@gmail.com and I will send it to you.');
        });
    }

    // ============================================
    // FEATURE 3: Contact Form
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const message = document.getElementById('userMessage').value;
            
            if (!name || !email || !message) {
                formStatus.innerHTML = '<div class="alert alert-warning">⚠️ Please fill all fields.</div>';
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 3000);
                return;
            }
            
            // Demo success message
            formStatus.innerHTML = '<div class="alert alert-success">✅ Thank you ' + name + '! I will contact you soon at ' + email + '.</div>';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }

    // ============================================
    // Console message
    // ============================================
    
    console.log("%c🚀 Samahir Usman's Portfolio | Looking for JazzCash Internship 2026", "color: #667eea; font-size: 16px; font-weight: bold;");
    console.log("%c📍 Faisalabad, Pakistan", "color: #764ba2; font-size: 12px;");

});