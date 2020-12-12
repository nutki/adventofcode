#!perl -lp0
y/RBLF/1100/;
$_=join$\,map{oct"0b$_"}sort split;
s/.+\n/$\.=1+$&if$'-$&-1;""/eg
