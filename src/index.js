import { createGame } from "./game.js"
import { createController } from "./domController.js"

const test = () => {
    console.log('hi')
}
let game = createGame();
let domManager = createController();
// domManager.displayMenu(game);
domManager.displayMenu(game);
setInterval(() => {
    game.main(domManager)
}, 17);

// setInterval(cnsole.log('hello'),18)
// const gameLoop = setInterval(game.main(domManager),17);
// const testLoop = setInterval(console.log('hello'),17)

// if (gameLoop == false) {
//     clearInterval(gameLoop);
// }

import './styles/style.css'
