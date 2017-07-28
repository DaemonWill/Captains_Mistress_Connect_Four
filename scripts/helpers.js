/*
Functions added to reduce redundancy in other functions.
*/

//generate a new free piece given specific directions, also makes a connection
//to current player pieces
var makePieceConnections = function(x,y,currentPiece,directions){
  console.log("inside makePieceConnections");
  //if no piece exists, add  piece and make connections
  console.log("x and y are "+ x + " "+ y);
  if(typeof COLUMNS[x] != "undefined" && typeof COLUMNS[x][y] == "undefined"){
    var newPiece = new Piece(x,y);
    console.log("newPiece coords are: "+newPiece.cartesian)
    COLUMNS[x].push(newPiece);
    if(currentPiece.cartesian[0] - x == 0){
      currentPiece[directions.set[1]] = newPiece;
    }
    else if(currentPiece.cartesian[0] - x < 0){
      currentPiece[directions.set[2]] = newPiece;
    }
    else{
      currentPiece[directions.set[0]] = newPiece;
    }
  }
  //if a piece already exists that is free add connections
  else if(typeof COLUMNS[x] != "undefined" && COLUMNS[x][y].play == 0){
    if(currentPiece.cartesian[0] - x == 0){
      currentPiece[directions.set[1]] = COLUMNS[x][y];
    }
    else if(currentPiece.cartesian[0] - x < 0){
      currentPiece[directions.set[2]] = COLUMNS[x][y];
    }
    else{
      currentPiece[directions.set[0]] = COLUMNS[x][y];
    }
  }
  //if a piece already belongs to player, add connections both ways
  else if(typeof COLUMNS[x] != "undefined" && COLUMNS[x][y].play == currentPiece.play){
    if(currentPiece.cartesian[0] - x == 0){
      currentPiece[directions.set[1]] = COLUMNS[x][y];
      COLUMNS[x][y][directions.opposite[1]] = currentPiece;
    }
    else if(currentPiece.cartesian[0] - x < 0){
      currentPiece[directions.set[2]] = COLUMNS[x][y];
      COLUMNS[x][y][directions.opposite[2]] = currentPiece;
    }
    else{
      currentPiece[directions.set[0]] = COLUMNS[x][y];
      COLUMNS[x][y][directions.opposite[0]] = currentPiece;
    }
  }
};

//check for combos - count from last node in opposite direction back up
//recurse through connections, than return list of connections
var comboCheck = function(newCombo,piece,direction,opposite,countUp){
  console.log("inside comboCheck");
  if(piece[opposite] !== null && typeof piece[opposite] != "undefined" &&
          piece[opposite].play == piece.play && countUp == false){
    comboCheck(newCombo,piece[opposite],direction,opposite);
  }
  else if(piece[direction] !== null && typeof piece[direction] != "undefined" &&
          piece[direction].play == piece.play){
    countUp = true;
    newCombo.push(piece);
    comboCheck(newCombo,piece[direction],direction,opposite,countUp);
  }
  return newCombo;
};
