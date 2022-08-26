const createController = () => {
  let navBar = document.querySelector(".navbar");
  let content = document.querySelector("#content");
  let handOverPanel;
  let gameContainer;
  let gameInfo;
  let gameInfoBottom;
  let boardContainer;
  let player1BoardElem;
  let player2BoardElem;
  let gameOverPanel;
  let placementShipDiv = document.createElement('div');
  let battleInfoDiv  = document.createElement('div');
  placementShipDiv.classList.add('placementShip');
  let navBarHTML = `<div class="menu">
    Menu
  </div>
  <div class="title">
    Battleships
  </div>`;

  let gameOverHTML = `<div><p class="gameOverText">Game is over player wins</p></div>
  <div class="resetButton">Click to reset</div>`

  let contentMenuHTML = `<div class="columnContainer">
  <div class="menuOption pvcBtn">
    Player vs Computer
  </div>
  <div class="menuOption pvpBtn">
    Player vs Player
  </div>
</div>`;

let handOverPanelHTML = '<p>Hand the device over to the other player. No looksies!</p><div class="handoverButton">Continue Playing</div>'

let gameInfoHTML = '<span class="currentPlayer">Current player: player 1</span>'

const toggleHandover = () => {
  let element = document.querySelector('.handoverPanel')
  if (element.classList.contains('active')) {
    element.classList.remove('active');
    element.classList.add('inactive')
  }
  else if (element.classList.contains('inactive')) {
    element.classList.remove('inactive');
    element.classList.add('active');
  }
}

const drawBoards = (game,player) => {
  
  let friendlyBoardElem;
  let enemyBoardElem;
  let friendlyPlayer;
  let enemyPlayer;
  if (player.team == 1) {
    friendlyPlayer = game.player1;
    enemyPlayer = game.player2;
    friendlyBoardElem = player1BoardElem;
    enemyBoardElem = player2BoardElem;
  }

  else if (player.team == 2) {
    friendlyPlayer = game.player2;
    enemyPlayer = game.player1;
    friendlyBoardElem = player2BoardElem;
    enemyBoardElem = player1BoardElem;
  }
  renderPlacementShip(game);
    //Testing
    let cellID = 0;
    for (let i = 0; i<10;++i) {
      for (let j = 0; j<10;++j) {
        //
        let currentCell = friendlyPlayer.board.cells[i][j];
        let currentEnemyCell = enemyPlayer.board.cells[i][j];
        let cellElem = currentCell.cellElem;
        let enemyCellElem = currentEnemyCell.cellElem;
        //Reset the cell;
        cellElem.innerText = '';
        cellElem.style['background-color'] = '#0EA5E9';
        enemyCellElem.innerText = '';
        enemyCellElem.style['background-color'] = '#0EA5E9';

        //Draw the cells
        if (currentCell.hit == true) {
          cellElem.innerText = 'X';
        }
        if (currentEnemyCell.hit == true) {
          enemyCellElem.innerText = 'X';
        }
        if (currentCell.ship!=undefined) {
          cellElem.style['background-color'] = 'green'
          if (currentCell.ship.isSunk == true) {
            cellElem.style['background-color'] = 'red';

          }
          else if (currentCell.hit == true) {
            cellElem.style['background-color'] = 'darkred';
          }
      
        }
        if (currentEnemyCell.ship!=undefined) {
          if (currentEnemyCell.ship.isSunk == true) {
            enemyCellElem.style['background-color'] = 'red';
          }
          else if (currentEnemyCell.hit == true) {
            enemyCellElem.style['background-color'] = 'darkred';

          }
        }
        if (currentCell.mustBeEmpty == true) {
          cellElem.style['background-color'] = 'white';
        }
        if (currentEnemyCell.mustBeEmpty == true) {
          enemyCellElem.style['background-color'] = 'white';
        }
      }
    }
  //This assumes that all the elements are already in place;

}

const addEventListeners = (game) => {
  let handoverPanel = document.querySelector('.handoverPanel')
  handoverPanel.addEventListener('click', event => {
    toggleHandover(handoverPanel);
  })
  let resetGameButton = document.querySelector('.resetButton');
  resetGameButton.addEventListener('click', event => {
    location.reload();
  })
}

const renderPlacementShip = (game) => {
  let placementShipDiv = document.querySelector('.placementShip');
  try {
    let currentShipLength = game.activePlayer.playerShipsToPlace[0];
    let placementShip = game.activePlayer.currentPlacementShip;
    if (placementShip.orientation == 'right') {
      placementShipDiv.style.width = `${currentShipLength*36}px`;
      placementShipDiv.style.height = '36px';
    }
    else if (placementShip.orientation == 'up') {
      placementShipDiv.style.width = '36px'
      placementShipDiv.style.height = `${currentShipLength*36}px`;
    }
    // placementShipDiv.style.innerText = 'UWUWUWUWUWQU'
    // console.log(placementShipDiv);
  }
  catch (e) {
    alert(e)
  }
}

const togglePlacementShip = () => {
  let placementShipDiv = document.querySelector('.placementShip');
  if (placementShipDiv.style.display == 'none') {
    placementShipDiv.style.display = ''
  }
  else {
    placementShipDiv.style.display = 'none';
  }
}
function isTouchDevice() {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

const addBoardEventListners = (game) => {
  document.addEventListener('keydown', event => {
    if (event.key == 'e') {
      if (game.activePlayer.placingShips) {
        let placementShip = game.activePlayer.currentPlacementShip;
        if (placementShip.orientation == 'up') {
          placementShip.orientation = 'right';
          
        }
        else if (placementShip.orientation == 'right') {
          placementShip.orientation = 'up';
        }
      }
    }
  })
  let player1 = game.player1;
  let player2 = game.player2;
  
  for (let t= 1; t<3; ++t) {
    for (let i = 0; i<10; ++i) {
      for (let j = 0; j<10; ++j) {
        if (t==1) {
          let shipDiv = document.querySelector('.placementShip')
          let friendlyPlayer = player1;
          let enemyPlayer = player2;
          let currentCell = player1.board.cells[i][j];
          let currentElem = currentCell.cellElem;
          currentElem.addEventListener('click',e => {
            console.log(currentCell);
            // alert(`x: ${currentCell.x}, Y:${currentCell.y}`)
            // alert(currentCell.ship);
            if (currentCell.ship!=undefined) {
              // alert(currentCell.ship.orientation);
            }
            if (player1.placingShips == true) {
              let x = currentCell.x;
              let y = currentCell.y;
              let orientation = player1.currentPlacementShip.orientation;
              let length = player1.playerShipsToPlace[0];
              let team = player1.team;
              // alert('tried placing a ship');
              if (player1.placePlayerShip(length,x,y,orientation,team) == true) {
                // player1.playerShipsToPlace.splice(0,1);
                player1.currentPlacementShip.length = player1.playerShipsToPlace[0];
                // alert('placed a ship');
                console.log(`player ship remaining ${player1.playerShipsToPlace}`)
              }
            }
            if (game.activePlayer.team == 2 && game.activePlayer.attacking == true) {
              game.makeAttack(currentCell.x,currentCell.y,DOMmanager);
            } 
          })
          currentElem.addEventListener('mouseover',e => {
            if (player1.placingShips == true) {
              player1.currentPlacementShip.x = currentCell.x;
              player1.currentPlacementShip.y = currentCell.y;
                let mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
                let mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
                shipDiv.style.left = mouseX + 5 + "px";
                shipDiv.style.top = (mouseY + 5 ) + "px";   
                // shipDiv.style['background-color'] = 'green'
           
            }
          })
        
        }
        if (t==2) {
          let currentCell = player2.board.cells[i][j];
          let currentElem = currentCell.cellElem;
          currentElem.addEventListener('click',e => {
            console.log(currentCell);
            console.log(`active player is ${game.activePlayer.team}`);
            console.log(`active palyer is attacking? ${game.activePlayer.attacking}`);

            if (player2.placingShips == true) {
              let x = currentCell.x;
              let y = currentCell.y;
              let orientation = player2.currentPlacementShip.orientation;
              // alert(orientation);
              let length = player2.playerShipsToPlace[0];
              let team = player2.team;
              // alert('tried placing a ship');
              if (player2.placePlayerShip(length,x,y,orientation,team) == true) {
                if (player2.playerShipsToPlace.length == 0) {
                  game.activePlayer = game.player1;
                }
                // player2.playerShipsToPlace.splice(0,1);
                // alert(player2.currentPlacementShip.length)
                console.log(player2.playerShipsToPlace);
                player2.currentPlacementShip.length = player2.playerShipsToPlace[0];
                // alert('placed a ship');
                console.log(`player ship remaining ${player2.playerShipsToPlace}`)
            }
          }
          if (game.activePlayer.team == 1 && game.activePlayer.attacking == true) {
            game.makeAttack(currentCell.x,currentCell.y,DOMmanager);
          }
          });
          currentElem.addEventListener('mouseover',e => {
            if (game.player2.placingShips == true && game.player1.placingShips == false) {
              let shipDiv = document.querySelector('.placementShip')
              shipDiv.style.display = 'flex';
              player2.currentPlacementShip.x = currentCell.x;
              player2.currentPlacementShip.y = currentCell.y;
              let mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
              let mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
              shipDiv.style.left = mouseX + 5 + "px";
                shipDiv.style.top = (mouseY + 5 ) + "px";                   
            }
          })
        }
        //Hover placement
        // currentElem.addEventListener("mouseover", event => {
        //     let thisFriendlyPlayer  = Object.assign({},friendlyPlayer);
        //     currentElem.innerText = 'x'
        //     console.log(friendlyPlayer);
        //     if (thisFriendlyPlayer.placingShips == true) {
        //         alert('drawing');
        //       }
        //     })
        //     if (game.activePlayer.placingShips) {
              
        //       }
              //Attack
              
            }
          }
        }
      }

  const drawGame = (game, fromScratch) => {
    if (fromScratch == true) {
      content.innerHTML=``
      handOverPanel = document.createElement('div');
      gameOverPanel = document.createElement('div');
      gameOverPanel.classList.add('gameOver','inactive');
      handOverPanel.classList.add('handoverPanel','inactive');
      handOverPanel.innerHTML = handOverPanelHTML;
      gameOverPanel.innerHTML = gameOverHTML;
      gameContainer = document.createElement('div');
      gameContainer.classList.add('gameContainer');
      gameInfo = document.createElement('div');
      gameInfo.classList.add('gameInfo');
      gameInfoBottom = document.createElement('div');
      gameInfoBottom.classList.add('gameInfoBottom');
      gameInfo.innerHTML = `<span class="currentPlayer">Current player: player 1</span>`;
      
      boardContainer = document.createElement('div');
      boardContainer.classList.add('boardContainer');


      player1BoardElem = document.createElement("div");
      player1BoardElem.classList.add("player1Board", "board");
      player2BoardElem = document.createElement("div");
      player2BoardElem.classList.add("player2Board", "board");
      let c  = 0;
      for (let j = 0; j<10; j++) {
        for (let i = 0; i<10;i++) {
          let boardCellElem = document.createElement("div");
          boardCellElem.classList.add("boardCell");
          boardCellElem.classList.add(`c${c}`);
          player1BoardElem.appendChild(boardCellElem);
          game.player1.board.cells[i][j].cellElem = boardCellElem;
          let boardCellElem2 = document.createElement("div");
          boardCellElem2.classList.add(`c${c}`);
          boardCellElem2.classList.add("boardCell");
          player2BoardElem.appendChild(boardCellElem2);
          game.player2.board.cells[i][j].cellElem = boardCellElem2;
          ++c
        }
      }

      boardContainer.appendChild(player1BoardElem);
      boardContainer.appendChild(player2BoardElem);
      boardContainer.appendChild(placementShipDiv);

      gameContainer.appendChild(gameInfo);
      gameContainer.appendChild(boardContainer);
      gameContainer.appendChild(gameInfoBottom)
      content.appendChild(handOverPanel);
      content.appendChild(gameOverPanel);
      content.appendChild(gameContainer);
      DOMmanager.drawBoards(game,game.activePlayer);
      addEventListeners();
      addBoardEventListners(game);
    }
    gameInfo.innerText = `current player: player ${game.activePlayer.team}`
    gameInfoBottom.innerText = `${game.phase}`
    gameInfoBottom.innerText += `\n When placing ships, press E to change orientation`
    drawBoards(game,game.activePlayer);
  };



  const displayMenu = (game) => {
    content.innerHTML = contentMenuHTML;
    navBar.innerHTML = navBarHTML;
    let playerVsComputerBtn = document.querySelector(".pvcBtn");
    let playerVsPlayerBtn = document.querySelector(".pvpBtn");
    playerVsComputerBtn.addEventListener("click", (event) => {
      game.intializeGame(true);
      DOMmanager.drawGame(game,true);
    });
    playerVsPlayerBtn.addEventListener("click", (event) => {
      game.intializeGame(false);
      DOMmanager.drawGame(game,true);
    });
  };

  const disablePlacementShip = () => {
    let placementShipDiv = document.querySelector('.placementShip');
    placementShipDiv.style.display = 'none';
  }

  let DOMmanager = {
    displayMenu,
    toggleHandover,
    drawGame,
    drawBoards,
    addEventListeners,
    addBoardEventListners,
    disablePlacementShip,
    togglePlacementShip,
  };
  return DOMmanager;
};

export { createController };
