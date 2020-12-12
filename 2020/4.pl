#!perl -lp0
$y+=/byr:/&/iyr:/&/eyr:/&/hgt:/&/hcl:/&/ecl:/&/pid:/&&++$x&&
/^\s*((byr:(19[2-9]\d|200[012])|iyr:20(1\d|20)|eyr:20(2\d|30)|hgt:((59|6\d|7[0-6])in|1([5-8]\d|9[0-3])cm)|hcl:#[a-f0-9]{6}|ecl:(amb|blu|brn|gry|grn|hzl|oth)|pid:\d{9}|cid:\S*)\b\s*)+$/s
for split/\n\n/;
$_="$x $y"
