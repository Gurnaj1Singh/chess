// src/App.jsx
import { useState } from "react";
import { BLACK, Chess } from "chess.js";

const chess = new Chess();

function App() {
  const [board, setBoard] = useState(generateBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);

  function generateBoard() {
    const board = [];
    const fenBoard = chess.board();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = fenBoard[row][col];
        board.push({
          piece: piece ? `${piece.color}${piece.type}` : null,
          row,
          col,
        });
      }
    }
    return board;
  }

  const handleSquareClick = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row);

    if (selectedSquare) {
      try {
        chess.move({ from: selectedSquare, to: square, promotion: "q" });
        setBoard(generateBoard());
      } catch (error) {
        console.log(error);
      }
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  const renderPiece = (piece) => {
    if (!piece) return null;
    const unicodePieces = {
      wp: "♙",
      bp: "♟",
      wr: "♖",
      br: "♜",
      wn: "♘",
      bn: "♞",
      wb: "♗",
      bb: "♝",
      wq: "♕",
      bq: "♛",
      wk: "♔",
      bk: "♚",
    };
    return unicodePieces[piece];
  };

  return (
    <div style={styles.container}>
      <h1>Chess Game</h1>
      <div style={styles.board}>
        {board.map((square, idx) => (
          <div
            key={idx}
            onClick={() => handleSquareClick(square.row, square.col)}
            style={{
              ...styles.square,
              backgroundColor:
                (square.row + square.col) % 2 === 0 ? "#eee" : "#aaa",
            }}
          >
            <span style={styles.piece}>{renderPiece(square.piece)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: 20,
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 60px)",
    gridTemplateRows: "repeat(8, 60px)",
    width: "fit-content",
    margin: "auto",
  },
  square: {
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
    cursor: "pointer",
    userSelect: "none",
  },
  piece: {
    fontSize: "2rem",
  },
}

export default App
