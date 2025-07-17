const arrow = document.getElementById("arrow");
const contactLink = document.querySelector('.sidebar nav ul li a[href="#contact"]');
const contactSection = document.getElementById("contact");

// Ajustes personalizables
const offset = 15;   // Distancia flecha ↔ cursor
const margin = 20;   // Distancia flecha ↔ link antes de ocultarse

// Variable de control
let isInContactSection = false;

// Flecha sigue al mouse y apunta al link de contacto
document.addEventListener("mousemove", (e) => {
  const arrowX = e.clientX + offset;
  const arrowY = e.clientY + offset;

  arrow.style.left = `${arrowX}px`;
  arrow.style.top = `${arrowY}px`;

  if (!contactLink || isInContactSection) {
    arrow.style.opacity = "0";
    return;
  }

  const linkRect = contactLink.getBoundingClientRect();
  const linkX = linkRect.left + linkRect.width / 2;
  const linkY = linkRect.top + linkRect.height / 2;

  const dx = linkX - e.clientX;
  const dy = linkY - e.clientY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  arrow.style.transform = `rotate(${angle}deg)`;

  // Oculta si la flecha está cerca del link "Contact"
  const isNearLink =
    arrowX >= linkRect.left - margin &&
    arrowX <= linkRect.right + margin &&
    arrowY >= linkRect.top - margin &&
    arrowY <= linkRect.bottom + margin;

  arrow.style.opacity = isNearLink ? "0" : "1";
});

// Detectar si estamos viendo la sección #contact
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      isInContactSection = entry.isIntersecting;

      // Forzamos el ocultamiento si se entra o sale
      if (isInContactSection) {
        arrow.style.opacity = "0";
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(contactSection);