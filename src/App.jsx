import Board from "./assets/Board.jsx";
import StartGame from "./assets/StartGame.jsx";
import SubmitButton from "./assets/SubmitButton.jsx";
import generateSudoku from './GenerateSudoku.js';
import NumberBoard from "./assets/NumberBoard.jsx";
import FinishedGame from "./assets/FinishedGame.jsx";
import Level from "./assets/Level.jsx";

import './CSS/Board.css'
import './CSS/StartGame.css'
import './CSS/App.css'
import './CSS/SubmitGame.css';
import './CSS/NumberBoard.css';
import './CSS/FinishedGame.css';
import './CSS/Level.css';

import {useState, useEffect} from "react";



function App() {
    const [visibleStart, setVisible] = useState(true); //Button erase
    const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill('')));
    const [solution, setSolution] = useState({});
    const [board,setBoard] = useState(Array.from({ length: 9 }, () => Array(9).fill('')));

    const [wrongCells, setWrongCells] = useState([]);
    const [defaultCells, setDefaultCells] = useState([]);

    const[numberBoard, setNumberBoard] = useState(null);
    const[clickOnBoard, setClickOnBoard] = useState(null);

    const [visibleFinish, setVisibleFinish] = useState(false);

    const [second, setSecond] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [stopTime, setStopTime] = useState(false);

    const [candidate, setCandidate] = useState(false);
    const [numberBoardCopy, setNumberBoardCopy] = useState(null);



    const restartGame = () => {
        setGrid(board);
        setWrongCells([]);
        setNumberBoardCopy(null);
        setClickOnBoard(null);
        setSecond(0);

    }
    const generateNewBoard = (level) => {
        setTimerRunning(true);
        setClickOnBoard([]);

        const [solved, unsolved] = generateSudoku(level);
        setBoard(unsolved);
        const defaultIndex = [];
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                if(unsolved[i][j] !== '') {
                    defaultIndex.push([i, j]);
                }
            }
        }
        setSecond(0);
        setDefaultCells(defaultIndex);
        setGrid(unsolved);
        setSolution(solved);
        setVisible(false);
    }

    const checkAnswers= () => {
        const wrong = [];
        for(let i = 0; i<9; i++){
            for(let j = 0; j<9; j++){
                if(grid[i][j] !== ''){
                    if(grid[i][j] !== solution[i][j]){
                        wrong.push([i, j]);
                    }
                }
            }
        }
        if(wrong.length === 0){
            if(checkIfSolved()) {
                setVisibleFinish(true);
            }
        }
        setWrongCells(wrong);
    }

    function checkIfSolved(){
        for(let i = 0; i<9; i++){
            for(let j = 0; j<9; j++){
                if(grid[i][j] === ''){
                        return false;
                    }
                if(grid[i][j] !== solution[i][j]){
                    return false;
                }
            }
        }
        return true;
    }
    const setCellClicked = (row_index, col_index) => {
            setClickOnBoard([row_index, col_index]);
    }
    const chooseNumber = (number)=>{
        setNumberBoard(number)
    }
    function setTimer(){
        if(timerRunning) {
            setTimerRunning(false);
            setStopTime(true);
        } else{
            setTimerRunning(true);
            setStopTime(false)
        }
    }
    useEffect(() => {
        if (numberBoard !== null && clickOnBoard.length > 0) {
            const [i, j] = clickOnBoard;
            const newGrid = grid.map((row, row_index) => {
                return row.map((col, col_index) => {
                    if (i === row_index && j === col_index) {
                        return numberBoard;
                    }
                    return col;
                });
            });
            setGrid(newGrid);
            setNumberBoardCopy(numberBoard);

            setNumberBoard(null);
            setClickOnBoard([]);
        }
    }, [grid, numberBoard, clickOnBoard]);

    useEffect(() => {
        let timer;
        if(timerRunning && stopTime === false){
            timer = setInterval(() => {
                setSecond((second) => {
                    return second + 1;
                });
                }, 1000)
        }
        return () => {clearInterval(timer);}
    }, [timerRunning, stopTime]);

    function setCandidateMode() {
        if(candidate === false) setCandidate(true);
        else setCandidate(false);
    }


    //-------------------------------------------------------------------------
    return (
        <>
            <div className="header">
                <h1 className="h1">
                    <span className='h1-wrapper'>
                        SUDOKU
                    </span>
                </h1>
                <Level className="level"
                        setLevel={(lev) => generateNewBoard(lev)}/>
                <div className="timer-container">
                    <button className="stop"
                            id="stop" type="reset"
                            onClick={setTimer}>{timerRunning ? "||" : ">"}
                    </button>
                    <label className="timer"
                           htmlFor="stop">{Math.floor(second/60)} : {second - Math.floor(second/60)*60}</label>
                </div>

            </div>

            <div className="game-container">
                    <Board className="Board"
                        grid={grid}
                        setGrid={setGrid}
                        defaultCells={defaultCells}
                        wrongCells={wrongCells}

                        setCellClicked={setCellClicked}
                        candidate = {candidate}

                        numberBoardCopy = {numberBoardCopy}

                    />
                <NumberBoard className="NumberBoard"
                             numberClicked={chooseNumber}
                             setCandidate={setCandidateMode}
                             candidate={candidate}
                             restartGame={restartGame}/>
                <SubmitButton className="SubmitButton"
                              submitGame={checkAnswers}/>

            </div>

            {visibleStart && (<StartGame className="StartGame" startGame={()=>generateNewBoard(45)}/>)}
            {visibleFinish && (<FinishedGame className="FinishedGame" time={second}/>)}

        </>
    )
}

export default App
