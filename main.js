(()=>{"use strict";var t,s,e,i,h,a={538:(t,s,e)=>{e.d(s,{l:()=>a,ZP:()=>d});var i={};e.r(i),e.d(i,{GAME_OVER:()=>r,GAME_WON:()=>c,SPAWN_POOL_EMPTY:()=>p,UPDATE_HUD:()=>o});var h=e(555);class a{constructor(t,s,e,i,h){this.game=t,this.size=s,this.x=e,this.y=i,this.image=h}get width(){return this.image.width*this.size}get height(){return this.image.height*this.size}get drawHeight(){return this.image.height*this.size/2*-1}get drawWidth(){return this.image.width*this.size/2*-1}get center(){return{x:this.x-this.image.width*this.size/2,y:this.y-this.image.height*this.size/2}}getDistanceFrom(t){const s=t.center.x-this.center.x,e=t.center.y-this.center.y;return Math.hypot(e,s)}spawn(){this.game.spawn(this)}destroy(){this.game.pop(this)}follow(t){let s=this.speed;s||(s=5);const e=t.center.x-this.center.x,i=t.center.y-this.center.y,h=Math.hypot(i,e),a=Math.abs(e)+Math.abs(i)+h,n=this.center.x>t.center.x?"left":"right",o=this.center.y>t.center.y?"up":"down",r=Math.abs(e/a),c=Math.abs(i/a);this.x="left"===n?this.x-s*r:this.x+s*r,this.y="up"===o?this.y-s*c:this.y+s*c}lookAt(t){const s=(0,h.Ht)(90),e=Math.atan2(this.y-t.center.y,this.x-t.center.x);this.rotate=s+e}onUpdate(){}onCollision(t){}draw(){const t=this.game.context;t.save(),t.translate(this.center.x,this.center.y),this.rotate&&t.rotate(this.rotate),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),t.restore()}}class n{constructor(){this.subscriptions=new Map}subscribe(t,s){this.subscriptions.has(t)||this.subscriptions.set(t,new Set),this.subscriptions.get(t).add(s)}unsubscribe(t,s){this.subscriptions.has(t)?s?this.subscriptions.get(t).delete(s):this.subscriptions.delete(t):console.warn(`[EventEmitter::unsubcribe] event "${t}" does not exist in emitter`)}emit(t,...s){this.subscriptions.has(t)?this.subscriptions.get(t).forEach((t=>t(...s))):console.warn(`[EventEmitter::emit] subscriptions for "${t}" do not exist`)}static once(t,s){return new Promise((e=>{t.addEventListener(s,e,{once:!0})}))}}const o="GAME::UPDATE_HUD",r="GAME::OVER",c="GAME::WON",p="GAME::SPAWN_POOL_EMPTY";class d extends n{constructor(t){super(),this.events=i,this.canvas=t,this.context=t.getContext("2d"),this.objectPool=new Set,this.context.imageSmoothingEnabled=!1,this.gameOver=!1,this.gameWon=!1,this.spawnPoints={topLeft:[-100,-100],topMiddle:[this.canvas.width/2,-100],topRight:[this.canvas.width+100,-100],centerLeft:[-100,this.canvas.height/2],centerMiddle:[this.canvas.width/2,this.canvas.height/2],centerRight:[this.canvas.width+100,this.canvas.height/2],bottomLeft:[-100,this.canvas.height+100],bottomMiddle:[this.canvas.width/2,this.canvas.height+100],bottomRight:[this.canvas.width+100,this.canvas.height+100]},this.spawnPool=new Set,this.spawnPoolIterator=this.spawnPool.values(),this.subscribe(this.events.GAME_OVER,this.onGameOver.bind(this)),this.subscribe(this.events.GAME_WON,this.onGameWon.bind(this)),this.onInit()}addSpawnWave(t,s){this.spawnPool.add([t,s])}nextSpawnWave(){const{value:t,done:s}=this.spawnPoolIterator.next();if(s)return void this.emit(this.events.SPAWN_POOL_EMPTY);const[e,i]=t;i.forEach((t=>{const s=new e(this,...t);this.spawn(s)}))}spawn(t){this.objectPool.add(t)}pop(t){this.objectPool.delete(t)}onGameWon(){this.gameWon=!0}onGameOver(){this.gameOver=!0}onInit(){}onStart(){}start(){this.onStart(),this.emit(this.events.UPDATE_HUD),this.update()}update(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.objectPool.forEach((t=>{this.objectPool.forEach((s=>{if(s===t)return;const e=Math.abs(s.center.x-t.center.x),i=Math.abs(s.center.y-t.center.y);e<s.width&&i<s.height&&(s.onCollision(t),t.onCollision(s))})),t.onUpdate(),t.draw()})),window.requestAnimationFrame(this.update.bind(this))}}console.log({GameObject:a,EventEmitter:n,Core:d,Events:i})},353:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/enemy-laser.svg"},341:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/enemy.svg"},831:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/explosion.svg"},905:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/laser.svg"},508:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/player.svg"},379:(t,s,e)=>{e.d(s,{Z:()=>i});const i=e.p+"assets/star-duotone.svg"},279:(t,s,e)=>{e.a(t,(async t=>{e.d(s,{Z:()=>g});var i=e(538),h=e(497),a=e(597),n=e(863),o=e(555),r=e(341),c=e(353),p=t([n,h,a]);[n,h,a]=p.then?await p:p;const d=await(0,o.Fk)(r.Z),l=await(0,o.Fk)(c.Z);class g extends i.l{constructor(t,s,e,i,h,a=2e3){super(t,s,e,i,d),this.speed=h,this.lastFiredTime=Date.now(),this.rateOfFire=a}calculateDirection(){if(!this.game.player)return void(this.speed=0);const t=this.playerX-this.center.x,s=this.playerY-this.center.y,e=Math.hypot(s,t),i=Math.abs(t)+Math.abs(s)+e;this.xDirection=this.center.x>this.playerX?"left":"right",this.yDirection=this.center.y>this.playerY?"up":"down",this.xEmphasis=Math.abs(t/i),this.yEmphasis=Math.abs(s/i),this.distanceFromPlayer=e}shootPlayer(){new h.Z(this.game,.05,this.center.x,this.center.y,this.game.player.center.x,this.game.player.center.y,15,400,this,l).spawn()}targetPlayer(){this.game.player?(this.playerX=this.game.player.center.x,this.playerY=this.game.player.center.y,this.calculateDirection(),Date.now()-this.lastFiredTime>this.rateOfFire&&(this.lastFiredTime=Date.now(),this.shootPlayer()),this.x="left"===this.xDirection?this.x-this.speed*this.xEmphasis:this.x+this.speed*this.xEmphasis,this.y="up"===this.yDirection?this.y-this.speed*this.yEmphasis:this.y+this.speed*this.yEmphasis):this.speed=0}onUpdate(){this.targetPlayer()}onDeath(){new a.Z(this.game,this.size,this.x,this.y).spawn(),this.destroy(),this.game.addScore(100),this.game.currentEnemyWaveDefeated&&this.game.nextSpawnWave()}onCollision(t){(t instanceof h.Z&&t.origin!==this||t instanceof n.Z||t instanceof g)&&this.onDeath()}draw(){const t=this.game.context,s=(0,o.Ht)(90),e=Math.atan2(this.y-this.playerY,this.x-this.playerX);t.save(),t.translate(this.center.x,this.center.y),t.rotate(e+s),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),t.restore()}}t()}),1)},597:(t,s,e)=>{e.a(t,(async t=>{e.d(s,{Z:()=>o});var i=e(538),h=e(555),a=e(831);const n=await(0,h.Fk)(a.Z);class o extends i.l{constructor(t,s,e,i){super(t,s,e,i,n),this.scale=0,this.alpha=1}onUpdate(){switch(!0){case this.scale<2:this.scale=this.scale+.05;break;case this.scale>2&&this.alpha>0:const t=this.alpha-.1;this.alpha=t>0?t:0;break;default:this.destroy()}}drawExplosion(t=0,s=0,e=0){const i=this.game.context;i.save(),i.translate(this.center.x+t,this.center.y+s),i.scale(this.scale-e,this.scale-e),i.globalAlpha=this.alpha,i.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),i.restore()}draw(){this.scale>.5&&this.drawExplosion(5,10,.5),this.scale>.3&&this.drawExplosion(-10,-10,.3),this.drawExplosion()}}t()}),1)},863:(t,s,e)=>{e.a(t,(async t=>{e.d(s,{Z:()=>d});var i=e(538),h=e(497),a=e(279),n=e(597),o=e(555),r=e(508),c=t([h,n,a]);[h,n,a]=c.then?await c:c;const p=await(0,o.Fk)(r.Z);class d extends i.l{constructor(t,s,e,i,h){super(t,s,e,i,p),this.movementDelayRange=h}onCollision(t){(t instanceof a.Z||t instanceof h.Z&&t.origin!==this)&&(this.game.emit(this.game.events.GAME_OVER),new n.Z(this.game,this.size,this.x,this.y).spawn(),this.destroy(),delete this.game.player)}shoot(){new h.Z(this.game,.05,this.center.x,this.center.y,this.cursorX,this.cursorY,60,400,this).spawn()}move(t,s){const e=s-this.center.y,i=t-this.center.x,h=Math.hypot(i,e),a=Math.abs(e)+Math.abs(i)+h;if(this.cursorX=t,this.cursorY=s,h>this.movementDelayRange){const n=h-this.movementDelayRange,o=Math.abs(i/a),r=Math.abs(e/a),c=this.center.x>t?"left":"right",p=this.center.y>s?"up":"down";this.x="left"===c?this.x-n*o:this.x+n*o,this.y="up"===p?this.y-n*r:this.y+n*r}}draw(){const t=this.game.context;t.save(),t.translate(this.center.x,this.center.y);const s=(0,o.Ht)(90),e=Math.atan2(this.center.y-this.cursorY,this.center.x-this.cursorX);t.rotate(e-s),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.height*this.size,this.image.width*this.size),t.restore()}}t()}),1)},497:(t,s,e)=>{e.a(t,(async t=>{e.d(s,{Z:()=>d});var i=e(538),h=e(279),a=e(597),n=e(863),o=e(555),r=e(905),c=t([a,n,h]);[a,n,h]=c.then?await c:c;const p=await(0,o.Fk)(r.Z);class d extends i.l{constructor(t,s,e,i,h,a,n,o,r,c){super(t,s,e,i,p),this.xDestination=h,this.yDestination=a,this.speed=n,this.xOrigin=e,this.yOrigin=i,this.xDirection=this.xOrigin>this.xDestination?"left":"right",this.yDirection=this.yOrigin>this.yDestination?"up":"down";const d=this.yDestination-this.yOrigin,l=this.xDestination-this.xOrigin,g=Math.hypot(l,d),m=Math.abs(d)+Math.abs(l)+g;this.xEmphasis=Math.abs(l/m),this.yEmphasis=Math.abs(d/m),this.range=o,this.origin=r,c&&(this.image=c)}get distanceFromOriginPoint(){const t=this.xOrigin-this.center.x,s=this.yOrigin-this.center.y;return Math.hypot(t,s)}onCollision(t){((t instanceof h.Z||t instanceof n.Z)&&t!==this.origin||t instanceof d&&t!==this)&&(new a.Z(this.game,this.size/2,this.x,this.y).spawn(),this.destroy())}onUpdate(){this.x="left"===this.xDirection?this.x-1*this.speed*this.xEmphasis:this.x+1*this.speed*this.xEmphasis,this.y="up"===this.yDirection?this.y-1*this.speed*this.yEmphasis:this.y+1*this.speed*this.yEmphasis,this.distanceFromOriginPoint>this.range&&this.game.pop(this)}draw(){const t=this.game.context;t.save(),t.translate(this.x,this.y),t.drawImage(this.image,this.drawHeight,this.drawWidth,this.image.width*this.size,this.image.height*this.size),t.restore()}}t()}),1)},55:(t,s,e)=>{e.a(t,(async t=>{e(538);var s=e(555),i=e(379);await(0,s.Fk)(i.Z),t()}),1)},417:(t,s,e)=>{e.a(t,(async t=>{e.d(s,{Z:()=>r});var i=e(538),h=e(863),a=e(279),n=e(55),o=t([a,h,n]);[a,h,n]=o.then?await o:o,console.log("imports");class r extends i.ZP{constructor(t){super(t),this.enemyWaves=(new Set).add([this.spawnPoints.centerRight,this.spawnPoints.topLeft]).add([this.spawnPoints.bottomMiddle,this.spawnPoints.bottomLeft]).add([this.spawnPoints.centerLeft,this.spawnPoints.topRight,this.spawnPoints.bottomRight]).add([this.spawnPoints.bottomLeft,this.spawnPoints.topRight,this.spawnPoints.bottomRight,this.spawnPoints.topMiddle]).values()}get currentEnemyWaveDefeated(){let t=!0;return this.objectPool.forEach((s=>{s instanceof a.Z&&(t=!1)})),t}addScore(t){this.score=this.score+t}onInit(){this.score=0,this.player=new h.Z(this,1/8,...this.spawnPoints.centerMiddle,96),this.addSpawnWave(a.Z,[[.1,...this.spawnPoints.bottomLeft,8],[.1,...this.spawnPoints.bottomMiddle,8]]),this.addSpawnWave(a.Z,[[.1,...this.spawnPoints.centerRight,8],[.1,...this.spawnPoints.bottomRight,8]]),this.subscribe(this.events.SPAWN_POOL_EMPTY,(()=>{this.emit(this.events.GAME_WON)}))}onStart(){this.spawn(this.player),this.nextSpawnWave()}}}))},225:(t,s,e)=>{e.a(t,(async t=>{var s=e(417),i=e(555),h=t([s]);s=(h.then?await h:h)[0],console.log("imports");const{matches:a}=window.matchMedia("(any-hover: hover)"),n=!a,o=document.getElementById("gamemenu"),r=document.getElementById("menutext"),c=document.getElementById("start"),p=document.getElementById("score"),d=document.getElementById("gamecanvas");(0,i.gN)(d),window.onresize=i.gN.bind(window,d),c.onclick=()=>{c.blur(),setTimeout((()=>{o.style.display="none",function(){const t=new s.Z(d),{events:{UPDATE_HUD:e,GAME_OVER:i,GAME_WON:h}}=t;t.subscribe(e,(()=>{p.innerText=t.score})),t.subscribe(i,(()=>{r.innerText="GAME OVER",c.innerText="RESTART",o.style.display="block"})),t.subscribe(h,(()=>{r.innerText="YOU WIN",c.innerText="RESTART",o.style.display="block"})),d.onmousemove=s=>{t.player&&t.player.move(s.clientX,s.clientY)},window.onkeydown=s=>{"Space"===s.code&&t.player&&t.player.shoot()},n&&(d.ontouchmove=s=>{s.preventDefault();const{touches:[e]}=s;t.player&&t.player.move(e.clientX,e.clientY)},d.ontouchstart=s=>{s.preventDefault();const{touches:[e,i]}=s;i&&t.player&&t.player.shoot()}),t.start()}()}),200)}}))},555:(t,s,e)=>{function i(t){t.width=window.innerWidth,t.height=window.innerHeight}function h(t){return t*(Math.PI/180)}async function a(t){const s=await fetch(t),e=await s.blob(),[i]=(await e.text()).match('viewBox=".*?"'),h=new Image;if(i){const[t,s,e,a]=i.split(/viewBox|="|"| /).filter((t=>!!t));h.width=e,h.height=a}return h.src=URL.createObjectURL(e),h}e.d(s,{gN:()=>i,Ht:()=>h,Fk:()=>a})}},n={};function o(t){var s=n[t];if(void 0!==s)return s.exports;var e=n[t]={exports:{}};return a[t](e,e.exports,o),e.exports}t="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",s="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",e=t=>{t&&(t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},i=t=>!--t.r&&t(),h=(t,s)=>t?t.push(s):i(s),o.a=(a,n,o)=>{var r,c,p,d=o&&[],l=a.exports,g=!0,m=!1,w=(s,e,i)=>{m||(m=!0,e.r+=s.length,s.map(((s,h)=>s[t](e,i))),m=!1)},y=new Promise(((t,s)=>{p=s,c=()=>(t(l),e(d),d=0)}));y[s]=l,y[t]=(t,s)=>{if(g)return i(t);r&&w(r,t,s),h(d,t),y.catch(s)},a.exports=y,n((a=>{if(!a)return c();var n,o;r=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[t])return a;if(a.then){var n=[];a.then((t=>{o[s]=t,e(n),n=0}));var o={};return o[t]=(t,s)=>(h(n,t),a.catch(s)),o}}var r={};return r[t]=t=>i(t),r[s]=a,r})))(a);var p=new Promise(((t,e)=>{(n=()=>t(o=r.map((t=>t[s])))).r=0,w(r,n,e)}));return n.r?p:o})).then(c,p),g=!1},o.d=(t,s)=>{for(var e in s)o.o(s,e)&&!o.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:s[e]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,s)=>Object.prototype.hasOwnProperty.call(t,s),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;o.g.importScripts&&(t=o.g.location+"");var s=o.g.document;if(!t&&s&&(s.currentScript&&(t=s.currentScript.src),!t)){var e=s.getElementsByTagName("script");e.length&&(t=e[e.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=t})(),o(225)})();