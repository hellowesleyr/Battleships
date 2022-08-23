import { createShip } from "./ship.js";
import { createBoard } from "./board.js";

let thisShip = createShip(4);
for (let i = 0; i<thisShip.length;++i) {
    console.log(thisShip.segments[i])
}
thisShip.hit(0);

it('checks if hit function updates segment',() => {
    expect(thisShip.segments[0].hit).toBe(true);
})



let testSmallShip = createShip(1);
testSmallShip.hit(0);
it('tests if a ship does sink when hit fully', () => {
    expect(testSmallShip.sunk).toBe(true);
})



let testBoard = createBoard();
testBoard.receiveAttack(0,0);
it('tests if receivehit changes the hit value of a cell', () => {
    expect(testBoard.cells[0][0].hit).toBe(true)
})

// testBoard.placeShip(4)
//----------------------------
//Modifying and accessing ships from gameboard 


let mockShip = createShip(4,0,0,'right')
let testBoard2 = createBoard();
console.log(testBoard2.cells[0][0])
testBoard2.placeShip(4,0,0,'right')
it('Tests that a ship at origin with right orientation can be accessed from origin cell', () => {
    expect(JSON.stringify(testBoard2.cells[0][0].ship)).toBe(JSON.stringify(mockShip))
})

it('Tests that the segments of a ship can be accessed via the boar', () => {
    expect(JSON.stringify(testBoard2.cells[0][0].position)).toBe(JSON.stringify(mockShip.segments[0]))
})

it('Tests that another segment of the same ship can be accessed via the board', ()=> {
    expect(JSON.stringify(testBoard2.cells[3][0].position)).toBe(JSON.stringify(mockShip.segments[3]))
})

it('Tests that another segment of a different ship can be acccessed', () => {
    //TODO
})

it('Tests that if placing a ship with origin out of bounds is caught and rejected' , () => {
    expect(testBoard2.placeShip(4,-1,-1,'right')).toBe(false)
})

it('Tests that placing a ship with a segment out of bounds is caught and rejected', () => {
    expect(() => {
        testBoard2.placeShip(4,9,9,'right').toThrow('out of bounds');
    })
})

let testBoard3 = createBoard();
testBoard3.placeShip(2,0,0,'right');
testBoard3.placeShip(1,2,2,'right');
testBoard3.placeShip(2,3,3,'up');

testBoard3.receiveAttack(0,0);
testBoard3.receiveAttack(1,0);

testBoard3.receiveAttack(2,2);
testBoard3.receiveAttack(3,3);
testBoard3.receiveAttack(3,4);

it('tests that all ships have been sunk', () => {
    expect(testBoard3.queryBoardSunk()).toBe(true);
});

it('tests that items in ship list are same as objects in board', () => {
    expect(testBoard3.ships[0]).toBe(testBoard3.cells[0][0].ship)
})








