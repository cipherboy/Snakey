var paused;
var direction;
var slength;
var speed;
var state;
var snake;
var canvas;
var ctx;
var height;
var width;
var ewidth;
var eheight;
var head;
var bonus;
var end;
var hasgone;
var hasinit;
var initlock = false;
var mainlock = false;
var hasbind = false;
var hasfirst = false;
var gzi = 0;

function init(level) {
    if (initlock == true) {
        return 0;
    }
    initlock = true;
    mainlock = false;
    bind();
    paused = true;
    direction = new Array();
    direction.push(4);
    slength = 3;
    speed = 400;
    canvas = document.getElementById('sncanvas');
    ctx = canvas.getContext("2d");
    state = new Array();
    snake = new Array();
    height = 480;
    width = 1040;
    ewidth = 20;
    eheight = 20;
    hasgone = true;
    end = false;
    hasinit = false;;
    $.get('getlevel.php?l=' + level, function(data) {
        var st = data.split('{[(|,|)]}');
        var sn = st[1].split(',');
        head = st[2];
        st = st[0].split(',');
        snake = new Array();
        for (var i = 0; i < sn.length; i++) {
            a = sn[i].split('x');
            b = a[1];
            a = a[0];
            snake.push([parseInt(a), parseInt(b)]);
        }
        state = new Array();
        for (var x = 0; x < 24; x++) {
            state.push(new Array());
            for (y = 0; y < 52; y++) {
                state[x].push(' ');
            }
        }
        
        var x = 0;
        var y = 0;
        for (var i = 0; i < st.length; i++) {
            state[x][y] = st[i];
            
            y += 1;
            if (y >= 52) {
                y = 0;
                x += 1;
            }
        }
        
        setTimeout('generateBonus()', 10);
    });
    changeCaption('Press any key to begin...');
}

function bind() {
    if (hasbind == true) {
        return 0;
    }
    hasbind = true;
    //Left: 37
    //Right: 39
    //Up: 38
    //Down: 40
    //Space: 32
    //P: 80
    //L: 76
    $(document).keydown(function(event) {
        if (event.which == 80) {
            if (paused) {
                resumeGame();
            } else {
                pauseGame();
            }
        } else {
            if (!paused) {
                if (end == false) {
                    if ((event.which >= 37) && (event.which <= 40)) {
                        changeDirection(event.which)
                    } else if (event.which == 76) {
                        selectLevels();
                    } else if (event.which == 32) {
                        direction = new Array();
                        direction.push(-1);
                        endGame();
                    } else {
                        changeDirection(event.which);
                    }
                } else {
                    if (event.which == 32) {
                        init();
                    }
                }
            } else if (hasfirst == false) {
                hasfirst = true;
                resumeGame();
            }
        }
    });
}

function generateBonus() {
    var x = 0;
    var y = 0;
    taken = true;
    
    while (taken) {
        x = Math.floor(Math.random()*24);
        y = Math.floor(Math.random()*52);
        
        taken = false;
        
        if (state[x][y] != ' ') {
            taken = true;
        }
        for (z = 0; z < snake.length; z++) {
            if ((snake[z][0] == x) && (snake[z][1] == y)) {
                taken = true;
            }
        }
    }
    bonus = new Array(x, y);
    hasinit = true;
}

function main() {
    if (mainlock == true) {
        return 0;
    }
    mainlock = true;
    if (hasinit == true) {
        if ((paused == false) && (end == false)) {
            moveSnake();
            canvasClear();
            cavnasDrawLevel();
            canvasDrawBonus();
            canvasDrawSnake();
            mainlock = false;
            setTimeout('main()', speed);
        }
    } else {
        setTimeout('main()', 100);
    }
}

function canvasClear() {
    var w = canvas.width;
    canvas.width = 0;
    canvas.width = w;
}

function cavnasDrawLevel() {
    var lframe = "b,fs:#e22,";
    for (var x = 0; x < 24; x++) {
        for (var y = 0; y < 52; y++) {
            if (state[x][y] === 'X') {
                var ssx = ewidth*y + 2;
                var ssy = eheight*x + 2;
                
                lframe += "r:" + ssx + ":" + ssy + ":" + (ewidth-4) + ":" + (eheight-4) + ",";
            }
        }
    }
    lframe += "c,f";
    jCanvasDraw(canvas, ctx, lframe);
}

