import React from "react";

function NumberNotes() {

    const numbers = [1,2,3,4,5,6,7,8,9];
    const grid = Array.from({ length: 9 }, () => Array(9).fill(''));

    return (
        <>
            <div className="number-notes-container">
            <div className="number-notes">
                {grid.map((row, i) =>
                    <div className="row-notes" key={i}>
                        {row.map((col, j) => {
                            return (
                                <div className="column-notes" key={j}>
                                    {numbers.map((number, j) => {
                                        return (
                                            <button className="button-notes"
                                                    key={j}
                                                    onClick={() => {}}
                                                    value={j}>
                                                {number}
                                            </button>
                                        )
                                    })}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            </div>
        </>
    )
}
export default NumberNotes