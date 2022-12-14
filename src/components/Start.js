import { useState, useEffect, useRef } from 'react';
import Reset from './Reset'

/**
 * Componente que inicia el juego
 * @component
 * @states data, answers, currentQuestion, score, showScore, start
 * @ref inputElement
 * 
 */
const Start = () => {
    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const inputElement = useRef();
    const [start, setStart] = useState(false);
    // Coge 50 preguntas de la API, luego coge 10 de esas aleatoriamente, con esto busco que se repitan lo menos posible cada vez.
    const Questions = () => {
        fetch('https://opentdb.com/api.php?amount=50&category=32&type=multiple')
            .then(res => res.json())
            .then(function (json) {
                let results = json.results;
                let random = results.sort(() => .5 - Math.random()).slice(0, 10);
                // Separamos las respuestas correctas e incorrectas
                let incorrect = [];
                let correct = [];
                random.forEach(element => {
                    incorrect.push(element.incorrect_answers);
                    correct.push(element.correct_answer);
                });
                // las mezclamos para que no se repitan en la misma posicion
                incorrect.forEach((element,i) => {
                    incorrect[i].splice(Math.floor(Math.random() * (incorrect.length + 1)), 0, correct[i])
                }
                )
                let answersMix = incorrect;
                setAnswers(answersMix) // respuestas en la misma posición que las preguntas, pero mezcladas
                setData(random);    // preguntas y respuestas
            });
    }
    // Evita que se muestre vacio antes de hacer el fetch
    useEffect(() => {
        setStart(true)
    }, [])
    useEffect(() => {
        if (start) {
            Questions()
        }
    }, [start])
    //Esto es solamente para manejar mas facilmente el timeout
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };
    // Comprueba si la respuesta del usuario es correcta con los datos recogidos de la API
    const checkAnswer = (value, e) => {
        if (value === data[currentQuestion].correct_answer) { //Si es correcta subimos unn punto la puntuación
            setScore(score + 1);
            e.classList.add("correct") // En verde marcamos que es  correcta 
        } else {
            e.classList.add("incorrect") // En rojo marcamos que es incorrecta
        }
        //  pregunta
        const nextQuestion = currentQuestion + 1;
       // Limpia los colores de respuesta y si todavía quedan preguntas pasamos a la siguiente y si no cambiamos el estado para mostrar el resultado 
        delay(500, () => {
            e.classList.remove("correct") || e.classList.remove("incorrect")
            if (nextQuestion < data.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
        });
    }
    return (

        <div className="start">
            {data.length === 0 ? <div className='score-section'>
                <img src='qmark.gif' alt='?' ></img>
            </div> :
                showScore ? (
                   <Reset score = {score} data = {data} showScore = {showScore} currentQuestion ={currentQuestion} />
                ) : (
                    <>
                        <div className='score-section'>You got {score} questions right</div>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>
                            </div>
                            <div className='question-text' dangerouslySetInnerHTML={{ __html: data && data.length > 0 && data[currentQuestion].question }}></div>
                        </div>
                        <div className='answer-section'>
                            <input
                                className="answer-button"
                                ref={inputElement}
                                type="button"
                                onClick={(e) => checkAnswer(e.target.value, e.target)}
                                value= {answers && answers.length > 0 && answers[currentQuestion][0]} />
                            <input
                                className="answer-button"
                                ref={inputElement}
                                type="button"
                                onClick={(e) => checkAnswer(e.target.value, e.target)}
                                value={answers && answers.length > 0 && answers[currentQuestion][1]} />
                            <input
                                className="answer-button"
                                ref={inputElement}
                                type="button"
                                onClick={(e) => checkAnswer(e.target.value, e.target)}
                                value={answers && answers.length > 0 && answers[currentQuestion][2]} />
                            <input
                                className="answer-button"
                                ref={inputElement}
                                type="button"
                                onClick={(e) => checkAnswer(e.target.value, inputElement.current)}
                                value={answers && answers.length > 0 && answers[currentQuestion][3]} />
                        </div>
                    </>
                )}
        </div>
    )
}

export default Start;