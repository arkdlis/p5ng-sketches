import { Component, OnInit } from '@angular/core';
import p5 from 'p5';
import { mapNoiseValue } from 'src/app/p5utils/utils';

@Component({
  selector: 'app-s002',
  template: '<div id="sketch-canvas"></div>'
})
export class S002Component implements OnInit {

  canvas: any;

  ngOnInit() {
    this.canvas = new p5(this.sketch);
  }
    
  private sketch(p: any) {
    let n = 50;
    let niter = 600;
    let canvasWidth = 1200;
    let canvasHeight = 1200;
    
    let circleRadius = 80;
    let noiseScale = 1;
    let noiseIterScale = 0.005;
    let noiseTimeScale = 0.005;
    let distortionOffset = 120;
    
    let time = 0;

    p.setup = () => {    
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(30);

      canvas.parent('sketch-canvas');
    };
  
    p.draw = () => {
      p.background(0);
      p.noFill();
      p.smooth();
      p.strokeWeight(0.8);
      for (let i = 0; i < niter; i++) {
        let opacity = p.map(i, 0, niter, 0.6, 0);
        p.stroke(`rgba(255,255,255,${opacity})`);
        drawCircleWithDistortion(i);
      }
      time++;
    };

    function drawCircleWithDistortion(iter) {
      p.beginShape();
      for (let i = 0; i < n+3; i++) {
        let angle = 2*p.PI/n*i;
        let x = canvasWidth/2 + p.sin(angle)*circleRadius*p.pow(p.map(iter,0,niter,1,2.5),2);
        let y = canvasHeight/2 + p.cos(angle)*circleRadius*p.pow(p.map(iter,0,niter,1,2.5),2);
    
        let distortionX = createDistortion(p.sin(angle/2), iter);
        let distortionY = createDistortion(p.cos(angle/2), iter);
        p.curveVertex(x + distortionX, y + distortionY);
      }
      p.endShape();
    }
    
    function createDistortion(seed, iter) {
      return mapNoiseValue(p, p.noise(seed*noiseScale, iter*noiseIterScale, time*noiseTimeScale)) * p.map(iter, 0, niter, 0, distortionOffset);
    }
  }

}
