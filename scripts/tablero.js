import { isValidWhiteMove, isValidBlackMove, checkKingCaptured } from '../scripts/moves.js';


const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const voiceBtn = document.getElementById("voice-btn");

const boardState = [
  ["Pp", "Qp", "Np", "Pp"], // Piezas negras
  ["", "", "", ""],
  ["", "", "", ""],
  ["Pb", "Rb", "Ab", "Pb"], // Piezas blancas
];

const pieceImages = {
  Pb: "./imagenes/blancos/guerrero_blanco.png", // Peón blanco
  Rb: "./imagenes/blancos/inca_blanco.png", // Rey blanco
  Ab: "./imagenes/blancos/sacerdote_blanco.png", // Alfil blanco
  Pp: "./imagenes/negros/guerrero_negro.png", // Peón negro
  Qp: "./imagenes/negros/nusta_negro.png", // Reina negra
  Np: "./imagenes/negros/llama_negro.png", // Caballo negro
};

let isWhiteTurn = true;
let isGameOver = false;

function renderBoard() {
  boardElement.innerHTML = "";
  boardState.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");
      if (cell) {
        const img = document.createElement("img");
        img.src = pieceImages[cell];
        img.alt = getPieceName(cell);
        img.addEventListener("click", () => {
          const pieceName = getPieceName(cell);
          statusElement.textContent = `Nombre de la pieza: ${pieceName}`; // Actualiza el estado
          speak(pieceName); // Usa el sintetizador de voz para decir el nombre de la pieza
        });
        cellElement.appendChild(img);
      }
      boardElement.appendChild(cellElement);
    });
  });
}

// Función para obtener el nombre de la pieza basado en su identificador
function getPieceName(piece) {
  const pieceNames = {
    Pb: "Guerrero",
    Rb: "Inca",
    Ab: "Sacerdote",
    Pp: "Guerrero",
    Qp: "Inca",
    Np: "LLama",
  };
  return pieceNames[piece] || "Pieza desconocida";
}

function movePiece(from, to) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = boardState[fromRow][fromCol];

  // Verificar si hay una pieza en la posición de origen
  if (!piece) {
    statusElement.textContent = "No hay ninguna pieza en la posición de origen.";
    speak("No hay ninguna pieza en la posición de origen.");
    return;
  }

  // Verificar si es el turno de las piezas blancas
  if (isWhiteTurn) {
    if (piece[1] === "b") { // Comprobar si es una pieza blanca
      const validMove = isValidWhiteMove(piece, from, to, boardState, statusElement);
      if (validMove) {
        boardState[fromRow][fromCol] = "";
        boardState[toRow][toCol] = piece;
        renderBoard();
        isWhiteTurn = false;
        speak("Movimiento realizado!");

        const winnerData = checkKingCaptured(boardState); // Obtener ganador y mensaje
        if (winnerData) {
          isGameOver = true;
          showModal(winnerData.winner, winnerData.message);
          statusElement.textContent = "El rey negro ha sido capturado.";
          speak("El territorio blanco ha ganado esta batalla. ¡Inti ha iluminado el camino hacia tú victoria!");
          return;
        } else {
          speak("Es el turno de las piezas negras.");
          statusElement.textContent = "Turno de las piezas negras";
        }
      } else {
        statusElement.textContent = "Movimiento no válido para esta pieza blanca";
        speak("Movimiento no válido para esta pieza blanca.");
      }
    } else {
      statusElement.textContent = "Es el turno de las piezas blancas";
      speak("Es el turno de las piezas blancas.");
    }
  }
  // Verificar si es el turno de las piezas negras
  else {
    if (piece[1] === "p") { // Comprobar si es una pieza negra (asegúrate de usar el identificador correcto)
      const validMove = isValidBlackMove(piece, from, to, boardState, statusElement);
      if (validMove) {
        boardState[fromRow][fromCol] = "";
        boardState[toRow][toCol] = piece;
        renderBoard();
        isWhiteTurn = true;
        speak("Movimiento realizado!");

        const winnerData = checkKingCaptured(boardState); // Obtener ganador y mensaje
        if (winnerData) {
          isGameOver = true;
          showModal(winnerData.winner, winnerData.message);
          statusElement.textContent = "El rey blanco ha sido capturado.";
          speak("El territorio negro ha ganado esta batalla. ¡Inti ha iluminado el camino hacia tú victoria!");
          return;
        } else {
          speak("Es el turno de las piezas blancas.");
          statusElement.textContent = "Turno de las piezas blancas";
        }
      } else {
        statusElement.textContent = "Movimiento no válido para esta pieza negra";
        speak("Movimiento no válido para esta pieza negra.");
      }
    } else {
      statusElement.textContent = "Es el turno de las piezas negras";
      speak("Es el turno de las piezas negras.");
    }
  }
}


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "es-PE";

