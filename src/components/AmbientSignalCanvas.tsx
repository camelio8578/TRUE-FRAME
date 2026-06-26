import { useEffect, useRef } from "react";

// ---- 3D Simplex Noise ----
class SimplexNoise {
  private perm = new Uint8Array(512);
  private grad3: number[][] = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
  ];

  constructor(seed?: string) {
    if (seed) this.seed(seed);
    else {
      for (let i = 0; i < 512; i++) this.perm[i] = Math.floor(Math.random() * 256);
    }
  }

  seed(seed: string) {
    const h = cyrb128(seed);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = (h[i % 4] + i) % 256;
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  noise3D(xin: number, yin: number, zin: number): number {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const s = (xin + yin + zin) * F3;
    const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
    const t = (i + j + k) * G3;
    const X0 = i - t, Y0 = j - t, Z0 = k - t;
    const x0 = xin - X0, y0 = yin - Y0, z0 = zin - Z0;
    let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;
    const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0 + this.grad3[gi0][2] * z0); }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1 + this.grad3[gi1][2] * z1); }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2 + this.grad3[gi2][2] * z2); }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 >= 0) { t3 *= t3; n3 = t3 * t3 * (this.grad3[gi3][0] * x3 + this.grad3[gi3][1] * y3 + this.grad3[gi3][2] * z3); }
    return 32 * (n0 + n1 + n2 + n3);
  }

  noise2d(x: number, y: number): number {
    return this.noise3D(x, y, 0);
  }
}

