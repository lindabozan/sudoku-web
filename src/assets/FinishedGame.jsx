import React from "react";

function FinishedGame({time}) {

    return(
        <>
            <div className="finished-stats">
                <h1 className="congratulations">CONGRATULATIONS!</h1>
                <div className="time">Your time= {Math.floor(time/60)} : {time - Math.floor(time/60)*60}</div>
            </div>
        </>
    )
}
export default FinishedGame;