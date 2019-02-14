app.module('view/main', function({ component, service }) {

	var { contract, householdHeader, quarter, navigation } = component
	var { blockchain, session } = service

	var { Vue } = window

	var template = `
		<div>
	    	<navigation></navigation>
    		<div class="container-fluid">
    			<household-header></household-header>
      			<div class="row">
        			<div class="col-4 border-bottom mt-3">
          				<h3>Contracts</h3>
						<div class="accordion" id="accordionExample">
							<template v-for="(contract, index) in contracts" :key="index">
								<contract :contract="contract"></contract>
							</template>
          				</div>
        			</div>
        			<div class="col-8">
          				<quarter></quarter>
        			</div>
      			</div>
			</div>
		</div>
    `

    var components = { contract, navigation, householdHeader, quarter, navigation }


    new Vue({
		el: '#app',
		template,
		components,
		data: {
			session: ''
		},
		created() {
			this.init()
		},
		async mounted() {
			var { households } = this.session.data
			try {
				households.length = 0
				await blockchain.connect()
				households.push(...await blockchain.transaction(/* ... */))
			} catch(e) {
				console.log(e)
			}
		},
		destroyed() {
		},
		computed: {
			contracts() {
				var { household } = this.session.data
				var { contracts } = household || {}
				return contracts || []
			}
		},
		watch: {
		},
		methods: {
			init() {
				session.init()
				this.session = session
			} 
		}
	})

})