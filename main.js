/**
 * ===============================================
 * GROWBIZ WEB SOLUTIONS - MAIN JAVASCRIPT FILE
 * ===============================================
 * Completely reorganized for maximum performance
 * All functionality preserved - zero design impact
 * ===============================================
 */

// ========================================
// TABLE OF CONTENTS
// ========================================
// 1. Global Variables & Configuration
// 2. Utility Functions & Performance Helpers
// 3. Navigation & Menu System
// 4. UI Interactions & Animations
// 5. Theme & Visual Effects
// 6. Form Handling & Calculations
// 7. AI Chat & SVG Animations
// 8. Third-party Integrations
// 9. Initialization & Event Listeners
// ========================================

// ========================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ========================================

// AI Chat responses configuration
const AI_RESPONSES = {
  'how much does a website cost': "Our website packages start from ₹7,999 for a complete business website including hosting, SEO, and mobile responsiveness. Premium packages with e-commerce range from ₹12,999 to ₹25,999. Would you like a detailed quote for your specific needs?",
  'website cost': "Website costs vary by features: Basic Business Website (₹7,999), Premium with E-commerce (₹12,999-₹25,999). All include hosting, mobile optimization, and SEO. What type of business do you have?",
  'how long does it take': "We deliver most websites in 5-7 business days! Complex e-commerce sites may take 10-14 days. We provide daily updates and involve you in every step. Need it faster? We offer express delivery options.",
  'timeline': "Standard delivery: 5-7 days. E-commerce sites: 10-14 days. We work efficiently while maintaining quality. Rush jobs available for urgent requirements.",
  'do you provide seo': "Yes! SEO is included in all our packages. We optimize for local Nagpur searches, Google My Business setup, keyword optimization, and ongoing SEO support. Most clients see improved rankings within 2-3 months.",
  'seo services': "We provide complete SEO: keyword research, on-page optimization, local SEO for Nagpur businesses, Google My Business setup, content optimization, and monthly reports. SEO is included in all website packages!",
  'support': "We provide 24/7 support including technical help, content updates, security monitoring, and ongoing maintenance. Our support team is always available via WhatsApp, phone, or email.",
  'digital marketing': "Our digital marketing includes Google Ads, Facebook/Instagram marketing, local SEO, review management, content creation, and social media management. We create targeted campaigns for Nagpur businesses.",
  'payment': "We offer flexible payment options: 50% advance, 50% on completion. EMI options available for larger projects. Multiple payment methods accepted including UPI, bank transfer, and cards.",
  'portfolio': "We've successfully delivered 200+ projects including tuition centers, salons, restaurants, retail stores, and professional services in Nagpur. Would you like to see examples from your industry?",
  'hosting': "All our packages include 1 year free hosting, SSL certificate, daily backups, and 99.9% uptime guarantee. Hosting renewal is very affordable at just ₹3,999/year.",
  'maintenance': "Website maintenance includes security updates, content changes, performance optimization, backup management, and technical support. It's included free for the first year!"
};

// Navigation configuration
const NAVIGATION_CONFIG = {
  sectionIds: ['home', 'clientreview', 'services', 'about', 'growbiz-ai-assistant'],
  mobileBreakpoint: 575.98
};

// Performance optimization variables
let animationFrame;
let scrollTicking = false;
let animationInterval;
let resizeTicking = false;

// Cached DOM elements for performance
const CACHE = {
  elements: new Map(),
  collections: new Map()
};

// ========================================
// 2. UTILITY FUNCTIONS & PERFORMANCE HELPERS
// ========================================

/**
 * Cached DOM element getter for performance
 */
function getElement(id) {
  if (!CACHE.elements.has(id)) {
    CACHE.elements.set(id, document.getElementById(id));
  }
  return CACHE.elements.get(id);
}

/**
 * Cached DOM collection getter for performance
 */
function getElements(selector) {
  if (!CACHE.collections.has(selector)) {
    CACHE.collections.set(selector, document.querySelectorAll(selector));
  }
  return CACHE.collections.get(selector);
}

/**
 * Performance-optimized debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Optimized animation frame request
 */
function requestTick(callback, flag) {
  if (!flag) {
    requestAnimationFrame(() => {
      callback();
      if (flag === scrollTicking) scrollTicking = false;
      if (flag === resizeTicking) resizeTicking = false;
    });
    return true;
  }
  return false;
}

