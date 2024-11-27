// Obtener referencias a elementos del DOM
document.addEventListener('DOMContentLoaded', function () {
    // Botones principales
    const startButton = document.getElementById('startButton');
    const reglasButton = document.getElementById('reglasButton');
    const exitButton = document.getElementById('exitButton');
    const creditosButton = document.getElementById('creditosButton');
    const audioConfigButton = document.querySelector('[id="menuButton"]');
    const settingsButton = document.querySelector('.fa-gear')?.parentElement;

    // Modales
    const playersModal = document.getElementById('playersModal');
    const reglasModal = document.getElementById('reglasModal');
    const menuModal = document.getElementById('menuModal');
    const creditosModal = document.getElementById('creditosModal');


    // Elementos dentro de los modales
    const startGameButton = document.getElementById('startGame');
    const closeButtons = document.getElementsByClassName('close');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteButton = document.getElementById('muteButton');

    // Función para mostrar un modal
    function showModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Función para cerrar un modal
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Event Listeners para botones principales
    if (startButton) startButton.addEventListener('click', () => showModal(playersModal));
    if (reglasButton) reglasButton.addEventListener('click', () => showModal(reglasModal));
    if (creditosButton) creditosButton.addEventListener('click', () => showModal(creditosModal));

    // Configurar ambos botones para abrir el modal de configuración de audio
    if (audioConfigButton) audioConfigButton.addEventListener('click', () => showModal(menuModal));
    if (settingsButton) settingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(menuModal);
    });

    if (exitButton) {
        exitButton.addEventListener('click', () => {
            audioController.playButtonClickSound();
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas salir del juego?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar',
                background: '#1e1e1e',
                color: '#fff'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.close();
                }
            });
        });
    }

    // Cerrar modales con el botón X
    Array.from(closeButtons).forEach(button => {
        button.addEventListener('click', () => {
            closeModal(playersModal);
            closeModal(reglasModal);
            closeModal(menuModal);
            closeModal(creditosModal);
        });
    });

    // Cerrar modales haciendo clic fuera
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal') || event.target.classList.contains('modalMenu')) {
            closeModal(event.target);
        }
    });

    // Manejador del control de volumen
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function (e) {
            const volume = e.target.value;
            console.log('Volumen ajustado a:', volume);
        });
    }

    // Manejador del botón de mutear
    if (muteButton) {
        let isMuted = false;
        muteButton.addEventListener('click', function () {
            isMuted = !isMuted;
            muteButton.textContent = isMuted ? "Desmutear Música" : "Mutear Música";
        });
    }

    // Iniciar juego
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            const blackPlayer = document.getElementById('blackPlayer').value;
            const whitePlayer = document.getElementById('whitePlayer').value;

            if (blackPlayer && whitePlayer) {
                // Guardar los nombres de los jugadores en localStorage
                localStorage.setItem('blackPlayer', blackPlayer);
                localStorage.setItem('whitePlayer', whitePlayer);
                // Redirigir a la página del juego
                window.location.href = './Juego.html';
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Campos Vacíos!',
                    text: 'Por favor, ingresa los nombres de ambos jugadores',
                    confirmButtonText: 'Entendido',
                    background: '#1e1e1e',
                    color: '#fff'
                });
            }
        });
    }
});

// Código para actualizar los nombres en juego.html
if (document.getElementById('Turnos')) {
    const blackPlayer = localStorage.getItem('blackPlayer');
    const whitePlayer = localStorage.getItem('whitePlayer');

    if (blackPlayer && whitePlayer) {
        document.getElementById('Turnos').innerHTML = `
            <p class = "Turnosp"><strong><i class="fa-solid fa-chess-king"></i>Inca del territorio negro: </strong> ${blackPlayer}</p>
            <p class="Turnosp"><strong><i class="fa-regular fa-chess-king"></i>Inca del territorio blanco:</strong> ${whitePlayer}</p>
        `;
    }
}

const retryButton = document.getElementById('retry-button');
    const exitButton = document.getElementById('exit-button');

    // Evento para recargar la página
    if (retryButton) {
        retryButton.addEventListener('click', () => {
            location.reload();
        });
    }

    // Evento para redirigir a index.html
    if (exitButton) {
        exitButton.addEventListener('click', () => {
            window.location.href = 'Index.html';
        });
    }
