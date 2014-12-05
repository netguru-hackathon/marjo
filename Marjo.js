/*
The iio Engine is licensed under the BSD 2-clause Open Source license
Copyright (c) 2013, Sebastian Bierman-Lytle
All rights reserved.
*/
Player = {
  currentSpeed: 0,
  topSpeed: 5,
  view: null,
  vel: [0, 0],
  init: function(io){
    this.view = new iio.Rect(100, 600, 50, 50);
    this.view.setFillStyle('blue');
    this.view.enableKinematics();
    io.addObj(this.view);
  },
  moveLeft: function() {
    this.setCurrentSpeed(this.decelerate(this.topSpeed, this.currentSpeed));
  },
  moveRight: function() {
    this.setCurrentSpeed(this.accelerate(this.topSpeed, this.currentSpeed));
  },
  stopMoving: function() {
    this.setCurrentSpeed(this.decelerate(0, this.currentSpeed));
    if(this.getCurrentSpeed() < 0.2) {
      this.setCurrentSpeed(0);
    }
  },
  accelerate: function(targetSpeed, currentSpeed) {
    if (currentSpeed >= targetSpeed) {
      return currentSpeed;
    }
    return currentSpeed + 0.2;
  },
  decelerate: function(targetSpeed, currentSpeed) {
    if (currentSpeed <= -targetSpeed) {
      return currentSpeed;
    }
    return currentSpeed - 0.2;
  },
  update: function() {
    return this.view.setVel(this.vel[0], this.vel[1]);
  },
  setCurrentSpeed: function(val) {
    this.vel = [val, 0];
    return this.currentSpeed = val;
  },
  getCurrentSpeed: function() {
    return this.currentSpeed;
  }
};

function Marjo(io){
  var groundY = io.canvas.height - 5;
  var LEFT = 0;
  var RIGHT = 1;
  var UP = 2;
  var DOWN = 3;
  var input = [];

  var player = Object.create(Player)
  player.init(io);

  window.addEventListener('keydown', function(event){
    updateInput(event, true);
  });
  window.addEventListener('keyup', function(event){
    updateInput(event, false);
  });

  updateInput = function(event, boolValue){
      if (iio.keyCodeIs('left arrow', event) || iio.keyCodeIs('a', event))
        input[LEFT] = boolValue;
      if (iio.keyCodeIs('right arrow', event) || iio.keyCodeIs('d', event))
        input[RIGHT] = boolValue;
      if (iio.keyCodeIs('up arrow', event) || iio.keyCodeIs('w', event)){
        input[UP] = boolValue;
        event.preventDefault();
      }
      if (iio.keyCodeIs('down arrow', event) || iio.keyCodeIs('s', event)){
        input[DOWN] = boolValue;
        event.preventDefault();
      }
  };

  function update() {
    if(input[LEFT]) {
      player.moveLeft();
    }
    else if (input[RIGHT]) {
      player.moveRight();
    }
    else {
      player.stopMoving();
    }
    player.update();
    console.log(player.view.vel);
  }



  io.setFramerate(60, update);
}
