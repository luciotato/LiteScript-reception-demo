//Compiled by LiteScript compiler v0.6.1, source: /home/ltato/LiteScript-reception-demo/webServer/BareWebServer.lite.md
//LiteScript demo
//Barebones minimal node web server

//Dependencies
//------------

   //global import path, fs, url, http
   var path = require('path');
   var fs = require('fs');
   var url = require('url');
   var http = require('http');

   //compiler import nodeHttp

//Module Vars
//-----------

   var contentTypesByExtension = {
       '.html': "text/html; charset=utf-8", 
       '.css': "text/css; charset=utf-8", 
       '.js': "application/javascript; charset=utf-8", 
       '.jpg': "binary/image", 
       '.png': "binary/image", 
       '.gif': "binary/image", 
       '.ico': "binary/image"
       };
   //export
   module.exports.contentTypesByExtension = contentTypesByExtension;

   var 
   wwwRoot = undefined, 
   appHandler = undefined, 
   server = undefined
   ;

   //public function start( staticDir:string, aAppHandler:function, port)
   function start(staticDir, aAppHandler, port){

//Start a web server

       wwwRoot = path.resolve(process.cwd(), staticDir);

       //default port = 80
       if(port===undefined) port=80;

       appHandler = aAppHandler; //main routes function

       server = http.createServer(MinimalHandler);

       server.listen(port);

       console.log('nodejs version: ' + process.version + '\nBare Web Server listening on port ' + port + '\nwwwRoot: ' + wwwRoot);

       return server;
   };
   //export
   module.exports.start=start;


   //helper function MinimalHandler (request, response)
   function MinimalHandler(request, response){ try{
//This is a minimal handler for http.createServer

       console.log("" + request.method + " " + request.url);

//parse request url. [url.parse] (http://nodejs.org/docs/latest/api/url.html)

       var urlParts = url.parse(request.url, true);

//We first give the app a chance to process the request (dynamic).

       //if appHandler and appHandler(urlParts, request, response) // if true-> handled
       if (appHandler && appHandler(urlParts, request, response)) { // if true-> handled

           return;// #done, handled by app
       }

//else, If the request was not handled by the app, we check for static files
       
       else {

           //if findPath(urlParts.pathname) into var found
           var found=undefined;
           if ((found=findPath(urlParts.pathname))) {

               response.respondWithFile(found);
           }
           
           else {
               response.error(404, "" + urlParts.pathname + " NOT FOUND.");
           };
       };

       //exception e
       
       }catch(e){
           response.error(503, e.message);
       };
   };


//## Bare Server Static resources Helper Functions

   //helper function findPath(pathname) // return {exists:boolean, disk_uri:string}
   function findPath(pathname){ // return {exists:boolean, disk_uri:string}

       var result = undefined;

        //console.log("findPath %s",pathname);

       //if pathname is path.sep
       if (pathname === path.sep) {
           result = wwwRoot;
       }
       
       else {
           result = path.join(wwwRoot, pathname);
       };

        // check if file exists
        // if it is dir, -> add '/index.html'
       var fileExists = fs.existsSync(result);
       //if fileExists and fs.statSync(result).isDirectory()
       if (fileExists && fs.statSync(result).isDirectory()) {
           result = path.join(result, 'index.html');
           fileExists = fs.existsSync(result);
       };

       return fileExists ? result : undefined;
   };


//## Helper methods appended to http.ServerResponse

   //append to class http.ServerResponse

     //     properties
            //headersWritten: boolean

    //method writeHeadersFor(fileExt)
    http.ServerResponse.prototype.writeHeadersFor = function(fileExt){

       //if no .headersWritten
       if (!this.headersWritten) {
           var headers = {};
           var contentType = contentTypesByExtension[fileExt];
           //if contentType, headers["Content-Type"] = contentType
           if (contentType) {
               headers["Content-Type"] = contentType};
           this.writeHead(200, headers);
           this.headersWritten = true;
       };
    };

    //method writeFileContents(filename)
    http.ServerResponse.prototype.writeFileContents = function(filename){

       var result = undefined;

       //if filename and filename[0] is path.sep
       if (filename && filename[0] === path.sep) {
           result = filename; //absolute path
       }
       
       else {
           //if not findPath(filename) into result
           if (!((result=findPath(filename)))) {
               //fail with 'file not found: #{filename}'
               throw new Error('file not found: ' + filename);
           };
       };

       this.writeHeadersFor(path.extname(result)); // add headers

       var file = fs.readFileSync(result);

       this.write(file); //send read file
    };



    //method respondWithFile(file)
    http.ServerResponse.prototype.respondWithFile = function(file){

       this.writeFileContents(file, true);
       this.end();
    };


    //method error(statusCode,message)
    http.ServerResponse.prototype.error = function(statusCode, message){

       this.writeHead(statusCode, {'Content-Type': 'text/plain'});
       this.write('ERROR: ' + message);
       this.end();
    };




//# sourceMappingURL=BareWebServer.js.map