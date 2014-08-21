
	global declare jQuery

### Append to class jQuery

#### method tabTab(options)

		declare this:jQuery
	
##### Variables

		var 
			$this:jQuery = $(this)
			ul = $this.find('nav ul')
			a = ul.find('li a')
			section = $this.find('section')
			currentTab
			currentSection
			settings = $.extend({},options)

		default settings =
			index : 0
			saveState : false

##### Initialization

load state

		if settings.saveState and localStorage.getItem('index.tabtab') into var stored
				setCurrent stored
		else
			// default index
			setCurrent settings.index


##### internal functions

		helper function setCurrent(index) 

			case 
				when index >= a.length: index = a.length - 1
				when index < 0: index = 0

			$this.find('.current').removeClass 'current'

			currentTab = a.eq(index).addClass('current')

			currentSection = section.eq(index).addClass('current')

			//save state
			if settings.saveState, localStorage.setItem 'index.tabtab',index


##### Events

		ul.delegate 'li a','click', function

			var $me:jQuery = $(this)

			setCurrent $me.index('li a')

			// manually trigger blur for Firefox, Opera and maybe others
			$me.trigger 'blur'

			return false

		return this

	end method tabTab