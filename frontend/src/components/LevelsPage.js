// src/LevelsPage.js
import React, { useState } from 'react';
import './LevelsPage.css';  // Add your custom styles for the LevelsPage

const LevelsPage = () => {
  const [levels, setLevels] = useState([
    { id: 1, title: 'Level 1', unlocked: true },
    { id: 2, title: 'Level 2', unlocked: false },
    { id: 3, title: 'Level 3', unlocked: false },
    { id: 4, title: 'Level 4', unlocked: false },
    { id: 5, title: 'Level 5', unlocked: false },
    { id: 6, title: 'Level 6', unlocked: false },
    { id: 7, title: 'Level 7', unlocked: false },
    { id: 8, title: 'Level 8', unlocked: false },
    { id: 9, title: 'Level 9', unlocked: false },
    { id: 10, title: 'Level 10', unlocked: false },
  ]);

  const handleLevelClick = (level) => {
    if (level.unlocked) {
      alert(`Navigating to ${level.title}`); // Replace with navigation logic to level details page
      // Here you can use navigate() to move to the level's detail page
    } else {
      alert(`Level ${level.id} is locked!`);
    }
  };

  const unlockNextLevel = () => {
    const unlockedLevels = levels.map((level, index) => {
      if (index === 0 || levels[index - 1].unlocked) {
        return { ...level, unlocked: true };
      }
      return level;
    });
    setLevels(unlockedLevels);
  };

  return (
    <div className="levels-page">
      <h2>Choose Your Level</h2>
      <div className="levels-container">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`level ${level.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => handleLevelClick(level)}
          >
            <p>{level.title}</p>
          </div>
        ))}
      </div>
      <button onClick={unlockNextLevel}>Unlock Next Level</button>
    </div>
  );
};

export default LevelsPage;
