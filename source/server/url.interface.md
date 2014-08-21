#url.interface.md

    public function parse(urlString, parseQueryString, slashesDenoteHost) 
    public function resolve(source, relative) 
    public function resolveObject(source, relative) 
    public function format(obj) 

    public helper class Parts

This is what node's url.parse() returns. see: http://nodejs.org/docs/latest/api/url.html returns 

            properties

                href #The full URL that was originally parsed. Both the protocol and host are lowercased.
                #Example: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'
            
                protocol #: The request protocol, lowercased.
                #Example: 'http:'

                host #: The full lowercased host portion of the URL, including port information.
                #Example: 'host.com:8080'

                auth #: The authentication information portion of a URL.
                #Example: 'user:pass'

                hostname #: Just the lowercased hostname portion of the host.
                #Example: 'host.com'

                port #: The port number portion of the host.
                #Example: '8080'

                pathname #: The path section of the URL, that comes after the host and before the query, including the initial slash if present.
                #Example: '/p/a/t/h'

                search #: The 'query string' portion of the URL, including the leading question mark.
                #Example: '?query=string'

                path #: Concatenation of pathname and search.
                #Example: '/p/a/t/h?query=string'

                query #: Either the 'params' portion of the query string, or a querystring-parsed object.
                #Example: 'query=string' or {'query':'string'}

                hash #: The 'fragment' portion of the URL including the pound-sign.
                #Example: '#hash'            