function cyrb128(str: string): number[] {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k: number; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

// ---- Noise Stack ----
class NoiseStack {
  private noise: SimplexNoise;
  private numOctaves = 2;
  private falloff = 0.5;
  private timeOffset = 0;
  private octFreq: number[] = [];
  private octPers: number[] = [];
  private totalPers = 0;
  private normFactor = 0;
  private initialized = false;

  constructor(seed: string) {
    this.noise = new SimplexNoise(seed);
  }

  get2d(x: number, _y: number): number {
    if (!this.initialized) this.init();
    const t = this.timeOffset + _y * 0.0003;
    const value = this.noise.noise2d(x, t);
    return value * this.normFactor;
  }

  init() {
    this.initialized = true;
    if (this.numOctaves === 0) {
      this.normFactor = 0;
      return;
    }
    for (let i = 0; i < this.numOctaves; i++) {
      this.octFreq[i] = Math.pow(2, i);
      this.octPers[i] = Math.pow(this.falloff, i);
      this.totalPers += this.octPers[i];
    }
    this.normFactor = 1 / this.totalPers;
  }
}

// ---- Color Palette ----
const PALETTE: [number, number, number][] = [
  [20, 35, 60], [15, 25, 50], [25, 45, 70], [10, 20, 40],
  [59, 130, 246], [16, 185, 129], [239, 68, 68], [245, 158, 11],
  [200, 200, 220], [100, 120, 150], [30, 50, 80], [45, 70, 110],
  [14, 30, 55], [5, 15, 30], [180, 160, 140],
];

const numColors = 15;

// ---- Line Class ----
class Line {
  x: number;
  y: number;
  colorIdx: number;
  color: [number, number, number];
  width: number;
  lifeTime: number;
  time = 0;
  // line length tracked via _points array
  private _points: number[][] = [];
  private noise: NoiseStack;

  constructor(startX: number, startY: number, colorIdx: number, color: [number, number, number], width: number, lifeTime: number, noise: NoiseStack) {
    this.x = startX;
    this.y = startY;
    this.colorIdx = colorIdx;
    this.color = color;
    this.width = width;
    this.lifeTime = lifeTime;
    this.noise = noise;
    this.reset();
  }

  reset() {
    this._points = [];
    this.time = 0;
    this.build();
  }

  build() {
    const step = 150;
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement;
    const canvasWidth = canvas?.width || 1920;
    const anchor = { x: this.x, y: this.y };
    let len = 0;

    this._points.push([this.x, this.y, this.colorIdx, 0]);

    const angle0 = this.noise.get2d(anchor.x, anchor.y) * 10;
    const offset0 = [Math.cos(angle0) * step, Math.sin(angle0) * step];
    const anchor2 = { x: anchor.x + offset0[0], y: anchor.y + offset0[1] };
    this._points.push([anchor2.x, anchor2.y, this.colorIdx, 1]);

    let prev = { x: this.x, y: this.y };
    let curr = { x: anchor2.x, y: anchor2.y };

    while (curr.x < canvasWidth + 200 && len < 50) {
      const angle = this.noise.get2d(curr.x, curr.y) * 10;
      const off = [Math.cos(angle) * step, Math.sin(angle) * step];
      const nxt = { x: curr.x + off[0], y: curr.y + off[1] };

      const cpx = (prev.x + curr.x) / 2;
      const cpy = (prev.y + curr.y) / 2;
      this._points.push([cpx, cpy, (this.colorIdx + len) % (numColors + 5), len++]);

      const cpx2 = (curr.x + nxt.x) / 2;
      const cpy2 = (curr.y + nxt.y) / 2;
      this._points.push([cpx2, cpy2, (this.colorIdx + len) % (numColors + 5), len++]);
      this._points.push([nxt.x, nxt.y, this.colorIdx, len++]);

      prev = { x: curr.x, y: curr.y };
      curr = { x: nxt.x, y: nxt.y };
    }

    // length stored implicitly in _points array
  }

  update(dt: number) {
    this.time += dt;
    if (this.time > this.lifeTime) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D, _globalScale: number, colorArray: Float32Array) {
    const scale = 1;
    const smoothness = 20;
    const len = Math.floor(this._points.length / 3);
    if (len < 1) return;

    ctx.lineCap = "round";
    ctx.lineWidth = this.width * scale;

    for (let i = 0; i < len - 1; i++) {
      const p0 = this._points[i * 3] || this._points[0];
      const c0 = this._points[i * 3 + 1] || this._points[0];
      const c1 = this._points[i * 3 + 2] || this._points[0];
      const p1 = this._points[Math.min((i + 1) * 3, this._points.length - 1)] || this._points[0];

      if (!p0 || !c0 || !c1 || !p1) continue;

      for (let j = 0; j < smoothness; j++) {
        const t = j / smoothness;
        const it = 1 - t;
        const it2 = it * it;
        const t2 = t * t;
        const a0 = it2 * it;
        const a1 = 3 * it2 * t;
        const a2 = 3 * it * t2;
        const a3 = t2 * t;

        const x = a0 * p0[0] + a1 * c0[0] + a2 * c1[0] + a3 * p1[0];
        const y = a0 * p0[1] + a1 * c0[1] + a2 * c1[1] + a3 * p1[1];

        if (j === 0 && i === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        }

        const mid = Math.floor(((p0[2] || 0) + (p1[2] || 0)) / 2) % (numColors + 5);
        const p0i = ((p0[2] || 0) % (numColors + 5)) * 4;
        const p1i = ((p1[2] || 0) % (numColors + 5)) * 4;
        const midi = (mid % (numColors + 5)) * 4;

        const p0r = colorArray[p0i] || 0, p0g = colorArray[p0i + 1] || 0, p0b = colorArray[p0i + 2] || 0;
        const p1r = colorArray[p1i] || 0, p1g = colorArray[p1i + 1] || 0, p1b = colorArray[p1i + 2] || 0;
        const midr = colorArray[midi] || 0, midg = colorArray[midi + 1] || 0, midb = colorArray[midi + 2] || 0;

        let r = p0r * it + midr * t;
        let g = p0g * it + midg * t;
        let b = p0b * it + midb * t;
        r = r * it + p1r * t;
        g = g * it + p1g * t;
        b = b * it + p1b * t;

        ctx.strokeStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  }
}

// ---- Color Update ----
function updateColors(_dt: number, time: number, colorArray: Float32Array) {
  const s = time * 0.00006;
  for (let idx = 0; idx < numColors; idx++) {
    const i = idx * 4;
    const [r, g, b] = PALETTE[idx];
    colorArray[i] = r;
    colorArray[i + 1] = g;
    colorArray[i + 2] = b;
    colorArray[i + 3] = 255;
  }
  const offset = numColors * 4;
  for (let idx = 0; idx < 5; idx++) {
    const t = (idx / 5 + s) % 1;
    const i0 = (idx % numColors) * 4;
    const i1 = ((idx + 1) % numColors) * 4;
    const it = 1 - t;
    colorArray[offset + idx * 4] = (colorArray[i0] || 0) * it + (colorArray[i1] || 0) * t;
    colorArray[offset + idx * 4 + 1] = (colorArray[i0 + 1] || 0) * it + (colorArray[i1 + 1] || 0) * t;
    colorArray[offset + idx * 4 + 2] = (colorArray[i0 + 2] || 0) * it + (colorArray[i1 + 2] || 0) * t;
    colorArray[offset + idx * 4 + 3] = 255;
  }
}

// ---- Component ----
export default function AmbientSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const noise = new NoiseStack("trueframe");
    const colorArray = new Float32Array((numColors + 5) * 4);

    const lines: Line[] = [];
    for (let i = 0; i < 30; i++) {
      lines.push(
        new Line(
          -100 + Math.random() * (canvas.width + 200),
          -100 + Math.random() * (canvas.height + 200),
          Math.floor(Math.random() * 15),
          PALETTE[Math.floor(Math.random() * 15)],
          0.5 + Math.random() * 1.5,
          10 + Math.random() * 10,
          noise
        )
      );
    }

    function render(timestamp: number) {
      if (!ctx || !canvas) return;
      let dt = timestamp - lastTime;
      dt *= 0.001;
      if (dt > 0.1) dt = 0.1;
      lastTime = timestamp;

      ctx.fillStyle = "#060a12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      updateColors(dt, timestamp, colorArray);

      for (const line of lines) {
        line.update(dt);
        line.draw(ctx, 1, colorArray);
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
