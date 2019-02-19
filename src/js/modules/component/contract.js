app.module('component/contract', function({ component, service }) {

	var { quarters } = component
	var { events } = service

	var template = `
		<div class="row">
			<div class="col-4">
				<p>
					<small>
						<span v-text="contract.Executed"></span>
						<br/>
						<span v-text="contract.Accounts"></span>
						<br/>									
						<a :href="contract.pdfLink">Contract PDF</a>
						<br/>
						<a :href="contract.auditLink">Contract Audit</a>
					</small>	
				</p>
				<template v-for="year in contract.Years">
					<quarters :buttons="buttons[year]" :contract="contract" :year="year"></quarters>
				</template>
			</div>
			<div class="col">
				<h5>Schedule</h5>
				<table class="table table-sm">
					<tr>
						<th>Range</th>
						<th>Rate</th>
					</tr>
					<tr id="rate0" v-for="(split, index) in contract.splits">
						<td>
							<span v-text="contract.Range(index)"></span>
						</td>
						<td>
							<span v-text="contract.Rate(index)"></span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	`

	var components = { quarters }

	return {
		template,
		components,
		props: ['contract'],
		data() {
			return {
				buttons: ''
			}
		},
		created() {
			var { quarter } = this
			this.init()
			this.events = { quarter: quarter.bind(this) }
			events.watch(this.events, this._uid)
		},
		mounted() {
		},
		destroyed() {
		},
		computed: {
		},
		methods: {
			init() {
				var { contract } = this
				if (contract.active) {
                    var [quarter] = contract.quarters
						.sort((a, b) => b.id - a.id)
					if (quarter)
						contract.Quarter = quarter.id
				}
				var buttons = {}
				contract.Years
					.forEach((year) => {
						buttons[year] = {}
					})
				this.buttons = buttons
			},
			quarter(e) {
				var { buttons, contract } = this
				var year = e.quarterId.slice(0, 4)
				Object.keys(buttons)
					.forEach((key) => {
						if (key != year || e.accountNum != contract.accountNum || e.contractAddress != contract.address)
							buttons[key].index = -1
					})
			}
		},
		watch: {
		}
	}

})