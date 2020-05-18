const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const row = canvas.height/scale;
const col = canvas.width/scale;

//[Cooking food for snake]
function food(){
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
let fruit = new food();
//[place where the food is ]
fruit.location();

//[update function for score]
const updatescore=()=>{
	document.getElementById("scoreboard").innerHTML =` ${snake.eaten_food}00`;
}

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
//[initailizing controls]
document.getElementById("up"). addEventListener("click", ()=>{
  snake.Yspd = -scale;
		snake.Xspd = 0;
});
 document.getElementById("down"). addEventListener("click", ()=>{
  snake.Yspd = scale;
		snake.Xspd = 0;
});

 document.getElementById("left"). addEventListener("click", ()=>{
            snake.Xspd = -scale;
		snake.Yspd = 0;
});
 
 document.getElementById("right"). addEventListener("click", ()=>{
  snake.Xspd = scale;
		snake.Yspd = 0;	
});
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
