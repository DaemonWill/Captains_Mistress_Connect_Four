/*
File containing all functions called during a turn to determine piece placement
and update win conditions for each player
*/

//declare a free piece as the player's, return the piece
var placePiece = function(col,player){
  var piece;
  if(typeof COLUMNS[col] != "undefined" && COLUMNS[col].length <= 6 ){
    //only place a piece if there is a free piece available
    piece = COLUMNS[col][COLUMNS[col].length-1];
    if(piece.play != 0){
      window.alert("illegal move bud");
    }
    //assign lowest free piece to player (free pieces might be stacked up)
    else{
      for(low=0; low<COLUMNS[col].length; low++){
        piece = COLUMNS[col][low];
        if(piece.play == 0){
          piece.play = player.id;
          return piece;
        }
      }
    }
  }
  else{
    window.alert("illegal move bud");
  }
};

//after claiming a space, add new free pieces and make connections around it
var makePieceNotWar = function(col,row,placedPiece){
  var directions;
  //going through 8 possible directions to place free pieces
  for(y = row-1; y <= row+1; y++){
    directions = {
      "set" : ["west",null,"east"],
      "opposite" : ["east",null,"west"]
    };
    if(y >= 0 && y < 6){
      //possible free spaces east and west
      if(y == row){
        for(x = col-1; x <= col+1; x += 2){
          if(x >= 0 && x < 7){
            makePieceConnections(x,y,placedPiece,directions);
          }
        }
      }
      //possible free spaces -> NW N NE
      else if(row - y < 0){
        directions.set = ["northW","north","northE"];
        directions.opposite = ["southE","south","southW"];
        for(x = col-1; x <= col+1; x++){
          if(x >= 0 && x < 7){
            makePieceConnections(x,y,placedPiece,directions);
          }
        }
      }
      //possible free spaces -> SW S SE
      else if(row - y > 0){
        directions.set = ["southW","south","southE"];
        directions.opposite = ["northE","north","northW"];
        for(x = col-1; x <= col+1; x++){
          if(x >= 0 && x < 7){
            makePieceConnections(x,y,placedPiece,directions);
          }
        }
      }
    }
  }
};

//check a player's comboChains after adding piece to see if they have 4 conected
//if path leads to a deadend, clear the chain
var checkWinConditions = function(player){
  var combo, path;
    combo = player.comboChains.chains[0];
    path = player.comboChains.paths[0];
      if(combo.length == 3){
      //  conclude(); //TODO got to stop game from continuing
          window.alert("game won by player: " + player.id);
      }
      //if last piece is connected to an enemy or null, than it's a deadend
      else if(combo.length > 0 && path !== null && combo[combo.length-1][path] === null){
        combo.length = 0;
      }
};

//update comboChains by placing in the combos with most length, favor new combos
var updateCombos = function(player,piece){
  var countUp = false;
  var combos = player.comboChains.chains;
  var paths = {
    "forw" : ["north","south","east","west","northE","northW","southE","southW"],
    "back" : ["south","north","west","east","southW","southE","northW","northE"]
  };
  for(path = 0; path < 9; path++){
    var newCombo = [];
    newCombo = comboCheck(newCombo,piece,paths.forw[path],paths.back[path],countUp);
    //insert and organize new combo chain with existing long chains
    combos.push(newCombo);
    combos.sort(function(a, b){return b.length - a.length});
    if(combos.length > 7){
      combos.pop();
    }
  }
};
