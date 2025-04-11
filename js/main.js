document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.icon');     // Elementos da primeira tela
    const options = document.querySelectorAll('.option'); // Elementos das telas secundárias

    let selectedIndex = 0;

    function highlightIcon(index) {
        icons.forEach((icon, i) => {
            icon.style.border = i === index ? '3px solid #134596' : 'none';
        });
    }

    function updateOptionFocus(index) {
        options.forEach((opt, i) => {
            opt.classList.toggle('focused', i === index);
        });
    }

    function navigateToIcon() {
        const area = icons[selectedIndex].getAttribute('data-area');
        const urls = {
            producao: 'producao.html',
            estoque: 'estoque.html',
            cozinha: 'cozinha.html',
            escritorio: 'escritorio.html',
            ferramentaria: 'ferramentaria.html',
            vipsoft: 'vipsoft.html'
        };
        if (urls[area]) {
            window.location.href = urls[area];
        }
    }

    function navigateToOption() {
        const selected = options[selectedIndex];
        const url = selected.dataset.url || selected.getAttribute('href');
        if (url) {
            window.location.href = url;
        }
    }

    function handleNavigation(code) {
        const isFirstScreen = icons.length > 0;

        if (isFirstScreen) {
            // Primeira tela
            if (code === 37) { // Left
                selectedIndex = (selectedIndex - 1 + icons.length) % icons.length;
                highlightIcon(selectedIndex);
            } else if (code === 39) { // Right
                selectedIndex = (selectedIndex + 1) % icons.length;
                highlightIcon(selectedIndex);
            } else if (code === 13) { // Enter
                navigateToIcon();
            }
        } else {
            // Segunda tela
            if (code === 37) {
                selectedIndex = (selectedIndex - 1 + options.length) % options.length;
                updateOptionFocus(selectedIndex);
            } else if (code === 39) {
                selectedIndex = (selectedIndex + 1) % options.length;
                updateOptionFocus(selectedIndex);
            } else if (code === 13) {
                navigateToOption();
            }
        }
    }

    // Evento compatível com teclado e controle remoto
    document.addEventListener('keydown', (event) => {
        const code = event.keyCode; // mais confiável que event.key em TVs
        handleNavigation(code);
    });

    // Clique com mouse também funciona
    if (icons.length > 0) {
        highlightIcon(selectedIndex);
        icons.forEach((icon, i) => {
            icon.addEventListener('click', () => {
                selectedIndex = i;
                highlightIcon(selectedIndex);
                navigateToIcon();
            });
        });
    }

    if (options.length > 0) {
        updateOptionFocus(selectedIndex);
        options.forEach((opt, i) => {
            opt.addEventListener('click', () => {
                selectedIndex = i;
                updateOptionFocus(selectedIndex);
                navigateToOption();
            });
        });
    }
});
