app.module('component/contract', function({ component }) {

	var { quarters } = component

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
					<quarters :contract="contract" :year="year"></quarters>
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
			}
		},
		watch: {
		}
	}

})