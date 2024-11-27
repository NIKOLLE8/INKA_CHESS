export function isValidWhiteMove(piece, from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Validar que el destino esté dentro del tablero
    if (toRow < 0 || toRow > 3 || toCol < 0 || toCol > 3) return false;

    // Validar que no haya una pieza del mismo color en el destino
    const targetPiece = boardState[toRow][toCol];
    if (targetPiece && targetPiece[1] === 'b') return false;

    switch (piece) {
        case 'Pb': // Peón blanco
            return validateWhitePawnMove(from, to, boardState);
        case 'Rb': // Rey blanco
            return validateKingMove(from, to);
        case 'Ab': // Alfil blanco
            return validateBishopMove(from, to, boardState);
        default:
            return false;
    }
}

export function isValidBlackMove(piece, from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Validar que el destino esté dentro del tablero
    if (toRow < 0 || toRow > 3 || toCol < 0 || toCol > 3) return false;

    // Validar que no haya una pieza del mismo color en el destino
    const targetPiece = boardState[toRow][toCol];
    if (targetPiece && targetPiece[1] === 'p') return false;

    switch (piece) {
        case 'Pp': // Peón negro
            return validateBlackPawnMove(from, to, boardState);
        case 'Qp': // Reina negra
            return validateQueenMove(from, to, boardState);
        case 'Np': // Caballo negro
            return validateKnightMove(from, to);
        default:
            return false;
    }
}

function validateWhitePawnMove(from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const direction = -1;

    // Movimiento simple hacia adelante
    if (toCol === fromCol && toRow === fromRow + direction && !boardState[toRow][toCol]) {
        return true;
    }

    // Movimiento inicial de dos casillas
    if (fromRow === 3 && toCol === fromCol && toRow === fromRow + (direction * 2) &&
        !boardState[toRow][toCol] && !boardState[fromRow + direction][fromCol]) {
        return true;
    }

    // Captura diagonal
    if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction &&
        boardState[toRow][toCol] && boardState[toRow][toCol][1] === 'p') {
        return true;
    }

    return false;
}

function validateBlackPawnMove(from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const direction = 1;

    // Movimiento simple hacia adelante
    if (toCol === fromCol && toRow === fromRow + direction && !boardState[toRow][toCol]) {
        return true;
    }

    // Movimiento inicial de dos casillas
    if (fromRow === 0 && toCol === fromCol && toRow === fromRow + (direction * 2) &&
        !boardState[toRow][toCol] && !boardState[fromRow + direction][fromCol]) {
        return true;
    }

    // Captura diagonal
    if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction &&
        boardState[toRow][toCol] && boardState[toRow][toCol][1] === 'b') {
        return true;
    }

    return false;
}

function validateKingMove(from, to) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
}

function validateBishopMove(from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;

    const rowDirection = toRow > fromRow ? 1 : -1;
    const colDirection = toCol > fromCol ? 1 : -1;

    let currentRow = fromRow + rowDirection;
    let currentCol = fromCol + colDirection;

    while (currentRow !== toRow && currentCol !== toCol) {
        if (boardState[currentRow][currentCol]) return false;
        currentRow += rowDirection;
        currentCol += colDirection;
    }

    return true;
}

function validateQueenMove(from, to, boardState) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // La reina puede moverse como alfil o torre
    return validateBishopMove(from, to, boardState) ||
        (fromRow === toRow || fromCol === toCol);
}

function validateKnightMove(from, to) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
}

export function checkKingCaptured(boardState) {
    let whiteKingFound = false;
    let blackQueenFound = false;

    for (let row = 0; row < boardState.length; row++) {
        for (let col = 0; col < boardState[row].length; col++) {
            if (boardState[row][col] === 'Rb') whiteKingFound = true;
            if (boardState[row][col] === 'Qp') blackQueenFound = true;
        }
    }

    if (!whiteKingFound) return { winner: 'black', message: '¡El territorio negro ha gano esta batalla!' };
    if (!blackQueenFound) return { winner: 'white', message: '¡El territorio blanco ha gano esta batalla!' };
    return null;
}