/* eslint-disable no-loop-func */
import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const Chess = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
  };
  
  function promo(m: any) {
    console.log(m)
    var ans: string | null = null;
    var choices = ['q','r','n','b'];

    if (m.targetSquare.charAt(1) === '8' &&
        m.piece.charAt(1) === 'P'){
          while (!choices.find(element => element === ans)) {
            ans = prompt("Enter a Chess Piece (q,r,b,n)");
          }
          return ans;
        }
    
    return "q";
  }

  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: promo(move)
          })
        }
      />
    </div>
  );
};

export default App;
