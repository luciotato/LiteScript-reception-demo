//Compiled by LiteScript compiler v0.6.5, source: /home/ltato/LiteScript-reception-demo/www/js/jquery-tab-tab.lite.md

   //compiler import jQuery

   //append to class jQuery

    //method tabTab(options)
    jQuery.prototype.tabTab = function(options){

        //declare this:jQuery

//##### Variables

       var 
       $this = $(this), 
       ul = $this.find('nav ul'), 
       a = ul.find('li a'), 
       section = $this.find('section'), 
       currentTab = undefined, 
       currentSection = undefined, 
       settings = $.extend({}, options)
       ;

       //default settings =
       if(!settings) settings={};
       if(settings.index===undefined) settings.index=0;
       if(settings.saveState===undefined) settings.saveState=false;

//##### Initialization

//load state

       //if settings.saveState and localStorage.getItem('index.tabtab') into var stored
       var stored=undefined;
       if (settings.saveState && (stored=localStorage.getItem('index.tabtab'))) {
               setCurrent(stored);
       }
       
       else {
            // default index
           setCurrent(settings.index);
       };


//##### internal functions

       //helper function setCurrent(index)
       function setCurrent(index){

           index = //when index >= a.length then a.length - 1
               (index >= a.length) ? (a.length - 1) :
                //when index < 0 then 0
               (index < 0) ? (0) :
           /* else */ index;

           $this.find('.current').removeClass('current');

           currentTab = a.eq(index).addClass('current');

           currentSection = section.eq(index).addClass('current');

            //save state
           //if settings.saveState, localStorage.setItem 'index.tabtab',index
           if (settings.saveState) {
               localStorage.setItem('index.tabtab', index)};
       };


//##### Events

       ul.delegate('li a', 'click', function (){

           var $me = $(this);

           setCurrent($me.index('li a'));

            // manually trigger blur for Firefox, Opera and maybe others
           $me.trigger('blur');

           return false;
       });

       return this;
    };

   //end method tabTab
   
//# sourceMappingURL=jquery-tab-tab.js.map