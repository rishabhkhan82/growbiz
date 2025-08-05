
    /*
===========================================
GROWBUSINESS.JS - OPTIMIZED STRUCTURE
===========================================

TABLE OF CONTENTS:
1. PERFORMANCE OPTIMIZATIONS
   1.1 DOM Cache System
   1.2 Debounced Event Handlers
   1.3 Constants & Configuration
2. CORE FUNCTIONALITY
   2.1 Theme Management
   2.2 Navigation System
   2.3 Mobile Menu System
3. INTERACTIVE COMPONENTS
   3.1 Dropdown Handlers
   3.2 Smooth Scrolling
   3.3 Button Effects
4. SCROLL & ANIMATION
   4.1 Scrollspy System
   4.2 Intersection Observer
   4.3 Visual Effects
5. THIRD-PARTY INTEGRATIONS
   5.1 Tawk.to Chat Widget
6. INITIALIZATION
   6.1 DOM Ready Handlers
   6.2 Event Listeners Setup

Performance Features:
- DOM Caching System for better performance
- Debounced scroll events to reduce CPU usage
- Passive event listeners where appropriate
- Efficient animation handling
- Modular function organization

===========================================
*/

// ===========================================
// 1. PERFORMANCE OPTIMIZATIONS
// ===========================================

// 1.1 DOM Cache System
const DOMCache = {
  // Navigation elements
  blogDropdownBtn: null,
  blogDropdownMenu: null,
  closeBlogDropdownBtn: null,
  mobileMenuBtn: null,
  mobileDrawer: null,
  closeDrawerBtn: null,
  mainNavbar: null,
  
  // Mobile dropdown elements
  mobileBlogDropdownBtn: null,
  mobileBlogDropdownMenu: null,
  closeMobileBlogDropdownBtn: null,
  mobileBlogDropdownIcon: null,
  
  // Navigation links
  desktopNavLinks: [],
  mobileNavLinks: [],
  smoothScrollLinks: [],
  
  // Theme elements
  themeToggle: null,
  themeToggleIcon: null,
  
  // Sections for scrollspy
  sections: [],
  
  // Interactive elements
  buttons: [],
  observableElements: [],
  
  // Cache DOM elements
  init() {
    // Navigation
    this.blogDropdownBtn = document.getElementById('blogDropdownBtn');
    this.blogDropdownMenu = document.getElementById('blogDropdownMenu');
    this.closeBlogDropdownBtn = document.getElementById('closeBlogDropdownBtn');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileDrawer = document.getElementById('mobileDrawer');
    this.closeDrawerBtn = document.getElementById('closeDrawerBtn');
    this.mainNavbar = document.getElementById('mainNavbar');
    
    // Mobile dropdown
    this.mobileBlogDropdownBtn = document.getElementById('mobileBlogDropdownBtn');
    this.mobileBlogDropdownMenu = document.getElementById('mobileBlogDropdownMenu');
    this.closeMobileBlogDropdownBtn = document.getElementById('closeMobileBlogDropdownBtn');
    this.mobileBlogDropdownIcon = document.getElementById('mobileBlogDropdownIcon');
    
    // Navigation links
    this.desktopNavLinks = Array.from(document.querySelectorAll('#navbarMenu .nav-link'));
    this.mobileNavLinks = Array.from(document.querySelectorAll('#mobileDrawer .nav-link'));
    this.smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Theme
    this.themeToggle = document.querySelector('.theme-toggle');
    this.themeToggleIcon = document.querySelector('.theme-toggle i');
    
    // Sections
    const sectionIds = ['home', 'services', 'portfolio', 'about', 'contact'];
    this.sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    // Interactive elements
    this.buttons = document.querySelectorAll('.btn');
    this.observableElements = document.querySelectorAll('.section, .advantage-card, .plan-card, .service-card, .portfolio-item, .team-member');
  }
};

// 1.2 Debounced Event Handlers
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

