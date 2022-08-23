/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
// import { isNull, isUndefined } from "lodash";


var createCell = function createCell(x, y) {
  //Get ship function
  var cell = {
    x: x,
    y: y,
    mustBeEmpty: false,
    suspectedShip: false,
    empty: true,
    segmentIndex: undefined,
    hit: false,
    ship: undefined,
    position: undefined
  };
  return cell;
};

var createBoard = function createBoard() {
  var cells = [];
  var shipsRemaining = 0;
  var ships = [];

  for (var i = 0; i < 10; i++) {
    var thisCol = [];

    for (var j = 0; j < 10; j++) {
      var thisCell = createCell(i, j);
      thisCol.push(thisCell);
    }

    cells.push(thisCol);
  }

  var getSegmentCoords = function getSegmentCoords(Ox, Oy, length, orientation) {
    var coords = [];
    var dx;
    var dy;

    if (orientation == "right") {
      dx = 1;
      dy = 0;
    }

    if (orientation == "up") {
      dx = 0;
      dy = 1;
    }

    for (var _i = 0; _i < length; _i++) {
      var x_i = Ox + _i * dx;
      var y_i = Oy + _i * dy;
      coords.push({
        x: x_i,
        y: y_i
      });
    }

    return coords;
  };

  var queryBoardSunk = function queryBoardSunk() {
    var shipsRemaining = 0;
    board.ships.forEach(function (ship) {
      for (var _i2 = 0; _i2 < board.ships.length; ++_i2) {
        if (ship.sunk === false) {
          ++shipsRemaining;
        }
      }
    });

    if (shipsRemaining == 0) {
      return true;
    } else if (shipsRemaining != 0) {
      return false;
    }
  };

  var drawBoard = function drawBoard() {
    var boardString = "";

    for (var _i3 = 0; _i3 < 10; ++_i3) {
      var lineString = "";
      lineString += "|";

      for (var _j = 0; _j < 10; ++_j) {
        lineString += "  ";
        var currentCell = board.cells[_i3][_j];

        if (currentCell.ship != undefined) {
          if (currentCell.position.hit == true) {
            lineString += "H";
          } else if (currentCell.position.hit == false) {
            lineString += "S";
          }
        } else if (currentCell.ship == undefined) {
          if (currentCell.hit == true) {
            lineString += "H";
          } else if (currentCell.hit != true) {
            lineString += "O";
          }
        }
      }

      lineString += "|";
      boardString += lineString += "\n";
    }

    console.log(boardString);
  };

  var placeShip = function placeShip(length, x, y, orientation, team) {
    //Validation
    var maxY = 0;
    var maxX = 0;
    var occupyingAndAdjacentCells = [];

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }

    if (maxX < 0 || maxX > 9 || maxY < 0 || maxY > 9) {
      return false;
    }

    var dX = 0;
    var dY = 0;

    if (orientation == 'up') {
      dY = 1;
    } else if (orientation == 'right') {
      dX = 1;
    }

    for (var c = -1; c < 2; c++) {
      for (var _i4 = 0; _i4 < length; _i4++) {
        var currentX = x + dX * _i4;
        var currentY = y + dY * _i4;

        if (currentX < 0 || currentX > 9 || currentY < 0 || currentY > 9) {
          return false;
        }

        if (board.cells[currentX][currentY].ship != undefined) {
          return false;
        }
      }
    }

    var thisShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__.createShip)(length, x, y, orientation, team);
    var originCell = board.cells[x][y]; // console.log(board.cells[x][y])

    originCell.ship = thisShip;
    ships.push(thisShip);
    var coords = getSegmentCoords(x, y, length, orientation); //Set the position attribute of relevant cells

    for (var _i5 = 0; _i5 < coords.length; _i5++) {
      var thisCoord = coords[_i5];
      var segX = thisCoord.x;
      var segY = thisCoord.y; // console.log(`segX is ${segX}, segY is ${segY}`)
      // console.log(segX);
      // console.log(segY)

      var _thisCell = board.cells[segX][segY];
      _thisCell.position = thisShip.segments[_i5];
      _thisCell.ship = thisShip;
    }

    return true;
  };

  var receiveAttack = function receiveAttack(x, y) {
    var currentCell = board.cells[x][y];
    currentCell.hit = true;
    var currentShip = currentCell.ship;

    if (currentShip != undefined && currentShip != null) {
      //DOSTuff
      board.getSegmentCoords(x, y, currentShip.length, currentShip.orientation);
      currentCell.position.hit = true;
      currentShip.isSunk();
    }

    return currentCell;
  };

  var board = {
    cells: cells,
    ships: ships,
    shipsRemaining: shipsRemaining,
    receiveAttack: receiveAttack,
    getSegmentCoords: getSegmentCoords,
    placeShip: placeShip,
    queryBoardSunk: queryBoardSunk,
    drawBoard: drawBoard
  };
  return board;
};



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ "./src/board.js");
 // import { createShip } from "./ship";

