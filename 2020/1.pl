#!perl -ln0
/\b\d++(?=.*\n\b(?{$&+$'-2020||print$'*$&})X)/s;
/\b\d++(?=.*\b(\d++)(?=.*\n\b(?{$&+$1+$'-2020||print$&*$1*$'})X))/s
