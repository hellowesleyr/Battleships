const createShip = (length, x, y, orientation, team) => {
  if (x < 0 || x > 9 || y < 0 || y > 9) {
    return false;
  }
  let segments = [];
  let dx = 0;
  let dy = 0;
  if (orientation == 'up') {
    dy = 1;
  }
  else if (orientation == 'right') {
    dx = 1;
  }

  for (let i = 0; i < length; ++i) {
    segments.push({
      x: x+(i*dx),
      y: y+(i*dy),
      hit: false,
    });
  }
  const hit = (position) => {
    ship.segments[position].hit = true;
    ship.isSunk();
  };
  const isSunk = () => {
    let hitCount = 0;
    for (let i = 0; i < ship.length; i++) {
      if (ship.segments[i].hit == true) {
        hitCount++;
        if (hitCount === ship.length) {
          ship.sunk = true;
          return true;
        }
      }
    }
  };
  const ship = {
    length,
    test: false,
    segments,
    orientation,
    sunk: false,
    team,
    hit,
    isSunk,
  };
  return ship;
};

export { createShip };
