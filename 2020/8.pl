#!perl -l
for$i(0..(@F=<>)){$a=$p=%s=();
$_=$F[$p],$a+=/cc/*$',$p+=($p-$i+1?/mp/:/op/)?$':1until$s{$p%@F}++;
$p-@F&&$i||print$a}

@F=<>;
for $i (0..@F) {
    $a = 0; # acc
    $p = 0; # program counter
    %s = (); # seen map
    until ($s{%p%@F}++) {
        $_ = $F[$p];
        $a += /cc/*$';
        $p += ($p==$i-1?/mp/:/op/)?$':1;
    }
    if ($p==@F || !$i) {print$a}
}
