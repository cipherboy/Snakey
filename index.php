<!DOCTYPE html>
<html>
    <head>
        <title>Old Snakey v2</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script type="text/javascript" src="jCanvas.js"></script>
        <script type="text/javascript" src="code.js"></script>
    </head>
    <body>
        <div id="snakepage">
            <p id="title">Old Snakey v2!</p>
            <div id="snakey">
                <canvas id="sncanvas" width="1040" height="480">Your browser cannot play Old Snakey v2.</canvas>
                <div id="sdcaption">Please wait...</div>
            </div>
            <div id="sdscores">
                <p id="hpscore">High score: <span id="hscore">0</span></p>
                <h2 id="shscore">Score: <span id="sscore">0</span></h2>
            </div>
        </div>
        <script type="text/javascript">
            init('one');
            
        </script>
    </body>
</html>
