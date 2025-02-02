import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import StoryPage from './components/StoryPage';
import LevelsPage from './components/LevelsPage';
import LevelCompletePage from './components/LevelCompletePage';
import RiddlePage from './components/RiddlePage'; 

function App() {
  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  const unlockNextLevel = (nextLevel) => {
    setUnlockedLevels((prevLevels) => {
      if (!prevLevels.includes(nextLevel)) {
        return [...prevLevels, nextLevel];
      }
      return prevLevels;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/story-page" element={<StoryPage />} />
        <Route path="/levels-page" element={<LevelsPage unlockedLevels={unlockedLevels} />} />
        <Route path="/riddle/:level" element={<RiddlePage unlockNextLevel={unlockNextLevel} />} />
        <Route path="/level-complete/:level" element={<LevelCompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

