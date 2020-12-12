#!perl -lp0
sub x{my$t=/^@_ (.*)/m;for$c($1=~/\d+ \w+ \w+/g){$c=~$";$t+=$c*x($')}$t};
$\.=x($x="shiny gold")-1;$a++while s/^(\w+ \w+) .*?($x)/$x.="|$1"/em;$_=$a
