// CSS Styles importieren; kann gelöscht werden falls nicht benötigt
import './style.css';

// Wir laden p5js
import p5 = require('p5');
import { drawCircle } from './circle';

// Breite des Spielfelds
let boardWidth = 20;
// Höhe des Spielfels
let boardHeight = 20;
// Breite und Höhe einer Position (Schlangenteil oder Apfel)
let size = 15;
// Array mit allen Positionen der Schlange
let snakePos = [{ x: 5, y: 5 }];
// Länge der Schlange
let snakeLength = 3;
// x Position des Apfels
let applePosX = 0;
// y Position des Apfels
let applePosY = 0;
// Bewegung der Schlange in x Richtung (-1, 0 oder 1)
let dirX = 1;
// Bewegung der Schlange in y Richtung (-1, 0 oder 1)
let dirY = 0;
// gesammelte Punkte
let points = 0;
// Geschwindigkeit der Schlange
let speed = 3;
// Hintergrundfarbe
let backgroundColor = 'lightgray';
// Wir informieren p5js, welche Funktionen unser Programm bereitstellt.
// Mit TypeScript und p5js verwendet man am besten den "instance mode"
// statt dem "global mode" (https://p5js.org/reference/#/p5/p5).
// Man kann die Funktionen entfernen, die man in der jeweiligen Übung
// nicht braucht (z.B. kein Reagieren auf Tastatur -> `keyPressed` weg).
export let p: p5;
new p5((p5: p5) => {
  p = p5;
  p.preload = preload;
  p.setup = setup;

  p.draw = draw;
  p.drawApple = drawApple;
  p.keyPressed = keyPressed;
  p.mousePressed = mousePressed;
});

function preload() {
  // Diese Funktion wird vor `setup` aufgerufen. Wir verwenden sie,
  // um z.B. Bilder zu laden.
  // https://p5js.org/reference/#/p5/preload
}


function drawApple() {
  // zufällige Position für Apfel ermitteln
  applePosX = Math.round(Math.random() * (boardWidth - 1));
  applePosY = Math.round(Math.random() * (boardHeight - 1));

  // Apfel malen
  p.fill('red');
  p.ellipse(applePosX * size + size / 2, applePosY * size + size / 2, size);

  // Punktestand ausgeben
  p.fill('gray');
  p.rect(0, boardHeight * size, boardWidth * size, size + 5);
  p.fill('white');
  p.textSize(size - 5);
  p.text('Points: ' + points.toString(), size, boardHeight * (size + 1) - 5);
}

function setup() {
  // Diese Funktion wird einmal beim Programmstart aufgerufen.
  // https://p5js.org/reference/#/p5/setup

  // Größe des Spielfelds definieren
  p.createCanvas(boardWidth * size, boardHeight * (size + 1));
  // Hintergrundfarbe setzen
  p.background(backgroundColor);
  // bei allen zukünftigen Zeichenoperationen (circle, rect, ...) soll keine Umrandung erfolgen
  p.noStroke();

  // frameRate setzt fest, wie oft die Funktion draw pro Sekunde aufgerufen wird
  p.frameRate(speed);

  drawApple();
}

function keyPressed() {
  // Diese Funktion wird aufgerufen, wenn eine Taste gedrückt wird.
  // https://p5js.org/reference/#/p5/keyPressed
  // Richtung der Schlange durch Cursortasten ändern
  if (p.keyCode === p.LEFT_ARROW) {
    dirX = -1;
    dirY = 0;
  } else if (p.keyCode === p.RIGHT_ARROW) {
    dirX = 1;
    dirY = 0;
  } else if (p.keyCode === p.UP_ARROW) {
    dirX = 0;
    dirY = -1;
  } else if (p.keyCode === p.DOWN_ARROW) {
    dirX = 0;
    dirY = 1;
  }
}

function mousePressed() {
  // Diese Funktion wird aufgerufen, wenn die Mause geklickt wird.
  // https://p5js.org/reference/#/p5/mousePressed
  console.log(`Mouse was pressed at ${p.mouseX}/${p.mouseY}`);
}

function draw() {
  // Diese Funktion wird aufgerufen, wenn der Bildschirm aktualisiert
  // werden muss.
  // https://p5js.org/reference/#/p5/draw
  // Schlange von voriger Position entfernen
  if (snakePos.length >= snakeLength) {
    p.fill(backgroundColor);
    p.rect(snakePos[0].x * size, snakePos[0].y * size, size, size);
    snakePos.shift();
  }

  // neue Position der Schlange berechnen
  let posX = snakePos[snakePos.length - 1].x + dirX;
  let posY = snakePos[snakePos.length - 1].y + dirY;

  // prüfen, ob die Schlange den Rand berührt
  if (posX < 0 || posX >= boardWidth|| posY < 0 || posY >= boardHeight) {
    p.background('red');
    return;
  }
  
  // prüfen, ob die Schlange sich selbst verknotet
  for (let i = 0; i < snakePos.length; i++) {
    if (snakePos[i].x === posX && snakePos[i].y === posY) {
      p.background('fuchsia');
      return;
    }
  }

  // prüfen, ob der Apfel berührt wird
  if (posX === applePosX && posY === applePosY) {
    // Punkte erhöhen
    points++;
    
    // Geschwindigkeit erhöhen
    if (speed < 20) {
      speed++;
      p.frameRate(speed);
    }
    
    // neuen Apfel zeichnen
    drawApple();
    // Länge der Schlange erhöhen
    snakeLength++;
  }

  // neue Position der Schlange malen
  p.fill('green');
  p.rect(posX * size, posY * size, size, size);
  snakePos.push({ x: posX, y: posY });
}
