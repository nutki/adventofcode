#!perl -ln0
$_.=$_^$_;@x=map{$_,-$_}-/\n(.)(.)/,@-;do{$p=$_;@F=/./gs;
s!\w!$c=grep{$j="@-";1while$F[$j+=$_]eq'.'&$i;$F[$j]>0}@x;$c>3+$i?L:$c?$&:2!ge
}until/$p/;print y/2/L/;$i++||redo
