function make2dArray(c, r) {
  let arr = new Array(c);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(r);
  }
  return arr;
}

let grid;
let column;
let row;
let resolution = 20;

function setup() {
  noLoop();
  createCanvas(800, 400);
  frameRate(20);
  column = width / resolution;
  row = height / resolution;

  grid = make2dArray(column, row);

  // fill array with random 0 or 1
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j] = 0;
    }
  }
}

function keyPressed(){
  if (keyCode === ENTER){
    loop();
  }
  if (keyCode === BACKSPACE){
    clear();
    background(0);
    for (let i=0;i<column;i++){
      for (let j=0;j<row;j++){
        grid[i][j] = 0;
      }
    }
  }
  if (keyCode === 32){
    noLoop();
  }
  if (keyCode === 82){
    for (let i=0;i<column;i++){
      for (let j=0;j<row;j++){
        grid[i][j] = floor(random(2));
        let x = i * resolution;
        let y = j * resolution;
        
        if (grid[i][j] == 1) {
          fill(50, 50, 250);
          // fill(10,10,10);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  }
}

function mouseClicked(){
  if (mouseX < width && mouseY < height){
    newX = mouseX - (mouseX%resolution);
    newY = mouseY - (mouseY%resolution);
    newX /=resolution;
    newY /=resolution;
    grid[newX][newY] = 1;
    fill(50, 50, 250);
    stroke(0);
    rect(newX*resolution, newY*resolution, resolution, resolution);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(50, 50, 250);
        // fill(10,10,10);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  let next = make2dArray(column, row);
  // compute next gen based of the current state
  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      let state = grid[i][j];
      // count live neighbors
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let ncol = (x + i+ column) % column;
      let nrow = (y + j+ row) % row;
      sum += grid[ncol][nrow];
    }
  }
  sum -= grid[x][y];
  return sum;
}
