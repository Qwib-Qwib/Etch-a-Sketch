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
    if (this.style.backgroundColor && this.hasAttribute("data-red") == false) {
        let rValue;
        let gValue;
        let bValue;
        let currentColorValue = this.getAttribute("style");
        let openParenthesis = currentColorValue.indexOf("(");
        let firstComma = currentColorValue.indexOf(",");
        let secondComma = currentColorValue.lastIndexOf(",");
        let closedParenthesis = currentColorValue.indexOf(")");
        rValue = currentColorValue.slice(openParenthesis + 1, firstComma);
        gValue = currentColorValue.slice(firstComma + 2, secondComma);
        bValue = currentColorValue.slice(secondComma + 2, closedParenthesis);
        this.dataset.red = rValue;
        this.dataset.green = gValue;
        this.dataset.blue = bValue;
        this.style.backgroundColor=`rgb(${rValue - (rValue/10)}, ${gValue - (gValue/10)}, ${bValue - (bValue/10)})`;
    } else if (this.style.backgroundColor && this.hasAttribute("data-red") == true) {
        let rValue;
        let gValue;
        let bValue;
        let currentColorValue = this.getAttribute("style");
        let openParenthesis = currentColorValue.indexOf("(");
        let firstComma = currentColorValue.indexOf(",");
        let secondComma = currentColorValue.lastIndexOf(",");
        let closedParenthesis = currentColorValue.indexOf(")");
        rValue = currentColorValue.slice(openParenthesis + 1, firstComma);
        gValue = currentColorValue.slice(firstComma + 2, secondComma);
        bValue = currentColorValue.slice(secondComma + 2, closedParenthesis);
        const rValueOriginal = this.getAttribute("data-red");
        const gValueOriginal = this.getAttribute("data-green");
        const bValueOriginal = this.getAttribute("data-blue");
        this.style.backgroundColor=`rgb(${rValue - (rValueOriginal/10)}, ${gValue - (gValueOriginal/10)}, ${bValue - (bValueOriginal/10)})`;
    } else {
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
    } else if (Math.sign(newSize) === "0" || Math.sign(newSize) == -1) {                                                                           //Ne pas oublier que les returns de prompt sont des strings, pas des chiffres ! Aussi, == 0 peut être interprété comme null alors attention.
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