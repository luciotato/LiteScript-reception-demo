LiteScript Language Demo
-------------------------

###(C) 2014 Lucio M. Tato

For more info check:

[LiteScript] (http://github.com/luciotato/LiteScript)

You must clone this repository and run the server locally:

    git clone https://github.com/luciotato/LiteScript-reception-demo.git LiteScript-reception-demo
    cd LiteScript-reception-demo/webServer
    node app

The [Bare WebServer](webServer/BareWebServer.lite.md) 
and the [browser app](www/js/index.lite.md) are written in LiteScript.

To alter and recompile: 

    sudo npm install -g litescript
 
 Browser App:

    cd www/source
    . build-lite.sh


 Bare WebServer:

    cd webServer/source
    . build-lite.sh

 Launch server

    cd webServer
    node app

Then navigate to localhost:8000

