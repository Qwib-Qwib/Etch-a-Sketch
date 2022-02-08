generateDefaultGrid();
placeEventListenersOnTiles();
const button = document.querySelector(".reset");
button.addEventListener("click", reset);

function generateDefaultGrid() {
    const sketchContainer = document.createElement("div");
    document.body.appendChild(sketchContainer);
    sketchContainer.classList.add("sketchContainer");
    const gridTile = document.createElement("div");
    sketchContainer.appendChild(gridTile);
    gridTile.classList.add("gridTile");
    let clonedTile;
    for (let i = 0; i < 16*16-1; i++) {
        clonedTile = gridTile.cloneNode();                  //On ne peut pas copier un node en répétant les appendChild, autrement ça ne manipulera qu'une seule instance du node. IL faut le cloner.
        sketchContainer.appendChild(clonedTile);
    }
}

function placeEventListenersOnTiles() {
    let allTiles = document.querySelectorAll(".gridTile");
    allTiles.forEach(element => {
        element.addEventListener("mouseover", changeColor);
    });
}

function changeColor() {
    let randomColor = "#";
    let randomValue;
    for (let i = 0; i < 6; i++) {                       // On veut 6 itérations pour faire un code HEX complet, on entre donc i < 6.
        randomValue = Math.floor(Math.random()*16);     // On a 16 possibilités de caractères différentes pour chaque caractère du code HEX, donc on multiplie le random par 16.
        if (randomValue == 0) {
            randomColor += "0";
        } else if (randomValue == 1) {
            randomColor += "1";
        } else if (randomValue == 2) {
            randomColor += "2";
        } else if (randomValue == 3) {
            randomColor += "3";
        } else if (randomValue == 4) {
            randomColor += "4";
        } else if (randomValue == 5) {
            randomColor += "5";
        } else if (randomValue == 6) {
            randomColor += "6";
        } else if (randomValue == 7) {
            randomColor += "7";
        } else if (randomValue == 8) {
            randomColor += "8";
        } else if (randomValue == 9) {
            randomColor += "9";
        } else if (randomValue == 10) {
            randomColor += "a";
        } else if (randomValue == 11) {
            randomColor += "b";
        } else if (randomValue == 12) {
            randomColor += "c";
        } else if (randomValue == 13) {
            randomColor += "d";
        } else if (randomValue == 14) {
            randomColor += "e";
        } else if (randomValue == 15) {
            randomColor += "f";
        }
    }
    this.style.backgroundColor=`${randomColor}`;
}

function reset() {
    let allTiles = document.querySelectorAll(".tileHovered");
    allTiles.forEach(element => {
        element.classList.remove("tileHovered");
    });
    resizeGrid();
}

function resizeGrid() {
    let newSize = prompt("How many squares do you want per side of the Etch-a-Sketch?", "Please insert a number inferior or equal to 100.");
    if (newSize > 100) {
        newSize = prompt("Sorry, that number is too high!", "Please insert a number inferior or equal to 100.");
    } else if (Math.sign(newSize) == 0 || Math.sign(newSize) == -1) {                                                                           //Ne pas oublier que les returns de prompt sont des strings, pas des chiffres !
        newSize = prompt("Only integers between 1 and 100, please!", "Please insert a number inferior or equal to 100.");
    } else if (newSize === null) {
        generateDefaultGrid();
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
    const sketchContainer = document.getElementsByClassName("sketchContainer");
    const gridTile = document.createElement("div");
    sketchContainer[0].appendChild(gridTile);
    gridTile.classList.add("gridTile");
    let clonedTile;
    for (let i = 0; i < newSize*newSize-1; i++) {
        clonedTile = gridTile.cloneNode();                  //On ne peut pas copier un node en répétant les appendChild, autrement ça ne manipulera qu'une seule instance du node. IL faut le cloner.
        sketchContainer[0].appendChild(clonedTile);
    }
}