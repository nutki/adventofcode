#!perl -ln00a
for$l(a..z){
$y+=/$l/;
$z+=@F==s///g}
END{print"$y $z"}
