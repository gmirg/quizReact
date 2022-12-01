import React from "react";
import Start from "./Start";

const Reset = () => {
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    };
    return (
        <div className='score-section'>
            You scored {score} out of {data.length}
            <button className='button' onClick={() => restartGame()}>START AGAIN</button>
        </div>
    )
}
export default Reset;