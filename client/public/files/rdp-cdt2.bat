
@echo off
rem раз
ping 195.34.238.76 -f -n 1 -l 412 > NUL
timeout 1 > NUL
rem два
ping 195.34.238.76 -f -n 1 -l 450 > NUL
timeout 1 > NUL
rem три
ping 195.34.238.76 -f -n 1 -l 121 > NUL
timeout 1 > NUL
rem 4
ping 195.34.238.76 -f -n 1 -l 751 > NUL
timeout 1 > NUL
rem 5
ping 195.34.238.76 -f -n 1 -l 260 > NUL
timeout 1 > NUL
mstsc.exe /v:195.34.238.76:466
pause