import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext"; // Import Game Context
import StartPage from "./components/StartPage";
import StoryPage from "./components/StoryPage";
import LoginPage from "./components/Login";
import LevelsPage from "./components/LevelsPage";
import LevelCompletePage from "./components/LevelCompletePage";
import RiddlePage from "./components/RiddlePage";
import MiniGamesMenuPage from "./components/MiniGamesMenuPage";
import MiniGameMath from "./components/MiniGameMath";
import DSAgame from "./components/minigames/DSAgame";



function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/start-page" element={<StartPage />} />
          <Route path="/story-page" element={<StoryPage />} />
          <Route path="/levels-page" element={<LevelsPage />} />
          <Route path="/riddle/:level" element={<RiddlePage />} />
          <Route path="/level-complete/:level" element={<LevelCompletePage />} />
          <Route path="/mini-games-menu" element={<MiniGamesMenuPage />} />
          <Route path="/mini-game/math-challenge" element={<MiniGameMath />} />
          <Route path="/mini-game/dsa-game" element={<DSAgame />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
