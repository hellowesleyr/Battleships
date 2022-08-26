import { createPlayer } from "./player"
import { createController } from "./domController"
// import './styles/style.css'

const placeTestShips = (game) => {
}

const createGame = () => {
    let activePlayer;
    let player1;
    let player2;
    let phase;
    let gameOver = false;
    let active = false;
    let winner;
    let switchingPlacements = false;
    const entry = () => {
        DOMmanager.displayMenu();
    }
    const makeAttack = (x,y,domManager) => {
        let enemyPlayer;
        if (game.activePlayer.team == 2) {
            enemyPlayer = game.player1;
        }
        else if (game.activePlayer.team == 1) {
            enemyPlayer = game.player2;
        }
        if (enemyPlayer.board.receiveAttack(x,y) == true) {
            game.activePlayer.attacking = false;
            passOverTurn(domManager);
            game.activePlayer.attacking = true;
        };
        

        
    }
    
    const intializeGame = (singlePlayer) => {
         game.player1 = createPlayer(false,1);
        if (singlePlayer == true) {
            game.player2 = createPlayer(true,2);
        }
        else if (singlePlayer == false){
            game.player2 = createPlayer(false,2);
            game.player2.placingShips = true;

        }
        game.activePlayer = game.player1;
        game.player1.placingShips = true;
        game.phase = `Placing player 1 ships`
        game.active = true;
    }
    const passOverTurn = (DOMmanager) => {
        DOMmanager.toggleHandover();
        if (game.activePlayer.team == 1) {
            game.activePlayer = game.player2;
        }
        else if (game.activePlayer.team == 2) {
            game.activePlayer = game.player1;
        }

    }
    let first = true;
    const main = (DOMmanager) => {
        if (game.active) {
            DOMmanager.drawGame(game,false)
            if (first == true) {
                // game.player1.placeAIShips();
                // game.player1.placingShips = false;

                // passOverTurn(DOMmanager);
                // passOverTurn(DOMmanager);
                first = false;
            }
            
            if (game.gameOver == true) {
                let gameOverPanel = document.querySelector('.gameOver');
                gameOverPanel.classList.remove('inactive');
                gameOverPanel.classList.add('active');
                let gameOverTextElem = document.querySelector('.gameOverText');
                let gameOverText = `Game over! player ${game.winner.team} wins!`;
                gameOverTextElem.innerText = gameOverText;
              return false;
            }
        }
      if (game.active == true) {
        if (game.player1.board.queryBoardSunk() && game.player1.placingShips == false && game.player2.placingShips == false) {
            game.gameOver = true;
            game.winner = game.player2;
            game.phase = 'player 2 wins!'
            game.player1.attacking = false;
            game.player2.attacking = false;
            // alert('tried to win');
        }
        else if (game.player2.board.queryBoardSunk() && game.player2.placingShips == false && game.player1.placingShips == false) {
            game.gameOver = true;
            game.winner = game.player1;
            game.phase = 'player 1 wins!'
            game.player1.attacking = false;
            game.player2.attacking = false;
            // alert('tried to win');

        }
        if (gameOver == false) {
            if (game.player1.placingShips == true) {
              //DEBUGGING
              game.phase = 'player 1 placing ships'
              if (game.player1.placingShips == true) {
                  if (game.player2.robot == false) {
                      // alert('player 2 is now placing ships')
                      // alert(`player 1 is still placing ships?`)
                      
                      game.player2.placingShips = true;
                      switchingPlacements = true
                    //   passOverTurn(DOMmanager);
                  }
                  else if (game.player2.robot == true) {
                      game.player2.placingShips = false;
                    }
                }
            }
            if (game.player1.placingShips == false && game.player2.placingShips == true) {
                game.phase = `player 2 placing ships`
                if (switchingPlacements == true) {
                    passOverTurn(DOMmanager)
                    // alert(switchingPlacements);
                    switchingPlacements = false;
                }
                // game.activePlayer = game.player2;
                // if (game.player2.playerShipsToPlace.length == 0) {
                //     game.activePlayer = player1;
                // }
              
           }
           if (game.player1.placingShips == false && game.player2.placingShips == false) {
              DOMmanager.disablePlacementShip()
              game.phase = `player ${game.activePlayer.team} attacking`
              game.activePlayer.attacking = true;
           }

        }
      }
    }
    let game = {
        phase,
        winner,
        active,
        player1,
        player2,
        activePlayer,
        entry,
        intializeGame,
        makeAttack,
        main,
    }
    return game;
}

export { createGame }