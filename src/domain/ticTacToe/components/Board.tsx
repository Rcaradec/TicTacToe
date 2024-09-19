import { calculateWinner } from "../../../utils/utils";
import Square from "./Square";

type BoardProps = {
  squares: string[];
  xIsNext: boolean;
  onPlay: (nextSquares: string[]) => void;
};

export const Board = ({ squares, xIsNext, onPlay }: BoardProps) => {
  const handleClick = (index: number) => {
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
};
