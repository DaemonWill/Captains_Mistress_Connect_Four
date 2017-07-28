//re-assign the onclick events for the areas within the game map
var playerListener = function(col){
      event.preventDefault();
      if(botTurn == false){
        var playedPiece = placePiece(col,currentPlayer);
        if(typeof playedPiece != "undefined"){
          var x = playedPiece.cartesian[0];
          var y = playedPiece.cartesian[1];
          makePieceNotWar(x,y,playedPiece);
          updateCombos(currentPlayer,playedPiece);
          injectPiece(x,y,currentPlayer.id);
          checkWinConditions(currentPlayer);
          if(currentPlayer.id == 1 && botGame == false){
            currentPlayer = player2;
          }
          else if(botGame == false){
            currentPlayer = player1;
          }
          else{
            currentPlayer = derpBot;
            botTurn = true;
            derpBotMoves(currentPlayer);
          }
        }
      }

};
