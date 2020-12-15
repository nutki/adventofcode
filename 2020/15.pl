#!perl -lp
s/\d+,/$p[$&]=++$i;0/ge;$_=($i-$p[$_])%($p[$_]=$i)while++$i-2020?$i<3e7:print
