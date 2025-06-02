function checkValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }
    return true;
}

export default function isEasilySolvable(board) {
    const boardCopy = board.map(row => [...row]);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boardCopy[i][j] === '') {
                for (let n = 1; n <= 9; n++) {
                    if (checkValid(boardCopy, i, j, n)) {
                        boardCopy[i][j] = n;
                        if (isEasilySolvable(boardCopy)) {
                            return true;
                        }
                        boardCopy[i][j] = '';
                    }
                }
                return false;
            }
        }
    }

    return true;
}