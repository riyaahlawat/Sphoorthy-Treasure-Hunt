import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext"; // Import Context

const RiddlePage = () => {
  const { powerUps, setPowerUps } = useContext(GameContext); // ✅ Ensure increasePowerUps is Included
  const { level } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [showCluePopup, setShowCluePopup] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);

  const riddles = {
    1: { 
      question: "I am the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. What am I?", 
      answers: ["ikigai"], 
      clues: ["I’m a Japanese concept that guides people to find their life’s purpose.", 
              "Sphoorthy often talks about me as the sweet spot of passion, mission, and profession."] 
    },
    2: { 
      question: "I’m Asokan’s guiding principle, urging you to take control of your future. What am I?", 
      answers: ["destiny"], 
      clues: ["Think about how a captain controls the ship, even when the sea is rough.", 
              "I’m all about taking control and being responsible. Asokan says, ‘Take charge of your ___’."] 
    },
    3: { 
      question: "I’m what helps you debug that tricky segmentation fault or optimize your code when it runs too slow. What am I?", 
      answers: ["persistence"], 
      clues: ["You rely on me when you don’t get the right answer the first time but keep testing different possibilities.", 
              "Anshul always reminds us in every DSA session that I am the key to mastering problem-solving, even when we struggle with tough problems."] 
    }
  };
  const riddle = riddles[level];

  const checkAnswer = () => {
    if (riddle.answers.includes(userAnswer.toLowerCase())) {
      navigate(`/level-complete/${level}`);
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  const useClue = () => {
    if (powerUps > 0 && clueIndex < 2) {
      setPowerUps(powerUps - 1); 
      setShowCluePopup(true);
      setClueIndex(clueIndex + 1);
    } else {
      alert(clueIndex >= 2 ? "Both clues used!" : "No power-ups left!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Level {level} Riddle</h1>
      <p>{riddle.question}</p>
      <p><strong>Power-ups:</strong> {powerUps}</p>

      <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Enter your answer" style={styles.input} />
      <button onClick={checkAnswer} style={styles.button}>Submit</button>
      
      <button onClick={useClue} style={{ ...styles.clueButton, opacity: (powerUps > 0 && clueIndex < 2) ? 1 : 0.5 }} disabled={powerUps <= 0 || clueIndex >= 2}>
        See Clue ({2 - clueIndex} left)
      </button>

      <button onClick={() => navigate("/mini-games-menu")} style={styles.miniGamesButton}>Mini-Games</button>
      <button onClick={() => navigate("/levels-page")} style={styles.backButton}>Back to Levels</button>

      {showCluePopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Clue {clueIndex}</h3>
            <p>{riddle.clues[clueIndex - 1]}</p>
            <button onClick={() => setShowCluePopup(false)} style={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { marginTop: "10px", padding: "10px", fontSize: "16px" },
  button: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  clueButton: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#FF5722", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  miniGamesButton: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#FF9800", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  backButton: { marginTop: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" },

  // Popup Styles
  popupOverlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center"
  },
  popup: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center", maxWidth: "300px"
  },
  closeButton: {
    marginTop: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#FF5722",
    color: "white", border: "none", borderRadius: "5px", cursor: "pointer"
  }
};

export default RiddlePage;
