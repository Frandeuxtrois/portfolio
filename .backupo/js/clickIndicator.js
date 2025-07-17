// js/clickIndicator.js (LA VERSIÓN FINAL Y FUNCIONAL)

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.createElement('div');
    canvas.id = 'ripple-canvas';
    document.body.appendChild(canvas);

    /**
     * Determina si un color es "oscuro" basándose en su luminancia.
     * Funciona con el string 'rgb(r, g, b)' que nos da el navegador.
     */
    function isColorDark(rgbColorString) {
        // Extraemos los números del string 'rgb(255, 100, 0)'
        const [r, g, b] = rgbColorString.match(/\d+/g).map(Number);
        
        // Fórmula estándar de luminancia. El ojo humano es más sensible al verde.
        const luminance = (r * 0.299 + g * 0.587 + b * 0.114);
        
        // Si la luminancia es baja, el color es oscuro.
        return luminance < 140; // Usamos 140 como umbral para un buen contraste.
    }

    // --- LÓGICA PRINCIPAL ---
    document.addEventListener('click', (e) => {
        // 1. Obtenemos el elemento exacto sobre el que se hizo clic.
        const targetElement = e.target;
        
        // 2. Obtenemos sus estilos computados (los estilos que realmente se ven).
        const styles = window.getComputedStyle(targetElement);
        
        // 3. ¡LA CLAVE! Leemos el color del TEXTO.
        const textColor = styles.color;
        
        // 4. Lógica Inversa: Si el texto es OSCURO, el fondo debe ser CLARO.
        //    Por lo tanto, la onda debe ser OSCURA.
        //    Si el texto es CLARO, el fondo es OSCURO, y la onda debe ser CLARA.
        const useLightRipple = !isColorDark(textColor);

        // 5. Creamos la onda con la clase correcta.
        createRipple(e.clientX, e.clientY, useLightRipple);
    });

    /**
     * Crea el elemento de la onda y lo añade al DOM.
     * @param {boolean} useLight - Si la onda debe ser clara.
     */
    function createRipple(x, y, useLight) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        // Añade la clase correcta basándose en nuestra lógica.
        ripple.classList.add(useLight ? 'ripple--light' : 'ripple--dark');

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        canvas.appendChild(ripple);

        // Limpieza automática (sin cambios).
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
});