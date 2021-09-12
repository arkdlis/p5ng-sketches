import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { drawTexture } from 'src/app/p5utils/texture';
import { pgMask, range, withChance } from 'src/app/p5utils/utils';

@Component({
  selector: 'app-s003',
  template: '<div id="sketch-canvas"></div>'
})
export class S003Component implements OnInit {

  canvas: any;

  ngOnInit() {
    this.canvas = new p5(this.sketch);
  }
    
  private sketch(p: any) {
    let canvasWidth = 800;
    let canvasHeight = 800;
    
    let size = 120;
    let sqrtThree = Math.sqrt(3);

    p.setup = () => {    
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      p.noLoop();
      canvas.parent('sketch-canvas');
    };
  
    p.draw = () => {
      p.background(0);
      let startX = -size/2;
      let startY = 0;
    
      let cY = startY;
      let rowCounter = 0;
      while (cY < canvasHeight + size) {
        let cX = startX - (rowCounter%2)*size/2;
        while (cX < canvasWidth + size) {
          drawCube(cX, cY);
          cX += size;
        }
        cY += 1.5*size/sqrtThree;
        rowCounter++;
      }
    };

    function drawCube(tileX, tileY) {
      let tmpX = size/2;
      let tmpY = size/sqrtThree;
      let colors = ['#999', '#bbb', '#eee'];
      let densities = [350, 200, 150];
      let textureOpacities = [50, 30, 20];
    
      let points = range(6).map(i => {
        let y = tmpY + p.sin(i*2*Math.PI/6-Math.PI/6)*size/sqrtThree;
        let x = tmpX + p.cos(i*2*Math.PI/6-Math.PI/6)*size/sqrtThree;
        return p.createVector(x, y);
      });
      range(3).map(i => {
        let img = p.createGraphics(size, 2*size/sqrtThree);
        let msk = p.createGraphics(size, 2*size/sqrtThree);
    
        // draw side of cube
        msk.background(0);
        msk.fill(255);
        msk.stroke(0, 125);
        msk.strokeWeight(2.3);
        msk.beginShape();
        msk.vertex(tmpX, tmpY);
        range(3).map(j => {
          let currPoint = points[(i*2+j) % 6];
          msk.vertex(currPoint.x, currPoint.y);
        });
        msk.endShape();
    
        let isSpecial = withChance(
          p,
          p.map(
            Math.sqrt(tileX*tileX + tileY*tileY)/Math.sqrt(canvasWidth*canvasWidth + canvasHeight*canvasHeight),
            0, 1, 0.2, 0.65
          )
        );
        let backgroundColor = isSpecial ? '#000' : colors[i];
        let textureOpacity = isSpecial ? textureOpacities[2] : textureOpacities[i];
        let density = isSpecial ? densities[2] : densities[i];
        let textureColor = isSpecial ? 255 : 0;
        drawTexture(p, img, backgroundColor, textureColor, textureOpacity, density);
    
        let masked = pgMask(p, img, msk);
    
        p.image(masked, tileX - tmpX, tileY - tmpY)
      });
    }
  }

}
