app.module('component/navigation', function({ service }) {

	var { blockchain, session } = service

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
						<span>Select a Household</span>
					</button>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="#" v-for="household in households">
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
		data() {
			return {
				session: ''
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
				var { households } = this.session.data
				return households
			}
		},
		methods: {
			init() {
				this.session = session
			}
		},
		watch: {
		}
	}

})