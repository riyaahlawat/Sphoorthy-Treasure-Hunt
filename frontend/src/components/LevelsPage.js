import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext"; // Import Context

const LevelsPage = () => {
  const { unlockedLevels } = useContext(GameContext); // ✅ Get unlocked levels from Context
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);

  // ✅ Ensure Levels Page Re-renders when Unlocked Levels Update
  useEffect(() => {
    setLevels(unlockedLevels);
  }, [unlockedLevels]);

  const handleLevelClick = (level) => {
    if (levels.includes(level)) {
      navigate(`/riddle/${level}`);
    }
  };

  const renderLevelButton = (level) => {
    const isUnlocked = levels.includes(level);
    return (
      <button
        key={level}
        style={{
          ...styles.levelButton,
          backgroundColor: isUnlocked ? "#4CAF50" : "#ccc",
          cursor: isUnlocked ? "pointer" : "not-allowed",
        }}
        onClick={() => isUnlocked && handleLevelClick(level)}
        disabled={!isUnlocked}
      >
        Level {level}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <h1>Levels Page</h1>
      <div style={styles.levelsContainer}>
        {Array.from({ length: 10 }, (_, index) => renderLevelButton(index + 1))}
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  levelsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    marginTop: "30px",
  },
  levelButton: {
    padding: "20px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "none",
    color: "white",
  },
};

export default LevelsPage;
