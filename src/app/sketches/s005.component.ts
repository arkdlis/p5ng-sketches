import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { drawRandomCurve } from 'src/app/p5utils/texture';
import { maskGraphics, withChance } from 'src/app/p5utils/utils';
import { halton } from '../p5utils/halton';

@Component({
  selector: 'app-s005',
  template: '<div id="sketch-canvas"></div>'
})
export class S005Component implements OnInit {

  canvas: any;

  ngOnInit() {
    this.canvas = new p5(this.sketch);
  }
    
  private sketch(p: any) {
    let canvasWidth = 1600;
    let canvasHeight = 1600;
    
    let seed = 56;
    let n = 50;
    let amountOfPoints = 15000;
    let noiseScale = 0.005;
    
    let texture01;
    let texture02;
    let texture03;
    let maskImage01;

    p.setup = () => {    
      p.randomSeed(seed);
      p.noiseSeed(seed);
    
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      texture01 = p.createGraphics(canvasWidth, canvasHeight);
      texture02 = p.createGraphics(canvasWidth, canvasHeight);
      texture03 = p.createGraphics(canvasWidth, canvasHeight);
      maskImage01 = p.createGraphics(canvasWidth, canvasHeight);
      p.noLoop();

      canvas.parent('sketch-canvas');
    };
  
    p.draw = () => {
      p.background(0);
      drawHaltonNoise(texture01, amountOfPoints);
      drawNoise(texture02, 150);
      drawLinesTexture(texture03, amountOfPoints);
      drawMask(maskImage01);

      p.image(texture03, 0, 0);
      let maskedImage01 = maskGraphics(p, texture02, maskImage01);
      p.image(maskedImage01, 0, 0);

      p.image(texture01, 0, 0);
    };

    function drawLinesTexture(gfx, amount) {
      gfx.stroke('rgba(255,255,255,0.01)');
      gfx.smooth();
      gfx.noFill();
      for (let i = 0; i < amount; i++) {
        drawRandomCurve(p, gfx);
      }
    }
    
    function drawNoise(gfx, seedOffset) {
      gfx.background(0);
      gfx.stroke(255);
      gfx.strokeWeight(0.8);
      for (let y = 0; y < p.height; y++) {
        for (let x = 0; x < p.width; x++) {
          let chance = 1 - p.pow(
            p.noise(
              (x + seedOffset) * noiseScale,
              (y + seedOffset) * noiseScale,
            ),
            3
          );
          let factor = (3 * chance + p.random()) / 3;
    
          gfx.stroke(chance*255);
          gfx.point(x, y);
    
          if (
            withChance(p, chance)
          ) {
            gfx.stroke(factor * 200 + 55)
            gfx.point(x, y);
          }
        }
      }
    }
    
    function drawHaltonNoise(gfx, amount) {
      let xs = halton(p, 2, amount);
      let ys = halton(p, 3, amount);
    
      for (let i = 0; i < amount; i++) {
        let x = xs[i];
        let y = ys[i];
        let factor = p.noise(
          x*10 / 3,
          y*10,
        );
        if (factor > 0.5) {
          let color = p.random()*125 + 130;
          gfx.stroke(color);
          gfx.fill(color);
          gfx.circle(xs[i]*canvasWidth, ys[i]*canvasHeight, 3);
        }
      }
    }
    
    function drawMask(gfx, seedOffset = 0) {
      gfx.background(0, 0);
      gfx.fill(255);
      // gfx.circle(canvasWidth/2, canvasHeight/2, canvasWidth*0.6);
      drawCircleWithDistortion(gfx, canvasWidth*2/3, canvasHeight/3, canvasWidth*0.6, seedOffset);
    }
    
    function drawCircleWithDistortion(gfx, cx, cy, r, seedOffset = 0) {
      gfx.beginShape();
      for (let i = 0; i < n+3; i++) {
        let angle = 2*p.PI/n*i;
        let x = cx + p.sin(angle)*r/2;
        let y = cy + p.cos(angle)*r/2;
    
        let distortionX = createDistortion(p.sin(angle), seedOffset);
        let distortionY = createDistortion(p.cos(angle), seedOffset);
        gfx.curveVertex(x + distortionX, y + distortionY);
      }
      gfx.endShape();
    }
    
    
    function createDistortion(seed, seedOffset = 0) {
      return mapNoiseValue(p.noise(seed + seedOffset))*60;
    }

    function mapNoiseValue(x) {
      return p.map(x, 0, 1, -1, 1);
    }
  }

}
