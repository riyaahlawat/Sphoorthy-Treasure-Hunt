import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const riddles = {
    1: { question: "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?", answer: "echo" },
    2: { question: "The more of me you take, the more you leave behind. What am I?", answer: "footsteps" },
    3: { question: "I have keys but open no locks. I have a space but no room. You can enter, but you can't go outside. What am I?", answer: "keyboard" },
    4: { question: "What has to be broken before you can use it?", answer: "egg" },
    5: { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" },
    6: { question: "What comes once in a minute, twice in a moment, but never in a thousand years?", answer: "m" },
    7: { question: "I am always hungry, I must always be fed. The finger I touch will soon turn red. What am I?", answer: "fire" },
    8: { question: "The more you remove from me, the bigger I get. What am I?", answer: "hole" },
    9: { question: "What has an endless supply of letters but starts empty?", answer: "mailbox" },
    10: { question: "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?", answer: "cloud" }
};

const RiddlePage = ({ unlockNextLevel }) => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const riddle = riddles[level];

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === riddle.answer) {
      unlockNextLevel(parseInt(level) + 1);
      navigate(`/level-complete/${level}`);
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Level {level} Riddle</h1>
      <p>{riddle.question}</p>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
        style={styles.input}
      />
      <button onClick={checkAnswer} style={styles.button}>Submit</button>
      <button onClick={() => navigate("/levels-page")} style={styles.backButton}>Back to Levels</button>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  input: { marginTop: '10px', padding: '10px', fontSize: '16px' },
  button: { margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  backButton: { marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default RiddlePage;
