export function boot2D(view, bg='#071018'){
  const canvas=document.createElement('canvas');
  view.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  function fit(){
    const w=view.clientWidth,h=view.clientHeight||1;
    const d=Math.min(devicePixelRatio||1,2);
    canvas.width=w*d; canvas.height=h*d;
    canvas.style.width=w+'px'; canvas.style.height=h+'px';
    ctx.setTransform(d,0,0,d,0,0);
  }
  addEventListener('resize',fit); fit();
  return {canvas,ctx,fit,bg};
}

export function clear(ctx,view,bg){
  ctx.fillStyle=bg; ctx.fillRect(0,0,view.clientWidth,view.clientHeight);
}
