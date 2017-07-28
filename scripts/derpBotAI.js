/*
DerpBot is the beginner level bot. It for the most part moves randomly.
*/

var derpBotMoves = function(derp){
    //which column to attempt play in
    var rand = Math.floor(Math.random() * 7);
    while(COLUMNS[rand].length == 6){
      rand = Math.floor(Math.random() * 7);
    }
    var playedPiece = placePiece(rand,derp);
      var x = playedPiece.cartesian[0];
      var y = playedPiece.cartesian[1];
      makePieceNotWar(x,y,playedPiece);
      updateCombos(derp,playedPiece);
      injectPiece(x,y,derp.id);
      checkWinConditions(derp);
    currentPlayer = player1;
    botTurn = false;
}
