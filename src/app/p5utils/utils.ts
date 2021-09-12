export function gfx2img(p, pg) {
  let img = p.createImage(pg.width, pg.height);
  img.copy(pg, 0, 0, pg.width, pg.height, 0, 0, pg.width, pg.height);
  return img;
}

export function maskGraphics(p, gfx, msk) {
  let imgGfx = gfx2img(p, gfx);
  let imgMsk = gfx2img(p, msk);
  imgGfx.mask(imgMsk);
  return imgGfx;
}

export function pgMask(p, _content,_mask){
  //Create the mask as image
  var img = p.createImage(_mask.width,_mask.height);
  img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);
  //load pixels
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    // 0 red, 1 green, 2 blue, 3 alpha
    // Assuming that the mask image is in grayscale,
    // the red channel is used for the alpha mask.
    // the color is set to black (rgb => 0) and the
    // alpha is set according to the pixel brightness.
    var v = img.pixels[i];
    img.pixels[i] = 0;
    img.pixels[i+1] = 0;
    img.pixels[i+2] = 0;
    img.pixels[i+3] = v;
  }
  img.updatePixels();
  
  //convert _content from pg to image
  var contentImg = p.createImage(_content.width,_content.height);
  contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
  // create the mask
  contentImg.mask(img)
  // return the masked image
  return contentImg;
}

export function withChance(p, t) {
  return p.random(1) <= t;
}

export function mapNoiseValue(p, x) {
  return p.map(x, 0, 1, -1, 1);
}

export function range(x) {
  return [...Array(x).keys()];
}

export function randomBinary(p) {
  return p.random(1) < 0.5 ? 0 : 1;
}