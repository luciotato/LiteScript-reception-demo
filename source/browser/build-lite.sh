#browser-hosted app

OUTDIR="../../www/js"

#use /devel/ compiler if it exists
DEVCOMP=~/LiteScript/devel/generated-js/v0.8/lite-to-js/js_lite.js

if [ -e "$DEVCOMP" ]; then 
    #use /devel/ compiler
    node $3 $DEVCOMP -browser index -v 2 -o $OUTDIR
else
    #else use npm installed litescript compiler
    lite -browser index -v 2 -o $OUTDIR
fi



#lite -v 0 -compile jquery-tab-tab.lite.md -o ../../../product/www/js $*
