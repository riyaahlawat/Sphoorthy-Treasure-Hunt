import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import StoryPage from './components/StoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/story-page" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
