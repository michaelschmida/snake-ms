import { p } from './index';

// Beispiel für eine Hilfsfunktion, die im Starter-Code
// vorbereitet sein könnte.
export function drawCircle(position: { x: number, y: number }) {
  p.push();
  p.strokeWeight(5);
  p.stroke('lime');
  p.fill(p.color(255, 255, 255, 200));
  p.circle(position.x, position.y, 75);
  p.pop();
}
