#!perl -lp0
s/(\d+),(\d+)(?= -> (\d+),(\d+))/
for$x($1..$3,$3..$1){$:[$2]=$:[$4]=$m{$x,$_}=1for$2..$4,$4..$2}/ge;
sub p{my($x,$y)=@_;$y<@:&&($m{$_,$y+1}||p($_,$y+1))
for$x,$x-1,$x+1;$y-@:or$d||=$c;$m{$x,$y}=++$c.$".$d}$_=p 500