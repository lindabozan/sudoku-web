import React from 'react';
import '../CSS/StartGame.css'; // Correct import for CSS file

function StartGame({ startGame }) {
    return (
        <div className="start">
            <h1 className="h1-title">
                <span className="shine-wrapper">SUDOKU</span>
            </h1>

            <button
                className="start-button"
                onClick={startGame}
            >
                Start Game
            </button>
        </div>
    );
}

export default StartGame;
