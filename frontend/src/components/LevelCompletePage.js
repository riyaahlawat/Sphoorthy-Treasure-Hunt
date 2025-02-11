import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { GameContext } from "../context/GameContext"; // Import Context

const LevelCompletePage = () => {
  const { unlockNextLevel, unlockedLevels } = useContext(GameContext); // Use Unlock Function
  const { level } = useParams();
  const navigate = useNavigate();
  const nextLevel = parseInt(level) + 1;

  useEffect(() => {
    if (!unlockedLevels.includes(nextLevel)) {
      unlockNextLevel(nextLevel); // Unlock Level on Load
      updateProgress(nextLevel); // Call API to update in DB
    }
  }, [nextLevel, unlockedLevels, unlockNextLevel]);

  // Function to update backend
  const updateProgress = async (nextLevel) => {
    try {
      const username = localStorage.getItem("username"); // Assuming username is stored
      await axios.post("http://localhost:5000/api/users/update-progress", {
        username,
        nextLevel,
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Congratulations! 🎉</h1>
      <p>You have completed Level {level}!</p>
      <button onClick={() => navigate(`/riddle/${nextLevel}`)} style={styles.nextButton}>Go to Level {nextLevel}</button>
      <button onClick={() => navigate("/levels-page")} style={styles.backButton}>Back to Levels</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  nextButton: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  backButton: { marginTop: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default LevelCompletePage;
