  let currentScreen = 0;
        const totalScreens = 4;

        function showScreen(index) {
            // Remove active class from all screenshots and buttons
            document.querySelectorAll('.screenshot').forEach(screen => {
                screen.classList.remove('active');
            });
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Add active class to current screen and button
            document.querySelectorAll('.screenshot')[index].classList.add('active');
            document.querySelectorAll('.control-btn')[index].classList.add('active');

            currentScreen = index;

            // Add subtle rotation effect
            const iphone = document.querySelector('.iphone');
            iphone.style.transform = `rotateY(${index * 2 - 2}deg) rotateX(${index * 1 - 1}deg)`;
        }

        // Auto-advance screens
        setInterval(() => {
            currentScreen = (currentScreen + 1) % totalScreens;
            showScreen(currentScreen);
        }, 4000);

        // Add mouse interaction
        document.querySelector('.iphone-container').addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (y / rect.height) * 20;
            const rotateY = (x / rect.width) * 20;
            
            const iphone = document.querySelector('.iphone');
            iphone.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        document.querySelector('.iphone-container').addEventListener('mouseleave', () => {
            const iphone = document.querySelector('.iphone');
            iphone.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});



// Play video
function playVideo() {
    const videoContainer = document.querySelector('.video-container');
    const videoEmbed = `
        <iframe width="100%" height="500" src="demo.mp4" frameborder="0" allowfullscreen></iframe>
    `;
    videoContainer.innerHTML = videoEmbed;
}

// Parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hover animations
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-15px) scale(1.02)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) rotateX(5deg)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) rotateX(0deg)');
});

// CTA button animation
setInterval(() => {
    const ctaButton = document.querySelector('.hero-cta');
    if (ctaButton) {
        ctaButton.style.animation = 'pulse 2s ease-in-out';
        setTimeout(() => ctaButton.style.animation = '', 2000);
    }
}, 10000);

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
// === 3D Building Background with Three.js ===
const container = document.getElementById('hero-canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Load texture from image
const loader = new THREE.TextureLoader();
loader.load('test.png', (texture) => {
    const geometry = new THREE.PlaneGeometry(6, 3.5); // aspect ratio close to image
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animate
    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.y += 0.0025; // slow rotating effect
        renderer.render(scene, camera);
    }
    animate();
});
 const featureCards = document.querySelectorAll('.feature-card');

  const observerOptions = {
    threshold: 0.2
  };

  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // animate again on re-entry
      }
    });
  }, observerOptions);

  featureCards.forEach(card => featureObserver.observe(card));

  // Animate checklist items
  const checklistItems = document.querySelectorAll('.animated-checklist li');

  const checklistObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      } else {
        entry.target.style.animation = 'none'; // reset
        entry.target.offsetHeight; // force reflow
        entry.target.style.animation = '';
      }
    });
  }, observerOptions);

  checklistItems.forEach(item => checklistObserver.observe(item));
// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
 let currentSlide = 0;
  const track = document.getElementById('testimonial-carousel');
  const dots = document.querySelectorAll('.carousel-dot');
  const totalSlides = document.querySelectorAll('.testimonial-card').length;

  function updateCarousel() {
    const offset = -100 * currentSlide;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  const cards = document.querySelectorAll('.feature-card');

  cards.forEach((card, index) => {
    const direction = index % 2 === 0 ? 'fade-left' : 'fade-right';
    card.classList.add(direction);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
