import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { drawRandomCurve } from 'src/app/p5utils/texture';

@Component({
  selector: 'app-s004',
  template: '<div id="sketch-canvas"></div>'
})
export class S004Component implements OnInit {

  canvas: any;

  ngOnInit() {
    this.canvas = new p5(this.sketch);
  }
    
  private sketch(p: any) {
    let niter = 600;
    let amount = 8;
    
    let canvasWidth = 1200;
    let canvasHeight = 1200;
    
    let circleOffset = 100;
    
    let textureOffset = 200;
    let noiseScale = 0.007;
    
    let texture01;

    p.setup = () => {    
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      texture01 = p.createGraphics(canvasWidth+textureOffset*2, canvasHeight+textureOffset*2);
      p.noLoop();
      canvas.parent('sketch-canvas');
    };
  
    p.draw = () => {
      p.background(0);

      drawLinesTexture(texture01, 500);
      p.image(texture01, -textureOffset, -textureOffset);
    
      drawCircle(canvasWidth/2-circleOffset, canvasHeight/2);
      drawCircle(canvasWidth/2+circleOffset, canvasHeight/2);
    };

    function draw() {
      p.background(0);
    
      drawLinesTexture(texture01, 500);
      p.image(texture01, -textureOffset, -textureOffset);
    
      drawCircle(canvasWidth/2-circleOffset, canvasHeight/2);
      drawCircle(canvasWidth/2+circleOffset, canvasHeight/2);
    }
    
    function drawCircle(cx, cy) {
      p.blendMode(p.LIGHTEST);
      p.noStroke();
      p.smooth();
      p.strokeWeight(0.8);
      for (let j = 0; j < amount; j++) {
        for (let i = 0; i < niter; i++) {
          let angle = i*2*Math.PI/niter;
          let radius = p.lerp(1, circleOffset*amount, j/amount);
          let x = cx + p.cos(angle)*radius;
          let y = cy + p.sin(angle)*radius;
    
          let value = (7*p.noise(x*noiseScale, y*noiseScale) + 3*p.random())/10;
          if (value > 0.3) {
            p.fill(value*255);
            p.circle(x, y, value*value*12);
          }
        }
      }
    }
    
    function drawLinesTexture(gfx, amount) {
      gfx.stroke('rgba(255,255,255,0.01)');
      gfx.strokeWeight(3);
      gfx.smooth();
      gfx.noFill();
      for (let i = 0; i < amount; i++) {
        drawRandomCurve(p, gfx);
      }
    }
  }

}
