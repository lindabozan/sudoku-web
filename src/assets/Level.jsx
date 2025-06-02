import React from "react";

function Level({ setLevel }) {
    return (
        <>
            <div className="level">
                <button className="easy" onClick={() => setLevel(45)}>EASY</button>
                <button className="medium" onClick={() => setLevel(51)}>MEDIUM</button>
                <button className="hard" onClick={() => setLevel(58)}>HARD</button>
            </div>
        </>
    )
}
export default Level;