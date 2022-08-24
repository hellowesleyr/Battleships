import { createBoard } from "./board.js";
// import { createShip } from "./ship";

const createPlayer = (robot,team) => {
    let highPriorityCells = [];
    let lowPriorityCells = [];
    let board = createBoard();
    let placingShips
    let playerShipsToPlace = [4,4,3,3,2,2];
    // let playerShipsToPlace = [2];

    let currentPlacementShip = {
        placing: false,
        x: undefined,
        y: undefined,
        orientation: 'up',
        visible: false,
        length: 5,
    };

    if (robot == false) {
        placingShips = true;
    }

    const placeAIShips = () => {
        let shipsToPlace = [4,4,3,3,2,2]
        // let shipsToPlace = [2]


        while (shipsToPlace.length > 0) {
                let currentLength = shipsToPlace[0];
                let currentX = getRandomInt(0,9);
                let currentY = getRandomInt(0,9);
                let currentOrientation = getRandomOrientation();
                // alert(`attempting placement at ${currentX}, ${currentY}`)
                if (player.placePlayerShip(currentLength,currentX,currentY,currentOrientation,team) == true) {
                    shipsToPlace.splice(0,1);
                }
                // if (successfulPlacement == true) {
                //     console.log(`placed a ship`);
                // }
            }
        player.placingShips = false;
        player.shipsToPlace = [];
    }



    const placePlayerShip = (length,x,y,orientation,team) => {
        if (player.board.placeShip(length,x,y,orientation,team) == true) {
            // alert('placed ship')
            player.playerShipsToPlace.splice(0,1);
            if (player.playerShipsToPlace.length == 0) {
                player.placingShips = false;
            }
            console.log(player.playerShipsToPlace);
            return true;
        }
        else return false;
    }

    const placeShip = (length,x,y,orientation,team) => {

            let result = player.board.placeShip(length,x,y,orientation,team);
            if (result == true) {

                return true;
            }
            else if (result == false) {
                return false;
            }
    
     
    }

    const updateCurrentPlacementShip = () => {
        
    }

    const getRandomOrientation = () => {
        let value = getRandomInt(0,1);
        if (value == 0) {
            return 'right'
        }
        else if (value == 1) {
            return 'up'
        }
        else throw new Error('Oops')
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const takeAIturn = (board) => {
        if (robot == true) {
            //Create array of possible attacks
            for (let i = 0; i<10;++i) {
                for (let j = 0; j<10;++j) {
                    let currentCell = board.cells[i][j]
                    if (currentCell.mustBeEmpty == false && currentCell.hit == false) {
                        lowPriorityCells.push(board.cells[i][j]);
                    }
                }
            }
            //Highest priority cells are those which are known to be next to a ship
            if (highPriorityCells.length > 0) {

            }
            //Next priority is a random pick cell that has mustBeEmpty: false
            else if (lowPriorityCells.length > 0) {
                let moveIndex = getRandomInt(0,lowPriorityCells.length);
                let targetCell = lowPriorityCells[moveIndex];
                board.receiveAttack(targetCell.x,targetCell.y);
                console.log(`Attack made, x is ${targetCell.x}, y is ${targetCell.y}}`)
            } 
        }
    }
    let player = {
        playerShipsToPlace,
        currentPlacementShip,
        robot,
        team,
        board,
        takeAIturn,
        placeAIShips,
        placePlayerShip,
        placeShip
    }

    if (robot == true) {
        placeAIShips()
    }




    return player
}


export { createPlayer }