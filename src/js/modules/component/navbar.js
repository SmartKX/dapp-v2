app.module('component/navbar', function() {

	var template = `
		<nav class="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
			<a class="navbar-brand mb-0 h1" href="#">Smart Kx</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		  		<span class="navbar-toggler-icon"></span>
			</button>
  			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
			  			<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
			  			<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span>Support</span>
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="#">Documentation</a>
							<a class="dropdown-item" href="#">Support Ticket</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Something else here</a>
			  			</div>
					</li>
					<li class="nav-item">
			  			<a class="nav-link disabled" href="#">Disabled</a>
					</li>
		  		</ul>
		  		<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span v-text="household"></span>
						<span>&nbsp;</span>
					</button>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="#" v-for="(household, index) in households" v-on:click="select(household)">
							<span v-text="household.name"></span>
						</a>
			  			<div class="dropdown-divider"></div>
			  			<a class="dropdown-item" href="#">New Household</a>
					</div>
		  		</div>
			</div>
	  </nav>
	`

	return {
        template,
        props: ['navbar'],
		data() {
			return {
			}
		},
		created() {
			this.init()
		},
		mounted() {
		},
		destroyed() {
		},
		computed: {
			households() {
				var { household, navbar } = this
				var { households } = navbar
				return households
					.filter(h => h.name != household)
			},
			household() {
				var { households, index } = this.navbar
				var household = households[index]
				return household ? household.name : 'Please select a household'
			}
		},
		methods: {
			init() {
			},
			select(household) {
				var { navbar } = this
				var { households } = navbar
				navbar.index = households.findIndex(h => h.name == household.name)
			}
		},
		watch: {
		}
	}

})