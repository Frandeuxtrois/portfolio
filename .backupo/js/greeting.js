// greetings.js

// Array con los textos de saludo en distintos idiomas
const greetings = [
  '¡Hola! Soy Franco.',         // Español
  'Hello! I\'m <strong>Franco</strong>.',        // Inglés
  'Bonjour ! Je suis <strong>Franco</strong>.',  // Francés
  'Ciao! Sono <strong>Franco</strong>.',         // Italiano
  'Hallo! Ich bin <strong>Franco</strong>.',     // Alemán
  'こんにちは！<strong>フランコ</strong>です。'      // Japonés
];

// Elemento donde se mostrará el saludo
const greetingEl = document.querySelector('.greeting');

// Variables para controlar el ciclo y animación
let index = 0;             // índice del saludo actual
let cycles = 0;            // cantidad de ciclos completos realizados
const maxCycles = 2;       // cantidad máxima de ciclos (2)

// Configuraciones de animación y estilo
const fadeDuration = 600;      // duración de fade out/in en ms
const intervalDuration = 3500; // intervalo total entre cambios en ms
const slideDistance = 30;      // distancia del slide vertical en px
const normalFontSize = '2.5rem';  // tamaño normal de fuente
const smallFontSize = '2rem';     // tamaño para texto japonés

// Función que realiza la animación y cambio de texto
function animateGreeting() {
  // Si ya completamos los ciclos, detenemos la animación
  if (cycles >= maxCycles) {
    clearInterval(intervalId);
    return;
  }

  // Animar salida: bajar y desvanecer texto actual
  greetingEl.style.transition = `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`;
  greetingEl.style.opacity = 0;
  greetingEl.style.transform = `translateY(${slideDistance}px)`;

  setTimeout(() => {
    // Actualizar índice y ciclos
    index++;
    if (index >= greetings.length) {
      index = 0;
      cycles++;
    }

    // Cambiar texto al nuevo saludo
    greetingEl.innerHTML = greetings[index];

    // Cambiar tamaño de fuente solo para japonés (último texto)
    if (index === greetings.length - 1) {
      greetingEl.style.fontSize = smallFontSize;
    } else {
      greetingEl.style.fontSize = normalFontSize;
    }

    // Preparar texto nuevo arriba y transparente (sin transición)
    greetingEl.style.transition = 'none';
    greetingEl.style.opacity = 0;
    greetingEl.style.transform = `translateY(-${slideDistance}px)`;

    // Forzar reflow para que el navegador registre los cambios
    void greetingEl.offsetWidth;

    // Animar entrada: bajar y aparecer texto nuevo
    greetingEl.style.transition = `opacity ${fadeDuration}ms ease, transform ${fadeDuration}ms ease`;
    greetingEl.style.opacity = 1;
    greetingEl.style.transform = 'translateY(0)';
  }, fadeDuration);
}

// Iniciar intervalo para animar cada cierto tiempo
const intervalId = setInterval(animateGreeting, intervalDuration);