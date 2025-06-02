import React from "react";
import MyIcon from "./MyIcon.jsx";

export default function NumberBoard({numberClicked, setCandidate, candidate, restartGame}) {

    function chooseNumber(index) {
        numberClicked(index);
    }

    const numberBoard = Array.from({length: 9}, (_,i)=> i+1);
    return(
        <div className="number-board-container">
        <div className="number-board">
            {numberBoard.map((number, index) => (
                <button className="numberButton"
                        key ={index}
                        onClick={() => {chooseNumber(number)}
                        }
                >
                    {number}
                </button>
            ))
            }
            <div className="candidate-mode">
                <button className={candidate ? 'candidate-mode-focus' : 'candidate-mode-button'}
                        onClick={setCandidate}>
                    Candidate Mode
                </button>
            </div>
        </div>
    <button className="restart-game"
            onClick={restartGame}>
        <MyIcon width={25} height={25} style={{ color: '#EC025DFF' }} />
    </button>
        </div>

    )
}
