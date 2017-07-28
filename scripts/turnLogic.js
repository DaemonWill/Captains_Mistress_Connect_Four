/*
File containing all functions called during a turn to determine piece placement
and update win conditions for each player
*/

//declare a free piece as the player's, return the piece
var placePiece = function(col,player){
  var piece;
  if(typeof COLUMN[col] != "undefined" && COLUMN[col].length <= 6 ){
    //only place a piece if there is a free piece available
    piece = COLUMN[col][COLUMN[col].length-1];
    if(piece.play != 0){
      window.alert("illegal move bud");
    }
    //assign free piece to player
    else{
      piece.play = player.id;
      return piece;
    }
  }
  else{
    window.alert("illegal move bud");
  }
};

//after claiming a space, add new free pieces and make connections around it
var makePieceNotWar = function(col,row,placedPiece){
  var directions = {
    "set" : ["west",null,"east"],
    "opposite" : ["east",null,"west"]
  };
  //going through 8 possible directions to place free pieces
  for(y = row-1; y < row+1; y++){
    //possible free spaces east and west
    if(y == row){
      for(x = col-1; x <= col+1; x += 2){
        makePieceConnections(x,y,placedPiece,directions);
      }
    }
    //possible free spaces -> NW N NE
    else if(row - y < 0){
      directions.set = ["northW","north","northE"];
      directions.opposite = ["southE","south","southW"];
      for(x = col-1; x <= col+1; x++){
        makePieceConnections(x,y,placedPiece,directions);
      }
    }
    //possible free spaces -> SW S SE
    else if(row - y > 0){
      directions.set = ["southW","south","southE"];
      directions.opposite = ["northE","north","northW"];
      for(x = col-1; x <= col+1; x++){
        makePieceConnections(x,y,placedPiece,directions);
      }
    }
  }
};

//check a player's comboChains after adding piece to see if they have 4 conected
//if path leads to a deadend, clear the chain
var checkWinConditions = function(player){
  var combo, path;
  for(chain = 0; chain < 7; chain++){
    combo = player.comboChains.chains[chain];
    path = player.comboChains.path[chain];
    if(combo.length == 4){
    //  conclude(); //TODO
        window.alert("game won by player: " + player.id);
    }
    //if last piece is connected to an enemy or null, than it's a deadend
    else if(combo.length > 0 && (combo[combo.length-1][path] === null ||
            (combo[combo.length-1][path].play != player.id &&
            combo[combo.length-1][path].play != 0)) ){
      combo.length = 0;
    }
  }
};

//update comboChains by placing in the combos with most length, favor new combos
var updateCombos = function(player,piece){
  var combo;
  var newCombo = [];
  var countUp = false;
  var paths = {
    "forw" : ["north","south","east","west","northE","northW","southE","southW"],
    "back" : ["south","north","west","east","southW","southE","northW","northE"]
  };
  for(chain = 6; chain >= 0; chain--){
    combo = player.comboChains.chains[chain];
    for(path = 0; path < 9; path++){
      newCombo = comboCheck(newCombo,piece,paths.forw[path],paths.back[path],countUp);
      //insert into comboChains where existing chain is and remove excess chains
      if(newCombo.length >= combo.length){
        player.comboChains.chains.splice(chain,0,newCombo);
        if(player.comboChains.chains.length > 7){
          player.comboChains.chains.pop();
        }
      }
    }
  }
};
