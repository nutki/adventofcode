#!perl -ln
sub A{map/X/?A(s//0/r,s//1/r):oct,@_}END{$t+=$_*$|--for%u;print"$r $t"}
/\d+\W+/?${$r+=-$s{$&}+($s{$&}=$'&$A[-1]|$A[0]);$u{$&&~($A[0]^$A[-1])|$_}=$'
for@A}:(@A=A s/.* /0b/r)