import MiniMax from './MiniMax';
// this will get the best possible move that is evaluated by the MiniMax Function
export default function GetBestMove(game, color, currSum) {
    // Depth is the depth of the node tree that our A.I. Will go through.
    // Depth of 3 is a good medium - Hard diffiuclutly and wont have A.I spend to much time processing the node tree.
    let depth;
    if (color === 'b') {
        depth = 3;
    } else {
        depth = 3;
    }
    var [bestMove, bestMoveValue] = MiniMax(
      game,
      depth,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      true,
      currSum,
      color
    );
    return [bestMove, bestMoveValue]; 
}
