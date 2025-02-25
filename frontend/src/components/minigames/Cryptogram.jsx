import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GameContext } from "../../context/GameContext";

const questions = [
  {
    title: "Simple Shift Cipher",
    encrypted: "BQQMF",
    decrypted: "APPLE",
    prompt: "What is the encryption of MANGO?",
    answer: "NBPHQ",
  },
  {
    title: "Reverse Alphabet Cipher",
    encrypted: "GSRH",
    decrypted: "THIS",
    prompt: "What is the encryption of HIVVZI?",
    answer: "SECRET",
  },
];

const CryptogramGame = () => {
  const { powerUps, setPowerUps, answeredQuestions, setAnsweredQuestions } = useContext(GameContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    const safeAnsweredQuestions = Array.isArray(answeredQuestions) ? answeredQuestions : [];
    const availableQuestions = questions.filter((_, index) => !safeAnsweredQuestions.includes(index));

    if (availableQuestions.length === 0) {
      if (setAnsweredQuestions) setAnsweredQuestions([]);
      setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
    } else {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      const originalIndex = questions.indexOf(availableQuestions[randomIndex]);
      setCurrentQuestionIndex(originalIndex);
    }
  }, [answeredQuestions, setAnsweredQuestions, location.search]);

  const handleSubmit = () => {
    if (!userAnswer) return;
    if (userAnswer.toUpperCase() === questions[currentQuestionIndex].answer) {
      if (setAnsweredQuestions) setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (setPowerUps) setPowerUps((powerUps || 0) + 1);
      setFeedback("Correct! You earned a power-up!");
      setShowSuccess(true);
      setTimeout(() => navigate("/riddle/1"), 2000);
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  const handleBack = () => navigate("/mini-games-menu");

  if (currentQuestionIndex === null) return <div>Loading...</div>;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="game-container">
      <div className="game-box">
        <h3>{currentQuestion.title}</h3>
        <p><b>Pattern:</b></p>
        <p><b>Encrypted:</b> {currentQuestion.encrypted}</p>
        <p><b>Decrypted:</b> {currentQuestion.decrypted}</p>
        <p>❓ {currentQuestion.prompt}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleBack}>Back</button>
        {feedback && <p>{feedback}</p>}
      </div>
      {showSuccess && <div className="success-popup">Success! Redirecting...</div>}
    </div>
  );
};

export default CryptogramGame;
