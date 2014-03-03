//Compiled by LiteScript compiler v0.6.1, source: /home/ltato/LiteScript-reception-demo/www/js/index.lite.md
//This is the client-side main app

//##Jquery declares

   //compiler import Document, jQuery, tabTab from 'jquery-tab-tab'

   //compiler import Abanico

//## on document ready

   $(document).ready(function (){

//initialize tab-tab plugin & Abanico.selector

       $('.tabtab').tabTab();
       Abanico.convertAll();

//Create dummy dates for the demo

        //#$("#arrivals tbody tr td:nth-child(3)").each function(inx,elem)
        //#    $(elem).html new Date().format("%d-%n")

       $.ajax({url: "/dataserver?q=select * from arrivals", success: function (data){
                      //set table elements
                     $("#arrivals tbody").html(data);
                      //on click, show popup
                     $("#arrivals tbody tr").noClickDelay().click(arrivalPopup);
         }, error: function (jqxhr, textStatus, errorThrown){
                     alert(jqxhr.responseText);
         }});

        //#$("#arrivals tbody tr td:nth-child(4)").each function(inx,elem)
        //#    $(elem).html new Date().addDays(7+Math.random()*21).format("%d-%n")

//remove touch-click delay (safari/webkit)

       $('button').noClickDelay();
       $('a').noClickDelay();
   });

   //helper function arrivalPopup()
   function arrivalPopup(){
//on click, show popup. this=TR

       $("#popup").find("#firstName").val($(this).children("td:nth-child(1)").text());
       $("#popup").find("#lastName").val($(this).children("td:nth-child(2)").text());
       $("#popup").find("#arrival").val($(this).children("td:nth-child(3)").text());
       $("#popup").find("#departure").val($(this).children("td:nth-child(4)").text());

       $("#reservation").removeClass("hidden");
       $("#obscure-background").removeClass("hidden");
       $("#popup").removeClass("hidden");
   };




   //helper function closePopup
   function closePopup(){
       $("#obscure-background").addClass("hidden");
       $("#popup").addClass("hidden");
       $("#reservation").addClass("hidden");
   };


//## Helper JQuery extension: noClickDelay

   //append to namespace jQuery.fn

    //method noClickDelay
    jQuery.fn.noClickDelay = function(){

//no click delay (safari/webkit browser)

        //declare this:jQuery

       var $wrapper = this;
       var $target = this;
       var moved = false;

       $wrapper.bind('touchstart mousedown', function (e){

           e.preventDefault();
           moved = false;
           $target = $(e.target);
           //if e.target.nodeType is 3
           if (e.target.nodeType === 3) {
               $target = $($target.parent());
           };

           $target.addClass('pressed');

           $wrapper.bind('touchmove mousemove', function (moveE){
               moved = true;
               $target.removeClass('pressed');
           });

           $wrapper.bind('touchend mouseup', function (upE){
               $wrapper.unbind('mousemove touchmove');
               $wrapper.unbind('mouseup touchend');

               //if not moved and $target.length
               if (!(moved) && $target.length) {
                   $target.removeClass('pressed');
                   $target.trigger('click');
                   $target.focus();
               };
           });
       });

       return this;
    };


//# sourceMappingURL=index.js.map