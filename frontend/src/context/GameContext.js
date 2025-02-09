import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const savedLevels = localStorage.getItem("unlockedLevels");
    return savedLevels ? JSON.parse(savedLevels) : [1]; // Default: Level 1 unlocked
  });

  const [solvedLevels, setSolvedLevels] = useState([]);
  const [powerUps, setPowerUps] = useState(0);

  useEffect(() => {
    localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
  }, [unlockedLevels]); 

  const unlockNextLevel = (nextLevel) => {
    setUnlockedLevels((prevLevels) => {
      if (!prevLevels.includes(nextLevel)) {
        const updatedLevels = [...prevLevels, nextLevel];
        localStorage.setItem("unlockedLevels", JSON.stringify(updatedLevels)); 
        return updatedLevels;
      }
      return prevLevels;
    });

    setSolvedLevels((prev) => [...prev, nextLevel - 1]);
  };

  // ✅ Function to Increase Power-Ups
  const increasePowerUps = (amount = 1) => {
    setPowerUps((prevPowerUps) => prevPowerUps + amount);
  };

  return (
    <GameContext.Provider value={{ unlockedLevels, setUnlockedLevels, solvedLevels, setSolvedLevels, powerUps, setPowerUps, unlockNextLevel, increasePowerUps }}>
      {children}
    </GameContext.Provider>
  );
};
