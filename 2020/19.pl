#!perl -ln
use re 'eval';END{print$x}
$_.="+"x/^8:/."|42 11 31"x/^11:/;
y/"//d;$x+=/:/?$m[$_]=$'=~s!\d+!(??{\$m[$&]})!gr:/^$m[0]$/x
