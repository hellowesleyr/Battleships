// import { isNull, isUndefined } from "lodash";
import { createShip } from "./ship.js";
const createCell = (x, y) => {
  //Get ship function
  let cell = {
    x,
    y,
    mustBeEmpty: false,
    suspectedShip: false,
    empty: true,
    segmentIndex: undefined,
    hit: false,
    ship: undefined,
    position: undefined,
    cellElem: undefined,
  };
  return cell;
};

const createBoard = () => {
  let cells = [];
  let shipsRemaining = 0;
  let ships = [];
  for (let i = 0; i < 10; i++) {
    let thisCol = [];
    for (let j = 0; j < 10; j++) {
      let thisCell = createCell(i, j);
      thisCol.push(thisCell);
    }
    cells.push(thisCol);
  }
  const getSegmentCoords = (Ox, Oy, length, orientation) => {
    let coords = [];
    let dx;
    let dy;
    if (orientation == "right") {
      dx = 1;
      dy = 0;
    }
    if (orientation == "up") {
      dx = 0;
      dy = 1;
    }
    for (let i = 0; i < length; i++) {
      let x_i = Ox + i * dx;
      let y_i = Oy + i * dy;
      coords.push({
        x: x_i,
        y: y_i,
      });
    }
    return coords;
  };
  const queryBoardSunk  = () => {
    let shipsRemaining = 0
    board.ships.forEach(ship => {
      for (let i = 0; i<board.ships.length; ++i) {
        if (ship.sunk === false) {
          ++shipsRemaining;
        }
      }
    });
    if (shipsRemaining == 0) {
      return true;
    }
    else if (shipsRemaining != 0) {
      return false;
    }
  }
  
  const drawBoard = () => {
    let boardString = ``
    for (let i = 0; i<10; ++i) {
      let lineString = ``
      lineString+=`|`
      for (let j = 0; j<10; ++j) {
        lineString+= `  `
        let currentCell = board.cells[i][j];
        if (currentCell.ship!=undefined) {
          if (currentCell.position.hit == true) {
            lineString += `H`
          }
          else if (currentCell.position.hit == false) {
            lineString+= `S`
        }
      }
      else if (currentCell.ship == undefined) {
        if (currentCell.hit == true) {
          lineString+=`H`
        }
        else if (currentCell.hit !=true) {
          lineString += `O` 
        }
      }
    }
    lineString+=`|`
    boardString+=lineString+=`\n`
  }
  console.log(boardString);
  }
  const inbounds = (val) => {
    if (val < 0 || val >9) {
      return false
    }
    else return true;
  }
  const placeShip = (length, x, y, orientation, team) => {
    //Validation
    let maxY = 0;
    let maxX = 0;
    let occupyingAndAdjacentCells  = [];
    if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
      }
    if (maxX < 0 || maxX>9 || maxY<0 || maxY > 9) {
      return false;
    }

    let dX = 0;
    let dY = 0;
    if (orientation == 'up') {
      dY = 1;
    }
    else if (orientation == 'right') {
      dX = 1;
    }
      for (let c = -1; c<2; c++) {
        for (let i = 0; i<length;i++) {
          let currentX = x+dX*i;
          let currentY = y+dY*i;
          if (currentX < 0 || currentX > 9 || currentY < 0 || currentY > 9) {
            return false 
          }
          if (inbounds(currentX+c)) {
            currentX = currentX+c;
          }
          if (inbounds(currentY+c)) {

            currentY = currentY+c;
          }
          if (board.cells[currentX][currentY].ship != undefined) {
            return false;
          }
        }
      }
      


    let thisShip = createShip(length, x, y, orientation, team);
    let originCell = board.cells[x][y];
    // console.log(board.cells[x][y])
    originCell.ship = thisShip;
    ships.push((thisShip));
    let coords = getSegmentCoords(x, y, length, orientation);
    //Set the position attribute of relevant cells
    for (let i = 0; i < coords.length; i++) {
      let thisCoord = coords[i];

      let segX = thisCoord.x;
      let segY = thisCoord.y;
      // console.log(`segX is ${segX}, segY is ${segY}`)
      // console.log(segX);
      // console.log(segY)
      let thisCell = board.cells[segX][segY];
      thisCell.position = thisShip.segments[i];
      thisCell.ship = thisShip;
    }
    return true;
  };
  const receiveAttack = (x, y) => {
    let currentCell = board.cells[x][y];
    currentCell.hit = true;
    let currentShip = currentCell.ship;
    if (currentShip != undefined && currentShip!= null) {
      //DOSTuff
      board.getSegmentCoords(x,y,currentShip.length,currentShip.orientation);
      currentCell.position.hit = true;
      currentShip.isSunk();
    }
    return currentCell;
  };
  let board = {
    cells,
    ships,
    shipsRemaining,
    receiveAttack,
    getSegmentCoords,
    placeShip,
    queryBoardSunk,
    drawBoard,
  };
  return board;
};

export { createBoard };
