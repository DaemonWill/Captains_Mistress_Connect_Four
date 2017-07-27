/*
Player Object used to determine play turn and win conditions
"comboChains" stores lists of "Piece" nodes that are connected, representing
the players most viable win options
*/
function Player(turnOrder){
  this.id = turnOrder;
  this.comboChains = {
    "chains" : [
      [],[],[],[],[],[],[]
    ],
    "paths" : [null,null,null,null,null,null,null]
  };
  this.win = false;
}
