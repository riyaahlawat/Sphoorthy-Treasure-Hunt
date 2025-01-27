// src/StoryPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function StoryPage() {
  const navigate = useNavigate();

  const goToLevelsPage = () => {
    navigate('/levels-page');
  };

  return (
    <div style={styles.container}>
      <h1>Story Page</h1>
      <p>This is where your adventure begins...</p>
      <button onClick={goToLevelsPage}>
        View Levels
      </button>
    </div>  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default StoryPage;
