import NumberBoard from "./NumberBoard.jsx";
import React, { useState} from "react";


function Board({ grid,
                   setGrid,
                   defaultCells,
                   wrongCells,
                   setCellClicked ,
                   candidate,
                   numberBoardCopy }) {

    const numbers = [1,2,3,4,5,6,7,8,9];
    const [notesGrid, setNotesGrid] = useState(
        Array.from(Array.from({ length: 9 }, () => Array(9).fill([]))));
    const [boardSelected, setBoardSelected] = useState([]);
    const [usedCells, setUsedCells] = useState([]);

    function handleCellChange(num, row_index, col_index) {
        const value = num === '' ? '' : parseInt(num, 10);
        if ((value > 0 && value < 10) || value === '') {
            const newGrid = grid.map((row, i)=> {
                return row.map((col, j)=> {
                    if (j === col_index && i === row_index) {
                        return parseInt(value);
                    } return col;
                })
            });
            usedCellsInGrid();
            setGrid(newGrid);
            if(value !== '')
                deleteNoteNumbers(value, row_index, col_index);
        }
    }

    function handleCellClick(number, row_index, col_index) {
        setCellClicked(row_index, col_index);

        const isAlreadyClickedNumber = (number) => {
            return notesGrid[row_index][ col_index].some((i) => i === number);
        }

        if (isAlreadyClickedNumber(number)) {
            setNotesGrid((prevNotes) => {
                const newNotes = prevNotes.map((row) => row.map((cell) => [...cell]));
                newNotes[row_index][col_index] = newNotes[row_index][col_index].filter(n => n !== number);
                return newNotes;
            });
        }

        const value = number === '' ? '' : parseInt(number, 10);
        (row_index !== null && col_index !== null) ?
            setBoardSelected([...boardSelected,[row_index, col_index]]) : setBoardSelected([row_index,col_index]);

        if(value !== '')
            deleteNoteNumbers(value, row_index, col_index);
        usedCellsInGrid();
    }

    function handleSelectedNumbers(number, i, j) {
        setNotesGrid((prevNotes) => {
                const newNotes = prevNotes.map((row) => [...row]);
                const cellNotes = newNotes[i][j];

                if(cellNotes.includes(number)) {
                    newNotes[i][j] = cellNotes.filter(n => n !== number);
                } else {
                    newNotes[i][j] = [...cellNotes, number];
                }
                return newNotes;
            }
        )
    }

    function usedCellsInGrid() {
        const index = [];
        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== '') {
                    index.push([i, j]);
                }
            });
        });
        setUsedCells(index);
    }

    function deleteNoteNumbers(number, row, col) {

        setNotesGrid(prevNotes => {
            const newNotes = prevNotes.map(row => row.map(cell => [...cell]));
            for (let i = 0; i < 9; i++) {
                newNotes[row][i] = newNotes[row][i].filter(n => n !== number);
            }

            for (let i = 0; i < 9; i++) {
                newNotes[i][col] = newNotes[i][col].filter(n => n !== number);
            }

            const boxRowStart = Math.floor(row / 3) * 3;
            const boxColStart = Math.floor(col / 3) * 3;
            for (let i = boxRowStart; i < boxRowStart + 3; i++) {
                for (let j = boxColStart; j < boxColStart + 3; j++) {
                    newNotes[i][j] = newNotes[i][j].filter(n => n !== number);
                }
            }
            return newNotes;
        });
    }


    return (
        <div className="board">
            {grid.map((row, row_index) =>
                <div className="row" key={row_index}>
                    {row.map((cell, col_index) => {
                        const isWrongCell = wrongCells.some(([x, y]) => row_index === x && col_index === y);
                        const isDefaultCell = defaultCells.some(([x, y]) => row_index === x && col_index === y);
                        const clickedCell = boardSelected!== null ?
                            boardSelected.some(([x, y]) => row_index === x && col_index === y) : false;
                        const usedCell = usedCells.some(([x, y]) => row_index === x && col_index === y);

                        return (
                            <div className="column" key={col_index}>
                                <input
                                    className={`${isWrongCell ? "cell-wrong" : "cell-input"}
                                                ${isDefaultCell ? "cell-default" : "cell-input"}`.trim()
                                    }
                                    type="text"
                                    min="1"
                                    max="9"
                                    onClick={() => handleCellClick(numberBoardCopy, row_index, col_index)}
                                    onChange={(e) =>
                                        handleCellChange(e.target.value,row_index, col_index)}
                                    value={cell}
                                />
                                {!isDefaultCell && candidate &&  clickedCell && !usedCell && (
                                    <div className="notes-container" id={`${row_index}:${col_index}`}>
                                        {numbers.map((number) => (
                                            <button
                                                className={notesGrid[row_index][col_index].includes(number) ?
                                                    "note-number-active" : "note-number"}
                                                key={number}
                                                onClick={() => handleSelectedNumbers(number, row_index, col_index)}
                                            >
                                                {number}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
export default Board;