import GameCard from "../components/GameCard";
import "../styles/home.css";

function Home() {
  return (
    <div className="page">

      <div className="hero">

        <h1>
          Train Your <span>Memory</span>
        </h1>

        <p>
          Challenge your brain with engaging memory games.
          Track your progress and beat your records.
        </p>

      </div>

      <div className="games">

        <GameCard
          title="Flash Number Memory"
          description="A number flashes on screen. Remember it and type it back. Each level adds another digit!"
          path="/flash-number"
        />

        <GameCard
          title="Picture Recall Memory"
          description="Memorize a 3×3 grid of numbers in 3 seconds. Then recall as many as you can!"
          path="/picture-recall"
        />

      </div>

    </div>
  );
}

export default Home;