function canvasDrawBonus() {
    var ssx = ewidth*bonus[1] + 2;
    var ssy = eheight*bonus[0] + 2;
    
    bframe = "b,fs:#282,r:" + ssx + ":" + ssy + ":" + (ewidth-4) + ":" + (eheight-4) + ",c,f";
    jCanvasDraw(canvas, ctx, bframe);
}

function canvasDrawSnake() {
    var sframe = "b,fs:#26e,";
    for (var i = 0; i < snake.length; i++) {
        var snx = parseInt(snake[i][0]);
        var sny = parseInt(snake[i][1]);
        var ssx = ewidth*snx + 2;
        var ssy = eheight*sny + 2;
        
        sframe += "r:" + ssx + ":" + ssy + ":" + (ewidth-4) + ":" + (eheight-4) + ",";
    }
    sframe += "c,f";
    jCanvasDraw(canvas, ctx, sframe);
}

function isInSnake(x, y) {
    for (i = 0; i < snake.length; i++) {
        if ((snake[i][0] == x) && (snake[i][1] == y)) {
            return true;
        }
    }
    return false;
}

function moveSnake() {
    var cx = snake[snake.length-1][0];
    var cy = snake[snake.length-1][1];


    if (direction[0] == 4) {
        // down
        if ((state[cy+1][cx] == ' ') && (isInSnake(cx, cy+1) == false)) {
            snake.push([cx, cy+1]);
        } else {
            direction = new Array();
            direction.push(-1);
            endGame();
        }
    } else if (direction[0] == 3) {
        // right
        if ((state[cy][cx+1] == ' ') && (isInSnake(cx+1, cy) == false)) {
            snake.push([cx+1, cy]);
        } else {
            direction = new Array();
            direction.push(-1);
            endGame();
        }
    } else if (direction[0] == 2) {
        // up
        if ((state[cy-1][cx] == ' ') && (isInSnake(cx, cy-1) == false)) {
            snake.push([cx, cy-1]);
        } else {
            direction = new Array();
            direction.push(-1);
            endGame();
        }
    } else if (direction[0] == 1) {
        // left
        if ((state[cy][cx-1] == ' ') && (isInSnake(cx-1, cy) == false)) {
            snake.push([cx-1, cy]);
        } else {
            direction = new Array();
            direction.push(-1);
            endGame();
        }
    } else if (direction[0] == -1) {
        alert(error);
    }
    
    if ((direction[0] >= 1) && (direction[0] <= 4)) {
        if ((snake[snake.length-1][1] == bonus[0]) && (snake[snake.length-1][0] == bonus[1])) {
            slength += 1;
            generateBonus();
            $('#sscore').html(10*(slength-3));
            if (((slength-3) % 2 == 0) && (speed > 100)) {
                speed -= 30;
            }
        } else {
            if ((slength+1) == snake.length) {
                snake.shift();
            }
        }
        if (direction.length > 1) {
            direction.shift();
        } else {
            hasgone = true;
        }
    }
}

function changeDirection(directionAsNumber) {
    if ((directionAsNumber >= 37) && (directionAsNumber <= 40)) {
        if ((directionAsNumber != (direction[direction.length-1]+38)) && (directionAsNumber != (direction[direction.length-1]+34)) && (directionAsNumber != (direction[direction.length-1]+36))) {
            if (hasgone == true) {
                direction = new Array();
                direction.push(directionAsNumber - 36);
                hasgone = false;
            } else {
	        direction.push(directionAsNumber - 36);
            }
        }
    }
}

function changeCaption(text) {
    if (text !== '') {
        $('#sdcaption').show(0);
        $('#sdcaption').html(text);
    } else {
        $('#sdcaption').hide(0);
    }
}

function pauseGame() {
    paused = true;
    changeCaption('Game paused. Press P to resume.');
}

function resumeGame() {
    if (paused == true) {
        paused = false;
        changeCaption('');
        mainlock = false;
        setTimeout('main()', 0);
    }
}

function endGame() {
    paused = true;
    end = true;
    var cx = snake[snake.length-1][0];
    var cy = snake[snake.length-1][1];
    changeCaption('Game over. Score: ' + 10*(slength-3));
    if (10*(slength-3) >= parseInt($('#hscore').html())) {
        $('#hscore').html(10*(slength-3));
    }
    hasinit = false;
    initlock = false;
    mainlock = false;
}
