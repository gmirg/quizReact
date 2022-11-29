import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const Questions = () => {
    fetch('https://opentdb.com/api.php?amount=50&category=32&type=multiple')
      .then(res => res.json())
      .then(function (json) {
        let results = json.results;
        let random = results.sort(() => .5 - Math.random()).slice(0, 10);
        let incorrect = [];
        let correct = [];
        random.forEach(element => {
          incorrect.push(element.incorrect_answers);
          correct.push(element.correct_answer);
        });
        incorrect.forEach((element, i) => {
          incorrect[i].splice(Math.floor(Math.random() * (incorrect.length + 1)), 0, correct[i])
        }
        )
        setAnswers(incorrect)
        setData(random);
        console.log(data)
        console.log(answers)
      });
  }
  useEffect(() => {
    Questions()
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data])
  const checkAnswer = (value) => {
    if (value === data[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }
  return (
    <div className="App">
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {data.length}
          <button className='button'>START AGAIN</button>
        </div>
      ) : (
        <>
          <div className='score-section'>You got {score} questions right</div>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>
            </div>
            <div className='question-text'>{data && data.length > 0 && data[currentQuestion].question}</div>
          </div>
          <div className='answer-section'>
            <input
              className="answer-button"
              type="button"
              onClick={(e) => checkAnswer(e.target.value)}
              value={answers && answers.length > 0 && answers[currentQuestion][0]} />
            <input
              className="answer-button"
              type="button"
              onClick={(e) => checkAnswer(e.target.value)}
              value={answers && answers.length > 0 && answers[currentQuestion][1]} />
            <input
              className="answer-button"
              type="button"
              onClick={(e) => checkAnswer(e.target.value)}
              value={answers && answers.length > 0 && answers[currentQuestion][2]} />
            <input
              className="answer-button"
              type="button"
              onClick={(e) => checkAnswer(e.target.value)}
              value={answers && answers.length > 0 && answers[currentQuestion][3]} />
          </div>
        </>
      )}
    </div>
  )
}
export default App;