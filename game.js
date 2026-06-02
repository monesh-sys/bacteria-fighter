
const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
const scoreEl=document.getElementById('score');
const healthEl=document.getElementById('health');
const cross=document.getElementById('crosshair');

function resize(){
 canvas.width=innerWidth;
 canvas.height=innerHeight;
}
resize();
addEventListener('resize',resize);

let score=0;
let health=100;

const enemies=[];

function spawnEnemy(){
 enemies.push({
   x:Math.random()*canvas.width,
   y:Math.random()*canvas.height,
   r:20+Math.random()*20,
   vx:(Math.random()*4)-2,
   vy:(Math.random()*4)-2
 });
}

for(let i=0;i<6;i++) spawnEnemy();

document.addEventListener('mousemove',e=>{
 cross.style.left=e.clientX+'px';
 cross.style.top=e.clientY+'px';
});

canvas.addEventListener('click',e=>{
 enemies.forEach((en,index)=>{
   const dx=e.clientX-en.x;
   const dy=e.clientY-en.y;
   if(Math.hypot(dx,dy)<en.r){
      score+=10;
      scoreEl.textContent=score;
      enemies.splice(index,1);
      spawnEnemy();
   }
 });
});

function update(){
 enemies.forEach(en=>{
   en.x+=en.vx;
   en.y+=en.vy;

   if(en.x<en.r||en.x>canvas.width-en.r) en.vx*=-1;
   if(en.y<en.r||en.y>canvas.height-en.r) en.vy*=-1;
 });

 health-=0.03;
 if(health<0) health=0;
 healthEl.textContent=Math.floor(health);
}

function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 enemies.forEach(en=>{
   const g=ctx.createRadialGradient(en.x,en.y,5,en.x,en.y,en.r);
   g.addColorStop(0,'#ff5555');
   g.addColorStop(1,'#660000');
   ctx.fillStyle=g;
   ctx.beginPath();
   ctx.arc(en.x,en.y,en.r,0,Math.PI*2);
   ctx.fill();
 });

 if(health<=0){
   ctx.fillStyle='white';
   ctx.font='bold 72px Arial';
   ctx.fillText('GAME OVER',canvas.width/2-220,canvas.height/2);
 }
}

function loop(){
 update();
 draw();
 if(health>0) requestAnimationFrame(loop);
}
loop();
