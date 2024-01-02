import React, { useState } from "react";

function Square({ value, onSquareClick, isHighlighted }) {
  return (
    <button className={`square ${isHighlighted ? 'highlight' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // どちらかが勝利している場合は、クリックしても何もしない
    if (squares[i] != null || calculateWinner(squares).winner != null) {
      return;
    }

    // クリックしたマス目に、X か O を入れる
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // 次のプレイヤーに切り替える
    onPlay(nextSquares);
  }

  // 勝者がいる場合は、勝者を表示する
  // 勝者がいない場合は、次のプレイヤーを表示する
  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner} `;
  } else if (squares.every(square => square != null)) {
    status = 'Draw: The game ended in a draw';
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"} `;
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map(col => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
                isHighlighted={winner != null && line.includes(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else if (move === currentMove) {
      description = `You are at move #${move} `;
    } else {
      description = `Go to move #${move} `;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleSortToggle}>{isAscending ? 'Sort Descending' : 'Sort Ascending'}</button>
        <ol reversed={isAscending ? false : true} start={isAscending ? undefined : moves.length}>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    // 横
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 縦
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 斜め
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0, len = lines.length; i < len; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  return { winner: null, line: null }
}