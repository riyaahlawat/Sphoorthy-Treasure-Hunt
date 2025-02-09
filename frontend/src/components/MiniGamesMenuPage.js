import React from "react";
import { useNavigate } from "react-router-dom";

const MiniGamesMenuPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Mini-Games</h1>
      <button onClick={() => navigate("/mini-game/math-challenge")} style={styles.button}>Math Challenge</button>
      <button onClick={() => navigate("/levels-page")} style={styles.backButton}>Back to Levels</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  button: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#03A9F4", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  backButton: { marginTop: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default MiniGamesMenuPage;
