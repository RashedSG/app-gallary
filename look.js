if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h) {
    this.rect(x, y, w, h);
  };
}

export function boot2D(view) {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.touchAction = 'none';
  view.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function fit() {
    const w = Math.max(1, view.clientWidth);
    const h = Math.max(1, view.clientHeight);
    const d = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * d);
    canvas.height = Math.floor(h * d);
    ctx.setTransform(d, 0, 0, d, 0, 0);
  }

  addEventListener('resize', fit);
  addEventListener('orientationchange', () => setTimeout(fit, 200));
  new ResizeObserver(fit).observe(view);
  fit();
  return { canvas, ctx, fit };
}

export function clear(ctx, view, bg) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, Math.max(1, view.clientWidth), Math.max(1, view.clientHeight));
}
