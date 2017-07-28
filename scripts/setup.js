/*
Initializing game environment and start parameters
*/


//2D Map of game area, each initial index are cols, each inner index are rows
//set cols = 7, max rows = 6 -> 7x6 board
var COLUMNS = [
  [],[],[],[],[],[],[]
];

//place first row of pieces to be free for players to use
var generateInitialPieces = function(){
  for(col = 0; col < 7; col++){
    var newPiece = new Piece(col,0);
    COLUMNS[col].push(newPiece);
  }
};

generateInitialPieces();
