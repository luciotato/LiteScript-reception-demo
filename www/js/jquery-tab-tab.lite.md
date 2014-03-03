
	compiler import jQuery

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
			settings = $.extend({
							index: 0,
							saveState: false,
						},options)

		declare on settings
			index, saveState

##### Initialization

load state

		if settings.saveState and localStorage.getItem('index.tabtab') into var stored
				setCurrent stored
		else
			// default index
			setCurrent settings.index


##### internal functions

		helper function setCurrent(index) 

			index = case 
				when index >= a.length then a.length - 1
				when index < 0 then 0
				else index
				end

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