// 1.3 Constants & Configuration
const CONFIG = {
  SCROLL_DEBOUNCE: 16, // ~60fps
  RIPPLE_DURATION: 600,
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_MARGIN: '0px 0px -50px 0px'
};

// ===========================================
// 2. CORE FUNCTIONALITY
// ===========================================

// 2.1 Theme Management
class ThemeManager {
  static toggleTheme() {
    const body = document.body;
    const themeToggle = DOMCache.themeToggleIcon;

    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
      if (themeToggle) themeToggle.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    } else {
      if (themeToggle) themeToggle.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    }
  }

  static loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = DOMCache.themeToggleIcon;

    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      if (themeToggle) themeToggle.className = 'fas fa-sun';
    }
  }
}

// 2.2 Navigation System
class NavigationManager {
  static setupScrollspy() {
    const debouncedScrollSpy = debounce(() => {
      const navbar = DOMCache.mainNavbar;
      const navbarRect = navbar ? navbar.getBoundingClientRect() : { bottom: 0 };
      const navbarBottom = navbarRect.bottom;
      let activeIdx = 0;

      for (let i = 0; i < DOMCache.sections.length; i++) {
        const section = DOMCache.sections[i];
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top < navbarBottom) {
          activeIdx = i;
        }
      }

      // Update desktop navigation
      DOMCache.desktopNavLinks.forEach((link, idx) => {
        link.classList.toggle('active', idx === activeIdx);
      });

      // Update mobile navigation
      DOMCache.mobileNavLinks.forEach((link, idx) => {
        link.classList.toggle('active', idx === activeIdx);
      });
    }, CONFIG.SCROLL_DEBOUNCE);

    window.addEventListener('scroll', debouncedScrollSpy, { passive: true });
    window.addEventListener('resize', debouncedScrollSpy, { passive: true });
    debouncedScrollSpy(); // Initial call
  }

  static setupSmoothScrolling() {
    DOMCache.smoothScrollLinks.forEach(anchor => {
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
  }
}

// 2.3 Mobile Menu System
class MobileMenuManager {
  static isDrawerOpen = false;

  static openDrawer() {
    if (DOMCache.mobileDrawer) {
      DOMCache.mobileDrawer.style.transform = 'translateX(0)';
      this.isDrawerOpen = true;
    }
  }

  static closeDrawer() {
    if (DOMCache.mobileDrawer) {
      DOMCache.mobileDrawer.style.transform = 'translateX(-100%)';
      this.isDrawerOpen = false;
    }
  }

  static toggleDrawer() {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  static setupMobileMenu() {
    // Mobile menu button
    if (DOMCache.mobileMenuBtn) {
      DOMCache.mobileMenuBtn.addEventListener('click', () => this.toggleDrawer());
    }

    // Close drawer button
    if (DOMCache.closeDrawerBtn) {
      DOMCache.closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
    }

    // Close drawer on nav link click
    if (DOMCache.mobileDrawer) {
      DOMCache.mobileDrawer.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', () => this.closeDrawer());
      });
    }
  }
}

// ===========================================
// 3. INTERACTIVE COMPONENTS
// ===========================================

// 3.1 Dropdown Handlers
class DropdownManager {
  static desktopDropdownOpen = false;
  static mobileDropdownOpen = false;

