// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Round Image Slider Function
  function initRoundSlider(sliderId, prevBtnClass, nextBtnClass, dotContainerId = null) {
    const slider = document.getElementById(sliderId);
    if (!slider) return null;
    
    const slides = slider.querySelectorAll('.round-slide');
    if (slides.length === 0) return null;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      
      if (dotContainerId) {
        const dots = document.querySelectorAll(`#${dotContainerId} .round-dot`);
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      
      currentSlide = index;
    }
    
    function nextSlide() {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    }
    
    function prevSlide() {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    }
    
    function startAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoSlide() {
      clearInterval(slideInterval);
    }
    
    const prevBtn = document.querySelector(prevBtnClass);
    const nextBtn = document.querySelector(nextBtnClass);
    
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
      });
      
      nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
      });
    }
    
    if (dotContainerId) {
      const dots = document.querySelectorAll(`#${dotContainerId} .round-dot`);
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlide(index);
          stopAutoSlide();
          startAutoSlide();
        });
      });
    }
    
    startAutoSlide();
    return { stopAutoSlide, startAutoSlide };
  }
  
  // Initialize the round slider
  initRoundSlider('heroSlider', '.round-prev', '.round-next', 'heroDots');
  
  // Counter Animation for Stats
  function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      if (isNaN(target)) return;
      
      let current = 0;
      const increment = target / 50;
      const duration = 1500;
      const stepTime = duration / 50;
      
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          stat.innerHTML = Math.floor(current);
          setTimeout(updateNumber, stepTime);
        } else {
          stat.innerHTML = target;
        }
      };
      
      updateNumber();
    });
  }
  
  // Scroll Reveal Animation
  function initScrollReveal() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // If it's a stat card, trigger counter animation
          if (entry.target.querySelector('.stat-number')) {
            animateNumbers();
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }
  
  initScrollReveal();
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
  }
  
  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('formName')?.value || '';
      const email = document.getElementById('formEmail')?.value || '';
      const message = document.getElementById('formMessage')?.value || '';
      
      if (name && email && message) {
        formStatus.innerHTML = '<span style="color: #d46b8c;">✨ Message sent successfully! I\'ll get back to you soon.</span>';
        contactForm.reset();
        
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 5000);
      } else {
        formStatus.innerHTML = '<span style="color: #ff6666;">⚠️ Please fill in all required fields.</span>';
        
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 3000);
      }
    });
  }
  
  // Progress Bar Animation on Scroll
  const progressBars = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = width;
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});