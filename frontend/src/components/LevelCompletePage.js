import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LevelCompletePage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const nextLevel = parseInt(level) + 1;

  return (
    <div style={styles.container}>
      <h1>Congratulations! 🎉</h1>
      <p>You have completed Level {level}!</p>
      <button onClick={() => navigate(`/riddle/${nextLevel}`)} style={styles.nextButton}>Go to Level {nextLevel}</button>
      <button onClick={() => navigate("/levels-page")} style={styles.backButton}>Back to Levels</button>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  nextButton: { margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  backButton: { marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default LevelCompletePage;
