This is the client-side main app

##global declare 
js modules included in the global space with <script> tags

    global declare DOM, jQuery, tabTab from 'jquery-tab-tab'

    global declare Abanico 

## on document ready

    $(document).ready function

initialize tab-tab plugin & Abanico.selector

        $('.tabtab').tabTab
        Abanico.convertAll

Get data from the server

        $.ajax({

          url:"/dataserver?q=select * from arrivals"

          success: -> data
                  //set table elements
                  $("#arrivals tbody").html data
                  //on click, show popup
                  $("#arrivals tbody tr").noClickDelay().click arrivalPopup

          error: -> jqxhr, textStatus, errorThrown
                  alert jqxhr.responseText
        })


remove touch-click delay (safari/webkit)

        $('button').noClickDelay
        $('a').noClickDelay

### helper function arrivalPopup()
on click, show popup. this=TR

        $("#popup").find("#firstName").val $(this).children("td:nth-child(1)").text()
        $("#popup").find("#lastName").val $(this).children("td:nth-child(2)").text()
        $("#popup").find("#arrival").val $(this).children("td:nth-child(3)").text()
        $("#popup").find("#departure").val $(this).children("td:nth-child(4)").text()

        $("#reservation").removeClass "hidden"
        $("#obscure-background").removeClass "hidden"
        $("#popup").removeClass "hidden"


### helper function close_popup
        $("#obscure-background").addClass "hidden"
        $("#popup").addClass "hidden"
        $("#reservation").addClass "hidden"


## Helper JQuery extension: noClickDelay

### Append to namespace jQuery.fn

#### method noClickDelay

no click delay (safari/webkit browser)

        declare this:jQuery

        var $wrapper = this
        var $target = this
        var moved = false

        $wrapper.bind 'touchstart mousedown', function(e:Event) 

            e.preventDefault
            moved = false
            $target = $(e.target)
            if e.target.nodeType is 3
                $target = $($target.parent())
            
            $target.addClass 'pressed'

            $wrapper.bind 'touchmove mousemove', function(moveE) 
                moved = true
                $target.removeClass('pressed')
            
            $wrapper.bind 'touchend mouseup', function(upE) 
                $wrapper.unbind 'mousemove touchmove'
                $wrapper.unbind 'mouseup touchend'

                if not moved and $target.length
                    $target.removeClass 'pressed'
                    $target.trigger 'click'
                    $target.focus

        return this
