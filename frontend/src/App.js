import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import StoryPage from './components/StoryPage';
import LevelsPage from './components/LevelsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/story-page" element={<StoryPage />} />
        <Route path="/levels-page" element={<LevelsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
