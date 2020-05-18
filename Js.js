const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext("2d");
const scale = 10;
const row=canvas.height/scale;
const col=canvas.width/scale;
function snake() {
  this.x=0;
  this.y=0;
  this.Xspd=scale;
  this.Yspd=0;
  this.eaten_phal=0;
  this.body=[];
  this.draw=()=>{
    ctx.fillStyle="#ffff";
    for (let i = 0; i < this.body.length; i++) {
      ctx.fillRect(this.body[i].x, this.body[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y,scale,scale);
  }
  this.move=()=>{
    for(let i=0; i<this.body.length-1; i++){
      this.body[i]=this.body[i + 1];
    }
    this.body[this.eaten_phal - 1]={
      x:this.x, y:this.y
    };
    this.x += this.Xspd;
    this.y += this.Yspd;
  }
  this.clear=()=>{
    ctx.clearRect(0,0, canvas.height, canvas.width);
  }
  this.checklocation=()=>{
    if(this.x>canvas.width){
      this.x=0;
    }
    if (this.x<0) {
      this.x=canvas.width;
    }
    if(this.y>canvas.height){
      this.y=0;
    }
    if (this.y<0) {
      this.y=canvas.height;
    }
  }
  this.eat=(phal)=>{
    if (this.x == phal.x && this.y == phal.y) { 
        this.eaten_phal++
        return true;
    }
    return false;
  }
  this.accident=()=>{
    for (let i = 0; i < this.body.length; i++) {
      if (this.x===this.body[i].x&&
      this.y===this.body[i].y) {
        this.eaten_phal=0;
        this.body=[];
      }
    }
  }
}
function food(){
  this.x;
  this.y;
  this.location=()=>{
    this.x=(Math.floor(Math.random()*col -1)+1)*scale;
    this.y=(Math.floor(Math.random()*row -1)+1)*scale;
  }
  this.draw=()=>{
    ctx.fillStyle="red";
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}
var snake_one=new snake();
var fruit=new food();
    fruit.location();
window.setInterval(()=>{
  snake_one.clear();
  fruit.draw();
  snake_one.move();
  snake_one.draw();
  snake_one.checklocation();
  snake_one.accident();
  if (snake_one.eat(fruit)) {
     fruit.location();
  }
  
  document.getElementById("scorecard").innerHTML=snake_one.eaten_phal;
  
}, 250);
 


document.getElementById('up').addEventListener("click", ()=>{
  snake_one.Xspd=0;
  snake_one.Yspd= -scale;
});

document.getElementById('down').addEventListener("click", ()=>{
  snake_one.Xspd=0;
  snake_one.Yspd= scale;
});

document.getElementById('left').addEventListener("click", ()=>{
  snake_one.Xspd=-scale;
  snake_one.Yspd=0;
});

document.getElementById('right').addEventListener("click", ()=>{
  snake_one.Xspd=scale;
  snake_one.Yspd=0;
});






