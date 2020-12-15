#!perl -lp
s/\d+,//?$p[$&]=$i:($_=($i-$p[$_])%($p[$_]=$i))while++$i-2020?$i<3e7:print
