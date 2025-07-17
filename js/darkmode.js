// Archivo: js/darkmode.js

document.addEventListener('DOMContentLoaded', () => {
    const toggleCheckbox = document.getElementById('dark-mode-toggle');

    if (toggleCheckbox) {
        // Cuando cambia el toggle, le pone o le saca una clase al BODY.
        // Es la forma más simple y robusta de hacerlo.
        toggleCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode-active');
        });
    }
});