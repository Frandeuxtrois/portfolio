// js/smooth-scroll.js

// --- 1. INICIALIZACIÓN DE LENIS (SCROLL SUAVE) ---
const lenis = new Lenis({
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // ... otros parámetros de Lenis si los personalizaste
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// --- 2. INTEGRACIÓN DEL SCROLLSPY (MARCAR LINK ACTIVO) ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar nav a');

lenis.on('scroll', (e) => {
  const scrollY = e.animatedScroll; // Usamos el valor de scroll de Lenis

  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    // Determinamos si la sección está en el viewport
   if (scrollY >= sectionTop - window.innerHeight / 2) {
    currentSectionId = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});


// --- 3. RE-IMPLEMENTACIÓN DEL SCROLL SNAPPING ---
let isScrolling = null;

lenis.on('scroll', (e) => {
  // Limpiamos el temporizador cada vez que el usuario hace scroll
  window.clearTimeout(isScrolling);

  // Creamos un nuevo temporizador que se ejecutará cuando el usuario PARE de hacer scroll
  isScrolling = setTimeout(() => {
    const currentScroll = e.animatedScroll;
    
    // Buscamos la sección más cercana a la posición actual
    const closestSection = [...sections].reduce((prev, curr) => {
      return (Math.abs(curr.offsetTop - currentScroll) < Math.abs(prev.offsetTop - currentScroll) ? curr : prev);
    });

    // Hacemos que Lenis se desplace suavemente a esa sección
    lenis.scrollTo(closestSection, { duration: 0.5 });

  }, 150); // Tiempo de espera en milisegundos después de parar de scrollear
});


// --- 4. HACER QUE LOS CLICS EN LOS LINKS FUNCIONEN ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    // Le decimos a Lenis que vaya al objetivo del link
    lenis.scrollTo(this.getAttribute('href'));
  });
});