import SudokuSolved from './SudokuPatterns/SudokuSolved.json';
import isEasilySolvable from './IsEasilySolvable.js';

export default function generateSudoku  (level) {

    const sudokuArray = SudokuSolved.sudokuSolved;

    if(sudokuArray.length === 0){
        return null;
    }

    const newRandomSudoku = (sudokuArray) => {
        let randomIndex = Math.floor(Math.random() * sudokuArray.length);
        return sudokuArray[randomIndex];
    }

    const grid = newRandomSudoku(sudokuArray);
    const gridCopy = JSON.parse(JSON.stringify(grid));
    const maxAttempts = 1000;

    let i = 0;
    let attempts = 0;

    while (i < level && attempts < maxAttempts) {
        attempts++;
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);

        if (gridCopy[randomRow][randomCol] !== '') {
            const value = gridCopy[randomRow][randomCol];
            gridCopy[randomRow][randomCol] = '';
            if (isEasilySolvable(gridCopy)) {
                i++;
            } else gridCopy[randomRow][randomCol] = value;
            }
        }

    return [grid, gridCopy];
}
