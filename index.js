const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const row = canvas.height/scale;
const col = canvas.width/scale;

//[snake body]
function snake_body(){
	this.Xcord = 0;
	this.Ycord = 0;
	this.Xspd = 0;
	this.Yspd = 0;
	this.eaten_food=0;
	this.body = [];
	this.show=()=>{
		ctx.strokeStyle="#fff";
		ctx.beginPath();
		ctx.fillStyle="green";
		for(let i=0; i<this.body.length; i++ ){
			ctx.rect(this.body[i].Xcord, this.body[i].Ycord, scale, scale);
			ctx.fillStyle="red";
			ctx.fillRect(this.body[i].Xcord, this.body[i].Ycord, scale-2, scale-2);
		}
		ctx.fillRect(this.Xcord,this.Ycord, scale - 2, scale - 2);
		ctx.rect(this.Xcord,this.Ycord, scale, scale);
		ctx.stroke();
	}
	this.move=()=>{
			for(let i=0; i<this.body.length - 1; i++){
			this.body[i]=this.body[i + 1];
		}
		this.body[this.eaten_food - 1] = {Xcord:this.Xcord, Ycord:this.Ycord};
		this.Xcord += this.Xspd;
		this.Ycord += this.Yspd;
	}
	this.clearPath=()=>{
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
	this.checklocation=()=>{
		if(this.Xcord > canvas.width){
			this.Xcord = 0;
		}else if(this.Xcord < 0){
			this.Xcord = canvas.width;
		}else if(this.Ycord > canvas.height){
			this.Ycord = 0;
		}else if(this.Ycord < 0){
			this.Ycord = canvas.height;
		}
	}
	this.eat=(phal)=>{
		if (this.Xcord == phal.Xcord &&
			this.Ycord == phal.Ycord) {
			this.eaten_food++;
			return true;
		}
		return false;
	}
	this.accident=()=>{
		for (let i = 0; i < this.body.length; i++) {
			if (this.Xcord === this.body[i].Xcord &&
				this.Ycord === this.body[i].Ycord) {
				this.eaten_food = 0;
				this.body = [];
				this.Xspd=0;
				this.Yspd=0;
			}
		}
	}
}

//[Cooking food for snake]
function foodrecipe(){
	this.Xcord;
	this.Ycord;
	this.location=()=>{
		this.Xcord =(Math.floor(Math.random()*col -1) +1) * scale;
		this.Ycord =(Math.floor(Math.random()*row -1) +1) * scale;
	}
	this.appear=()=>{
		ctx.fillStyle="red";
		ctx.fillRect(this.Xcord, this.Ycord, scale, scale);
	}
}
//[new sanke is born]
let snake = new snake_body();
//[made some food for snake]
let fruit = new foodrecipe();
//[place where the food is ]
fruit.location();

//[update function for score]
const updatescore=()=>{
	document.getElementById("scoreboard").innerHTML =` ${snake.eaten_food}00`;
}
//[the updating the frame]
const update=()=>{
	snake.clearPath();
	fruit.appear();
	snake.show();
	snake.move();
	snake.checklocation();
	if (snake.eat(fruit)) {
		fruit.location();
	}
	snake.accident();
	updatescore();
}
// [initializingh the frames]
window.setInterval(update, 250);
//[initailizing controls for keyboard]
window.addEventListener("keydown", (event)=>{
	if (event.code == "ArrowLeft") {
		snake.Xspd = -scale;
		snake.Yspd = 0;
	}
	if (event.code == "ArrowRight") {
		snake.Xspd = scale;
		snake.Yspd = 0;	
	}
	if (event.code == "ArrowUp") {
		snake.Yspd = -scale;
		snake.Xspd = 0;
	}
	if (event.code == "ArrowDown") {
		snake.Yspd = scale;
		snake.Xspd = 0;
	}
});
//[controls for the virtual buttons]
document.getElementById("up").addEventListener("click", ()=>{
		snake.Yspd = -scale;
		snake.Xspd = 0;
});//up
document.getElementById("down").addEventListener("click", ()=>{
		snake.Yspd = scale;
		snake.Xspd = 0;
});//down
document.getElementById("left").addEventListener("click", ()=>{
		snake.Xspd = -scale;
		snake.Yspd = 0;
});//left
document.getElementById("right").addEventListener("click", ()=>{
		snake.Xspd = scale;
		snake.Yspd = 0;	
});//right


//[pause button]
document.getElementById("pausebtn").addEventListener("click", ()=>{
	if(snake.Xspd !== 0 || snake.Yspd !== 0){
		snake.Xspd = 0;
		snake.Yspd = 0;
	}
});
