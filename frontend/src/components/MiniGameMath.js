import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext"; // ✅ Ensure Correct Import

const MiniGameMath = () => {
  const { increasePowerUps } = useContext(GameContext); // ✅ Get function from Context
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const correctAnswer = 42;

  const checkAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      alert("Correct! You earned a power-up!");
      if (typeof increasePowerUps === "function") {
        increasePowerUps(1); // ✅ Ensure function exists before calling
      } else {
        console.error("increasePowerUps is not defined!");
      }
      navigate("/mini-games-menu");
    } else {
      alert("Wrong answer! Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Math Challenge</h1>
      <p>Solve: 6 × 7 = ?</p>
      <input type="number" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Enter your answer" style={styles.input} />
      <button onClick={checkAnswer} style={styles.button}>Submit</button>
      <button onClick={() => navigate("/mini-games-menu")} style={styles.backButton}>Back to Mini-Games</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  input: { marginTop: "10px", padding: "10px", fontSize: "16px" },
  button: { margin: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  backButton: { marginTop: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default MiniGameMath;

