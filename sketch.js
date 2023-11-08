let inc = 0.05;
let scl = 15;
let cols, rows;

let fr;

let zoff = 0;

let particles = [];

let flowField = [];

function setup() {
	createCanvas(800,600);
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');
	
	flowField = new Array(cols * rows);
	
	for(let i = 0; i < 500; i++) {
		particles[i] = new Particle(0,random(height));
	}
	background(0);
}

const rand = random(255)

function draw() {
	// background(255);
	
	let yoff = 0;
	
	for(let y = 0; y < rows; y++) {
		let xoff = 0;
		
		for(let x = 0; x < cols; x++){
			const i = (x + y * cols);
			
			
			const angle = noise(xoff, yoff, zoff) * TWO_PI;
			
			const v = p5.Vector.fromAngle(angle);
			flowField[i] = v;
			v.setMag(.5);
			
			
			stroke(0, 100);
			
			
			xoff += inc;
		}
		yoff += inc;
		
		// zoff += 0.0003;
	}
	
	for(let i = 0; i < particles.length; i++) {
		particles[i].follow(flowField);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}
	
	fr.html(floor(frameRate()));
}