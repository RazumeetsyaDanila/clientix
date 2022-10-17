
@echo off
rem раз
ping 178.234.45.54 -f -n 1 -l 402 > NUL
timeout 1 > NUL
rem два
ping 178.234.45.54 -f -n 1 -l 440 > NUL
rem подождем еще секунду
timeout 1 > NUL
rem три
ping 178.234.45.54 -f -n 1 -l 111 > NUL
timeout 1 > NUL
rem 4
ping 178.234.45.54 -f -n 1 -l 741 > NUL
timeout 1 > NUL
rem 5
ping 178.234.45.54 -f -n 1 -l 870 > NUL
timeout 1 > NUL
mstsc.exe /v:178.234.45.54:466
pause