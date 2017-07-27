/*
Piece Object used to store pointers to other piece connections depending on
which player controls the piece. There're 3 play states piece can be in : 0,1,2
for free, player1, and player2 respectively. Free pieces are pieces that can
be assigned next turn that can go to either player.
*/
function Piece(coordX,coordY){
  this.cartesian = [coordX,coordY];
  this.play = 0;
  //pointers to connected pieces below
  this.north = null;
  this.south = null;
  this.east = null;
  this.west = null;
  this.northE = null;
  this.southW = null;
  this.northW = null;
  this.southE = null;
}
