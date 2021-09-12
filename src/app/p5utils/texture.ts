import { randomBinary } from "./utils";

export function drawTexture(p, cnvs, backgroundColor, textureColor, textureOpacity, density) {
  cnvs.background(backgroundColor)
  cnvs.smooth();
  cnvs.noFill();
  cnvs.strokeWeight(1.6);
  for (let i = 0; i < density; i++) {
    cnvs.stroke(textureColor, p.map(p.random(1), 0, 1, textureOpacity*2/3, textureOpacity));
    drawRandomCurve(p, cnvs);
  }
}

export function drawRandomCurve(p, img) {
  img.beginShape();
  img.vertex(randomBinary(p)*img.width, p.random(img.height));
  img.quadraticVertex(
    p.random(img.width), p.random(img.height),
    p.random(img.width), randomBinary(p)*img.height,
  );
  img.endShape();
}