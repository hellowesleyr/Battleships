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
  let placementShipDiv = document.createElement('div');
  placementShipDiv.classList.add('placementShip');
  let navBarHTML = `<div class="menu">
    Menu
  </div>
  <div class="title">
    Battleships
  </div>`;

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
  alert(element)
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
        if (currentCell.hit == true) {
          cellElem.innerText = 'X';
        }
        if (currentEnemyCell.hit == true) {
          enemyCellElem.innerText = 'X';
        }
        if (currentCell.ship!=undefined) {
          if (currentCell.ship.isSunk == true) {
            cellElem.style['background-color'] = 'darkred';
          }
          else if (currentCell.ship.isSunk != true) {
            cellElem.style['background-color'] = 'green';
          }
        }
        if (currentEnemyCell.ship!=undefined) {
          if (currentEnemyCell.ship.isSunk == true) {
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
    alert('clicked')
  })
}

const renderPlacementShip = (game) => {
  let placementShipDiv = document.querySelector('.placementShip');
  try {
    let currentShipLength = game.activePlayer.playerShipsToPlace[0];
    let placementShip = game.activePlayer.currentPlacementShip;
    if (placementShip.orientation == 'right') {
      placementShipDiv.style.width = '36px';
      placementShipDiv.style.height = `${currentShipLength*36}px`
    }
    else if (placementShip.orientation == 'up') {
      placementShipDiv.style.width = `${currentShipLength*36}px`
      placementShipDiv.style.height = `36px`;
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
            if (player1.placingShips == true) {
              let x = currentCell.x;
              let y = currentCell.y;
              let orientation = player1.currentPlacementShip.orientation;
              // alert(orientation);
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
          })
          currentElem.addEventListener('mouseover',e => {
            if (player1.placingShips == true) {
              player1.currentPlacementShip.x = currentCell.x;
              player1.currentPlacementShip.y = currentCell.y;
                let mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
                let mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
                shipDiv.style.left = mouseX + 5 + "px";
                shipDiv.style.top = (mouseY + 5 ) + "px";              
            }
          })
        }
        if (t==2) {
          let currentCell = player2.board.cells[i][j];
          let currentElem = currentCell.cellElem;
          currentElem.style['background-color'] = 'orange';
          currentElem.addEventListener('click',e => {
            alert(player2.placingShips);
            if (player2.placingShips == true) {
              alert('player 2 placing ships')
              let x = currentCell.x;
              let y = currentCell.y;
              let orientation = player2.currentPlacementShip.orientation;
              // alert(orientation);
              let length = player2.currentPlacementShip.length;
              let team = player2.team;
              // alert('tried placing a ship');
              if (player2.placeShip(length,x,y,orientation,team) == true) {
                player2.playerShipsToPlace.splice(0,1);
                player2.currentPlacementShip.length = player2.playerShipsToPlace[0];
                // alert('placed a ship');
                console.log(`player ship remaining ${player2.playerShipsToPlace}`)
            }
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
      handOverPanel.classList.add('handoverPanel','inactive');
      handOverPanel.innerHTML = handOverPanelHTML;
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
      for (let i = 0; i<10; i++) {
        for (let j = 0; j<10;j++) {
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
      content.appendChild(gameContainer);
      DOMmanager.drawBoards(game,game.activePlayer);
      addEventListeners();
      addBoardEventListners(game);
    }
    gameInfo.innerText = `current player: player ${game.activePlayer.team}`
    gameInfoBottom.innerText = `${game.phase}.`
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
      alert(game.player1.placingShips)
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
