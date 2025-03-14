import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/riddle-bg-music.mp3";
import submitSound from "../assets/sound-effects/riddle-button-click.mp3";
import cluePowerUpSound from "../assets/sound-effects/riddle-cluepowerup-button.mp3";
import backSound from "../assets/sound-effects/button-click.mp3";
import backgroundImg from "../assets/images/bg11.b.jpg";
import neutralImg from "../assets/images/neutral.png";
import sadImg from "../assets/images/sad.png";
import happyImg from "../assets/images/happy.png";

const RiddlePage = () => {
  const { powerUps, setPowerUps, unlockedLevels } = useContext(GameContext);
  const { level } = useParams();
  const navigate = useNavigate();
  const [userAnswer, setUserAnswer] = useState("");
  const [showCluePopup, setShowCluePopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showPowerUpNotification, setShowPowerUpNotification] = useState(false);
  const [showNoClues, setShowNoClues] = useState(false);
  const [clueIndex, setClueIndex] = useState(0);
  const [currentClue, setCurrentClue] = useState("");
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playSubmitSound, setPlaySubmitSound] = useState(false);
  const [playCluePowerUpSound, setPlayCluePowerUpSound] = useState(false);
  const [playBackSound, setPlayBackSound] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [imageSrc, setImageSrc] = useState(neutralImg); // Default to neutral image

  const riddles = {
    1: {
      question:
        "I am the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. What am I?",
      answers: ["ikigai"],
      clues: [
        "I'm a Japanese concept that guides people to find their life's purpose.",
        "Sphoorthy often talks about me as the sweet spot of passion, mission, and profession.",
      ],
    },
    // ... other riddles ...
  };

  const riddle = riddles[level];

  useEffect(() => {
    // Start the background music when the component mounts
    setPlayBackgroundMusic(true);

    // Check if the level is unlocked
    if (!unlockedLevels.includes(parseInt(level))) {
      alert("You haven't unlocked this level yet!");
      navigate("/levels-page"); // Redirect to levels page
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const powerUpEarned = urlParams.get("powerUpEarned");
    const returnToLevel = urlParams.get("returnTo") || level;

    // Retrieve stored clueIndex (if exists)
    const storedClueIndex = localStorage.getItem(`clueIndex-${level}`);
    if (storedClueIndex !== null) {
      setClueIndex(parseInt(storedClueIndex, 10)); // Persist clue usage
    }

    if (powerUpEarned === "true") {
      setShowPowerUpNotification(true);

      setTimeout(() => {
        setShowPowerUpNotification(false);
        navigate(`/riddle/${returnToLevel}`);
      }, 3000);
    }

    window.history.replaceState({}, document.title, window.location.pathname);
  }, [level, navigate, unlockedLevels]);

  const checkAnswer = () => {
    // Play the submit button sound
    setPlaySubmitSound(true);
    // Delay the answer check until the sound finishes playing
    setTimeout(() => {
      if (riddle.answers.includes(userAnswer.toLowerCase())) {
        setImageSrc(happyImg); // Change image to happy.png on correct answer
        setFeedback("Correct! You solved the riddle!");
        // Navigate to next level or completion page
        if (parseInt(level) === 20) {
          navigate("/final-level-complete");
        } else {
          navigate(`/level-complete/${level}`);
        }
      } else {
        setImageSrc(sadImg); // Change image to sad.png on wrong answer
        setFeedback("Oops! Wrong answer. Try again.");
      }
    }, 500); // Adjust the delay to match the sound duration
  };

  const useClue = () => {
    setPlayCluePowerUpSound(true);

    if (powerUps > 0 && clueIndex < 2) {
      const newIndex = clueIndex + 1;
      setClueIndex(newIndex);
      setCurrentClue(riddle.clues[newIndex - 1]);

      // Store updated clueIndex in localStorage
      localStorage.setItem(`clueIndex-${level}`, newIndex);

      navigate(`/riddle/${level}?clueIndex=${newIndex}`, { replace: true });

      setPowerUps((prev) => prev - 1);
      setShowCluePopup(true);
    } else if (clueIndex >= 2) {
      setShowNoClues(true);
    } else if (powerUps <= 0 && clueIndex < 2) {
      setShowErrorPopup(true);
    }
  };

  const getPowerUp = () => {
    setPlayCluePowerUpSound(true);
    setTimeout(() => {
      navigate(`/mini-games-menu?returnTo=${level}&clueIndex=${clueIndex}`);
    }, 500);
  };

  const goBack = () => {
    setPlayBackSound(true);
    setTimeout(() => {
      navigate("/levels-page");
    }, 500);
  };

  return (
    <div style={styles.container}>
      {/* Image positioned at the bottom left */}
      <div style={styles.imageContainer}>
        <img src={imageSrc} alt="Feedback" style={styles.feedbackImage} />
      </div>

      {/* Overlay and Riddle Card */}
      <div style={styles.overlay}>
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

          {feedback && <p style={styles.feedbackText}>{feedback}</p>}

          <p style={styles.clueText}>
            Powerups available: {powerUps} | Clues used: {clueIndex}/2
          </p>

          <div style={styles.buttonContainer}>
            <button onClick={useClue} style={styles.clueButton}>
              See Clues
            </button>
            <button onClick={getPowerUp} style={styles.powerupButton}>
              Get Powerup
            </button>
          </div>

          <button onClick={goBack} style={styles.backButton}>
            Back
          </button>

          {/* Popups */}
          {showCluePopup && (
            <div style={styles.overlay}>
              <div style={styles.popup}>
                <h3 style={styles.clueTitle}>Clue #{clueIndex}</h3>
                <p style={styles.clueContent}>{currentClue}</p>
                <button
                  onClick={() => {
                    setPlayCluePowerUpSound(true); // Play the cluePowerUpSound
                    setShowCluePopup(false); // Close the popup
                  }}
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
                  You need to earn powerups to see clues. Play mini-games to earn
                  powerups!
                </p>
                <div style={styles.popupButtonContainer}>
                  <button
                    onClick={() =>
                      navigate(
                        `/mini-games-menu?returnTo=${level}&clueIndex=${clueIndex}`
                      )
                    }
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

          {/* No Clues Left Popup */}
          {showNoClues && (
            <div style={styles.overlay}>
              <div style={styles.popup}>
                <h3 style={styles.clueTitle}>No Clues Left</h3>
                <p style={styles.clueContent}>
                  You've already used all available clues for this riddle.
                </p>
                <button
                  onClick={() => setShowNoClues(false)}
                  style={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Sound
        url={bgMusic}
        playStatus={playBackgroundMusic ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true} // Loop the background music
        volume={50} // Adjust the volume (0 to 100)
      />

      {/* Submit Button Sound */}
      <Sound
        url={submitSound}
        playStatus={playSubmitSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlaySubmitSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />

      {/* Clue/Powerup Button Sound */}
      <Sound
        url={cluePowerUpSound}
        playStatus={playCluePowerUpSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayCluePowerUpSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />

      {/* Back Button Sound */}
      <Sound
        url={backSound}
        playStatus={playBackSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayBackSound(false)} // Reset the state after the sound finishes
        volume={100} // Adjust the volume (0 to 100)
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#003F66",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    overflow: "hidden",
  },
  imageContainer: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 2, // Ensure the image is above the overlay
  },
  feedbackImage: {
    width: "280px", // Adjust as needed
    height: "280px", // Adjust as needed
  },
  overlay: {
    opacity: 0.9,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(139, 69, 19, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  riddleCard: {
    backgroundColor: "#1C1C1C",
    padding: "40px",
    borderRadius: "15px",
    maxWidth: "600px",
    width: "100%",
    border: "2px solid #FFC72C",
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#FFC72C",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  question: {
    color: "#FFC72C",
    fontSize: "1.2rem",
    marginBottom: "30px",
    lineHeight: "1.6",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  input: {
    width: "100%",
    padding: "10px 1px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #FFC72C",
    borderRadius: "5px",
    color: "#FFC72C",
    marginBottom: "20px",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#FFC72C",
    color: "black",
    padding: "10px 30px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    marginBottom: "20px",
    width: "100%",
    textAlign: "center",
  },
  feedbackText: {
    color: "#FFC72C",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  clueText: {
    color: "#FFC72C",
    marginBottom: "10px",
    textAlign: "center",
    fontFamily: "'MedievalSharp', cursive",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    width: "100%",
  },
  clueButton: {
    backgroundColor: "#004F6D",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    width: "100%",
  },
  powerupButton: {
    backgroundColor: "#001EFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1,
    width: "100%",
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
  popup: {
    backgroundColor: "#1C1C1C",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #FFC72C",
    color: "#FFC72C",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
  },
  clueTitle: {
    color: "#FFC72C",
    marginBottom: "15px",
  },
  clueContent: {
    color: "#FFC72C",
    marginBottom: "20px",
    fontFamily: "'MedievalSharp', cursive",
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
  notificationOverlay: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1000,
  },
  notificationPopup: {
    backgroundColor: "#004F6D",
    padding: "15px",
    borderRadius: "10px",
    border: "2px solid #FFC72C",
    color: "#FFC72C",
    maxWidth: "300px",
    textAlign: "center",
    animation: "fadeInOut 3s forwards",
  },
  powerupTitle: {
    color: "#FFC72C",
    marginBottom: "10px",
    fontSize: "1.2rem",
  },
  powerupContent: {
    color: "#FFC72C",
    fontSize: "1rem",
    lineHeight: "1.4",
    fontFamily: "'MedievalSharp', cursive",
  },
};

export default RiddlePage;