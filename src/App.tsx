import React, { useState, useEffect } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
// import EvaluateBoard from "./ChessEngine/EvaluateBoard";
// import GetBestMove from "./ChessEngine/GetBestMove";
import Button from 'react-bootstrap/Button';

import PromoModal from './PromoModal';

import 'bootstrap/dist/css/bootstrap.min.css';

const Chess = require("chess.js");

// let globalSum = 0;

const App: React.FC = () => {

  // const [game, setGame] = useState(new Chess());
  
  var promotion: string | null = 'q';

  function setPromotion(p: string | null){
    promotion = p;

    return p;
  }

  const [isOpen, setIsOpen] = React.useState(false);

  const [flag, setFlag] = React.useState(false);

  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );

  const [fen, setFen] = useState(chess.fen());

  useEffect(() => {
    console.log(promotion);
  }, [promotion]);

// Kolton's Work
//====================================================================
 
// perform modify function on game state
// function safeGameMutate(game: any) {
//   setGame((g: any) => {
//     const update = { ...g };
//     setGame(update);
//     return update;
//   });
// }

// function makeBestMove(color: string) {
//   var move: string | ShortMove = "";
//   if (color === "b") {
//     move = GetBestMove(game, color, globalSum)[0];
//   } else {
//     move = GetBestMove(game, color, -globalSum)[0];
//   }
//   globalSum = EvaluateBoard(move, globalSum, "b");

//   console.log(globalSum);
//   game.move(move);

//   return move;
// }

// make computer move
// function AIMove() {
//   var move: string | ShortMove = "";

//   const possibleMove: string | ShortMove = makeBestMove("b");
//   // exit if the game is over
//   if (game.game_over() || game.in_draw()) return;

//   safeGameMutate((game: { move: (arg0: string | ShortMove) => any; }) => {
//     move = game.move(possibleMove);
//     return move;
//     // play();
//   });

//   return move!;
// }

//====================================================================

  const handleMove = (move: ShortMove) => {
    console.log(move);

    move.promotion = setPromotion(promo(move));

    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          // const computerMove = moves[Math.floor(Math.random() * moves.length)];
          // chess.move(computerMove);

          // chess.move(AIMove()!);
          // AIMove();
          
          setFen(chess.fen());
        }
      }, 30);

      setFen(chess.fen());
    }
  };
  
  function promo(m: any) {

    if (m.to.charAt(1) === '8' &&
        m.piece.charAt(1) === 'P') {
            setIsOpen(true);
            setFlag(true);
            console.log(isOpen, flag);
            let ans: string | null = prompt("Enter a Chess Piece (q,r,b,n)");
            console.log(ans);
            setPromotion(ans);
            console.log(promotion);
          }

    return promotion;
  }

  const showModal = () => {
    setIsOpen(true);
  };


  return (
  <>
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: promotion,
            piece: move.piece
          })
        }
      />
    </div>
    <Button onClick={showModal}>Display Pawn Promotion</Button>

    {/* <PromoModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      promotion={promotion}
      setPromotion={setPromotion}
    /> */}
  </>
  );
};

export default App;
