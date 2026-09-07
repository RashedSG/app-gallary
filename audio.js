export function makeAudio(){
  let ctx;
  function ac(){
    if(!ctx) ctx=new (window.AudioContext||window.webkitAudioContext)();
    if(ctx.state==='suspended') ctx.resume();
    return ctx;
  }
  function beep(freq=440, dur=.12, type='square', vol=.08){
    const c=ac(), o=c.createOscillator(), g=c.createGain();
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,c.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime+dur);
  }
  return {
    start(){beep(520,.08,'triangle',.07); beep(740,.1,'triangle',.06)},
    eat(){beep(660,.07,'square',.07)},
    gold(){beep(880,.08,'sawtooth',.06); setTimeout(()=>beep(1170,.1,'sawtooth',.05),70)},
    hit(){beep(180,.18,'sawtooth',.09)},
    win(){beep(523,.12); setTimeout(()=>beep(659,.12),90); setTimeout(()=>beep(784,.18),180)},
    level(){beep(440,.08); setTimeout(()=>beep(660,.12),90)},
    shoot(){beep(980,.04,'square',.04)},
    place(){beep(400,.06,'triangle',.06)},
    move(){beep(300,.03,'square',.03)}
  };
}
export function bindUnlock(el){
  const u=()=>{try{new (window.AudioContext||window.webkitAudioContext)()}catch(e){} window.removeEventListener('pointerdown',u);};
  window.addEventListener('pointerdown',u,{once:true});
}
