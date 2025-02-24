import './App.css';
import { useState, useEffect } from 'react'; //

function App() {
  const [activePlayer, setActivePlayer] = useState(0);
  const [score, setScore] = useState([0, 0]);
  const [current, setCurrent] = useState(0);
  const [diceNumber, setDiceNumber] = useState(0);
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [gameStarted, setGameStarted] = useState(false);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerNames[0].trim() && playerNames[1].trim()) {
      setGameStarted(true);
    } else {
      alert('Por favor, introduce nombres para ambos jugadores');
    }
  };

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleHold = () => {
    // Creamos un nuevo array usando destructuración
    const newScore = [...score];
    const potentialScore = newScore[activePlayer] + current;

    if (potentialScore > 100) {
      // Si se pasa de 100, pierde el turno y los puntos actuales
      setActivePlayer(activePlayer === 0 ? 1 : 0);
      setCurrent(0);
      return;
    }

    // Actualizamos el valor del jugador activo
    newScore[activePlayer] = potentialScore;
    // Establecemos el nuevo array
    setScore(newScore);

    if (potentialScore === 100) {
      // El jugador ha ganado
      alert(`¡${playerNames[activePlayer]} ha ganado!`);
      handleNewGame();
      return;
    }

    // Cambiamos de jugador
    setActivePlayer(activePlayer === 0 ? 1 : 0);
    // Reseteamos el current
    setCurrent(0);
  };

  const handleNewGame = () => {
    setActivePlayer(0);
    setScore([0, 0]);
    setCurrent(0);
    setDiceNumber(0);
    setGameStarted(false);
    setPlayerNames(['', '']);
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
      {!gameStarted ? (
        <form onSubmit={handleNameSubmit} className="name-form">
          <div>
            <input
              type="text"
              placeholder="Nombre Jugador 1"
              value={playerNames[0]}
              onChange={(e) => handleNameChange(0, e.target.value)}
              className="name-input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nombre Jugador 2"
              value={playerNames[1]}
              onChange={(e) => handleNameChange(1, e.target.value)}
              className="name-input"
            />
          </div>
          <button type="submit" className="btn btn--new">Empezar Juego</button>
        </form>
      ) : (
        <>
          {/* Player 1 */}
          <div className={`player ${activePlayer === 0 ? 'player--active' : ''}`}>
            <div className="name">{playerNames[0]}</div>
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
            <div className="name">{playerNames[1]}</div>
            <div className="score">{score[1]}</div>
            {activePlayer === 1 && (
              <div className="current">
                <div className="current-label">Current</div>
                <div className="current-score">{current}</div>
              </div>
            )}
          </div>
        </>
      )}

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