/**
 * Dropdown visibility helper - consolidated for performance
 */
function toggleDropdownVisibility(menu, isOpen) {
  const classes = isOpen 
    ? { add: ['opacity-100', 'pointer-events-auto', 'scale-100'], remove: ['opacity-0', 'pointer-events-none', 'scale-95'] }
    : { add: ['opacity-0', 'pointer-events-none', 'scale-95'], remove: ['opacity-100', 'pointer-events-auto', 'scale-100'] };
  
  menu.classList.add(...classes.add);
  menu.classList.remove(...classes.remove);
}

// ========================================
// 3. NAVIGATION & MENU SYSTEM
// ========================================

/**
 * Consolidated navigation initialization
 */
function initNavigationSystem() {
  // Blog Dropdown
  const blogDropdownBtn = getElement('blogDropdownBtn');
  const blogDropdownMenu = getElement('blogDropdownMenu');
  const closeBlogDropdownBtn = getElement('closeBlogDropdownBtn');
  let dropdownOpen = false;

  if (blogDropdownBtn && blogDropdownMenu && closeBlogDropdownBtn) {
    const toggleBlogDropdown = (e) => {
      e.stopPropagation();
      dropdownOpen = !dropdownOpen;
      toggleDropdownVisibility(blogDropdownMenu, dropdownOpen);
    };

    const closeBlogDropdown = (e) => {
      e.stopPropagation();
      dropdownOpen = false;
      toggleDropdownVisibility(blogDropdownMenu, false);
    };

    blogDropdownBtn.addEventListener('click', toggleBlogDropdown);
    closeBlogDropdownBtn.addEventListener('click', closeBlogDropdown);
  }

  // Mobile Menu
  const mobileMenuBtn = getElement('mobileMenuBtn');
  const mobileDrawer = getElement('mobileDrawer');
  const closeDrawerBtn = getElement('closeDrawerBtn');

  if (mobileMenuBtn && mobileDrawer) {
    const toggleMobileMenu = () => {
      const isOpen = mobileDrawer.style.transform === 'translateX(0)';
      mobileDrawer.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0)';
    };

    const closeMobileMenu = () => {
      mobileDrawer.style.transform = 'translateX(-100%)';
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);

    // Close on nav link click
    mobileDrawer.querySelectorAll('a.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Mobile Blog Dropdown
  const mobileBlogDropdownBtn = getElement('mobileBlogDropdownBtn');
  const mobileBlogDropdownMenu = getElement('mobileBlogDropdownMenu');
  const closeMobileBlogDropdownBtn = getElement('closeMobileBlogDropdownBtn');
  let mobileDropdownOpen = false;

  if (mobileBlogDropdownBtn && mobileBlogDropdownMenu && closeMobileBlogDropdownBtn) {
    const toggleMobileBlogDropdown = (e) => {
      e.stopPropagation();
      mobileDropdownOpen = !mobileDropdownOpen;
      toggleDropdownVisibility(mobileBlogDropdownMenu, mobileDropdownOpen);
    };

    const closeMobileBlogDropdown = (e) => {
      e.stopPropagation();
      mobileDropdownOpen = false;
      toggleDropdownVisibility(mobileBlogDropdownMenu, false);
    };

    mobileBlogDropdownBtn.addEventListener('click', toggleMobileBlogDropdown);
    closeMobileBlogDropdownBtn.addEventListener('click', closeMobileBlogDropdown);
  }
}

/**
 * Optimized Scrollspy with performance improvements
 */
function initScrollspy() {
  const desktopNavLinks = Array.from(getElements('#navbarMenu .nav-link'));
  const mobileNavLinks = Array.from(getElements('#mobileDrawer .nav-link'));
  const sectionEls = NAVIGATION_CONFIG.sectionIds.map(id => getElement(id)).filter(Boolean);

  function updateActiveNav() {
    const navbar = getElement('mainNavbar');
    const navbarBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
    let activeIdx = 0;

    // Find active section efficiently
    for (let i = sectionEls.length - 1; i >= 0; i--) {
      const rect = sectionEls[i].getBoundingClientRect();
      if (rect.top < navbarBottom) {
        activeIdx = i;
        break;
      }
    }

    // Update navigation classes efficiently
    [...desktopNavLinks, ...mobileNavLinks].forEach((link, idx) => {
      if (idx < desktopNavLinks.length) {
        link.classList.toggle('active', idx === activeIdx);
      } else {
        link.classList.toggle('active', (idx - desktopNavLinks.length) === activeIdx);
      }
    });

    scrollTicking = false;
  }

  const optimizedScrollspy = () => {
    scrollTicking = requestTick(updateActiveNav, scrollTicking);
  };

  window.addEventListener('scroll', optimizedScrollspy, { passive: true });
  window.addEventListener('resize', debounce(updateActiveNav, 100));
  updateActiveNav(); // Initial call
}

// ========================================
// 4. UI INTERACTIONS & ANIMATIONS
// ========================================

/**
 * Feature toggle functionality - global function
 */
function toggleFeatures(containerId, button) {
  const container = getElement(containerId);
  if (!container) return;

  const hiddenFeatures = container.querySelectorAll('.hidden-feature');
  const isExpanded = button.dataset.expanded === 'true';

  hiddenFeatures.forEach(feature => {
    feature.style.display = isExpanded ? 'none' : 'block';
  });

  button.innerHTML = isExpanded 
    ? '<span class="mr-2">👁️</span>See full features'
    : '<span class="mr-2">🔼</span>Hide features';
  button.dataset.expanded = (!isExpanded).toString();
}

/**
 * FAQ Toggle functionality - global function
 */
function toggleFAQ(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('i');
  const faqContainer = button.closest('.bg-white');

  if (!content || !icon || !faqContainer) return;

  const isHidden = content.classList.contains('hidden');

  if (isHidden) {
    content.classList.remove('hidden');
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.className = 'fa-minus';
    icon.style.transform = 'rotate(180deg)';
    faqContainer.classList.add('faq-active');
  } else {
    content.classList.add('hidden');
    content.style.maxHeight = '0px';
    icon.className = 'fa-plus';
    icon.style.transform = 'rotate(0deg)';
    faqContainer.classList.remove('faq-active');
  }
}

/**
 * Optimized Hero 3D Tilt Effect
 */
function initHero3DTilt() {
  const parent = document.querySelector('.hero-tilt-parent');
  const content = document.querySelector('.hero-tilt-content');
  if (!parent || !content) return;

  let mouseX = 0, mouseY = 0, width = 0, height = 0;
  let currentX = 0, currentY = 0;
  let isAnimating = false;

  const updateSize = () => {
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    currentX = mouseX = width / 2;
    currentY = mouseY = height / 2;
  };

  const animate = () => {
    if (!isAnimating) return;

    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    
    const maxTilt = 18;
    const tiltX = (currentY - height / 2) / (height / 2) * maxTilt;
    const tiltY = (currentX - width / 2) / (width / 2) * maxTilt;
    
    content.style.transform = `perspective(900px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
    animationFrame = requestAnimationFrame(animate);
  };

  const resetTilt = () => {
    isAnimating = false;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    
    mouseX = currentX = width / 2;
    mouseY = currentY = height / 2;
    
    content.style.transition = 'transform 0.7s cubic-bezier(.22,1,.36,1)';
    content.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    setTimeout(() => { content.style.transition = ''; }, 800);
  };

  // Event listeners with passive where possible
  updateSize();
  window.addEventListener('resize', debounce(updateSize, 100));

  parent.addEventListener('mousemove', (e) => {
    const rect = parent.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }, { passive: true });

  parent.addEventListener('mouseenter', () => {
    updateSize();
    isAnimating = true;
    animate();
  });

  parent.addEventListener('mouseleave', resetTilt);

  // Touch events
  parent.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updateSize();
      isAnimating = true;
      const rect = parent.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
      animate();
    }
  }, { passive: true });

  parent.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = parent.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  parent.addEventListener('touchend', resetTilt);
}

/**
 * Initialize UI interactions
 */
function initUIInteractions() {
  // Button Ripple Effects
  getElements('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      Object.assign(ripple.style, {
        width: size + 'px',
        height: size + 'px',
        left: x + 'px',
        top: y + 'px'
      });
      ripple.classList.add('ripple');

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Smooth Scrolling
  getElements('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll Animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  getElements('.section, .advantage-card, .plan-card, .service-card, .portfolio-item, .team-member').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// 5. THEME & VISUAL EFFECTS
// ========================================

/**
 * Theme toggle functionality - global function
 */
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle i');

  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');

  if (themeToggle) {
    themeToggle.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Initialize visual effects with performance optimizations
 */
function initVisualEffects() {
  // Theme initialization
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.querySelector('.theme-toggle i');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.className = 'fas fa-sun';
  }

  // Navbar blur effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const updateNavbarBlur = () => {
      navbar.classList.toggle('navbar-blur', window.scrollY > 0);
      scrollTicking = false;
    };

    const optimizedNavbarBlur = () => {
      scrollTicking = requestTick(updateNavbarBlur, scrollTicking);
    };

    window.addEventListener('scroll', optimizedNavbarBlur, { passive: true });
  }

  // Hero parallax effect
  const hero = document.querySelector('.hero-2');
  if (hero) {
    const updateHeroParallax = () => {
      const scrolled = window.pageYOffset;
      let rate = 0;

      if (window.innerWidth <= NAVIGATION_CONFIG.mobileBreakpoint) {
        const whyBusiness = getElement('why-business');
        if (whyBusiness) {
          const whyBusinessRect = whyBusiness.getBoundingClientRect();
          if (whyBusinessRect.top <= window.innerHeight) {
            const visiblePx = window.innerHeight - whyBusinessRect.top;
            rate = Math.max(-visiblePx * 0.5, -150);
          }
        }
      } else {
        rate = scrolled * -0.5;
      }

      hero.style.transform = `translateY(${rate}px)`;
      scrollTicking = false;
    };

    const optimizedParallax = () => {
      scrollTicking = requestTick(updateHeroParallax, scrollTicking);
    };

    window.addEventListener('scroll', optimizedParallax, { passive: true });
  }

  // Particles footer hide
  const particles = getElement('particles-js');
  const footer = document.querySelector('.footer');
  
  if (particles && footer) {
    const observer = new IntersectionObserver((entries) => {
      particles.style.display = entries[0].isIntersecting ? 'none' : '';
    }, { threshold: 0, rootMargin: '0px' });

    observer.observe(footer);
  }

  // Particles.js initialization
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 1000 } },
        color: { value: ["#f472b6", "#ec4899", "#e11d48", "#f9a8d4"] },
        opacity: { value: 0.7, random: false },
        size: { value: 5.5, random: true },
        line_linked: { enable: true, distance: 130, color: "#ec4899", opacity: 0.5, width: 2.2 },
        move: { enable: true, speed: 1.1, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: { detect_on: 'canvas', events: { onhover: { enable: false }, onclick: { enable: false } } },
      retina_detect: true
    });
  }

  // Add ripple effect CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes rippleEffect {
      to { transform: scale(2); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);
}

// ========================================
// 6. FORM HANDLING & CALCULATIONS
// ========================================

/**
 * Optimized Quote Calculator
 */
function initQuoteCalculator() {
  const quickQuoteForm = getElement('quickQuoteForm');
  if (!quickQuoteForm) return;

  const costMap = { ecommerce: 5000, booking: 3000, seo: 2000, marketing: 4000 };

  quickQuoteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const websiteType = formData.get('website_type');
    const requirements = formData.getAll('requirements');

    if (!websiteType) {
      alert('Please select a website type');
      return;
    }

    const basePrice = websiteType === 'static' ? 6999 : 19999;
    const additionalCost = requirements.reduce((sum, req) => sum + (costMap[req] || 0), 0);
    const totalPrice = basePrice + additionalCost;

    const quoteAmount = getElement('quoteAmount');
    const quoteResult = getElement('quoteResult');

    if (quoteAmount && quoteResult) {
      quoteAmount.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
      quoteResult.classList.remove('hidden');
      quoteResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    console.log('Quote generated:', { websiteType, requirements, totalPrice });
  });
}

// ========================================
// 7. AI CHAT & SVG ANIMATIONS
// ========================================

/**
 * AI Chat functionality with performance optimizations
 */
const ChatSystem = {
  getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "That's a great question! For detailed information about " + message + ", I'd recommend speaking directly with our team. You can call us at 951-172-1668 or WhatsApp at 787-584-5879 for personalized assistance. Our experts can provide specific answers for your business needs.";
  },

  addMessage(message, isUser = false) {
    const chatMessages = getElement('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex items-start ${isUser ? 'justify-end' : ''} mb-3`;

    const template = isUser
      ? `<div class="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
          <p class="text-sm">${message}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
          <i class="fas fa-user text-white text-xs"></i>
        </div>`
      : `<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
          <i class="fas fa-robot text-white text-xs"></i>
        </div>
        <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
          <p class="text-sm text-gray-800">${message}</p>
        </div>`;

    messageDiv.innerHTML = template;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  },

  init() {
    // Welcome message
    setTimeout(() => {
      this.addMessage("Hi! I'm your AI assistant. I can help answer questions about our services, pricing, timelines, and more. What would you like to know?");
    }, 1500);
  }
};

/**
 * Global chat functions
 */
function sendChatMessage() {
  const chatInput = getElement('chatInput');
  if (!chatInput) return;

  const message = chatInput.value.trim();
  if (message) {
    ChatSystem.addMessage(message, true);
    chatInput.value = '';
    
    setTimeout(() => {
      const response = ChatSystem.getAIResponse(message);
      ChatSystem.addMessage(response);
    }, 800);
  }
}

function sendQuickMessage(message) {
  ChatSystem.addMessage(message, true);
  setTimeout(() => {
    const response = ChatSystem.getAIResponse(message);
    ChatSystem.addMessage(response);
  }, 800);
}

function handleChatEnter(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

/**
 * Optimized SVG Growth Animation
 */
function initGrowthAnimation() {
  const sketchContainer = getElement('sketchContainer');
  if (!sketchContainer) return;

  let hasStarted = false;

  const startGrowthJourneyAnimation = () => {
    const stages = ['stage1', 'stage2', 'stage3'].map(id => getElement(id)).filter(Boolean);
    if (stages.length === 0) return;

    if (animationInterval) clearInterval(animationInterval);

    stages.forEach(stage => {
      stage.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
      stage.style.opacity = '0';
      stage.style.transform = 'scale(0.9)';
    });

    let currentStage = 0;

    const showNextStage = () => {
      stages.forEach(stage => {
        stage.style.opacity = '0';
        stage.style.transform = 'scale(0.9)';
      });

      setTimeout(() => {
        if (stages[currentStage]) {
          stages[currentStage].style.opacity = '1';
          stages[currentStage].style.transform = 'scale(1)';
        }
      }, 200);

      currentStage = (currentStage + 1) % stages.length;
    };

    showNextStage();
    animationInterval = setInterval(showNextStage, 3000);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasStarted) {
      hasStarted = true;
      startGrowthJourneyAnimation();
    }
  }, { threshold: 0.3, rootMargin: '0px' });

  observer.observe(sketchContainer);
}

