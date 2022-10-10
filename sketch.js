// ASCII CAMERA
// Adapted by Jarsick from: The Coding Train / Daniel Shiffman

let colorLevels = "     .,:;i!1j?23498$W#@Ñ"; // spaces at the beginning for contrast
let webcam;
let imageString;


function setup() {
  //Canvas setup
  createCanvas(window.innerWidth-20, window.innerHeight-20);
  textAlign(LEFT, TOP);
  textFont("monospace");
  // Webcam setup
  webcam = createCapture(VIDEO);
  webcam.size(window.innerWidth/7, window.innerHeight/15);
  webcam.hide(); // hide the webcam preview
}


function draw() {
  background("black");
  fill("lightgreen");
  imageString = getImageString();
  text(imageString, 0, 0);
}


function getImageString() {
  let stringBuilder = []; // this will optimize the process
  webcam.loadPixels();
  for (let y = 0; y < webcam.height; y++) {
    for (let x = 0; x < webcam.width; x++) {
      const pixelIndex = (x + y * webcam.width) * 4; // pixels have 4 channels (r,g,b,a)
       const levelIndex = getLevel(
        webcam.pixels[pixelIndex + 0],
        webcam.pixels[pixelIndex + 1],
        webcam.pixels[pixelIndex + 2]
      );
      stringBuilder.push(colorLevels[levelIndex]);
    }
    stringBuilder.push('\n');
  }
  return stringBuilder.join('');
}


function getLevel(r, g, b) {
  const avg = (r + g + b) / 3;
  return floor(map(avg, 0, 255, 0, colorLevels.length));
}

function mousePressed(){
  save("ASCIIImage.png");
//   saveStrings([imageString], "ASCIIText.txt");
}
