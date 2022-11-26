import EvaluateBoard from './EvaluateBoard';
/*
    * Inputs:
    *  - game:                 the game object.
    *  - depth:                the depth of the recursive tree of all possible moves (i.e. height limit).
    *  - isMaximizingPlayer:   true if the current layer is maximizing, false otherwise.
    *  - sum:                  the sum (evaluation) so far at the current layer.
    *  - color:                the color of the current player.
    * 
    * Output:
    *  the best move at the root of the current subtree.
 */
    export default function MiniMax(game, depth, alpha, beta, isMaximizingPlayer, sum, color){
    //    positionCount++; 
       let children = game.moves({verbose: true});
       
       // Sort moves randomly, so the same move isn't always picked on ties
       children.sort(function(a, b){return 0.5 - Math.random()});
       
       var currentMove;
       // Maximum depth exceeded or node is a terminal node (no children)
       if (depth === 0 || children.length === 0){
           return [null, sum]
       }
   
       // Find maximum/minimum from list of 'children' (possible moves)
       var maxValue = Number.NEGATIVE_INFINITY;
       var minValue = Number.POSITIVE_INFINITY;
       var bestMove;
       for (var i = 0; i < children.length; i++){
           currentMove = children[i];
   
           // Note: in our case, the 'children' are simply modified game states
           let currPrettyMove = game.move(currentMove);
           var newSum = EvaluateBoard(currPrettyMove, sum, color);
           // eslint-disable-next-line no-unused-vars
           var [childBestMove, childValue] = MiniMax(game, depth - 1, alpha, beta, !isMaximizingPlayer, newSum, color);
           game.undo();
           if (isMaximizingPlayer){
               if (childValue > maxValue){
                   maxValue = childValue;
                   bestMove = currPrettyMove;
               }
               if (childValue > alpha){
                   alpha = childValue;
               }
           }else{
               if (childValue < minValue){
                   minValue = childValue;
                   bestMove = currPrettyMove;
               }
               if (childValue < beta){
                   beta = childValue;
               }
           }
           // Alpha-beta pruning
           if (alpha >= beta){
               break;
           }
       }
       if (isMaximizingPlayer){
           return [bestMove, maxValue]
       }
       else{
           return [bestMove, minValue];
       }
   }
