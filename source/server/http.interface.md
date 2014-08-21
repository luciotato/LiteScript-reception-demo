
    var parsers = 
                name:string
                max:number
                list:array

    var STATUS_CODES:Array
            
    var globalAgent = 
                defaultPort:number
                protocol:string
                keepAliveMsecs:number
                keepAlive:boolean
                maxSockets:number
                maxFreeSockets:number
        
    public function request(options, cb) 
    public function get(options, cb) 
    public function createServer(requestListener) returns Server
    public function createClient returns Client
    
    public class Server
        constructor new Server(requestListener) 
        method listen(port)

    public class Client
        constructor new Client() 
    
    public class IncomingMessage
        constructor new IncomingMessage (socket) 
        
        method setTimeout(msecs, callback) 
        method read(n) 
        method destroy(error) 
    
    
    public class OutgoingMessage
        properties
            headersSent:boolean
        
        method setTimeout(msecs, callback) 
        method destroy(error) 
        method setHeader(name, value) 
        method getHeader(name) 
        method removeHeader(name) 
        method write(chunk, encoding, callback) 
        method addTrailers(headers) 
        method end(data, encoding, callback) 
    
    
    public class ServerResponse
        
        declare name affinity resp, response

        constructor new ServerResponse (req) 
        
        properties
            statusCode:number
        
        method assignSocket(socket) 
        method detachSocket(socket) 
        method writeContinue(cb) 
        method writeHead(statusCode,message) 
        method writeHeader
        method write(data)
        method end    
    
    public class Agent
        constructor new Agent (options) 
        
        method createConnection
        method getName(options) 
        method addRequest(req, options) 
        method createSocket(req, options) 
        method removeSocket(s, options) 
        method destroy
        method request(options, cb) 
        method get(options, cb) 
    
    append to namespace Agent
        properties
            defaultMaxSockets:number
    
    
    public class ClientRequest
        constructor new ClientRequest (options, cb) 
        
        method abort
        method onSocket(socket) 
        method setTimeout(msecs, callback) 
        method setNoDelay
        method setSocketKeepAlive
        method clearTimeout(cb) 


## Helper Classes declaring node's 'http' module strutures
    
    public helper class RequestInstance extends IncomingMessage

This are the added properties to [http.IncomingMessage] (http://nodejs.org/api/http.html#http_message_url)
for request obtained from http.Server.
        
        declare name affinity request

        properties
            method: string
            url: string
            statusCode


