
    public class jQuery 
        constructor ( selector, context ) 
        method init ( selector, context, rootjQuery ) 
        
        properties
            jquery:string #version number
            selector:string
            length:number

        method acceptData( elem ) 
        method access( elems, fn, key, value, chainable, emptyGet, raw ) 
        method add( selector, context ) 
        method addBack( selector ) 
        method addClass( value ) 
        method after() 
        method ajaxComplete( fn )
        method ajaxError( fn )
        method ajaxSend( fn )
        method ajaxStart( fn )
        method ajaxStop( fn )
        method ajaxSuccess( fn )
        method andSelf( selector ) 
        method animate( prop, speed, easing, callback ) 
        method Animation( elem, properties, options ) 
        method append() 
        method appendTo( selector ) 
        method attr( elem, name, value ) 
        method before() 
        method bind( types, data, fn ) 
        method blur( data, fn ) 
        method buildFragment( elems, context, scripts, selection ) 
        method camelCase( string ) 
        method change( data, fn ) 
        method children( until, selector ) 
        method cleanData( elems, /* internal */ acceptData ) 
        method clearQueue( type ) 
        method click( data, fn ) 
        method clone( elem, dataAndEvents, deepDataAndEvents ) 
        method closest( selectors, context ) 
        method contents( until, selector ) 
        method contextmenu( data, fn ) 
        method css( elem, name, extra, styles ) 
        method dblclick( data, fn ) 
        method delay( time, type ) 
        method delegate( selector, types, data, fn ) 
        method dequeue( type ) 
        method detach( selector ) 
        method dir( elem, dir, until ) 
        method domManip( args, table, callback ) 
        method empty() 
        method end() 
        method eq( i ) 
        method error( data, fn ) 
        method fadeIn( speed, easing, callback ) 
        method fadeOut( speed, easing, callback ) 
        method fadeTo( speed, to, easing, callback ) 
        method fadeToggle( speed, easing, callback ) 
        method filter( expr, elems, notParam ) 
        method find( selector, context, results, seed ) returns jQuery
        method finish( type ) 
        method first() 
        method focus( data, fn ) 
        method focusin( data, fn ) 
        method focusout( data, fn ) 
        method fx( elem, options, prop, end, easing, unit ) 
        method get( num ) 
        method globalEval( data ) 
        method grep( elems, callback, inv ) 
        method has( target ) 
        method hasClass( selector ) 
        method hasData( elem ) 
        method height( margin, value ) 
        method hide( speed, easing, callback ) 
        method holdReady( hold ) 
        method hover( fnOver, fnOut ) 
        method html( value ) 
        method inArray( elem, arr, i ) 
        method index( elem ) 
        method innerHeight( margin, value ) 
        method innerWidth( margin, value ) 
        method insertAfter( selector ) 
        method insertBefore( selector ) 
        method is( selector ) 
        method isArray() 
        method isEmptyObject( obj ) 
        method isFunction( obj ) 
        method isNumeric( obj ) 
        method isPlainObject( obj ) 
        method isWindow( obj ) 
        method isXMLDoc( elem ) 
        method keydown( data, fn ) 
        method keypress( data, fn ) 
        method keyup( data, fn ) 
        method last() 
        method load( url, params, callback ) 
        method makeArray( arr, results ) 
        method map( elems, callback, arg ) 
        method merge( first, second ) 
        method mousedown( data, fn ) 
        method mouseenter( data, fn ) 
        method mouseleave( data, fn ) 
        method mousemove( data, fn ) 
        method mouseout( data, fn ) 
        method mouseover( data, fn ) 
        method mouseup( data, fn ) 
        method next( until, selector ) 
        method nextAll( until, selector ) 
        method nextUntil( until, selector ) 
        method noConflict( deep ) 
        method nodeName( elem, name ) 
        method noop() 
        method not( selector ) 
        method now() 
        method off( types, selector, fn ) 
        method offset( options ) 
        method offsetParent() 
        method on( types, selector, data, fn, /*INTERNAL*/ one ) 
        method one( types, selector, data, fn ) 
        method outerHeight( margin, value ) 
        method outerWidth( margin, value ) 
        method parent( until, selector ) 
        method parents( until, selector ) 
        method parentsUntil( until, selector ) 
        method parseHTML( data, context, keepScripts ) 
        method parseJSON( data ) 
        method parseXML( data ) 
        method position() 
        method prepend() 
        method prependTo( selector ) 
        method prev( until, selector ) 
        method prevAll( until, selector ) 
        method prevUntil( until, selector ) 
        method promise( type, obj ) 
        method prop( elem, name, value ) 
        method proxy( fn, context ) 
        method push() 
        method pushStack( elems ) 
        method queue( elem, type, data ) 
        method ready( fn ) 
        method remove( selector, keepData ) 
        method removeAttr( elem, value ) 
        method removeClass( value ) 
        method removeData( elem, name ) 
        method removeEvent( elem, type, handle ) 
        method removeProp( name ) 
        method replaceAll( selector ) 
        method replaceWith( value ) 
        method resize( data, fn ) 
        method scroll( data, fn ) 
        method scrollLeft( val ) 
        method scrollTop( val ) 
        method select( data, fn ) 
        method serialize() 
        method serializeArray() 
        method show( speed, easing, callback ) 
        method sibling( n, elem ) 
        method siblings( until, selector ) 
        method size() 
        method slice() 
        method slideDown( speed, easing, callback ) 
        method slideToggle( speed, easing, callback ) 
        method slideUp( speed, easing, callback ) 
        method sort() 
        method speed( speed, easing, fn ) 
        method splice() 
        method stop( type, clearQueue, gotoEnd ) 
        method style( elem, name, value, extra ) 
        method submit( data, fn ) 
        method swap( elem, options, callback, args ) 
        method text( elem ) 
        method toArray() 
        method toggle( speed, easing, callback ) 
        method toggleClass( value, stateVal ) 
        method trigger( type, data ) 
        method triggerHandler( type, data ) 
        method trim( text ) 
        method Tween( elem, options, prop, end, easing ) 
        method type( obj ) 
        method unbind( types, fn ) 
        method undelegate( selector, types, fn ) 
        method unique( results ) 
        method unload( data, fn ) 
        method unwrap() 
        method val( value ) 
        method width( margin, value ) 
        method wrap( html ) 
        method wrapAll( html ) 
        method wrapInner( html ) 


    append to namespace jQuery

        properties 
            fn = jQuery.prototype //alias

        method ajax( url, options ) 
        method ajaxSetup( target, settings ) 
        method ajaxPrefilter( dataTypeExpression, func ) 
        method ajaxTransport( dataTypeExpression, func ) 

        method each( obj, callback, args ) 
        method data( elem, name, data ) 
        method contains( context, elem ) 
        method extend 
        method param( a, traditional ) 

        method Callbacks( options ) 
        method Deferred( func ) 

        method get() // Load data from the server using a HTTP GET request.
        method getJSON( url, data, callback ) 
        method getScript( url, callback ) 
        method post( url, data, callback, type ) 

        method when( subordinate /* , ..., subordinateN */ ) 

        class Event
            constructor new Event ( src, props ) 
            method isDefaultPrevented() 
            method isPropagationStopped() 
            method isImmediatePropagationStopped() 
            method preventDefault() 
            method stopPropagation() 
            method stopImmediatePropagation() 


    public class jqXHR

        declare name affinity jqxhr

        properties

            onload:function
            onerror:function
            ontimeout:function

            readyState:number

            response:object
            responseText:string
            responseType:string
            responseXML:string 

            status:number
            statusText:string

            timeout:number
            upload:object
            withCredentials:boolean

        method abort() 
        method getAllResponseHeaders() 
        method getResponseHeader() 
        method open() 
        method overrideMimeType() 
        method send() 
        method setRequestHeader() 
    

    public var $ = jQuery //alias

