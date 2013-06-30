<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Snakey</title>
        <!--
            Snakey - A HTML5 Snakey game.  

            Copyright (C) 2012, 2013 Alex Scheel
            All rights reserved.
            Licensed under BSD 2 Clause License:

            Redistribution and use in source and binary forms, with or without
            modification, are permitted provided that the following conditions are met:

            - Redistributions of source code must retain the above copyright notice,
              this list of conditions and the following disclaimer.
            - Redistributions in binary form must reproduce the above copyright notice, 
              this list of conditions and the following disclaimer in the documentation 
              and/or other materials provided with the distribution.

            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
            AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
            ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
            LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
            CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
            SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
            INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
            CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
            ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGE.
        -->
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script type="text/javascript" src="jCanvas.js"></script>
        <script type="text/javascript" src="code.js"></script>
    </head>
    <body>
        <div id="snakepage">
            <p id="title">Old Snakey v2!</p>
            <div id="snakey">
                <canvas id="sncanvas" width="1040" height="480">Your browser cannot play Snakey because it is too old.</canvas>
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
