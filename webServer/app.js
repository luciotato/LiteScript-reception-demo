//Compiled by LiteScript compiler v0.6.1, source: /home/ltato/LiteScript-reception-demo/webServer/app.lite.md
//LiteScript Lang demo, server App

//This is the main app file.

//Module dependencies
//------------

   //global import path, fs, http, url
   var path = require('path');
   var fs = require('fs');
   var http = require('http');
   var url = require('url');

   //import BareWebServer
   var BareWebServer = require('./BareWebServer');

//Start Server
//------------
//We start a barebones minimal web server.
//When a request arrives, it will call appHandler(urlParts, request, response)

   BareWebServer.start('../www', appHandler, 8000);

//Main Request Handler
//--------------------

   //function appHandler(urlParts, request, response)
   function appHandler(urlParts, request, response){

//urlParts: the result of nodejs [url.parse] (http://nodejs.org/docs/latest/api/url.html)
//urlParts.query: the result of nodejs [querystring.parse] (http://nodejs.org/api/querystring.html)

       //if urlParts.pathname is '/'
       if (urlParts.pathname === '/') {

//GET / (root) web server returns:
    //web/layout/atop.html: has |header| with common |script| tags, a |div id=index_top| and a |div id=central|
    //web/xxx.html: (content for |div id=central|)
    //web/layout/bottom.html: has a |div id=index_bottom| and |div id=status| and |div id=err| for errors

           response.writeFileContents('header.html');
           response.writeFileContents('center.html');
           response.writeFileContents('footer.html');
           response.end();
           return true; //handled
       }


//GET /dataserver
//Gateway to database, We expect: GET /dataserver?q=select * from table
       
       else if (urlParts.pathname === '/dataserver') {

            //declare valid urlParts.query.q
           var query = urlParts.query.q;

           //if no query, fail with 'GET /dataserver?q=. q is is null.'
           if (!query) {
               throw new Error('GET /dataserver?q=. q is is null.')};

//Ideally, here we connect a Data Source and return JSON data.
//For the purpouse of the demo, here we return just HTML table contents

           var result = query.match(/^select \* from (\w+)/);

           //if no result, fail with 'GET /dataserver. This is a DEMO, expected select * from table'
           if (!result) {
               throw new Error('GET /dataserver. This is a DEMO, expected select * from table')};

           var today = new Date();

           //switch result[1] #table
           switch(result[1]){
           
           case 'arrivals':

                   var data = ["Magno,Alexander,2,0,MAGNUM,1010,Ocean View|Penthouse|New York Post", "Bergoglio,Jorge,1,0,PAPAL,1001,", "Gandhi,Mahatma,1,0,BASIC,1012,", "Pitt,Brad,2,5,VILLA,2015,Crib|Ocean View", "Trump,Donald,2,2,VILLA,3018,TV 42”|Washington Post", "Tato,Lucio,2,4,SUITE,4000,T1 Line|Hacker News"];

                   var resultHTML = "";

                   //for each item:string in data
                   for( var item__inx=0,item ; item__inx<data.length ; item__inx++){item=data[item__inx];

                       var arr = item.replace(/\|/g, "<br>").split(",");

                        //#for the demo, set actual dates for arrival and departure
                       arr.splice(2, 0, today.format("%d-%n"), today.addDays(7 + Math.random() * 30).format("%d-%n"));

                       resultHTML += '<tr><td> ' + (arr.join("</td><td>")) + ' </tr>\n';
                   };//end for each in data

                   response.end(resultHTML);
                   break;
                   
           case 'in-house': case 'inhouse':

                   response.end('<tr><td> DaVinci </td><td>Leonardo</td><td>20-sep</td><td>29-Sep</td><td>1</td><td>0</td><td>BASIC</td><td>1120</td><td>$2300</td><td>DUE OUT</td></tr>\n<tr><td> Iglesias</td><td>Sebastian  </td><td>27-Sep </td><td>01-Oct </td><td>1  </td><td>0  </td><td>VILLA  </td><td>1122   </td><td>$900   </td><td>CHECKED IN </td></tr>\n<tr><td> Wayne   </td><td>Bruce  </td><td>18-Sep </td><td>29-Sep </td><td>2  </td><td>0  </td><td>BASIC  </td><td>2213   </td><td>$5400  </td><td>DUE OUT</td></tr>\n<tr><td> Sawyer  </td><td>Tom    </td><td>30-Sep </td><td>10-Oct </td><td>1  </td><td>0  </td><td>VILLA  </td><td>2018   </td><td>$600   </td><td>CHECKED IN</td></tr>');
                   break;
                   
           default:

                   response.error(500, 'invalid query "' + (JSON.stringify(result)) + '"'); //answer with  error
           
           };// #table

           return true; //handled
       };
   };


//## Helpers on class Date: addDays & formatting

   //append to namespace Date

        //properties
            //monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
            //dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
           Date.monthNames=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
           Date.dayNames=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
       

   //append to class Date

     //method addDays(days) returns Date
     Date.prototype.addDays = function(days){
       var newDate = new Date(this);
       newDate.setDate(this.getDate() + days);
       return newDate;
     };

     //method format(formatString:string)
     Date.prototype.format = function(formatString){

       var self = this;

       //helper function zeroPad(number)
       function zeroPad(number){
           return ("0" + number).substr(-2, 2);
       };

       //helper function replaceDateItem(m, key)
       function replaceDateItem(m, key){
           return (function(_caseVar1){
               if(_caseVar1===('d')) return zeroPad(self.getDate());
               if(_caseVar1===('m')) return zeroPad(self.getMonth() + 1);
               if(_caseVar1===('n')) return Date.monthNames[self.getMonth()];
               if(_caseVar1===('w')) return Date.dayNames[self.getDay()];
               if(_caseVar1===('y')) return self.getFullYear();
               if(_caseVar1===('H')) return zeroPad(self.getHours());
               if(_caseVar1===('M')) return zeroPad(self.getMinutes());
               if(_caseVar1===('S')) return zeroPad(self.getSeconds());
               return self.toISOString();
                   }(key));
       };

//for each /%./ on the format string, execute a function to replace it

       return formatString.replace(/%(.)/g, replaceDateItem);
     };



//# sourceMappingURL=app.js.map