import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [activePlayer, setActivePlayer] = useState(0); // Se mantiene como 0 y 1
  const [score, setScore] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const [diceNumber, setDiceNumber] = useState(0);

  const handleHold = () => {
    // Creamos un nuevo array usando destructuración
    const newScore = [...score];
    // Actualizamos el valor del jugador activo
    newScore[activePlayer] += current;
    // Establecemos el nuevo array
    setScore(newScore);
    // Cambiamos de jugador
    setActivePlayer(activePlayer === 0 ? 1 : 0); // Cambia entre 0 y 1
    // Reseteamos el current
    setCurrent(0);
  };

  const handleNewGame = () => {
    setActivePlayer(0); // Jugador 0 empieza
    setScore([0, 0]);
    setCurrent(0);
    setDiceNumber(0);
  };

  const handleRollDice = () => {
    setDiceNumber(Math.floor(Math.random() * 6) + 1);
  };

  useEffect(() => {
    if (diceNumber === 1) {
      setActivePlayer((prevActivePlayer) => (prevActivePlayer === 0 ? 1 : 0)); // Cambia entre 0 y 1 si sale un 1
      setCurrent(0);
    } else {
      setCurrent((prevCurrent) => prevCurrent + diceNumber);
    }
  }, [diceNumber]);

  return (
    <main>
      {/* Player 1 */}
      <div className={`player ${activePlayer === 0 ? 'player--active' : ''}`}>
        <div className="name">Player 1</div>
        <div className="score">{score[0]}</div>
        {activePlayer === 0 && (
          <div className="current">
            <div className="current-label">Current</div>
            <div className="current-score">{current}</div>
          </div>
        )}
      </div>

      {/* Player 2 */}
      <div className={`player ${activePlayer === 1 ? 'player--active' : ''}`}>
        <div className="name">Player 2</div>
        <div className="score">{score[1]}</div>
        {activePlayer === 1 && (
          <div className="current">
            <div className="current-label">Current</div>
            <div className="current-score">{current}</div>
          </div>
        )}
      </div>

      {diceNumber > 0 && (
        <img
          src={`dice-${diceNumber}.png`}
          alt="Playing dice"
          className="dice"
        />
      )}
      <button className="btn btn--new" onClick={handleNewGame}>
        🔄 New game
      </button>
      <button className="btn btn--roll" onClick={handleRollDice}>
        🎲 Roll dice
      </button>
      <button className="btn btn--hold" onClick={handleHold}>
        📥 Hold
      </button>
    </main>
  );
}

export default App;
