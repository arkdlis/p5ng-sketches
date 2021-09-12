import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { gfx2img, withChance } from 'src/app/p5utils/utils';

@Component({
  selector: 'app-s001',
  template: '<div id="sketch-canvas"></div>'
})
export class S001Component implements OnInit {

  canvas: any;

  ngOnInit() {
    this.canvas = new p5(this.sketch);
  }
    
  private sketch(p: any) {
    let one, two;

    let canvasWidth = 800;
    let canvasHeight = 800;

    let noiseScale = 0.001;

    let seed = 44;

    p.setup = () => {
      p.randomSeed(seed);
      p.noiseSeed(seed);
    
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      one = p.createGraphics(canvasWidth, canvasHeight);
      two = p.createGraphics(canvasWidth, canvasHeight);

      canvas.parent('sketch-canvas');
    };
  
    p.draw = () => {
      let msk = p.createGraphics(canvasWidth, canvasHeight);
      msk.background(0, 0);
      msk.noStroke();
      msk.fill(255);
      msk.circle(canvasWidth/2, canvasHeight/2, canvasHeight*0.625);
    
      drawNoise(one, 0);
      drawNoise(two, canvasWidth);
      let imgOne = gfx2img(p, one);
      let imgTwo = gfx2img(p, two);
      let imgMsk = gfx2img(p, msk);
    
      p.image(imgOne, 0, 0);
      imgTwo.mask(imgMsk);
      p.image(imgTwo, 0, 0);
    };

    function drawNoise(gfx, seedOffset) {
      gfx.background(0);
      gfx.stroke(255);
      gfx.strokeWeight(0.8);
      for (let y = 0; y < p.height; y++) {
        for (let x = 0; x < p.width; x++) {
          let chance = p.pow(
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
  }

}