// ========================================
// 8. THIRD-PARTY INTEGRATIONS
// ========================================

/**
 * Initialize Tawk.to Chat Widget
 */
function initTawkTo() {
  const Tawk_API = window.Tawk_API || {};
  const Tawk_LoadStart = new Date();
  
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://embed.tawk.to/687e0f8dd69815191a7c5877/1j0m6pgm8';
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
}

// ========================================
// 9. INITIALIZATION & EVENT LISTENERS
// ========================================

/**
 * Main initialization function - runs everything in optimal order
 */
function initializeApp() {
  // Core UI setup (highest priority)
  initNavigationSystem();
  initScrollspy();
  
  // Visual effects and interactions
  initVisualEffects();
  initUIInteractions();
  initHero3DTilt();
  
  // Forms and calculations
  initQuoteCalculator();
  
  // AI Chat and animations
  ChatSystem.init();
  initGrowthAnimation();
  
  // Third-party integrations (lowest priority)
  requestIdleCallback ? requestIdleCallback(initTawkTo) : setTimeout(initTawkTo, 0);
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Global function exposure for HTML onclick handlers
window.toggleFeatures = toggleFeatures;
window.toggleFAQ = toggleFAQ;
window.toggleTheme = toggleTheme;
window.sendChatMessage = sendChatMessage;
window.sendQuickMessage = sendQuickMessage;
window.handleChatEnter = handleChatEnter;
