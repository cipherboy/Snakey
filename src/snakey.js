function Snakey() {
  this.status = 0;
  this.scores = [];
  this.food = [];

  this.size = 0;
  this.snake = [];
  this.osnake = [];
  this.direction = [1];

  this.celement;
  this.canvas = undefined;
  this.ctx = undefined;

  this.map = [];

  this.telement;

  this.ewidth = 36;
  this.eheight = 36;
  this.keystates = [];

  this.timing = [0, 0, 0];
  this.frames = 0;
  this.last_timing = 0;

  this.thread = undefined;

  this.init = function(canvas, text) {
    this.status = 1;

    this.celement = canvas;
    this.canvas = document.getElementById(this.celement);
    this.ctx = this.canvas.getContext('2d');

    this.telement = text;

    if (localStorage.getItem('scores')) {
      this.scores = $.parseJSON(localStorage.getItem('scores'));
    } else {
      this.scores = [];
      localStorage.setItem('scores', JSON.stringify(this.scores));
    }

    this.scores.sort();

    $('#' + this.telement).show();
    $('#' + this.telement).html('Initializing...');

    this.snake = this.osnake;

    this.size = this.snake.length;
    this.state = [];
    this.direction = [1];
    this.keystates = [];
    this.food = this.empty();
    this.timing = [0, 0, 0];
    this.frames = 0;
    this.last_timing = 0;

    this.score = 0;

    if (this.thread) {
      clearTimeout(this.thread);
      this.timeout = undefined;
    }
  };

  this.start = function() {
    this.status = 2;

    this.bind();
    this.draw();

    $('#' + this.telement).show();
    $('#' + this.telement).html('Press any key to begin.');
  };

  this.main = function(instance) {
    if (instance.status != 3) {
      return
    }

    var s1 = new Date().getTime();
    instance.key();
    instance.move();
    instance.collision();
    instance.draw();
    var s5 = new Date().getTime();

    instance.frames += 1;

    var expected = Math.ceil(750 / Math.log(instance.score+4));

    instance.timing[0] += (s5-s1);
    instance.timing[1] += expected;
    if (instance.last_timing !== 0 && (s5 - instance.last_timing) < expected*3) {
      instance.timing[2] += (s5 - instance.last_timing);
    } else {
      instance.timing[2] += expected;
    }
    instance.last_timing = s5;

    if (instance.status == 3) {
      instance.timeout = setTimeout(instance.main, expected - (instance.timing[0]/instance.frames) - ((instance.timing[2] - instance.timing[1])/instance.frames), instance);
    }
  };

  this.key = function() {
    for (var kid in this.keystates) {
      var current = this.keystates[kid];

      if (this.direction.length == 1 && this.direction[0] >= 4 && this.direction[0]%4 != (current+2)%4) {
        this.direction = [current];
      }

      if (this.direction[this.direction.length-1] != (current) && this.direction[this.direction.length-1]%4 != (current+2)%4) {
        this.direction.push(current);
      }
    }

    this.keystates = [];
  };

  this.move = function() {
    if (this.status !== 3) {
      return
    }

    var direction = this.direction.shift() % 4;
    var segment = 0;

    if (direction === 0) {
      snakec = [[parseInt(this.snake[segment][0]) - 1, parseInt(this.snake[segment][1])]];
    } else if (direction === 1) {
      snakec = [[parseInt(this.snake[segment][0]), parseInt(this.snake[segment][1]) - 1]];
    } else if (direction === 2) {
      snakec = [[parseInt(this.snake[segment][0]) + 1, parseInt(this.snake[segment][1])]];
    } else if (direction === 3) {
      snakec = [[parseInt(this.snake[segment][0]), parseInt(this.snake[segment][1]) + 1]];
    } else {
      alert (direction);
    }

    for (var segment in this.snake) {
      if (this.snake[segment]) {
        snakec.push(this.snake[segment]);
      }
    }

    if (this.direction.length === 0) {
      this.direction.push(direction + 4);
    }

    food = false;
    for (var s in snakec) {
      if (parseInt(snakec[s][0]) === parseInt(this.food[0]) && parseInt(snakec[s][1]) === parseInt(this.food[1])) {
        food = true;
        break;
      }
    }

    if (snakec.length > this.size && food === false) {
      snakec = snakec.slice(0, snakec.length-1);
    }

    this.snake = snakec;
  };

  this.draw = function() {
    var frame = "cs,b,fs:#26e,";
    for (var s in this.snake) {
      var c = parseInt(this.snake[s][0]);
      var r = parseInt(this.snake[s][1]);

      frame += 'm:' + (this.ewidth*c + 1) + ':' + (this.eheight*r + 1) + ',r:' + (this.ewidth*c + 1) + ':' + (this.eheight*r + 1) + ':' + (this.ewidth-2) + ':' + (this.eheight-2) + ',';
    }
    frame += "f,c";

    frame += "b,fs:#282,";
    frame += 'm:' + (this.ewidth*parseInt(this.food[0]) + 1) + ':' + (this.eheight*parseInt(this.food[1]) + 1) + ',r:' + (this.ewidth*parseInt(this.food[0]) + 1) + ':' + (this.eheight*parseInt(this.food[1]) + 1) + ':' + (this.ewidth-2) + ':' + (this.eheight-2) + ',';
    frame += "f,c";

    jCanvasDraw(this.canvas, this.ctx, frame);
  };

  this.collision = function() {
    for (var s in this.snake) {
      var segment = this.snake[s];
      c = parseInt(segment[0]);
      r = parseInt(segment[1]);
      if (this.map[r][c] !== ' ') {
        this.status = 5;
        this.end();
        return true;
      }

      for (var z in this.snake) {
        var osegment = this.snake[z];
        if (z !== s && osegment[0] == segment[0] && osegment[1] == segment[1]) {
          this.status = 5;
          this.end();
          return true;
        }
      }

      if (c === this.food[0] && r === this.food[1]) {
        this.size += 1;
        this.score += 1;
        this.food = this.empty();
      }
    }
  };

  this.empty = function() {
    var spaces = [];
    for (var r in this.map) {
      for (var c in this.map[r]) {
        if (this.map[r][c] === ' ') {
          var occupied = false;
          for (var s in this.snake) {
            if (this.snake[s] === [c, r]) {
              occupied = true;
            }
          }

          if (this.food === [c, r]) {
            occupied = true;
          }

          if (!occupied) {
            spaces.push([parseInt(c), parseInt(r)]);
          }
        }
      }
    }

    return spaces[Math.floor(Math.random() * spaces.length)];
  };

  this.pause = function() {
    this.unbind();
    this.status = 4;
    clearTimeout(this.timeout);
    this.timeout = undefined;
    this.draw();

    this.scores.sort();
    this.scores.reverse();
    $('#' + this.telement).show();
    $('#' + this.telement).html('Game paused. High score: ' + this.scores[0] + '. This score: ' + this.score + '. Press any key to resume.');
    $('#' + this.telement).show();
    this.bind();
  };

  this.end = function() {
    this.status = 5;
    this.draw();
    this.scores.push(this.score);
    this.scores.sort()
    this.scores.reverse();
    localStorage.setItem('scores', JSON.stringify(this.scores));

    var game = 'Game over. High score: ' + this.scores[0] + '. This score: ' + this.score + '. Press any key to restart, or q to select a different map.';
    $('#' + this.telement).html(game);
    $('#' + this.telement).show();
  };

  this.bind = function() {
    this.unbind();
    $(window).on('keydown', { instance: this }, function(event) {
      if (event.data.instance.status == 2 || event.data.instance.status == 4 && event.which != 80) {
        event.data.instance.status = 3;
        $('#' + event.data.instance.telement).hide();
        event.data.instance.main(event.data.instance);
      } else {
        if (event.which == 80) { // Pause
          event.data.instance.pause();
        } else if (event.data.instance.status == 5 && event.which == 32) {
          event.data.instance.status = 2;
          event.data.instance.init(event.data.instance.celement, event.data.instance.telement, event.data.instance.helement, event.data.instance.selement);
          event.data.instance.unbind();
          event.data.instance.start();
        } else if (event.which >= 37 && event.which <= 40) {
          console.log(event.data.instance.status);
          /**
           * 0 - 37 - Left
           * 1 - 38 - Up
           * 2 - 39 - Right
           * 3 - 40 - Down
           *
           * The movement scheme works as follows:
           *   - snake.direction is an infinite length queue allowing fine grained control (step by step planning)
           *   - If the direction queue is empty, the value of the direction plus four (one for each direction) is added back to the queue
           *   - That way, if the current queue is of length one and has an entry with value greater than 3, it's value is replaced.
           *   - Multiples of the same direction repeating are not counted back, but two direction repeats are (e.g., up, left, up, left is valid)
           *   - Reading direction is always taken mod four.
          **/
          event.data.instance.keystates.push(event.which - 37);
        } else {
        }
      }
    });

    $(document).on('click', { instance: this }, function(event) {
      if (event.data.instance.status == 2 || event.data.instance.status == 4) {
        event.data.instance.status = 3;
        $('#' + event.data.instance.telement).hide();
        event.data.instance.main(event.data.instance);
      } else if (event.data.instance.status == 3) {
        event.data.instance.status = 4;
        event.data.instance.pause();
      } else if (event.data.instance.status == 5) {
        event.data.instance.status = 2;
        event.data.instance.init(event.data.instance.celement, event.data.instance.telement, event.data.instance.helement, event.data.instance.selement);
        event.data.instance.unbind();
        event.data.instance.start();
      }

      event.preventDefault();
    });

    $(window).on('blur', { instance: this }, function(event) {
      event.data.instance.pause();
    });
  };

  this.unbind = function() {
    $(window).off('keydown');
    $(document).off('click');
    $(window).off('blur');
  };
}
