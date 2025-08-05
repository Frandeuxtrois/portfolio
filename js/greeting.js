// greetings.js

const greetings = [
  '¡Hola! Soy <strong>Franco</strong>.',         // Español
  'Hello! I\'m <strong>Franco</strong>.',        // Inglés
  'Bonjour! Je suis <strong>Franco</strong>.',  // Francés
  'Hallo! Ich bin <strong>Franco</strong>.',     // Alemán
  'Ciao! Sono <strong>Franco</strong>.'          // Italiano
];

const greetingEl = document.querySelector('.greeting');

let index = 0;
let cycles = 0;
const maxCycles = 2;

const fadeDuration = 600;
const intervalDuration = 3500;
const slideDistance = 30;

function animateGreeting() {
  if (cycles >= maxCycles) {
    clearInterval(intervalId);
    return;
  }
  
  greetingEl.style.transition = `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`;
  greetingEl.style.opacity = 0;
  greetingEl.style.transform = `translateY(${slideDistance}px)`;
  
  setTimeout(() => {
    index++;
    if (index >= greetings.length) {
      index = 0;
      cycles++;
    }
    
    greetingEl.innerHTML = greetings[index];
    
    greetingEl.style.transition = 'none';
    greetingEl.style.opacity = 0;
    greetingEl.style.transform = `translateY(-${slideDistance}px)`;
    
    // Forzar reflow para reiniciar animación
    void greetingEl.offsetWidth;
    
    greetingEl.style.transition = `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`;
    greetingEl.style.opacity = 1;
    greetingEl.style.transform = 'translateY(0)';
  }, fadeDuration);
}

// Inicializar texto y tamaño fijo (definido en CSS)
greetingEl.innerHTML = greetings[index];

const intervalId = setInterval(animateGreeting, intervalDuration);
