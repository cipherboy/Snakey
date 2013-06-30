<?php

/*
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
