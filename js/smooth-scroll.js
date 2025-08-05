// js/smooth-scroll.js

// --- 1. INICIALIZACIÓN DE LENIS (SCROLL SUAVE) ---
const lenis = new Lenis({
  duration: 0.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
  const scrollY = e.animatedScroll;
  let currentSectionId = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
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


// --- 3. SCROLL SNAPPING CONDICIONAL (LA SOLUCIÓN) ---

// Primero, creamos un objeto Media Query para monitorear el ancho de la pantalla.
const mediaQuery = window.matchMedia('(max-width: 768px)');
let isScrolling = null;

lenis.on('scroll', (e) => {
  // Siempre limpiamos el temporizador, esto es seguro.
  window.clearTimeout(isScrolling);

  // --- ¡AQUÍ ESTÁ LA LÓGICA CLAVE! ---
  // Comprobamos si la media query NO coincide, es decir, si estamos en ESCRITORIO.
  if (!mediaQuery.matches) {
    // Si estamos en escritorio, activamos el temporizador para el efecto de snap.
    isScrolling = setTimeout(() => {
      const currentScroll = e.animatedScroll;
      const closestSection = [...sections].reduce((prev, curr) => {
        return (Math.abs(curr.offsetTop - currentScroll) < Math.abs(prev.offsetTop - currentScroll) ? curr : prev);
      });
      lenis.scrollTo(closestSection, { duration: 0.5 });
    }, 150);
  }
  // Si estamos en MÓVIL (mediaQuery.matches es true), el 'if' no se cumple
  // y la lógica de snap simplemente NUNCA se ejecuta.
});


// --- 4. HACER QUE LOS CLICS EN LOS LINKS FUNCIONEN ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute('href'));
  });
});