function correctSpeechInput(command) {
  // Crear un mapa para reemplazar palabras erróneas comunes
  const corrections = {
    "ados": "a2",
    "a dos": "a2",
    "v4": "b4",
    "v2": "b2",
    "v3": "b3",
    "v1": "b1",
    "v 2": "b2",
    "v 3": "b3",
    "v 1": "b1",
    "v 4": "b4",
    "dedos": "d2",
    "de dos": "d2",
    "de cuatro": "d4",
    "b cuatro": "b4",
    "b dos": "b2",
    "de 4": "d4",
    "de 3": "d3",
    "de 1": "d1",
    "d 1": "d1",
    "de 2": "d2",
    "de tres": "d3",
    "yama": "llama",
    "inka": "inca",
    "muevete": "múevete",
    "a 1": "a1",
    "d cuatro": "d4",
    "d 3": "d3",
    "a cuatro": "a4",
    "a tres": "a3",
    "a 4": "a4",
    "a 3": "a3",
    "b 1": "b1",
    "b 2": "b2",
    "b 3": "b3",
    "b 4": "b4",
    "mp4": "en b4",
    "mp3": "en b3",
    "finca":"inca",
  };

  // Reemplazar cada palabra errónea con la correcta
  Object.keys(corrections).forEach((wrong) => {
    const regex = new RegExp(`\\b${wrong}\\b`, "gi");
    command = command.replace(regex, corrections[wrong]);
  });

  return command;
}

recognition.onresult = (event) => {
  let command = event.results[0][0].transcript.toLowerCase();
  console.log("Comando de voz recibido antes de la corrección: ", command);  // Mostrar el comando en la consola

  // Corregir la entrada de voz antes de procesarla
  command = correctSpeechInput(command);
  console.log("Comando de voz corregido: ", command);  // Mostrar el comando corregido en la consola
  processCommand(command);
};

function processCommand(command) {
  const regex = /(guerrero|inca|sacerdote|llama) en ([a-d][1-4]),? muévete hasta ([a-d][1-4])/i;
  const match = command.match(regex);
  if (match) {
    const [_, piece, from, to] = match;
    const fromCoords = parsePosition(from);
    const toCoords = parsePosition(to);
    movePiece(fromCoords, toCoords);
  } else {
    statusElement.textContent = "Comando no reconocido";
    speak("Comando no reconocido.");
  }
}

function parsePosition(pos) {
  const col = pos.charCodeAt(0) - "a".charCodeAt(0);
  const row = 4 - parseInt(pos[1], 10);
  return [row, col];
}

function speak(message, callback) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "es-ES";

  utterance.onend = () => {
    if (callback) callback();
  };

  synth.speak(utterance);
}

voiceBtn.addEventListener("click", () => {
  if (isWhiteTurn) {
    statusElement.textContent = "Escuchando...";
    recognition.start();
  } else {
    statusElement.textContent = "Escuchando...";
    recognition.start();
  }
});


renderBoard();

function showModal(winner, message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const retryButton = document.getElementById("retry-button");
  const exitButton = document.getElementById("exit-button");

  modalMessage.textContent = message;  // Mostrar el mensaje completo
  modal.style.display = "block";

  retryButton.onclick = () => {
    location.reload(); // Recargar la página para reiniciar el juego
  };

  exitButton.onclick = () => {
    window.close(); // Cerrar la página (ten en cuenta que esto puede no funcionar en todos los navegadores)
  };
}
