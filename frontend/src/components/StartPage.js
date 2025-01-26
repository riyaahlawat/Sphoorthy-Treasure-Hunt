import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';  // Importing the CSS file

function StartPage() {
  const navigate = useNavigate();

  const goToStoryPage = () => {
    navigate('/story-page');
  };

  return (
    <div className="start-page-container">
      <div className="overlay"></div>  {/* Dark overlay on the background */}
      <h1 className="welcome-message">Embark on Your Adventure!</h1>
      <button className="go-button" onClick={goToStoryPage}>
        Begin Your Journey
      </button>
    </div>
  );
}

export default StartPage;
