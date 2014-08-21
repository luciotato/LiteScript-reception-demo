#server app

OUTDIR="../../webServer"

#use /devel/ compiler if it exists
DEVCOMP=~/LiteScript/devel/generated-js/v0.8/lite-to-js/js_lite.js

if [ -e "$DEVCOMP" ]; then 
    #use /devel/ compiler
    node $3 $DEVCOMP app -v 2 -o $OUTDIR
else
    #else use npm installed litescript compiler
    lite app -o $OUTDIR
fi