var createPlayer = function createPlayer(robot, team) {
  var highPriorityCells = [];
  var lowPriorityCells = [];
  var board = (0,_board_js__WEBPACK_IMPORTED_MODULE_0__.createBoard)();

  var placeAIShips = function placeAIShips() {
    var shipsToPlace = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2];

    while (shipsToPlace.length > 0) {
      var currentLength = shipsToPlace[0];
      var currentX = getRandomInt(0, 9);
      var currentY = getRandomInt(0, 9);
      var currentOrientation = getRandomOrientation();
      var successfulPlacement = board.placeShip(currentLength, currentX, currentY, currentOrientation, team);

      if (successfulPlacement == true) {
        console.log("placed a ship");
        shipsToPlace.splice(0, 1);
      }
    }
  };

  var getRandomOrientation = function getRandomOrientation() {
    var value = getRandomInt(0, 1);

    if (value == 0) {
      return 'right';
    } else if (value == 1) {
      return 'up';
    } else throw new Error('Oops');
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var takeAIturn = function takeAIturn(board) {
    if (robot == true) {
      //Create array of possible attacks
      for (var i = 0; i < 10; ++i) {
        for (var j = 0; j < 10; ++j) {
          var currentCell = board.cells[i][j];

          if (currentCell.mustBeEmpty == false && currentCell.hit == false) {
            lowPriorityCells.push(board.cells[i][j]);
          }
        }
      } //Highest priority cells are those which are known to be next to a ship


      if (highPriorityCells.length > 0) {} //Next priority is a random pick cell that has mustBeEmpty: false
      else if (lowPriorityCells.length > 0) {
        var moveIndex = getRandomInt(0, lowPriorityCells.length);
        var targetCell = lowPriorityCells[moveIndex];
        board.receiveAttack(targetCell.x, targetCell.y);
        console.log("Attack made, x is ".concat(targetCell.x, ", y is ").concat(targetCell.y, "}"));
      }
    }
  };

  var player = {
    robot: robot,
    team: team,
    board: board,
    takeAIturn: takeAIturn
  };

  if (robot == true) {
    placeAIShips();
  }

  return player;
};



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
var createShip = function createShip(length, x, y, orientation, team) {
  if (x < 0 || x > 9 || y < 0 || y > 9) {
    return false;
  }

  var segments = [];

  for (var i = 0; i < length; ++i) {
    segments.push({
      hit: false
    });
  }

  var hit = function hit(position) {
    ship.segments[position].hit = true;
    ship.isSunk();
  };

  var isSunk = function isSunk() {
    var hitCount = 0;

    for (var _i = 0; _i < ship.length; _i++) {
      if (ship.segments[_i].hit == true) {
        hitCount++;

        if (hitCount === ship.length) {
          ship.sunk = true;
          return true;
        }
      }
    }
  };

  var ship = {
    length: length,
    test: false,
    segments: segments,
    sunk: false,
    team: team,
    hit: hit,
    isSunk: isSunk
  };
  return ship;
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300&family=Nunito:ital,wght@1,300&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --errorHeight: 1rem;\n}\n\nbody {\n  background-color: red;\n}\n\nselect {\n  background-color: white;\n}\n\n\n\n#content {\n  display: flex;\n  flex-direction: row;\n\n}\n\n.sideImage {\n  width: 35vw;\n}\n\n.formWrapper {\n  display: flex;\n  width: 65vw;\n  margin: 2rem;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 12rem 12rem;\n  grid-auto-rows: 3em;\n  grid-row-gap: 2rem;\n  grid-column-gap: 4rem;\n}\n\n\n\n.inputWrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-bottom: var(--errorHeight);\n\n}\n\n.email {\n  grid-column: 1 / span 2;\n}\n\n#signUpCountry {\n\n}\n\n#signUpPostcode {\n\n}\n\n#signUpPassword {\n\n}\n\n#signUpConfirmPassword {\n\n}\n\n.submit {\n  grid-column: 1 / span 2;\n  justify-self: center;\n  display:\n   flex;\n}\n\n.error {\n  transition: all 200ms;\n  color: red;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 0;\n  margin-top: 0px;\n  font-size: 14px;\n  margin-bottom: -1rem;\n}\n\n\ninput:valid, select:valid{\n  border: 1px solid green;\n}\n\ninput:invalid, select:invalid{\n  border: 1px solid red;\n}", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;;;AAIA;EACE,aAAa;EACb,mBAAmB;;AAErB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,kCAAkC;EAClC,mBAAmB;EACnB,kBAAkB;EAClB,qBAAqB;AACvB;;;;AAIA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,iCAAiC;;AAEnC;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;;AAEA;EACE,uBAAuB;EACvB,oBAAoB;EACpB;OACK;AACP;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,2BAA2B;EAC3B,SAAS;EACT,eAAe;EACf,eAAe;EACf,oBAAoB;AACtB;;;AAGA;EACE,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;AACvB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300&family=Nunito:ital,wght@1,300&display=swap');\n\n:root {\n  --errorHeight: 1rem;\n}\n\nbody {\n  background-color: red;\n}\n\nselect {\n  background-color: white;\n}\n\n\n\n#content {\n  display: flex;\n  flex-direction: row;\n\n}\n\n.sideImage {\n  width: 35vw;\n}\n\n.formWrapper {\n  display: flex;\n  width: 65vw;\n  margin: 2rem;\n  display: grid;\n  justify-content: center;\n  grid-template-columns: 12rem 12rem;\n  grid-auto-rows: 3em;\n  grid-row-gap: 2rem;\n  grid-column-gap: 4rem;\n}\n\n\n\n.inputWrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-bottom: var(--errorHeight);\n\n}\n\n.email {\n  grid-column: 1 / span 2;\n}\n\n#signUpCountry {\n\n}\n\n#signUpPostcode {\n\n}\n\n#signUpPassword {\n\n}\n\n#signUpConfirmPassword {\n\n}\n\n.submit {\n  grid-column: 1 / span 2;\n  justify-self: center;\n  display:\n   flex;\n}\n\n.error {\n  transition: all 200ms;\n  color: red;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 0;\n  margin-top: 0px;\n  font-size: 14px;\n  margin-bottom: -1rem;\n}\n\n\ninput:valid, select:valid{\n  border: 1px solid green;\n}\n\ninput:invalid, select:invalid{\n  border: 1px solid red;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");


var testPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.createPlayer)(true, 1);
testPlayer.board.drawBoard();
testPlayer.takeAIturn(testPlayer.board);
testPlayer.board.drawBoard();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBLElBQUk0RSxVQUFVLEdBQUcxQix3REFBWSxDQUFDLElBQUQsRUFBTSxDQUFOLENBQTdCO0FBQ0EwQixVQUFVLENBQUN0RCxLQUFYLENBQWlCRyxTQUFqQjtBQUNBbUQsVUFBVSxDQUFDTixVQUFYLENBQXNCTSxVQUFVLENBQUN0RCxLQUFqQztBQUNBc0QsVUFBVSxDQUFDdEQsS0FBWCxDQUFpQkcsU0FBakIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9zcmMvc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzP2ZmOTQiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYnBhY2stdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly93ZWJwYWNrLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGlzTnVsbCwgaXNVbmRlZmluZWQgfSBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcC5qc1wiO1xuY29uc3QgY3JlYXRlQ2VsbCA9ICh4LCB5KSA9PiB7XG4gIC8vR2V0IHNoaXAgZnVuY3Rpb25cbiAgbGV0IGNlbGwgPSB7XG4gICAgeCxcbiAgICB5LFxuICAgIG11c3RCZUVtcHR5OiBmYWxzZSxcbiAgICBzdXNwZWN0ZWRTaGlwOiBmYWxzZSxcbiAgICBlbXB0eTogdHJ1ZSxcbiAgICBzZWdtZW50SW5kZXg6IHVuZGVmaW5lZCxcbiAgICBoaXQ6IGZhbHNlLFxuICAgIHNoaXA6IHVuZGVmaW5lZCxcbiAgICBwb3NpdGlvbjogdW5kZWZpbmVkLFxuICB9O1xuICByZXR1cm4gY2VsbDtcbn07XG5cbmNvbnN0IGNyZWF0ZUJvYXJkID0gKCkgPT4ge1xuICBsZXQgY2VsbHMgPSBbXTtcbiAgbGV0IHNoaXBzUmVtYWluaW5nID0gMDtcbiAgbGV0IHNoaXBzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGxldCB0aGlzQ29sID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBsZXQgdGhpc0NlbGwgPSBjcmVhdGVDZWxsKGksIGopO1xuICAgICAgdGhpc0NvbC5wdXNoKHRoaXNDZWxsKTtcbiAgICB9XG4gICAgY2VsbHMucHVzaCh0aGlzQ29sKTtcbiAgfVxuICBjb25zdCBnZXRTZWdtZW50Q29vcmRzID0gKE94LCBPeSwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT4ge1xuICAgIGxldCBjb29yZHMgPSBbXTtcbiAgICBsZXQgZHg7XG4gICAgbGV0IGR5O1xuICAgIGlmIChvcmllbnRhdGlvbiA9PSBcInJpZ2h0XCIpIHtcbiAgICAgIGR4ID0gMTtcbiAgICAgIGR5ID0gMDtcbiAgICB9XG4gICAgaWYgKG9yaWVudGF0aW9uID09IFwidXBcIikge1xuICAgICAgZHggPSAwO1xuICAgICAgZHkgPSAxO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgeF9pID0gT3ggKyBpICogZHg7XG4gICAgICBsZXQgeV9pID0gT3kgKyBpICogZHk7XG4gICAgICBjb29yZHMucHVzaCh7XG4gICAgICAgIHg6IHhfaSxcbiAgICAgICAgeTogeV9pLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH07XG4gIGNvbnN0IHF1ZXJ5Qm9hcmRTdW5rICA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNSZW1haW5pbmcgPSAwXG4gICAgYm9hcmQuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpPGJvYXJkLnNoaXBzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChzaGlwLnN1bmsgPT09IGZhbHNlKSB7XG4gICAgICAgICAgKytzaGlwc1JlbWFpbmluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChzaGlwc1JlbWFpbmluZyA9PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2hpcHNSZW1haW5pbmcgIT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBcbiAgY29uc3QgZHJhd0JvYXJkID0gKCkgPT4ge1xuICAgIGxldCBib2FyZFN0cmluZyA9IGBgXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8MTA7ICsraSkge1xuICAgICAgbGV0IGxpbmVTdHJpbmcgPSBgYFxuICAgICAgbGluZVN0cmluZys9YHxgXG4gICAgICBmb3IgKGxldCBqID0gMDsgajwxMDsgKytqKSB7XG4gICAgICAgIGxpbmVTdHJpbmcrPSBgICBgXG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGJvYXJkLmNlbGxzW2ldW2pdO1xuICAgICAgICBpZiAoY3VycmVudENlbGwuc2hpcCE9dW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRDZWxsLnBvc2l0aW9uLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgICBsaW5lU3RyaW5nICs9IGBIYFxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChjdXJyZW50Q2VsbC5wb3NpdGlvbi5oaXQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxpbmVTdHJpbmcrPSBgU2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY3VycmVudENlbGwuc2hpcCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsLmhpdCA9PSB0cnVlKSB7XG4gICAgICAgICAgbGluZVN0cmluZys9YEhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudENlbGwuaGl0ICE9dHJ1ZSkge1xuICAgICAgICAgIGxpbmVTdHJpbmcgKz0gYE9gIFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxpbmVTdHJpbmcrPWB8YFxuICAgIGJvYXJkU3RyaW5nKz1saW5lU3RyaW5nKz1gXFxuYFxuICB9XG4gIGNvbnNvbGUubG9nKGJvYXJkU3RyaW5nKTtcbiAgfVxuICBjb25zdCBwbGFjZVNoaXAgPSAobGVuZ3RoLCB4LCB5LCBvcmllbnRhdGlvbiwgdGVhbSkgPT4ge1xuICAgIC8vVmFsaWRhdGlvblxuICAgIGxldCBtYXhZID0gMDtcbiAgICBsZXQgbWF4WCA9IDA7XG4gICAgbGV0IG9jY3VweWluZ0FuZEFkamFjZW50Q2VsbHMgID0gW107XG4gICAgaWYgKHggPCAwIHx8IHggPiA5IHx8IHkgPCAwIHx8IHkgPiA5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICBpZiAobWF4WCA8IDAgfHwgbWF4WD45IHx8IG1heFk8MCB8fCBtYXhZID4gOSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBkWCA9IDA7XG4gICAgbGV0IGRZID0gMDtcbiAgICBpZiAob3JpZW50YXRpb24gPT0gJ3VwJykge1xuICAgICAgZFkgPSAxO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcmllbnRhdGlvbiA9PSAncmlnaHQnKSB7XG4gICAgICBkWCA9IDE7XG4gICAgfVxuICAgICAgZm9yIChsZXQgYyA9IC0xOyBjPDI7IGMrKykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTxsZW5ndGg7aSsrKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRYID0geCtkWCppO1xuICAgICAgICAgIGxldCBjdXJyZW50WSA9IHkrZFkqaTtcbiAgICAgICAgICBpZiAoY3VycmVudFggPCAwIHx8IGN1cnJlbnRYID4gOSB8fCBjdXJyZW50WSA8IDAgfHwgY3VycmVudFkgPiA5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChib2FyZC5jZWxsc1tjdXJyZW50WF1bY3VycmVudFldLnNoaXAgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcblxuXG4gICAgbGV0IHRoaXNTaGlwID0gY3JlYXRlU2hpcChsZW5ndGgsIHgsIHksIG9yaWVudGF0aW9uLCB0ZWFtKTtcbiAgICBsZXQgb3JpZ2luQ2VsbCA9IGJvYXJkLmNlbGxzW3hdW3ldO1xuICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkLmNlbGxzW3hdW3ldKVxuICAgIG9yaWdpbkNlbGwuc2hpcCA9IHRoaXNTaGlwO1xuICAgIHNoaXBzLnB1c2goKHRoaXNTaGlwKSk7XG4gICAgbGV0IGNvb3JkcyA9IGdldFNlZ21lbnRDb29yZHMoeCwgeSwgbGVuZ3RoLCBvcmllbnRhdGlvbik7XG4gICAgLy9TZXQgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBvZiByZWxldmFudCBjZWxsc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdGhpc0Nvb3JkID0gY29vcmRzW2ldO1xuXG4gICAgICBsZXQgc2VnWCA9IHRoaXNDb29yZC54O1xuICAgICAgbGV0IHNlZ1kgPSB0aGlzQ29vcmQueTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBzZWdYIGlzICR7c2VnWH0sIHNlZ1kgaXMgJHtzZWdZfWApXG4gICAgICAvLyBjb25zb2xlLmxvZyhzZWdYKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNlZ1kpXG4gICAgICBsZXQgdGhpc0NlbGwgPSBib2FyZC5jZWxsc1tzZWdYXVtzZWdZXTtcbiAgICAgIHRoaXNDZWxsLnBvc2l0aW9uID0gdGhpc1NoaXAuc2VnbWVudHNbaV07XG4gICAgICB0aGlzQ2VsbC5zaGlwID0gdGhpc1NoaXA7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICBsZXQgY3VycmVudENlbGwgPSBib2FyZC5jZWxsc1t4XVt5XTtcbiAgICBjdXJyZW50Q2VsbC5oaXQgPSB0cnVlO1xuICAgIGxldCBjdXJyZW50U2hpcCA9IGN1cnJlbnRDZWxsLnNoaXA7XG4gICAgaWYgKGN1cnJlbnRTaGlwICE9IHVuZGVmaW5lZCAmJiBjdXJyZW50U2hpcCE9IG51bGwpIHtcbiAgICAgIC8vRE9TVHVmZlxuICAgICAgYm9hcmQuZ2V0U2VnbWVudENvb3Jkcyh4LHksY3VycmVudFNoaXAubGVuZ3RoLGN1cnJlbnRTaGlwLm9yaWVudGF0aW9uKTtcbiAgICAgIGN1cnJlbnRDZWxsLnBvc2l0aW9uLmhpdCA9IHRydWU7XG4gICAgICBjdXJyZW50U2hpcC5pc1N1bmsoKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRDZWxsO1xuICB9O1xuICBsZXQgYm9hcmQgPSB7XG4gICAgY2VsbHMsXG4gICAgc2hpcHMsXG4gICAgc2hpcHNSZW1haW5pbmcsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTZWdtZW50Q29vcmRzLFxuICAgIHBsYWNlU2hpcCxcbiAgICBxdWVyeUJvYXJkU3VuayxcbiAgICBkcmF3Qm9hcmQsXG4gIH07XG4gIHJldHVybiBib2FyZDtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUJvYXJkIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCB9IGZyb20gXCIuL2JvYXJkLmpzXCI7XG4vLyBpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBjcmVhdGVQbGF5ZXIgPSAocm9ib3QsdGVhbSkgPT4ge1xuICAgIGxldCBoaWdoUHJpb3JpdHlDZWxscyA9IFtdO1xuICAgIGxldCBsb3dQcmlvcml0eUNlbGxzID0gW107XG4gICAgbGV0IGJvYXJkID0gY3JlYXRlQm9hcmQoKTtcblxuXG4gICAgY29uc3QgcGxhY2VBSVNoaXBzID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2hpcHNUb1BsYWNlID0gWzUsNCw0LDMsMywzLDIsMiwyLDJdXG5cbiAgICAgICAgd2hpbGUgKHNoaXBzVG9QbGFjZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBzaGlwc1RvUGxhY2VbMF07XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRYID0gZ2V0UmFuZG9tSW50KDAsOSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRZID0gZ2V0UmFuZG9tSW50KDAsOSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRPcmllbnRhdGlvbiA9IGdldFJhbmRvbU9yaWVudGF0aW9uKCk7XG4gICAgICAgICAgICAgICAgbGV0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBib2FyZC5wbGFjZVNoaXAoY3VycmVudExlbmd0aCxjdXJyZW50WCxjdXJyZW50WSxjdXJyZW50T3JpZW50YXRpb24sdGVhbSlcbiAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzc2Z1bFBsYWNlbWVudCA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBwbGFjZWQgYSBzaGlwYCk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzVG9QbGFjZS5zcGxpY2UoMCwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgY29uc3QgZ2V0UmFuZG9tT3JpZW50YXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGdldFJhbmRvbUludCgwLDEpO1xuICAgICAgICBpZiAodmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICdyaWdodCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3VwJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdPb3BzJylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICAgICAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gICAgICAgIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfVxuXG4gICAgY29uc3QgdGFrZUFJdHVybiA9IChib2FyZCkgPT4ge1xuICAgICAgICBpZiAocm9ib3QgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy9DcmVhdGUgYXJyYXkgb2YgcG9zc2libGUgYXR0YWNrc1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8MTA7KytpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8MTA7KytqKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IGJvYXJkLmNlbGxzW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2VsbC5tdXN0QmVFbXB0eSA9PSBmYWxzZSAmJiBjdXJyZW50Q2VsbC5oaXQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvd1ByaW9yaXR5Q2VsbHMucHVzaChib2FyZC5jZWxsc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0hpZ2hlc3QgcHJpb3JpdHkgY2VsbHMgYXJlIHRob3NlIHdoaWNoIGFyZSBrbm93biB0byBiZSBuZXh0IHRvIGEgc2hpcFxuICAgICAgICAgICAgaWYgKGhpZ2hQcmlvcml0eUNlbGxzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9OZXh0IHByaW9yaXR5IGlzIGEgcmFuZG9tIHBpY2sgY2VsbCB0aGF0IGhhcyBtdXN0QmVFbXB0eTogZmFsc2VcbiAgICAgICAgICAgIGVsc2UgaWYgKGxvd1ByaW9yaXR5Q2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBtb3ZlSW5kZXggPSBnZXRSYW5kb21JbnQoMCxsb3dQcmlvcml0eUNlbGxzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSBsb3dQcmlvcml0eUNlbGxzW21vdmVJbmRleF07XG4gICAgICAgICAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayh0YXJnZXRDZWxsLngsdGFyZ2V0Q2VsbC55KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQXR0YWNrIG1hZGUsIHggaXMgJHt0YXJnZXRDZWxsLnh9LCB5IGlzICR7dGFyZ2V0Q2VsbC55fX1gKVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcGxheWVyID0ge1xuICAgICAgICByb2JvdCxcbiAgICAgICAgdGVhbSxcbiAgICAgICAgYm9hcmQsXG4gICAgICAgIHRha2VBSXR1cm4sXG4gICAgfVxuXG4gICAgaWYgKHJvYm90ID09IHRydWUpIHtcbiAgICAgICAgcGxhY2VBSVNoaXBzKClcbiAgICB9XG5cblxuXG5cbiAgICByZXR1cm4gcGxheWVyXG59XG5cblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH0iLCJjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCwgeCwgeSwgb3JpZW50YXRpb24sIHRlYW0pID0+IHtcbiAgaWYgKHggPCAwIHx8IHggPiA5IHx8IHkgPCAwIHx8IHkgPiA5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGxldCBzZWdtZW50cyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgc2VnbWVudHMucHVzaCh7XG4gICAgICBoaXQ6IGZhbHNlLFxuICAgIH0pO1xuICB9XG4gIGNvbnN0IGhpdCA9IChwb3NpdGlvbikgPT4ge1xuICAgIHNoaXAuc2VnbWVudHNbcG9zaXRpb25dLmhpdCA9IHRydWU7XG4gICAgc2hpcC5pc1N1bmsoKTtcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBoaXRDb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcC5zZWdtZW50c1tpXS5oaXQgPT0gdHJ1ZSkge1xuICAgICAgICBoaXRDb3VudCsrO1xuICAgICAgICBpZiAoaGl0Q291bnQgPT09IHNoaXAubGVuZ3RoKSB7XG4gICAgICAgICAgc2hpcC5zdW5rID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3Qgc2hpcCA9IHtcbiAgICBsZW5ndGgsXG4gICAgdGVzdDogZmFsc2UsXG4gICAgc2VnbWVudHMsXG4gICAgc3VuazogZmFsc2UsXG4gICAgdGVhbSxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9O1xuICByZXR1cm4gc2hpcDtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Q29ybW9yYW50K1NDOndnaHRAMzAwJmZhbWlseT1OdW5pdG86aXRhbCx3Z2h0QDEsMzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tZXJyb3JIZWlnaHQ6IDFyZW07XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcblxcblxcbiNjb250ZW50IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcblxcbn1cXG5cXG4uc2lkZUltYWdlIHtcXG4gIHdpZHRoOiAzNXZ3O1xcbn1cXG5cXG4uZm9ybVdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA2NXZ3O1xcbiAgbWFyZ2luOiAycmVtO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMnJlbSAxMnJlbTtcXG4gIGdyaWQtYXV0by1yb3dzOiAzZW07XFxuICBncmlkLXJvdy1nYXA6IDJyZW07XFxuICBncmlkLWNvbHVtbi1nYXA6IDRyZW07XFxufVxcblxcblxcblxcbi5pbnB1dFdyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIG1hcmdpbi1ib3R0b206IHZhcigtLWVycm9ySGVpZ2h0KTtcXG5cXG59XFxuXFxuLmVtYWlsIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gc3BhbiAyO1xcbn1cXG5cXG4jc2lnblVwQ291bnRyeSB7XFxuXFxufVxcblxcbiNzaWduVXBQb3N0Y29kZSB7XFxuXFxufVxcblxcbiNzaWduVXBQYXNzd29yZCB7XFxuXFxufVxcblxcbiNzaWduVXBDb25maXJtUGFzc3dvcmQge1xcblxcbn1cXG5cXG4uc3VibWl0IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gc3BhbiAyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OlxcbiAgIGZsZXg7XFxufVxcblxcbi5lcnJvciB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMjAwbXM7XFxuICBjb2xvcjogcmVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBoZWlnaHQ6IDA7XFxuICBtYXJnaW4tdG9wOiAwcHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMXJlbTtcXG59XFxuXFxuXFxuaW5wdXQ6dmFsaWQsIHNlbGVjdDp2YWxpZHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xcbn1cXG5cXG5pbnB1dDppbnZhbGlkLCBzZWxlY3Q6aW52YWxpZHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7Ozs7QUFJQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7O0FBRXJCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixrQ0FBa0M7RUFDbEMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixxQkFBcUI7QUFDdkI7Ozs7QUFJQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLGlDQUFpQzs7QUFFbkM7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsb0JBQW9CO0VBQ3BCO09BQ0s7QUFDUDs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixVQUFVO0VBQ1YsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsU0FBUztFQUNULGVBQWU7RUFDZixlQUFlO0VBQ2Ysb0JBQW9CO0FBQ3RCOzs7QUFHQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Db3Jtb3JhbnQrU0M6d2dodEAzMDAmZmFtaWx5PU51bml0bzppdGFsLHdnaHRAMSwzMDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuOnJvb3Qge1xcbiAgLS1lcnJvckhlaWdodDogMXJlbTtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbnNlbGVjdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuXFxuXFxuI2NvbnRlbnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFxufVxcblxcbi5zaWRlSW1hZ2Uge1xcbiAgd2lkdGg6IDM1dnc7XFxufVxcblxcbi5mb3JtV3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDY1dnc7XFxuICBtYXJnaW46IDJyZW07XFxuICBkaXNwbGF5OiBncmlkO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEycmVtIDEycmVtO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDNlbTtcXG4gIGdyaWQtcm93LWdhcDogMnJlbTtcXG4gIGdyaWQtY29sdW1uLWdhcDogNHJlbTtcXG59XFxuXFxuXFxuXFxuLmlucHV0V3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tZXJyb3JIZWlnaHQpO1xcblxcbn1cXG5cXG4uZW1haWwge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDI7XFxufVxcblxcbiNzaWduVXBDb3VudHJ5IHtcXG5cXG59XFxuXFxuI3NpZ25VcFBvc3Rjb2RlIHtcXG5cXG59XFxuXFxuI3NpZ25VcFBhc3N3b3JkIHtcXG5cXG59XFxuXFxuI3NpZ25VcENvbmZpcm1QYXNzd29yZCB7XFxuXFxufVxcblxcbi5zdWJtaXQge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyBzcGFuIDI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6XFxuICAgZmxleDtcXG59XFxuXFxuLmVycm9yIHtcXG4gIHRyYW5zaXRpb246IGFsbCAyMDBtcztcXG4gIGNvbG9yOiByZWQ7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcXG4gIGhlaWdodDogMDtcXG4gIG1hcmdpbi10b3A6IDBweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xcmVtO1xcbn1cXG5cXG5cXG5pbnB1dDp2YWxpZCwgc2VsZWN0OnZhbGlke1xcbiAgYm9yZGVyOiAxcHggc29saWQgZ3JlZW47XFxufVxcblxcbmlucHV0OmludmFsaWQsIHNlbGVjdDppbnZhbGlke1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5jc3MnXG5sZXQgdGVzdFBsYXllciA9IGNyZWF0ZVBsYXllcih0cnVlLDEpO1xudGVzdFBsYXllci5ib2FyZC5kcmF3Qm9hcmQoKTtcbnRlc3RQbGF5ZXIudGFrZUFJdHVybih0ZXN0UGxheWVyLmJvYXJkKTtcbnRlc3RQbGF5ZXIuYm9hcmQuZHJhd0JvYXJkKCk7Il0sIm5hbWVzIjpbImNyZWF0ZVNoaXAiLCJjcmVhdGVDZWxsIiwieCIsInkiLCJjZWxsIiwibXVzdEJlRW1wdHkiLCJzdXNwZWN0ZWRTaGlwIiwiZW1wdHkiLCJzZWdtZW50SW5kZXgiLCJ1bmRlZmluZWQiLCJoaXQiLCJzaGlwIiwicG9zaXRpb24iLCJjcmVhdGVCb2FyZCIsImNlbGxzIiwic2hpcHNSZW1haW5pbmciLCJzaGlwcyIsImkiLCJ0aGlzQ29sIiwiaiIsInRoaXNDZWxsIiwicHVzaCIsImdldFNlZ21lbnRDb29yZHMiLCJPeCIsIk95IiwibGVuZ3RoIiwib3JpZW50YXRpb24iLCJjb29yZHMiLCJkeCIsImR5IiwieF9pIiwieV9pIiwicXVlcnlCb2FyZFN1bmsiLCJib2FyZCIsImZvckVhY2giLCJzdW5rIiwiZHJhd0JvYXJkIiwiYm9hcmRTdHJpbmciLCJsaW5lU3RyaW5nIiwiY3VycmVudENlbGwiLCJjb25zb2xlIiwibG9nIiwicGxhY2VTaGlwIiwidGVhbSIsIm1heFkiLCJtYXhYIiwib2NjdXB5aW5nQW5kQWRqYWNlbnRDZWxscyIsImRYIiwiZFkiLCJjIiwiY3VycmVudFgiLCJjdXJyZW50WSIsInRoaXNTaGlwIiwib3JpZ2luQ2VsbCIsInRoaXNDb29yZCIsInNlZ1giLCJzZWdZIiwic2VnbWVudHMiLCJyZWNlaXZlQXR0YWNrIiwiY3VycmVudFNoaXAiLCJpc1N1bmsiLCJjcmVhdGVQbGF5ZXIiLCJyb2JvdCIsImhpZ2hQcmlvcml0eUNlbGxzIiwibG93UHJpb3JpdHlDZWxscyIsInBsYWNlQUlTaGlwcyIsInNoaXBzVG9QbGFjZSIsImN1cnJlbnRMZW5ndGgiLCJnZXRSYW5kb21JbnQiLCJjdXJyZW50T3JpZW50YXRpb24iLCJnZXRSYW5kb21PcmllbnRhdGlvbiIsInN1Y2Nlc3NmdWxQbGFjZW1lbnQiLCJzcGxpY2UiLCJ2YWx1ZSIsIkVycm9yIiwibWluIiwibWF4IiwiTWF0aCIsImNlaWwiLCJmbG9vciIsInJhbmRvbSIsInRha2VBSXR1cm4iLCJtb3ZlSW5kZXgiLCJ0YXJnZXRDZWxsIiwicGxheWVyIiwiaGl0Q291bnQiLCJ0ZXN0IiwidGVzdFBsYXllciJdLCJzb3VyY2VSb290IjoiIn0=