import React from "react";


function SubmitButton({submitGame}) {
    return (
        <div className="submit-game">
            <button
                className="submitButton"
                onClick={submitGame}
            >
                SUBMIT
        </button>
    </div>

    )
}
export default SubmitButton;