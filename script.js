generateDefaultGrid();
placeEventListenersOnTiles();
const button = document.querySelector(".reset");
button.addEventListener("click", reset);

function generateDefaultGrid() {
  const sketchContainer = generateGridContainer();
  populateGridContainer(sketchContainer);
}

function generateGridContainer() {
  const sketchContainer = document.createElement("div");
  document.body.appendChild(sketchContainer);
  sketchContainer.classList.add("sketchContainer");
  return sketchContainer;
}

function populateGridContainer(container, gridSize=16) {
  const gridTile = createTileTemplate(container);
  populateWithTileClones(gridTile, container, gridSize);
}

function createTileTemplate(container) {
  const gridTile = document.createElement("div");
  container.appendChild(gridTile);
  gridTile.classList.add("gridTile");
  return gridTile;
}

function populateWithTileClones(tileTemplate, container, gridSize) {
  let clonedTile;
  for (let i = 0; i < gridSize*gridSize-1; i++) {
    // On ne peut pas copier un node en répétant les appendChild, autrement ça ne manipulera qu'une seule instance du node. Il faut le cloner.
    clonedTile = tileTemplate.cloneNode();
    container.appendChild(clonedTile);
  }
}

function placeEventListenersOnTiles() {
  let allTiles = document.querySelectorAll(".gridTile");
  allTiles.forEach(element => {
    element.addEventListener("mouseover", changeColor);
  });
}

function changeColor() {
  if (parseInt(this.dataset.darkenings) >= 9) {
    ultimateDarken(this);
  } else if (this.style.backgroundColor && this.hasAttribute("data-red") == false) {
    firstDarken(this);
  } else if (this.style.backgroundColor && this.hasAttribute("data-red") == true) {
    repeatDarken(this);
  } else {
    colorizeTile(this);
  }
}

function firstDarken(tile) {
  let rValue, gValue, bValue;
  [rValue, gValue, bValue] = retrieveTileColorValues(tile);
  tile.dataset.red = rValue;
  tile.dataset.green = gValue;
  tile.dataset.blue = bValue;
  tile.dataset.darkenings = 1;
  tile.style.backgroundColor=`rgb(${rValue - (rValue/10)}, ${gValue - (gValue/10)}, ${bValue - (bValue/10)})`;
}

function repeatDarken(tile) {
  let rValue, gValue, bValue;
  [rValue, gValue, bValue] = retrieveTileColorValues(tile);
  const rValueOriginal = tile.getAttribute("data-red");
  const gValueOriginal = tile.getAttribute("data-green");
  const bValueOriginal = tile.getAttribute("data-blue");
  tile.dataset.darkenings = parseInt(tile.dataset.darkenings) + 1;
  tile.style.backgroundColor=`rgb(${rValue - (rValueOriginal/10)}, ${gValue - (gValueOriginal/10)}, ${bValue - (bValueOriginal/10)})`;
}

function ultimateDarken(tile) {
  tile.style.backgroundColor="rgb(0, 0, 0)";
  tile.dataset.darkenings = 10;
  tile.removeEventListener("mouseover", changeColor);
}

function colorizeTile(tile) {
  let randomColor = "#";
  let randomValue;
  // On veut 6 itérations pour faire un code HEX complet, on entre donc i < 6.
  for (let i = 0; i < 6; i++) {
    // On a 16 possibilités de caractères différentes pour chaque caractère du code HEX, donc on multiplie le random par 16.
    randomValue = Math.floor(Math.random()*16);
    // Transforme un chiffre de 1 à 16 en string pour une valeur hex.
    randomColor += randomValue.toString(16);
  }
  tile.style.backgroundColor=`${randomColor}`;
}

function retrieveTileColorValues(tile) {
  let rValue, gValue, bValue;
  let currentColorValue = tile.getAttribute("style");
  let openParenthesis = currentColorValue.indexOf("(");
  let firstComma = currentColorValue.indexOf(",");
  let secondComma = currentColorValue.lastIndexOf(",");
  let closedParenthesis = currentColorValue.indexOf(")");
  rValue = currentColorValue.slice(openParenthesis + 1, firstComma);
  gValue = currentColorValue.slice(firstComma + 2, secondComma);
  bValue = currentColorValue.slice(secondComma + 2, closedParenthesis);
  return [rValue, gValue, bValue];
}

function reset() {
  let allTiles = document.querySelectorAll(".gridTile");
  let allTilesArray = Array.from(allTiles);
  allTilesArray.forEach(element => {
    element.removeAttribute("style", "background-color");
  });
  resizeGrid();
}

function resizeGrid() {
  let newSize = prompt("How many squares do you want per side of the Etch-a-Sketch?", "Please insert a number inferior or equal to 100.");
  if (newSize > 100) {
    newSize = prompt("Sorry, that number is too high!", "Please insert a number inferior or equal to 100.");
  } else if (Math.sign(newSize) === "0" || Math.sign(newSize) == -1) {                                                                           // Ne pas oublier que les returns de prompt sont des strings, pas des chiffres ! Aussi, == 0 peut être interprété comme null alors attention.
    newSize = prompt("Only integers between 1 and 100, please!", "Please insert a number inferior or equal to 100.");
  } else if (newSize === null) {
    return null;
  } else {
    const styleSheet = document.styleSheets[0];
    styleSheet.cssRules[2].style.gridTemplateRows=`repeat(${newSize}, auto)`;
    styleSheet.cssRules[2].style.gridTemplateColumns=`repeat(${newSize}, auto)`;
    removeAllTiles();
    generateUserGrid(newSize);
    placeEventListenersOnTiles();
  }
}

function removeAllTiles() {
  let container = document.querySelector(".sketchContainer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function generateUserGrid(newSize) {
  const sketchContainer = document.querySelector(".sketchContainer");
  populateGridContainer(sketchContainer, newSize);
}
