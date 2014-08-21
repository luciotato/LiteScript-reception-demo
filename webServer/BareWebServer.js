// -----------
// Module Init
// -----------
//Barebones minimal node web server

//Dependencies
//------------

    //import path, fs, url, http
    var path = require('path');
    var fs = require('fs');
    var url = require('url');
    var http = require('http');

//Module Vars
//-----------

    //public var contentTypesByExtension =
        //'.html': "text/html; charset=utf-8"
        //'.css':  "text/css; charset=utf-8"
        //'.js':   "application/javascript; charset=utf-8"
        //'.jpg':   "binary/image"
        //'.png':   "binary/image"
        //'.gif':   "binary/image"
        //'.ico':   "binary/image"

    //var
    var contentTypesByExtension = {
        '.html': "text/html; charset=utf-8"
        , '.css': "text/css; charset=utf-8"
        , '.js': "application/javascript; charset=utf-8"
        , '.jpg': "binary/image"
        , '.png': "binary/image"
        , '.gif': "binary/image"
        , '.ico': "binary/image"
        };
    // export
    module.exports.contentTypesByExtension = contentTypesByExtension;

    //var
        //wwwRoot:string
        //appHandler:function
        //server:http.Server

    //    public function start( staticDir:string, aAppHandler:function, port)
    var 
        wwwRoot = undefined
        , appHandler = undefined
        , server = undefined
    ;

    //    public function start( staticDir:string, aAppHandler:function, port)
    // ---------------------------
    function start(staticDir, aAppHandler, port){

//Start a web server

        //wwwRoot = path.resolve(process.cwd(), staticDir);
        wwwRoot = path.resolve(process.cwd(), staticDir);

        //default port = 80
        if(port===undefined) port=80;

        //appHandler = aAppHandler; //main routes function
        appHandler = aAppHandler;

        //server = http.createServer(MinimalHandler)
        server = http.createServer(MinimalHandler);

        //server.listen port
        server.listen(port);

        //print "nodejs version: " + process.version + "\nBare Web Server listening on port " + port + "\nwwwRoot: " + wwwRoot
        console.log("nodejs version: " + process.version + "\nBare Web Server listening on port " + port + "\nwwwRoot: " + wwwRoot);

        //return server
        return server;
    }
    // export
    module.exports.start = start;


    //    helper function MinimalHandler (request, response)
    // ---------------------------
    function MinimalHandler(request, response){
     try{
//This is a minimal handler for http.createServer

        //print "#{request.method} #{request.url}"
        console.log('' + request.method + " " + request.url);

//parse request url. [url.parse] (http://nodejs.org/docs/latest/api/url.html)

        //var urlParts = url.parse(request.url,true)
        var urlParts = url.parse(request.url, true);

//We first give the app a chance to process the request (dynamic).

        //if appHandler and appHandler(urlParts, request, response) // if true-> handled
        if (appHandler && appHandler(urlParts, request, response)) {
        

            //return #done, handled by app
            return;
        }
        //if appHandler and appHandler(urlParts, request, response) // if true-> handled
        
        else {

            //if findPath(urlParts.pathname) into var found
            var found=undefined;
            if ((found=findPath(urlParts.pathname))) {
            

                //response.respondWithFile found
                response.respondWithFile(found);
            }
            //if findPath(urlParts.pathname) into var found
            
            else {
                //response.error 404,"#{urlParts.pathname} NOT FOUND."
                response.error(404, '' + urlParts.pathname + " NOT FOUND.");
            };
        };

        //exception e
        
        }catch(e){
            //response.error 503, e.message
            response.error(503, e.message);
        };
    };


//## Bare Server Static resources Helper Functions

    //    helper function findPath(pathname) // return full path / undefined if not found
    // ---------------------------
    function findPath(pathname){

        //var result
        var result = undefined;

        //console.log("findPath %s",pathname);

        //if pathname is path.sep
        if (pathname === path.sep) {
        
            //result = wwwRoot
            result = wwwRoot;
        }
        //if pathname is path.sep
        
        else {
            //result = path.join(wwwRoot, pathname)
            result = path.join(wwwRoot, pathname);
        };

        // check if file exists
        // if it is dir, -> add '/index.html'
        //var fileExists = fs.existsSync(result)
        var fileExists = fs.existsSync(result);
        //if fileExists and fs.statSync(result).isDirectory()
        if (fileExists && fs.statSync(result).isDirectory()) {
        
            //result = path.join(result,'index.html')
            result = path.join(result, 'index.html');
            //fileExists = fs.existsSync(result)
            fileExists = fs.existsSync(result);
        };

        //return fileExists? result else undefined
        return fileExists ? result : undefined;
    };


//## Helper methods appended to http.ServerResponse

    //    append to class http.ServerResponse
    

     //     properties
            //headersWritten: boolean

     //     method writeHeadersFor(fileExt)
     
     //     properties
            //headersWritten: boolean

     //     method writeHeadersFor(fileExt)
     // ---------------------------
     http.ServerResponse.prototype.writeHeadersFor = function(fileExt){

        //if no .headersWritten
        if (!this.headersWritten) {
        
            //var headers = {}
            var headers = {};
            //var contentType = contentTypesByExtension[fileExt]
            var contentType = module.exports.contentTypesByExtension[fileExt];
            //if contentType, headers["Content-Type"] = contentType
            if (contentType) {headers["Content-Type"] = contentType};
            //this.writeHead 200, headers
            this.writeHead(200, headers);
            //this.headersWritten = true
            this.headersWritten = true;
        };
     };

     //     method writeFileContents(filename)
     // ---------------------------
     http.ServerResponse.prototype.writeFileContents = function(filename){

        //var fullpath
        var fullpath = undefined;

        //if filename and filename[0] is path.sep
        if (filename && filename[0] === path.sep) {
        
            //fullpath = filename //absolute path
            fullpath = filename;
        }
        //if filename and filename[0] is path.sep
        
        else {
            //if not findPath(filename) into fullpath
            if (!((fullpath=findPath(filename)))) {
            
                //fail with 'file not found: #{filename}'
                throw new Error('file not found: ' + filename);
            };
        };

        //.writeHeadersFor path.extname(fullpath) // add headers
        this.writeHeadersFor(path.extname(fullpath));

        //var file=fs.readFileSync(fullpath)
        var file = fs.readFileSync(fullpath);

        //.write file //send read file
        this.write(file);
     };



     //     method respondWithFile(file)
     // ---------------------------
     http.ServerResponse.prototype.respondWithFile = function(file){

        //.writeFileContents file
        this.writeFileContents(file);
        //.end
        this.end();
     };


     //     method error(statusCode,message)
     // ---------------------------
     http.ServerResponse.prototype.error = function(statusCode, message){

        //.writeHead statusCode,{'Content-Type': 'text/plain'}
        this.writeHead(statusCode, {'Content-Type': 'text/plain'});
        //.write 'ERROR: #{message}'
        this.write('ERROR: ' + message);
        //.end
        this.end();
     };
// -----------
// Module code
// -----------
// end of module
