<?php

/**
 * Snakey - A HTML5 Snakey game.
 * Depends: jQuery >= v1.5
 * Depends: jCavnas v2.0
 * 
 * Copyright (C) 2012, 2013 Alex Scheel
 * All rights reserved.
 * Licensed under BSD 2 Clause License:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice, 
 *   this list of conditions and the following disclaimer in the documentation 
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
**/

/*
Level one:
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XX                                                XX
XX                                                XX
XX                                                XX
XX    XX                                     XX   XX
XX    XXXX                                 XXXX   XX
XX      XXXX                             XXXX     XX
XX        XXXX                         XXXX       XX
XX          XXXX                     XXXX         XX
XX            XXXX                 XXXX           XX
XX              XXXX      $      XXXX             XX
XX                XXXX    $    XXXX               XX
XX                  XXXX  $  XXXX                 XX
XX                    XX     XX                   XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XX                                                XX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
51x24

27x13
27x12
27x11
*/

    $tstate = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                XXXX                                                XXXX                                                XXXX    XX                                     XX   XXXX    XXXX                                 XXXX   XXXX      XXXX                             XXXX     XXXX        XXXX                         XXXX       XXXX          XXXX                     XXXX         XXXX            XXXX                 XXXX           XXXX              XXXX             XXXX             XXXX                XXXX         XXXX               XXXX                  XXXX     XXXX                 XXXX                    XX     XX                   XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXX                                                XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
    $state = "";
    $astate = str_split($tstate);
    
    $i = 1;
    foreach ($astate as $element) {
        $state .= $element . ',';
    }
    
    $state = substr($state, 0, -1);
    
    $snake = "26x11,26x12,26x13";
    
    print "$state{[(|,|)]}$snake{[(|,|)]}2";
?>
