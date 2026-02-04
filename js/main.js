// ===================================
// Portfolio Website - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Add scrolled class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink(sections, navLinks);
  });
}

function updateActiveNavLink(sections, navLinks) {
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        document.querySelector('.nav-menu').classList.remove('active');
      }
    });
  });
}

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
    }
  });
}

// ===================================
// Utility: Add Work Item (for future use)
// ===================================
function addWorkItem(work) {
  const worksGrid = document.querySelector('.works-grid');
  const emptyState = worksGrid.querySelector('.works-empty');
  
  if (emptyState) {
    emptyState.remove();
  }

  const workCard = document.createElement('article');
  workCard.className = 'work-card fade-in';
  workCard.innerHTML = `
    <div class="work-thumbnail">
      ${work.thumbnail 
        ? `<img src="${work.thumbnail}" alt="${work.title}">`
        : '<div class="work-thumbnail-placeholder">?</div>'
      }
    </div>
    <div class="work-info">
      <h3 class="work-title">${work.title}</h3>
      <p class="work-description">${work.description}</p>
      <div class="work-tags">
        ${work.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
      </div>
      <div class="work-links">
        ${work.github ? `<a href="${work.github}" class="work-link" target="_blank">? GitHub</a>` : ''}
        ${work.demo ? `<a href="${work.demo}" class="work-link" target="_blank">? Demo</a>` : ''}
      </div>
    </div>
  `;

  worksGrid.appendChild(workCard);
  
  // Trigger animation
  setTimeout(() => workCard.classList.add('visible'), 100);
}
