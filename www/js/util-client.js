window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert("Error occured: " + errorMsg + ' '+ url + ' line:'+lineNumber);//or any message
    return false;
}

function goBack(){
    history.back();
}

/**
 * retorna la propName que corresponde a un valor en un obj
 * por ej: decode({pepe:1,jose:2},2) => "jose"
 * @param {object} typeEnum
 * @param {int} type
 * @returns {string}
 */
function decode(typeEnum, type){
    for (var prop in  typeEnum){
        if (typeEnum[prop]===type) return prop;
    }
}

//----------------------------------
// utility String protoype functions
//----------------------------------
String.prototype.startsWith =
	 function(s){ return ( this.trim().toLowerCase().substr(0,s.length)===s.toLowerCase() ); }; // ^ -> start of string
String.prototype.endsWith =
	 function(s){ return ( this.trim().toLowerCase().substr(-s.length)===s.toLowerCase() ); }; // $ -> end of string

String.prototype.replaceAll = function (find, replace) {
    return this.replace(new RegExp(find, 'g'), replace);
};

function repeatString(s,num) {
    return new Array( num + 1 ).join( s );
};

if (!String.prototype.trim)
    String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

//String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
//String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};

String.prototype.lpadZero=function(width) {
    return ('0000000000'+this).substr(-width);
}

// NUMBERS
// Round
function Round(value, places) {
    var multiplier = Math.pow(10, places);
    var num=(Math.round(value * multiplier) / multiplier);
    return num.toFixed(places);
}

function formatCur(n) {

    return "$" + Math.floor(n).toLocaleString()
    // centavos:
    + (n % 1).toFixed(2).toLocaleString().replace(/^0/,'')
}

// PARSING
String.prototype.splitWords= function(){
	var result=this.split(/\s+/);
	while (result.length && result[result.length-1]==="") result.pop(); //elimino "" al final
	return result;
};

String.prototype.throwIfNot = function(arr){
	if (arr.indexOf(this.toLowerCase())<0) throw new Error("'" +this + "' no se reconoce. Se esperaba: " + arr.join(", ") );
};


function require(module){ // DUMMY para que ande en node y el browser
    return this;
}

// Navigate
function show(url)
{
    location.href=url;
}

function showErr(e) {
    $("#status").html('Error: '+e);
    $("#status").lightbox_me({centered: true, onLoad: function() {}} ) ;
}


function parseLocationSearch()  {

    var queryString = location.search;

    if (queryString.slice(0,1)=="?") queryString=queryString.slice(1);

    // Split into key/value pairs
    var queries = queryString.split("&");

    // Convert the array of strings into an object
    var params = {};
    for ( var i = 0, l = queries.length; i < l; i++ ) {
        var temp = queries[i].split('=');
        if(temp[0]) params[temp[0]] = temp[1];
    }

    return params;
};

// por si no esta, Date.toISOString para armar Id's de CouchDB / timestamps
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString
    = function() {
        function pad(n) { return n < 10 ? '0' + n : n }
        return this.getUTCFullYear() + '-'
            + pad(this.getUTCMonth() + 1) + '-'
            + pad(this.getUTCDate()) + 'T'
            + pad(this.getUTCHours()) + ':'
            + pad(this.getUTCMinutes()) + ':'
            + pad(this.getUTCSeconds()
            +'.'+this.getUTCMilliseconds()) + 'Z';
                };
}

/*var date = new Date();
document.write(date.toISOString()); //"2011-12-19T15:28:46.493Z"
document.write('<br>');
document.write(date.toISOString2()); //"2011-12-19T15:28:46.493Z"
document.write('<br>');
document.write(date.getUTCSeconds());
document.write('.'+date.getUTCMilliseconds());
*/

