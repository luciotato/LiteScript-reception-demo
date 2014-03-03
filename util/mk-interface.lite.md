## LiteScript utility to create .interface.md files from .js files

    global import fs

    var jsCode, outFilename

Abanico

    jsCode = fs.readFileSync('../src/www/js/abanico.js')

    eval jsCode.toString()

    declare global Abanico

    var lines = []

    lines.push "//auto-generated"
    lines.push "public var Abanico"
    lines.push "append to namespace Abanico"

    for each own property name,value in Abanico

        if typeof value is 'function'
            var code = value.toString()
            var params = /^function.+(\(.+\))/.exec(code)
            lines.push "    method #{name}#{params? params[1] else ''}"
        else
            lines.push "    properties #{name}:#{value.constructor.name}"

    lines.push "module.exports = Abanico"

    outFilename = '../src/www/js/abanico.cache-interface.md'
    var indented = "    "+lines.join('\n    ')
    fs.writeFileSync(outFilename, indented)
    print "generated #{outFilename}"


/*
JQuery

    jsCode = fs.readFileSync('../src/www/js/local_copy/jquery.js')

    declare global window
    window = global

    eval jsCode.toString()

    declare global $,jQuery

    lines = []

    lines.push "//auto-generated"
    lines.push "public class JQuery"

    for each own property name,value in jQuery

        if typeof value is 'function'
            var code = value.toString()
            var params = /^function.+(\(.+\))/.exec(code)
            lines.push "    method #{name}#{params? params[1] else ''}"
        else
            lines.push "    properties #{name}:#{value.constructor.name}"

    lines.push "declare global $:jQuery"
    lines.push "module.exports = jQuery"

    outFilename = '../src/www/js/abanico.cache-interface.md'
    indented = "    "+lines.join('\n    ')
    fs.writeFileSync(outFilename, indented)
    print "generated #{outFilename}"
*/
