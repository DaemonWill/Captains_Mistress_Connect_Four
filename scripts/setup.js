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
var player1 = new Player(1);
var player2 = new Player(2);
var currentPlayer = player1;
var player1Piece = '<img src="../images/player1Img.png" style="height:90;width:90"></img>';
var player2Piece = '<img src="../images/player2Img.png" style="height:90;width:90"></img>';
var derpPiece = '<img src="../images/derpImg.png" style="height:90;width:90"></img>';
var captainPiece = '<img src="../images/captainImg.png" style="height:90;width:90"></img>';
var mistressPiece = '<img src="../images/mistressImg.png" style="height:90;width:90"></img>';
var botTurn = false;

var injectPiece = function(col,row,playerID){
  var idString = col.toString()+","+row.toString();
  if(playerID == 1){
    document.getElementById(idString).innerHTML = player1Piece;
  }
  else{
    document.getElementById(idString).innerHTML = player2Piece;
  }
};
