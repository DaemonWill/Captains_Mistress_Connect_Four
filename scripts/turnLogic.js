/*
File containing all functions called during a turn to determine piece placement
and update win conditions for each player
*/

//once a space is claimed, generate free pieces around it
var makePieceNotWar = function(col,row,playID,placedPiece){
  //going through 8 possible directions for free pieces
  for(y = row-1; y < row+1; y++){
    //possible free spaces east and west
    if(y == row){
      for(x = col-1; x <= col+1; x += 2){
        if(typeof COLUMNS[x] != "undefined" && COLUMNS[x][y].play == 0){
          var newPiece = new Piece(x,y,playID);
          COLUMNS[x].push(newPiece);
          if(col - x < 0){
            placedPiece.east = newPiece;
          }
          else{
            placedPiece.west = newPiece;
          }
        }
      }
    }
    //possible free spaces -> NW N NE
    else if(row - y < 0){
      for(x = col-1; x <= col+1; x++){
        if(typeof COLUMNS[x] != "undefined" && COLUMNS[x][y].play == 0){
          var newPiece = new Piece(x,y,playID);
          COLUMNS[x].push(newPiece);
          if(col - x == 0){
            placedPiece.north = newPiece;
          }
          else if(col - x < 0){
            placedPiece.northE = newPiece;
          }
          else{
            placedPiece.northW = newPiece;
          }
        }
      }
    }
    //the rest would have to either not empty or -> SW S SE
    else if(row - y > 0){
      for(x = col-1; x <= col+1; x++){
        if(typeof COLUMNS[x] != "undefined" && COLUMNS[x][y].play == 0){
          var newPiece = new Piece(x,y,playID);
          COLUMNS[x].push(newPiece);
          if(col - y == 0){
            placedPiece.south = newPiece;
          }
          else if(col - x < 0){
            placedPiece.southE = newPiece;
          }
          else{
            placedPiece.southW = newPiece;
          }
        }
      }
    }
  }
}
