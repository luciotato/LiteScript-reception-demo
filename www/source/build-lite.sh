#debug compiler
if [ "$3" = "--debug-brk" ]; then 
    w=$(whereis lite) lite=${w##*:}
    node $3 $lite -browser index -v 2 -o ../../www/js
    exit
fi

#compile browser-hosted app
lite -browser index -v 2 -o ../../www/js
