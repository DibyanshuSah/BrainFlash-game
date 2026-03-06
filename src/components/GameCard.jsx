import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function GameCard({ title, description, path }) {

  const navigate = useNavigate();

  return (
    <div className="game-card">

      <h2>{title}</h2>

      <p>{description}</p>

      <button
        className="play-btn"
        onClick={() => navigate(path)}
      >
        Play Now
      </button>

    </div>
  );
}

export default GameCard;