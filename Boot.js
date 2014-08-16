/* Created by Nam - Game Dolphin - http://gamedolph.in
	2014 - August - 16, Saturday. 

	Code is completely open - copy, distribute, modify yada yada yada. Go crazy with it. :)
*/

BasicSim = function(game){

};

BasicSim.prototype.create = function(){

	this.createDataSetup();
	
	this.setUpClocks();

	this.setUpScreen();

	this.setUpCircles();

	this.setUpInput();

	this.time.events.loop(Phaser.Timer.SECOND, this.placeCirclesEverySecond, this);
	this.time.events.loop(Phaser.Timer.MINUTE*60, this.placeCirclesEveryHour, this);
};

BasicSim.prototype.update = function(){
	this.inputHandler();
};

BasicSim.prototype.inputHandler = function(){
	this.timeText.visible = false;
	this.dateText.visible = false;
	this.hourText.visible = false;
	if(this.planet.input.pointerOver()){
		this.timeText.visible = true;
	}
	if(this.satellite.input.pointerOver()){
		this.dateText.visible = true;
	}
	if(this.star.input.pointerOver()){
		this.hourText.visible = true;
	}


};

BasicSim.prototype.placeCirclesEverySecond = function(){

	var t,secondsAngle;

	this.clock = new Date(); //using the old Date tends to give the time when it was created. 
	t = this.clock.getTime();
	this.secondsSinceNewDay = (t - this.dayBegins)/(1000); //number of seconds since the day began.

	secondsAngle = (this.secondsSinceNewDay/this.totalSeconds)*this.twoPi - this.piByTwo;
	//angle is measure with respect to the positive x axis and we want the 0 to point vertically up, hence -PI/2.

	this.createArc(this.clockArc,this.setupData.clockArc,this.planet.x, this.planet.y,-this.piByTwo,secondsAngle,true);
	
	this.timeText.setText(("0"+this.clock.getHours()).slice(-2).toString()+':'
						+ ("0"+this.clock.getMinutes()).slice(-2).toString()+':'
						+ ("0"+this.clock.getSeconds()).slice(-2).toString()+'\n'
						+ Math.floor(this.secondsSinceNewDay) + ' seconds since midgnight.');
	//12:22:10
	//120101 seconds since midnight.
	
};

BasicSim.prototype.createArc = function(gfxObject,tempData,xPos,yPos,startAngle,endAngle,lineTos){
	gfxObject.clear();
	gfxObject.beginFill(tempData.fillStyle.color,tempData.fillStyle.alpha);
	gfxObject.lineStyle(tempData.linestyle.width,tempData.linestyle.color,tempData.linestyle.alpha);
	if(lineTos)// creates a filled arc only if lineTos is true
		gfxObject.lineTo(xPos - tempData.radius*Math.cos(startAngle),yPos - tempData.radius*Math.sin(startAngle));
	gfxObject.arc(xPos,yPos,tempData.radius,startAngle,endAngle);
	if(lineTos)
		gfxObject.lineTo(xPos,yPos);
	gfxObject.endFill();
}

BasicSim.prototype.placeCirclesEveryHour = function(){

	var t,hourAngle,minutesAngle;

	this.clock = new Date();
	t = this.clock.getTime();
	this.hoursSinceNewYear = Math.floor((t - this.yearBegins)/(3600000)); //number of hours since new year
	this.minutesSinceNewMonth = (t - this.monthBegins)/(60000); //number of minutes since month beginning

	hourAngle = (this.hoursSinceNewYear/this.totalHours)*this.twoPi - this.piByTwo;
	minutesAngle = (this.minutesSinceNewMonth/this.totalMinutes)*this.twoPi - this.piByTwo;
	//aligning angles with respect to the positive vertical axis

	this.planet.x = this.star.x + this.setupData.planet.orbitDistance*Math.cos(hourAngle);
	this.planet.y = this.star.y + this.setupData.planet.orbitDistance*Math.sin(hourAngle);
	//position vector of planet on the circular orbit
	this.satelliteOrbit.x = this.planet.x;
	this.satelliteOrbit.y = this.planet.y;
	//center satellite orbit on the planet
	this.satellite.x = this.planet.x + this.setupData.satellite.orbitDistance*Math.cos(minutesAngle);
	this.satellite.y = this.planet.y + this.setupData.satellite.orbitDistance*Math.sin(minutesAngle);
	//position vector of satellite on circular orbit with respect to the planet.
	this.createArc(this.planetOrbitArc, this.setupData.planetOrbitArc, this.star.x, this.star.y, -this.piByTwo, hourAngle, false);
	this.createArc(this.satelliteOrbitArc,this.setupData.satelliteOrbitArc,this.planet.x,this.planet.y,-this.piByTwo,minutesAngle,false);

	this.dateText.setText(this.monthNames[this.clock.getMonth()]+' '+
						("0"+this.clock.getDate()).slice(-2).toString()+
						', '+Math.floor(this.minutesSinceNewMonth).toString()+
						' minutes since '+this.monthNames[this.clock.getMonth()]+' began.');

	this.hourText.setText(	Math.floor(this.hoursSinceNewYear)+' hours since '+
							this.clock.getFullYear().toString()+ ' began,\n'+
							Math.floor(this.totalHours-this.hoursSinceNewYear)+' hours left.');

	this.overallText.setText(this.dayNames[this.clock.getDay()]+'\n'+
						("0"+this.clock.getDate()).slice(-2).toString()+' '+
						this.monthNames[this.clock.getMonth()]+', '+
						this.clock.getFullYear());
};

