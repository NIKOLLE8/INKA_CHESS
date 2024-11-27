const AUDIO_PATHS = {
    background: './sonidos y musica/fondo.mp3',  // Música de fondo tipo ajedrez
    buttonClick: './sonidos y musica/Minecraft_Menu_Button_Sound_Effect___Sounffex__Sounffex_youtubemp3 (1).mp3',  // Sonido click básico
};

class AudioController {
    constructor() {
        // Crear elementos de audio
        this.backgroundMusic = new Audio(AUDIO_PATHS.background);
        this.buttonClickSound = new Audio(AUDIO_PATHS.buttonClick);
        this.backgroundMusic.loop = true; // Hacer que la música de fondo se repita
        this.backgroundMusic.volume = 0.5; // Volumen inicial de la música de fondo
        this.buttonClickSound.volume = 1; // Volumen fijo para los efectos de sonido
        this.isBackgroundMuted = false; // Control de muteo de la música
        this.isSoundMuted = false; // Control de muteo de los sonidos de clic
    }

    // Método para reproducir música de fondo
    startBackgroundMusic() {
        if (!this.isMuted && this.backgroundMusic.paused) {
            this.backgroundMusic.play().catch(error => {
                console.log("Error al reproducir música de fondo:", error);
            });
        }
    }

    // Método para reproducir sonidos de clic
    playButtonClickSound() {
        if (!this.isMuted) {
            this.buttonClickSound.play().catch(error => {
                console.log("Error al reproducir sonido de clic:", error);
            });
        }
    }

    // Función para silenciar/activar la música de fondo
    toggleMute() {
        this.isBackgroundMuted = !this.isBackgroundMuted;
        this.backgroundMusic.muted = this.isBackgroundMuted;
    }

    // Función para silenciar/activar los sonidos de clic
    toggleSMute() {
        this.isSoundMuted = !this.isSoundMuted;
        this.buttonClickSound.muted = this.isSoundMuted;
    }

    // Método específico para controlar el volumen de la música de fondo
    setBackgroundMusicVolume(volume) {
        this.backgroundMusic.volume = volume;
    }
}

// Inicializar controlador de audio
const audioController = new AudioController();

// Obtener elementos HTML
const allButtons = document.querySelectorAll('.button');
const muteButton = document.getElementById('muteButton');
const muteSButton = document.getElementById('muteSButton');
const volumeSlider = document.getElementById('volumeSlider');
const creditosButton = document.getElementById('creditosButton'); 
const ConfiguracionButton = document.getElementById('ConfiguracionButton'); 
const voicebtn = document.getElementById('voice-btn'); 


// Agregar evento de click a todos los botones para el sonido
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        audioController.playButtonClickSound();
    });
});

if (creditosButton) {
    creditosButton.addEventListener('click', () => {
        audioController.playButtonClickSound(); // Reproducir sonido de clic
    });
}

if (ConfiguracionButton) {
    ConfiguracionButton.addEventListener('click', () => {
        audioController.playButtonClickSound(); // Reproducir sonido de clic
    });
}


// Control de audio (muteo de música)
muteButton.addEventListener('click', () => {
    audioController.toggleMute();
    muteButton.textContent = audioController.isBackgroundMuted ? 'Desmutear Música' : 'Mutear Música';
});

// Control de audio (muteo de sonidos de clic)
muteSButton.addEventListener('click', () => {
    audioController.toggleSMute();
    muteSButton.textContent = audioController.isSoundMuted ? 'Desmutear Sonido' : 'Mutear Sonido';
});

// Control de volumen (solo para música de fondo)
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioController.setBackgroundMusicVolume(volume);
});

// Iniciar música de fondo cuando el usuario haga clic en la página
document.addEventListener('click', () => {
    audioController.startBackgroundMusic();
}, { once: true });