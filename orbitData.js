BasicSim.prototype.createDataSetup = function(){
	this.setupData = {
		star : {
			x : this.world.centerX,
			y : this.world.centerY,
			radius : 80,
			linestyle : { width : 1, color :  0xfcea4f, alpha : 0.5},
			fillStyle : { color : 0xfce94f, alpha : 1}
		},
		planet : {
			x : 0, y: 0,
			radius : 30,
			orbitDistance : 200,
			linestyle : { width : 1, color :  0x204a87, alpha : 0.5},
			fillStyle : { color : 0x204a87, alpha : 1}

		},
		satellite : {
			x : 0, y : 0,
			radius : 10,
			orbitDistance : 80,
			linestyle : { width : 1, color :  0xbabdb6, alpha : 0.5},
			fillStyle : { color : 0xbabdb6, alpha : 1}
		},
		planetOrbit : {
			x : this.world.centerX, y : this.world.centerY,
			radius : 200,
			linestyle : { width : 2, color :  0xc17d11, alpha : 0.8}
		},
		planetOrbitArc : {
			x : 0,y:0,
			radius : 200,
			linestyle : { width : 4, color : 0xe9b96e, alpha : 0.8},
			fillStyle : { color : 0, alpha : 0},
			dirty : true
		},
		satelliteOrbitArc :{
			x:0, y:0,
			radius : 80,
			linestyle : { width : 3, color : 0xd3d7cf, alpha : 0.5},
			fillStyle : { color : 0, alpha : 0},
			dirty : true
		},
		satelliteOrbit : {
			x : 0, y : 0,
			radius : 80,
			linestyle : { width : 1, color : 0xbabdb6, alpha : 0.5}
		},
		clockArc : {
			x:0,y:0,
			radius : 30,
			linestyle : { width :1, color :  0x729fcf, alpha : 0.8},
			fillStyle : { color : 0x729fcf, alpha : 0.8},
			dirty : true
		}
	};
	this.months = [31,28,31,30,31,30,31,31,30,31,30,31];
	this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    this.dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	this.totalHours = 8760;
};