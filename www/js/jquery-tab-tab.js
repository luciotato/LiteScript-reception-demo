// -----------
// Module Init
// -----------

    //    append to class jQuery
    

     //     method tabTab(options)
     // ---------------------------
     jQuery.prototype.tabTab = function(options){

        //declare this:jQuery
        

//##### Variables

        //var
            //$this:jQuery = $(this)
            //ul = $this.find('nav ul')
            //a = ul.find('li a')
            //section = $this.find('section')
            //currentTab
            //currentSection
            //settings = $.extend({},options)

        //default settings =
        var 
            $this = $(this)
            , ul = $this.find('nav ul')
            , a = ul.find('li a')
            , section = $this.find('section')
            , currentTab = undefined
            , currentSection = undefined
            , settings = $.extend({}, options)
        ;

        //default settings =
            //index : 0
            //saveState : false

//##### Initialization

//load state

        //if settings.saveState and localStorage.getItem('index.tabtab') into var stored
        if(!settings) settings={};
        if(settings.index===undefined) settings.index=0;
        if(settings.saveState===undefined) settings.saveState=false;

//##### Initialization

//load state

        //if settings.saveState and localStorage.getItem('index.tabtab') into var stored
        var stored=undefined;
        if (settings.saveState && (stored=localStorage.getItem('index.tabtab'))) {
        
                //setCurrent stored
                setCurrent(stored);
        }
        //if settings.saveState and localStorage.getItem('index.tabtab') into var stored
        
        else {
            // default index
            //setCurrent settings.index
            setCurrent(settings.index);
        };


//##### internal functions

        //helper function setCurrent(index)
        // ---------------------------
        function setCurrent(index){

            //case
            
                //when index >= a.length: index = a.length - 1
            if (
                (index >= a.length)
            ){index = a.length - 1
            }
                //when index < 0: index = 0
            else if (
                (index < 0)
            ){index = 0
            };

            //$this.find('.current').removeClass 'current'
            $this.find('.current').removeClass('current');

            //currentTab = a.eq(index).addClass('current')
            currentTab = a.eq(index).addClass('current');

            //currentSection = section.eq(index).addClass('current')
            currentSection = section.eq(index).addClass('current');

            //save state
            //if settings.saveState, localStorage.setItem 'index.tabtab',index
            if (settings.saveState) {localStorage.setItem('index.tabtab', index)};
        };


//##### Events

        //ul.delegate 'li a','click', function

            //var $me:jQuery = $(this)

            //setCurrent $me.index('li a')

            // manually trigger blur for Firefox, Opera and maybe others
            //$me.trigger 'blur'

            //return false

        //return this
        ul.delegate('li a', 'click', // ---------------------------
        function (){

            //var $me:jQuery = $(this)
            var $me = $(this);

            //setCurrent $me.index('li a')
            setCurrent($me.index('li a'));

            // manually trigger blur for Firefox, Opera and maybe others
            //$me.trigger 'blur'
            $me.trigger('blur');

            //return false
            return false;
        });

        //return this
        return this;
     };
// -----------
// Module code
// -----------
    //global declare jQuery
    

    //end method tabTab
    
// end of module
