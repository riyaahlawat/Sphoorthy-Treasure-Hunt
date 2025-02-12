import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';  // Importing the CSS file

function StoryPage() {
  const navigate = useNavigate();

  const goToLevelsPage = () => {
    navigate('/levels-page');
  };

  return (
    <div className="start-page-container">
      <div className="overlay"></div>  {/* Dark overlay on the background */}
      <div className="hero-container">
        {/* Map Image at Top Left */}
        <img src="/images/map.png" alt="Map" className="map-image" />


        <h1 className='welcome-message pt-serif-bold'>Journey to Sphoorthy's Vault!</h1>
        <p className="story-text pt-serif-regular">
          Long ago, a wise mentor named Sphoorthy foresaw a time when true wisdom would be needed to guide the world. 
          To protect her greatest knowledge, she locked it away in a magical treasure vault in the legendary Land of Enlightenment.
        </p>
        <p className="story-text pt-serif-regular">
          She filled the land with puzzles and challenges to ensure only the most determined and clever seekers could unlock the vault. 
          Now, as a treasure hunter, your mission is to explore the land, solve puzzles, and complete tasks to prove your worth.
        </p>
        <p className="story-text pt-serif-regular">
          Unlocking the vault will grant you Sphoorthy's ultimate treasure: her timeless wisdom, which holds the power to enlighten and guide those who seek it.
        </p>
        <p className="glowing-text pt-serif-regular-italic">
          Sphoorthy's spirit watches over you, offering cryptic hints and special tasks when needed.
        </p>
        <button className="go-button pt-serif-regular-italic" onClick={goToLevelsPage}>
          Begin Your Quest
        </button>

        {/* Treasure Box at Bottom Right */}
        <img src="/images/treasure.png" alt="Treasure Box" className="treasure-box" />
      </div>
    </div>
  );
}

export default StoryPage;
