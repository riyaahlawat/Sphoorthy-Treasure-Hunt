// src/StoryPage.js
import React from 'react';

const StoryPage = () => {
  return (
    <div style={styles.container}>
      <h1>Story Page</h1>
      <p>This is where your adventure begins...</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default StoryPage;
