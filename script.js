generateDefaultGrid();
placeEventListenersOnTiles();
const button = document.querySelector(".reset");
button.addEventListener("click", reset)

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
    this.classList.add("tileHovered");                      //"this" permet de faire référence à l'élément sur lequel le listener a été placé.
}

function reset() {
    let allTiles = document.querySelectorAll(".tileHovered");
    allTiles.forEach(element => {
        element.classList.remove("tileHovered");
    });
}