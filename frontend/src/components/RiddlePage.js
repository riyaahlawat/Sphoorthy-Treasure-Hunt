import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";

const RiddlePage = () => {
  const { powerUps, setPowerUps } = useContext(GameContext);
  const { level } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [showCluePopup, setShowCluePopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPowerUpNotification, setShowPowerUpNotification] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);
  const [currentClue, setCurrentClue] = useState("");

  const riddles = {
    1: { 
      question: "I am the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. What am I?", 
      answers: ["ikigai"], 
      clues: [
        "I'm a Japanese concept that guides people to find their life's purpose.", 
        "Sphoorthy often talks about me as the sweet spot of passion, mission, and profession."
      ] 
    },
    // Other riddles remain unchanged
    2: { 
      question: "I'm Asokan's guiding principle, urging you to take control of your future. What am I?", 
      answers: ["destiny"], 
      clues: [
        "Think about how a captain controls the ship, even when the sea is rough.", 
        "I'm all about taking control and being responsible. Asokan says, 'Take charge of your ___'."
      ] 
    },
    3: { 
      question: "I'm what helps you debug that tricky segmentation fault or optimize your code when it runs too slow. What am I?", 
      answers: ["persistence"], 
      clues: [
        "You rely on me when you don't get the right answer the first time but keep testing different possibilities.", 
        "Anshul always reminds us in every DSA session that I am the key to mastering problem-solving, even when we struggle with tough problems."
      ] 
    },
    4: { 
      question: "What must you accept to achieve greatness?", 
      answers: ["failure"], 
      clues: [
        "I start with 'F' and often feel like a setback.", 
        "But, without me, success wouldn't be possible."
      ] 
    },
    5: { 
      question: "In which company did Sphoorthy begin her career, stepping into the world of technology and innovation?", 
      answers: ["ibm"], 
      clues: [
        "It is an American multinational technology company known for its iconic 'Think' slogan.", 
        "It starts with 'I' and has a legacy of over a century of transforming the tech landscape."
      ] 
    },
    6: { 
      question: "Whose presence in life can guide you, inspire you, and create wonders?", 
      answers: ["mentor"], 
      clues: [
        "This person shares wisdom and helps you grow.", 
        "Sphoorthy emphasizes the importance of this person in life, showing how they shape our journey."
      ] 
    },
    7: { 
      question: "What is a word that can mend situations and bring a sense of remorse when things don't go as planned?", 
      answers: ["sorry"], 
      clues: [
        "It's often used to show empathy or regret after a mistake or misunderstanding.", 
        "When you say this, Asokan remarks, 'My girlfriend doesn't wear a saree.'"
      ] 
    },
    8: { 
      question: "What approach, often used to solve complex problems, involves breaking down tasks into smaller, manageable steps and applying algorithms?", 
      answers: ["computational thinking"], 
      clues: [
        "This concept is key in programming, problem-solving, and creating efficient solutions.", 
        "There's a whole session on this, taught by Anshul, that focuses on how to approach problems systematically."
      ] 
    },
    9: { 
      question: "What is the practice that ensures your work is clear, understandable, and accessible for both current and future developers?", 
      answers: ["documentation"], 
      clues: [
        "You need this always, whether you're developing a project or learning a new framework or language.", 
        "Aruvi and Asokan be like, 'Read the _________.'"] 
    },
    10: { 
      question: "It's a flavorful and aromatic dish often made with rice, spices, and meat or vegetables.", 
      answers: ["biryani"], 
      clues: [
        "A well-known Hyderabadi dish, often enjoyed with raita or mirchi ka salan.", 
        "Kunisha's favorite dish."
      ] 
    }
  };

  const riddle = riddles[level];

  // Check URL parameters and localStorage for notifications
  useEffect(() => {
    // Check if we navigated from clue page
    const urlParams = new URLSearchParams(window.location.search);
    const clueParam = urlParams.get('clueIndex');
    const powerUpEarned = urlParams.get('powerUpEarned');
    
    // Check for clue index
    if (clueParam && !isNaN(parseInt(clueParam))) {
      const newClueIndex = parseInt(clueParam);
      if (newClueIndex > 0 && newClueIndex <= riddle.clues.length) {
        setClueIndex(newClueIndex);
      }
    }
    
    // Check if a power-up was just earned
    if (powerUpEarned === 'true' || localStorage.getItem('justEarnedPowerUp') === 'true') {
      setShowPowerUpNotification(true);
      
      // Clear the flag after showing notification
      localStorage.removeItem('justEarnedPowerUp');
      
      // Check if we need to update the power-ups from localStorage
      const storedPowerUps = localStorage.getItem('currentPowerUps');
      if (storedPowerUps && !isNaN(parseInt(storedPowerUps))) {
        setPowerUps(parseInt(storedPowerUps));
        localStorage.removeItem('currentPowerUps');
      }
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setShowPowerUpNotification(false);
      }, 3000);
    }
    
    // Clear URL parameters after reading them
    if (powerUpEarned || clueParam) {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [level, riddle.clues.length, setPowerUps]);

  const checkAnswer = () => {
    if (riddle.answers.includes(userAnswer.toLowerCase())) {
      navigate(`/level-complete/${level}`);
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  const useClue = () => {
    if (powerUps > 0 && clueIndex < 2) {
      // If user has powerups, show the clue
      const newClueIndex = clueIndex + 1;
      setClueIndex(newClueIndex);
      setCurrentClue(riddle.clues[newClueIndex - 1]);
      setPowerUps(powerUps - 1); // Deduct a powerup
      setShowCluePopup(true);
    } else if (powerUps <= 0) {
      // If no powerups, show error popup
      setShowErrorPopup(true);
    } else if (clueIndex >= 2) {
      // If all clues used
      alert("You've already used all available clues for this riddle.");
    }
  };

  const getPowerUp = () => {
    navigate(`/mini-games-menu?returnTo=${level}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.riddleCard}>
        <h1 style={styles.title}>Level - {level}</h1>
        <p style={styles.question}>{riddle.question}</p>

        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer here..."
          style={styles.input}
        />

        <button onClick={checkAnswer} style={styles.submitButton}>
          Submit
        </button>

        <p style={styles.clueText}>
          Powerups available: {powerUps} | Clues used: {clueIndex}/2
        </p>

        <div style={styles.buttonContainer}>
          <button
            onClick={useClue}
            style={styles.clueButton}
            disabled={powerUps <= 0 && clueIndex >= 2}
          >
            See Clues
          </button>

          <button 
            onClick={getPowerUp} 
            style={styles.powerupButton}
          >
            Get Powerup
          </button>
        </div>

        <button 
          onClick={() => navigate("/levels-page")} 
          style={styles.backButton}
        >
          Back
        </button>

        {/* Clue popup */}
        {showCluePopup && (
          <div style={styles.overlay}>
            <div style={styles.popup}>
              <h3 style={styles.clueTitle}>Clue #{clueIndex}</h3>
              <p style={styles.clueContent}>{currentClue}</p>
              <button
                onClick={() => setShowCluePopup(false)}
                style={styles.closeButton}
              >
                Got it!
              </button>
            </div>
          </div>
        )}

        {/* Error popup for no powerups */}
        {showErrorPopup && (
          <div style={styles.overlay}>
            <div style={styles.popup}>
              <h3 style={styles.clueTitle}>No Powerups Available</h3>
              <p style={styles.clueContent}>
                You need to earn powerups to see clues. Play mini-games to earn powerups!
              </p>
              <div style={styles.popupButtonContainer}>
                <button
                  onClick={() => navigate("/mini-games-menu")}
                  style={styles.clueButton}
                >
                  Play Mini-games
                </button>
                <button
                  onClick={() => setShowErrorPopup(false)}
                  style={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Power-up notification popup */}
        {showPowerUpNotification && (
          <div style={styles.notificationOverlay}>
            <div style={styles.notificationPopup}>
              <h3 style={styles.powerupTitle}>Power-Up Earned!</h3>
              <p style={styles.powerupContent}>
                Congratulations! You have earned a new power-up.
                <br />
                Total power-ups: {powerUps}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/images/wallpaper1.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  riddleCard: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFD700",
  },
  title: {
    color: "#FFD700",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  question: {
    color: "#FFD700",
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFD700",
    borderRadius: "5px",
    color: "#FFD700",
    marginBottom: "20px",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    color: "black",
    padding: "10px 30px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginBottom: "20px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  clueButton: {
    backgroundColor: "#8B4513",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
  },
  powerupButton: {
    backgroundColor: "#006400",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
  },
  backButton: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  clueText: {
    color: "#FFD700",
    marginBottom: "10px",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#2F4F4F",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #FFD700",
    color: "#FFD700",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  clueTitle: {
    color: "#FFD700",
    marginBottom: "15px",
  },
  clueContent: {
    color: "#FFD700",
    marginBottom: "20px",
  },
  closeButton: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "8px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  popupButtonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  // New styles for power-up notification
  notificationOverlay: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  notificationPopup: {
    backgroundColor: "#006400",
    padding: "15px",
    borderRadius: "10px",
    border: "2px solid #FFD700",
    color: "#FFD700",
    maxWidth: "300px",
    textAlign: "center",
    animation: "fadeInOut 3s forwards",
  },
  powerupTitle: {
    color: "#FFD700",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  powerupContent: {
    color: "#FFD700",
    fontSize: "1rem",
    lineHeight: "1.4",
  }
};

export default RiddlePage;