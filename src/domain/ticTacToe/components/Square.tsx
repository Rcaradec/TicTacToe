type SquareProps = {
  value: string;
  onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
  const squareClass = value === "X" ? "square player-1" : "square player-2";
  return (
    <button className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}
