(()=>{"use strict";var t,e,s,i,n,a={518:(t,e,s)=>{s.d(e,{Z:()=>r});var i={};s.r(i),s.d(i,{GAME_OVER:()=>a,GAME_WON:()=>h,SPAWN_POOL_EMPTY:()=>o,UPDATE_HUD:()=>n});const n="GAME::UPDATE_HUD",a="GAME::OVER",h="GAME::WON",o="GAME::SPAWN_POOL_EMPTY";class r extends class{constructor(){this.subscriptions=new Map}subscribe(t,e){this.subscriptions.has(t)||this.subscriptions.set(t,new Set),this.subscriptions.get(t).add(e)}unsubscribe(t,e){this.subscriptions.has(t)?e?this.subscriptions.get(t).delete(e):this.subscriptions.delete(t):console.warn(`[EventEmitter::unsubcribe] event "${t}" does not exist in emitter`)}emit(t,...e){this.subscriptions.has(t)?this.subscriptions.get(t).forEach((t=>t(...e))):console.warn(`[EventEmitter::emit] subscriptions for "${t}" do not exist`)}static once(t,e){return new Promise((s=>{t.addEventListener(e,s,{once:!0})}))}}{constructor(t){super(),this.events=i,this.canvas=t,this.context=t.getContext("2d"),this.objectPool=new Set,this.context.imageSmoothingEnabled=!1,this.gameOver=!1,this.gameWon=!1,this.spawnPoints={topLeft:[-100,-100],topMiddle:[this.canvas.width/2,-100],topRight:[this.canvas.width+100,-100],centerLeft:[-100,this.canvas.height/2],centerMiddle:[this.canvas.width/2,this.canvas.height/2],centerRight:[this.canvas.width+100,this.canvas.height/2],bottomLeft:[-100,this.canvas.height+100],bottomMiddle:[this.canvas.width/2,this.canvas.height+100],bottomRight:[this.canvas.width+100,this.canvas.height+100]},this.spawnPool=new Set,this.spawnPoolIterator=this.spawnPool.values(),this.subscribe(this.events.GAME_OVER,this.onGameOver.bind(this)),this.subscribe(this.events.GAME_WON,this.onGameWon.bind(this)),this.onInit()}addSpawnWave(t,e){this.spawnPool.add([t,e])}nextSpawnWave(){const{value:t,done:e}=this.spawnPoolIterator.next();if(e)return void this.emit(this.events.SPAWN_POOL_EMPTY);const[s,i]=t;i.forEach((t=>{const e=new s(this,...t);this.spawn(e)}))}spawn(t){this.objectPool.add(t)}pop(t){this.objectPool.delete(t)}onGameWon(){this.gameWon=!0}onGameOver(){this.gameOver=!0}onInit(){}onStart(){}FindObjectFromPool(t){if("function"!=typeof t)return;let e,s=this.objectPool.values();for(;;){const{done:i,value:n}=s.next();if(i)break;if(t(n)){e=n;break}}return e}start(){this.onStart(),this.emit(this.events.UPDATE_HUD),this.update()}update(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.objectPool.forEach((t=>{this.objectPool.forEach((e=>{if(e===t)return;const s=Math.abs(e.center.x-t.center.x),i=Math.abs(e.center.y-t.center.y);s<e.width&&i<e.height&&(e.onCollision(t),t.onCollision(e))})),t.onUpdate(),t.draw()})),window.requestAnimationFrame(this.update.bind(this))}}},397:(t,e,s)=>{s.d(e,{Z:()=>n});var i=s(555);class n{constructor(t,e,s,i,n){this.game=t,this.size=e,this.x=s,this.y=i,this.image=n}get width(){return this.image.width*this.size}get height(){return this.image.height*this.size}get drawHeight(){return this.image.height*this.size/2*-1}get drawWidth(){return this.image.width*this.size/2*-1}get center(){return{x:this.x-this.image.width*this.size/2,y:this.y-this.image.height*this.size/2}}getDistanceFromPoint(t,e){const s=t-this.center.x,i=e-this.center.y;return Math.hypot(i,s)}spawn(){this.game.spawn(this)}destroy(){this.game.pop(this)}followPoint(t,e,s=1,i=0){const n=t-this.center.x,a=e-this.center.y,h=Math.hypot(a,n),o=Math.abs(n)+Math.abs(a)+h,r=this.center.x>t?"left":"right",c=this.center.y>e?"up":"down",d=Math.abs(n/o),l=Math.abs(a/o);h>i&&(this.x="left"===r?this.x-s*d:this.x+s*d,this.y="up"===c?this.y-s*l:this.y+s*l)}lookAtPoint(t,e){const s=(0,i.Ht)(90),n=Math.atan2(this.center.y-e,this.center.x-t);this.rotate=n-s}onUpdate(){}onCollision(t){}draw(){const t=this.game.context;t.save(),t.translate(this.center.x,this.center.y),this.rotate&&t.rotate(this.rotate),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.width,this.height),t.restore()}}},353:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/enemy-laser.svg"},341:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/enemy.svg"},831:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/explosion.svg"},905:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/laser.svg"},508:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/player.svg"},379:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"assets/star-duotone.svg"},279:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>m});var i=s(417),n=s(397),a=s(497),h=s(597),o=s(863),r=s(555),c=s(341),d=s(353),l=t([o,a,h,i]);[o,a,h,i]=l.then?await l:l;const p=await(0,r.Fk)(c.Z),g=await(0,r.Fk)(d.Z);class m extends n.Z{constructor(t,e,s,i,n,a=2e3){super(t,e,s,i,p),this.speed=n,this.lastFiredTime=Date.now(),this.rateOfFire=a}shootPlayer(){new a.Z(this.game,.05,this.center.x,this.center.y,this.game.player.center.x,this.game.player.center.y,15,400,this,g).spawn()}onUpdate(){this.game.player&&(Date.now()-this.lastFiredTime>this.rateOfFire&&(this.lastFiredTime=Date.now(),this.shootPlayer()),this.lookAtPoint(this.game.player.center.x,this.game.player.center.y),this.followPoint(this.game.player.center.x,this.game.player.center.y,this.speed))}onDeath(){new h.Z(this.game,this.size,this.x,this.y).spawn(),this.destroy(),this.game.addScore(100),this.game.currentEnemyWaveDefeated&&this.game.nextSpawnWave()}onCollision(t){(t instanceof a.Z&&t.origin!==this||t instanceof o.Z||t instanceof m)&&this.onDeath()}}t()}),1)},597:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>o});var i=s(397),n=s(555),a=s(831);const h=await(0,n.Fk)(a.Z);class o extends i.Z{constructor(t,e,s,i){super(t,e,s,i,h),this.scale=0,this.alpha=1}onUpdate(){switch(!0){case this.scale<2:this.scale=this.scale+.05;break;case this.scale>2&&this.alpha>0:const t=this.alpha-.1;this.alpha=t>0?t:0;break;default:this.destroy()}}drawExplosion(t=0,e=0,s=0){const i=this.game.context;i.save(),i.translate(this.center.x+t,this.center.y+e),i.scale(this.scale-s,this.scale-s),i.globalAlpha=this.alpha,i.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),i.restore()}draw(){this.scale>.5&&this.drawExplosion(5,10,.5),this.scale>.3&&this.drawExplosion(-10,-10,.3),this.drawExplosion()}}t()}),1)},863:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>p});var i=s(397),n=s(417),a=s(497),h=s(279),o=s(597),r=s(555),c=s(508),d=t([a,o,h,n]);[a,o,h,n]=d.then?await d:d;const l=await(0,r.Fk)(c.Z);class p extends i.Z{constructor(t,e,s,i,n){super(t,e,s,i,l),this.movementDelayRange=n}onCollision(t){(t instanceof h.Z||t instanceof a.Z&&t.origin!==this)&&(this.game.emit(this.game.events.GAME_OVER),new o.Z(this.game,this.size,this.x,this.y).spawn(),this.destroy(),delete this.game.player)}shoot(){new a.Z(this.game,.05,this.center.x,this.center.y,this.cursorX,this.cursorY,60,400,this).spawn()}move(t,e){this.cursorX=t,this.cursorY=e,this.lookAtPoint(t,e);const s=this.getDistanceFromPoint(t,e);if(s>this.movementDelayRange){const i=s-this.movementDelayRange;this.followPoint(t,e,i,this.movementDelayRange)}}}t()}),1)},497:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>l});var i=s(397),n=s(279),a=s(597),h=s(863),o=s(555),r=s(905),c=t([a,h,n]);[a,h,n]=c.then?await c:c;const d=await(0,o.Fk)(r.Z);class l extends i.Z{constructor(t,e,s,i,n,a,h,o,r,c){super(t,e,s,i,d),this.xDestination=n,this.yDestination=a,this.speed=h,this.xOrigin=s,this.yOrigin=i,this.xDirection=this.xOrigin>this.xDestination?"left":"right",this.yDirection=this.yOrigin>this.yDestination?"up":"down";const l=this.yDestination-this.yOrigin,p=this.xDestination-this.xOrigin,g=Math.hypot(p,l),m=Math.abs(l)+Math.abs(p)+g;this.xEmphasis=Math.abs(p/m),this.yEmphasis=Math.abs(l/m),this.range=o,this.origin=r,c&&(this.image=c)}get distanceFromOriginPoint(){const t=this.xOrigin-this.center.x,e=this.yOrigin-this.center.y;return Math.hypot(t,e)}onCollision(t){((t instanceof n.Z||t instanceof h.Z)&&t!==this.origin||t instanceof l&&t!==this)&&(new a.Z(this.game,this.size/2,this.x,this.y).spawn(),this.destroy())}onUpdate(){this.x="left"===this.xDirection?this.x-1*this.speed*this.xEmphasis:this.x+1*this.speed*this.xEmphasis,this.y="up"===this.yDirection?this.y-1*this.speed*this.yEmphasis:this.y+1*this.speed*this.yEmphasis,this.distanceFromOriginPoint>this.range&&this.game.pop(this)}draw(){const t=this.game.context;t.save(),t.translate(this.x,this.y),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),t.restore()}}t()}),1)},55:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>o});var i=s(397),n=s(555),a=s(379);const h=await(0,n.Fk)(a.Z);class o extends i.Z{constructor(t,e,s,i){super(t,e,s,i,h)}}t()}),1)},417:(t,e,s)=>{s.a(t,(async t=>{s.d(e,{Z:()=>c});var i=s(518),n=s(863),a=s(279),h=s(55),o=s(555),r=t([h,a,n]);[h,a,n]=r.then?await r:r;class c extends i.Z{get currentEnemyWaveDefeated(){return!this.FindObjectFromPool((t=>t instanceof a.Z))}addScore(t){this.score=this.score+t,this.emit(this.events.UPDATE_HUD)}onInit(){this.score=0,this.player=new n.Z(this,1/8,...this.spawnPoints.centerMiddle,96),this.addSpawnWave(a.Z,[[.1,...this.spawnPoints.bottomLeft,8],[.1,...this.spawnPoints.bottomMiddle,8]]),this.addSpawnWave(a.Z,[[.1,...this.spawnPoints.centerRight,8],[.1,...this.spawnPoints.bottomRight,8]]),this.subscribe(this.events.SPAWN_POOL_EMPTY,(()=>{this.emit(this.events.GAME_WON)}));for(let t=0;t<10;t++){const t=(0,o.my)(this.canvas),e=(0,o.L)(10,90),s=(0,o.Ht)(e),i=new h.Z(this,.1,...t);i.rotate=s,i.spawn()}}onStart(){this.spawn(this.player),this.nextSpawnWave()}}}))},225:(t,e,s)=>{s.a(t,(async t=>{var e=s(417),i=s(555),n=t([e]);e=(n.then?await n:n)[0];const{matches:a}=window.matchMedia("(any-hover: hover)"),h=!a,o=document.getElementById("gamemenu"),r=document.getElementById("menutext"),c=document.getElementById("start"),d=document.getElementById("score"),l=document.getElementById("gamecanvas");(0,i.gN)(l),window.onresize=i.gN.bind(window,l),c.onclick=()=>{c.blur(),setTimeout((()=>{o.style.display="none",function(){const t=new e.Z(l),{events:{UPDATE_HUD:s,GAME_OVER:i,GAME_WON:n}}=t;t.subscribe(s,(()=>{d.innerText=t.score})),t.subscribe(i,(()=>{r.innerText="GAME OVER",c.innerText="RESTART",o.style.display="block"})),t.subscribe(n,(()=>{r.innerText="YOU WIN",c.innerText="RESTART",o.style.display="block"})),l.onmousemove=e=>{t.player&&t.player.move(e.clientX,e.clientY)},window.onkeydown=e=>{"Space"===e.code&&t.player&&t.player.shoot()},h&&(l.ontouchmove=e=>{e.preventDefault();const{touches:[s]}=e;t.player&&t.player.move(s.clientX,s.clientY)},l.ontouchstart=e=>{e.preventDefault();const{touches:[s,i]}=e;i&&t.player&&t.player.shoot()}),t.start()}()}),200)}}))},555:(t,e,s)=>{function i(t){t.width=window.innerWidth,t.height=window.innerHeight}function n(t){return t*(Math.PI/180)}async function a(t){const e=await fetch(t),s=await e.blob(),[i]=(await s.text()).match('viewBox=".*?"'),n=new Image;if(i){const[t,e,s,a]=i.split(/viewBox|="|"| /).filter((t=>!!t));n.width=s,n.height=a}return n.src=URL.createObjectURL(s),n}function h(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function o(t){return[h(100,t.width),h(100,t.height)]}s.d(e,{gN:()=>i,Ht:()=>n,Fk:()=>a,L:()=>h,my:()=>o})}},h={};function o(t){var e=h[t];if(void 0!==e)return e.exports;var s=h[t]={exports:{}};return a[t](s,s.exports,o),s.exports}t="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",s=t=>{t&&(t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},i=t=>!--t.r&&t(),n=(t,e)=>t?t.push(e):i(e),o.a=(a,h,o)=>{var r,c,d,l=o&&[],p=a.exports,g=!0,m=!1,w=(e,s,i)=>{m||(m=!0,s.r+=e.length,e.map(((e,n)=>e[t](s,i))),m=!1)},u=new Promise(((t,e)=>{d=e,c=()=>(t(p),s(l),l=0)}));u[e]=p,u[t]=(t,e)=>{if(g)return i(t);r&&w(r,t,e),n(l,t),u.catch(e)},a.exports=u,h((a=>{if(!a)return c();var h,o;r=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[t])return a;if(a.then){var h=[];a.then((t=>{o[e]=t,s(h),h=0}));var o={};return o[t]=(t,e)=>(n(h,t),a.catch(e)),o}}var r={};return r[t]=t=>i(t),r[e]=a,r})))(a);var d=new Promise(((t,s)=>{(h=()=>t(o=r.map((t=>t[e])))).r=0,w(r,h,s)}));return h.r?d:o})).then(c,d),g=!1},o.d=(t,e)=>{for(var s in e)o.o(e,s)&&!o.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;o.g.importScripts&&(t=o.g.location+"");var e=o.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=t})(),o(225)})();