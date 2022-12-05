import React, { useState, useEffect } from "react";
// import {score, setScore, setCurrentQuestion, setShowScore, data} from "./Start";

const Reset = (props) => {
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const restartGame = () => {
        window.location.reload();
    };
    useEffect(() => {
        setData(props.data)
        setScore(props.score)
        setCurrentQuestion(props.currentQuestion)
        setShowScore(props.showScore)
    }, [])
    return (
        <div className='score-section'>
            You scored {score} out of {data.length}
            <button className='button' onClick={() => restartGame()}>START AGAIN</button>
        </div>
    )

}
export default Reset;