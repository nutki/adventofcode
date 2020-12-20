#!perl -ln
END{print"$x
$s"}map{1while s/\d+ [+*] \d+|\(\d+\)/$&/ee;$x+=$_}lc;
sub f{1while s/\d+ \+ \d+/$&/ee||s/\d+ \* \d+/$&/ee;$_}
1while s/\([^()]+\)/f$_=$&/ee;$s+=f
