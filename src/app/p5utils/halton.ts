import { range } from "./utils";

export function halton(p, base, length) {
  let n = 0;
  let d = 1;
  
  return range(length).map(i => {
    let x = d - n;
    if (x == 1) {
      n = 1;
      d = d * base;
    } else {
      let y = p.floor(d/base);
      while (x <= y) {
        y = p.floor(y/base);
      }
      n = (base + 1) * y - x;
    }
    return n / d;
  })
}