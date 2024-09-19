import { useState } from "react";
import "./Game.css";

type SquareProps = {
  value: string;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  const squareClass = value === "X" ? "square player-1" : "square player-2";
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

type BoardProps = {
  squares: string[];
  xIsNext: boolean;
  onPlay: (nextSquares: string[]) => void;
};

function Board({ squares, xIsNext, onPlay }: BoardProps) {
  const handleClick = (index: number) => {
    console.log("index", index);
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "0";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    const winnerName = winner === "X" ? "Player 1" : "Player 2";
    status = (
      <span className={xIsNext ? "player-1" : "player-2"}>{winnerName}</span>
    );
  } else {
    status = (
      <>
        Next Player is{" "}
        {xIsNext ? (
          <span className="player-1">Player 1</span>
        ) : (
          <span className="player-2">Player 2</span>
        )}
      </>
    );
  }

  return (
    <>
      <div className="status text-2xl">The Winner is : {status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <h1 className="text-4xl font-bold text-blue-500 my-5">Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol className="move-list">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
