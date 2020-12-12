#!perl -ln0
#s!.!$&x$'!ge;s/L/RRR/g;s/R{89}//g;$e=10;$n=1;
#${($e,$s,$w,$n)=($n,$e,$s,$w)if/R/;/F/?(E,S,W,N,$x+=$e-$w,$y+=$s-$n)[$R%4]:$_}++,
#${+lc}++for/\D/g;print abs($W-$E)+abs$S-$N,$",abs($x)+abs$y
s!.!$&x$'!ge;s/L/RRR/g;s/R{89}//g;sub l{($E,$N,$e,$n)=@_;
${($N,$E)=(-$E,$N)if/R/;$n+=$N,$e+=$E if/F/;$.=1-2*y/WS/EN/;$i?uc:lc}+=$.for
/\D/g;$i=print abs($n)+abs$e}l 10,l 1