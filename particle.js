function Particle(x, y) {
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxspeed = 4;
	
	this.prevPos = this.pos.copy();
	
	this.update = function () {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}
	
	this.follow = (vectors) => {
		let x = floor(this.pos.x / scl)
		let y = floor(this.pos.y / scl)
		let i = x + y * cols;
		
		let force = vectors[i];
		
		this.applyForce(force);
	}
	
	this.applyForce = (force) => {
		this.acc.add(force)
	}
	
	this.show = () => {
		stroke(255,50);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
		this.updatePrev();
	}
	
	this.updatePrev = () => {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}
	this.edges = () => {
		if(this.pos.x > width) {
			// this.maxspeed = 0;
			this.pos.x = 0;
			this.updatePrev()
		}
		if(this.pos.y > height) {
			// this.maxspeed = 0;
			this.pos.y = 0;
			this.updatePrev()
		}
		if(this.pos.x < 0) {
			// this.maxspeed = 0;
			this.pos.x = width;
			this.updatePrev()
		}
		if(this.pos.y < 0) {
			// this.maxspeed = 0;
			this.pos.y = height;
			this.updatePrev()
		}
	}
}