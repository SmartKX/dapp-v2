app.module('view/main', function({ component, model, service }) {

	var { contracts, householdHeader, navbar, quarter } = component
	var { Household } = model
	var { blockchain } = service

	var { Vue } = window

	var template = `
		<div>
			<navbar :navbar="navbar"></navbar>
			<div class="container-fluid">
				<household-header :household="household"></household-header>
      			<div class="row">
        			<div class="col-4 border-bottom mt-3">
						<h3>Contracts</h3>
						<contracts :household="household"></contracts>
					</div>
        			<div class="col-8">
          				<quarter :household="household"></quarter>
					</div>
				</div>
			</div>
		</div>
    `

	var components = { contracts, householdHeader, navbar, quarter }

    new Vue({
		el: '#app',
		template,
		components,
		data: {
			components: '',
			navbar: ''
		},
		created() {
			this.init()
		},
		mounted() {
		},
		destroyed() {
		},
		computed: {
			household() {
				var { index, households } = this.navbar
				return households[index]
			},
			households() {
				var { households } = this.navbar
				return households
			},
			householdIndex() {
				var { index } = this.navbar
				return index
			}
		},
		watch: {
		},
		methods: {
			init() {
				this.navbar = { households: [], index: 0 }
				this.load()
			},
			async load() {
				var { navbar } = this
				navbar.index = 0
				try {
					var households = await blockchain.dummyData()
					navbar.households.push(...households.map(h => new Household(h)))
				} catch(e) {
					console.log(e)
				}
			}
		}
	})

})