  static setupDesktopDropdown() {
    if (!DOMCache.blogDropdownBtn || !DOMCache.blogDropdownMenu || !DOMCache.closeBlogDropdownBtn) {
      return;
    }

    // Toggle dropdown
    DOMCache.blogDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.desktopDropdownOpen = !this.desktopDropdownOpen;
      this.updateDropdownState(DOMCache.blogDropdownMenu, this.desktopDropdownOpen);
    });

    // Close dropdown
    DOMCache.closeBlogDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.desktopDropdownOpen = false;
      this.updateDropdownState(DOMCache.blogDropdownMenu, false);
    });
  }

  static setupMobileDropdown() {
    if (!DOMCache.mobileBlogDropdownBtn || !DOMCache.mobileBlogDropdownMenu || 
        !DOMCache.closeMobileBlogDropdownBtn || !DOMCache.mobileBlogDropdownIcon) {
      return;
    }

    // Initialize dropdown state
    this.updateDropdownState(DOMCache.mobileBlogDropdownMenu, false);
    DOMCache.mobileBlogDropdownIcon.classList.remove('rotate-180');

    // Toggle dropdown
    DOMCache.mobileBlogDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove focus from other elements
      if (document.activeElement && document.activeElement !== DOMCache.mobileBlogDropdownBtn) {
        document.activeElement.blur();
      }

      this.mobileDropdownOpen = !this.mobileDropdownOpen;
      this.updateDropdownState(DOMCache.mobileBlogDropdownMenu, this.mobileDropdownOpen);
      DOMCache.mobileBlogDropdownIcon.classList.toggle('rotate-180', this.mobileDropdownOpen);
    });

    // Close dropdown
    DOMCache.closeMobileBlogDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.mobileDropdownOpen = false;
      this.updateDropdownState(DOMCache.mobileBlogDropdownMenu, false);
      DOMCache.mobileBlogDropdownIcon.classList.remove('rotate-180');
    });
  }

  static updateDropdownState(menu, isOpen) {
    if (!menu) return;
    
    if (isOpen) {
      menu.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
      menu.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
    } else {
      menu.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
      menu.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
    }
  }
}

// 3.2 Button Effects
class ButtonEffectsManager {
  static setupRippleEffect() {
    // Add ripple effect CSS
    if (!document.getElementById('ripple-styles')) {
      const rippleStyle = document.createElement('style');
      rippleStyle.id = 'ripple-styles';
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
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(rippleStyle);
    }

    // Add click animation to buttons
    DOMCache.buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, CONFIG.RIPPLE_DURATION);
      });
    });
  }
}

// ===========================================
// 4. SCROLL & ANIMATION
// ===========================================

// 4.1 Intersection Observer
class AnimationManager {
  static observer = null;

  static setupIntersectionObserver() {
    const observerOptions = {
      threshold: CONFIG.INTERSECTION_THRESHOLD,
      rootMargin: CONFIG.INTERSECTION_MARGIN
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe all elements
    DOMCache.observableElements.forEach(el => {
      this.observer.observe(el);
    });
  }
}

// ===========================================
// 5. THIRD-PARTY INTEGRATIONS
// ===========================================

// 5.1 Tawk.to Chat Widget
class ThirdPartyManager {
  static initTawkTo() {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    const script = document.createElement("script");
    const firstScript = document.getElementsByTagName("script")[0];
    
    script.async = true;
    script.src = 'https://embed.tawk.to/687e0f8dd69815191a7c5877/1j0m6pgm8';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    firstScript.parentNode.insertBefore(script, firstScript);
  }
}

// ===========================================
// 6. INITIALIZATION
// ===========================================

// 6.1 DOM Ready Handlers
class AppInitializer {
  static init() {
    // Initialize DOM cache first
    DOMCache.init();
    
    // Setup core functionality
    ThemeManager.loadSavedTheme();
    NavigationManager.setupScrollspy();
    NavigationManager.setupSmoothScrolling();
    
    // Setup interactive components
    MobileMenuManager.setupMobileMenu();
    DropdownManager.setupDesktopDropdown();
    DropdownManager.setupMobileDropdown();
    ButtonEffectsManager.setupRippleEffect();
    
    // Setup animations
    AnimationManager.setupIntersectionObserver();
    
    // Initialize third-party services
    ThirdPartyManager.initTawkTo();
  }
}

// 6.2 Event Listeners Setup
// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', AppInitializer.init);

// Global theme toggle function (kept for backward compatibility)
function toggleTheme() {
  ThemeManager.toggleTheme();
}
