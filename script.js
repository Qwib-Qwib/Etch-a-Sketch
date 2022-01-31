generateDefaultGrid()

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
