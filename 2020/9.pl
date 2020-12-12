#!perl -ln0
$d='(\b\d+\D)';
s|(?=($d{25})$d)|$x=$3;$t=$x if$1!~/$d+(??{$x-$&})\n/s|ge;
y/\n/+/;/$d+(??{$t-eval$&.0})\b/;@x=sort split'\+',$&;
print$t,"@x"+$x[-1]