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
        enemyPlayer.board.receiveAttack(x,y);
        
        game.activePlayer.attacking = false;
        passOverTurn(domManager);
        game.activePlayer.attacking = true;

        
    }
    
    const intializeGame = (singlePlayer) => {
         game.player1 = createPlayer(false,1);
        if (singlePlayer == true) {
            game.player2 = createPlayer(true,2);
        }
        else if (singlePlayer!= true){
            game.player2 = createPlayer(false,2);
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
                // placeTestShips(game);
                // game.player1.playerShipsToPlace = [];
                game.player1.placeAIShips();
                game.player1.placingShips = false;
                // passOverTurn(DOMmanager);
                // passOverTurn(DOMmanager);
                first = false;
            }
            
            if (game.gameOver == true) {
              return false;
            }
        }
      if (game.active == true) {
          if (game.player1.placingShips == true) {
            //DEBUGGING
            game.phase = 'player 1 placing ships'
            if (game.player1.placingShips == true) {
                if (game.player2.robot == false) {
                    // alert('player 2 is now placing ships')
                    // alert(`player 1 is still placing ships?`)
                    
                    game.player2.placingShips = true;
                    passOverTurn(DOMmanager);
                }
                else if (game.player2.robot == true) {
                    game.player2.placingShips = false;
                }
            }
          }
         if (game.player1.placingShips == false && game.player2.placingShips == true) {
            game.phase = `player 2 placing ships`
            game.player2.board.drawBoard();
         }
         if (game.player1.placingShips == false && game.player2.placingShips == false) {
            DOMmanager.disablePlacementShip()
            game.phase = `player ${game.activePlayer.team} attacking`
            game.activePlayer.attacking = true;
         }
      }
    }
    let game = {
        phase,
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