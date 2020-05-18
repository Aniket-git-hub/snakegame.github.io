//[snake body]
function snake_body(){
	this.Xcord = 0;
	this.Ycord = 0;
	this.Xspd = 0;
	this.Yspd = 0;
	this.eaten_food=0;
	this.body = [];
	this.show=()=>{
		ctx.fillStyle='#fff';
		for(let i=0; i<this.body.length; i++ ){
			ctx.fillRect(this.body[i].Xcord, this.body[i].Ycord, scale, scale);
		}
		ctx.fillRect(this.Xcord,this.Ycord, scale, scale);
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
			}
		}
	}
}