BasicSim.prototype.setUpInput = function(){
	this.planet.inputEnabled = true;
	this.satellite.inputEnabled = true;
	this.star.inputEnabled = true;
};


BasicSim.prototype.setUpText = function(){
	this.smallFont = { font: "12pt Courier", fill: "#8ae234" };

	this.titleText = this.add.text(10,10, 'Orbit Clock', 
					{ font: "30pt Courier", fill: "#8ae234", stroke: "#8ae234", strokeThickness: 2 });

	//all these three texts are automatically set to invisible every update loop
	this.timeText = this.add.text(this.world.centerX,this.world.height,'',this.smallFont);
	this.timeText.anchor.setTo(0.5,1);
	this.timeText.align = 'center';
	this.dateText = this.add.text(this.world.centerX,this.world.height,'',this.smallFont);
	this.dateText.anchor.setTo(0.5,1);
	this.dateText.align = 'center';
	this.hourText = this.add.text(this.world.centerX,this.world.centerY+100,'',this.smallFont);
	this.hourText.anchor.setTo(0.5,0.5);
	this.hourText.align = 'center';

	this.overallText = this.add.text(this.world.centerX,this.world.centerY-110,'',this.smallFont);
	this.overallText.anchor.setTo(0.5,0.5);
	this.overallText.align = 'center';
};

BasicSim.prototype.setUpCircles = function(){
	//lazy use of function to get just a graphics object in certain cases.
	this.star = this.createCircle(this.setupData.star);
	this.planetOrbit = this.createCircle(this.setupData.planetOrbit);
	this.planetOrbitArc = this.createCircle(this.setupData.planetOrbitArc);
	this.planet = this.createCircle(this.setupData.planet);
	this.satelliteOrbit = this.createCircle(this.setupData.satelliteOrbit);
	this.satelliteOrbitArc = this.createCircle(this.setupData.satelliteOrbitArc);
	this.satellite = this.createCircle(this.setupData.satellite);
	this.clockArc = this.createCircle(this.setupData.clockArc);

	this.setUpText();

	this.placeCirclesEveryHour();
	this.placeCirclesEverySecond();
};

BasicSim.prototype.createCircle = function(data){
	var fillStyle = data.fillStyle,linestyle = data.linestyle;
	if(data.fillStyle===null||data.fillStyle===undefined)
		fillStyle= { color : 0, alpha : 0};
	if(data.linestyle===null||data.linestyle===undefined)
		linestyle = { width : 0, color : 0, alpha : 0};

	var k = this.game.make.graphics(0,0);
	k.lineStyle(linestyle.width,linestyle.color,linestyle.alpha);
	k.beginFill(fillStyle.color, fillStyle.alpha);
	k.drawCircle(0,0, data.radius);

	if(data.dirty===true){
		k.x = data.x;
		k.y = data.y;
		this.game.add.existing(k);
		return k;
	}

	var sprite = this.game.add.sprite(data.x,data.y,k.generateTexture());
	sprite.anchor.setTo(0.5,0.5);
	return sprite;
};

BasicSim.prototype.setUpClocks = function(){
	this.clock = new Date();
	var year = this.clock.getFullYear();

	this.yearBegins = new Date(year,0,1,0,0,0,0); 
	this.yearBegins = this.yearBegins.getTime();
	this.monthBegins = new Date(year,this.clock.getMonth(),1,0,0,0,0);
	this.monthBegins = this.monthBegins.getTime();
	this.dayBegins = new Date(year,this.clock.getMonth(),this.clock.getDate(),0,0,0,0);
	this.dayBegins = this.dayBegins.getTime();

	if(year%4===0){ //yep, put in full check for leap year... just in case this program is running in the year 2400
		if(year%100===0){
			if(year%400===0)
				this.totalHours = 8784;
				this.months[1] = 29;
		}
		else{
			this.totalHours = 8784;
			this.months[1] = 29;
		}
		
	}
	this.totalMinutes = this.months[this.clock.getMonth()] * 24 * 60;
	this.twoPi = Math.PI * 2; //don't want to do unnecessary calculation every second, though trivial
	this.piByTwo = Math.PI*0.5;

	this.totalSeconds = 24*60*60;

};

BasicSim.prototype.setUpScreen = function(){
	this.stage.backgroundColor = '2e3436';
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
};
