app.module('component/contract', function({ factory }) {

	var { Format } = factory

	var template = `
		<div class="card">
			<div class="card-header" id="headingOne">
				<div data-toggle="collapse" :data-target="target" :aria-expanded="active ? 'true' : 'false'" aria-controls="collapseOne">
					<h3 v-text="status"></h3>
					<small class="text-muted" v-text="date"></small>
				</div>
			</div>
			<div :id="id" class="collapse" :class="active ? 'show' : ''" aria-labelledby="headingOne" data-parent="#accordionExample">
				<div class="card-body">
					<div class="row">
						<div class="col-4">
							<p>
								<small>
									<span v-text="executed"></span>
									<br/>
									<span v-text="accounts"></span>
									<br/>									
									<a :href="pdfLink">Contract PDF</a>
									<br/>
									<a :href="auditLink">Contract Audit</a>
								</small>	
							</p>
							<p class="h6">2019</p>
							<div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option1" autocomplete="off" checked> Q1
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option2" autocomplete="off" checked> Q2
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option3" autocomplete="off"> Q3
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option4" autocomplete="off"> Q4
								</label>
							</div>
							<p class="h6">2018</p>
							<div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
								<label class="btn btn-outline-dark disabled">
									<input type="radio" name="options" id="option1" autocomplete="off" checked> Q1
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option2" autocomplete="off" checked> Q2
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option3" autocomplete="off"> Q3
								</label>
								<label class="btn btn-outline-dark">
									<input type="radio" name="options" id="option4" autocomplete="off"> Q4
								</label>
							</div>
						</div>
						<div class="col">
							<h5>Schedule</h5>
							<table class="table table-sm">
								<tr>
									<th>Range</th>
									<th>Rate</th>
								</tr>
								<tr id="rate0" v-for="(split, index) in splits">
									<td>
										<span v-text="range(split)"></span>
									</td>
									<td>
										<span v-text="rate(split, index)"></span>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	`

	return {
		template,
		props: ['contract'],
		data() {
			return {
			}
		},
		created() {
		},
		mounted() {
		},
		destroyed() {
		},
		computed: {
			accounts() {
				var { length } = this.contract.accounts
				return `Accounts: ${length}`
			},
			active() {
				var { active } = this.contract
				return active
			},
			address() {
				var { address } = this.contract
				return address
			},
			auditLink() {
				var { auditLink } = this.contract
				return auditLink
			},
			date() {
				var { end, start } = this.contract
				return `${start} - ${end || 'Present' }`
			},
			executed() {
				var { executed: e } = this.contract
				var executed = Format.YMD(e).toUpperCase()
				return `Executed: ${executed}`
			},
			id() {
				var { address } = this
				return `contract${address}`
			},
			pdfLink() {
				var { pdfLink } = this.contract
				return pdfLink
			},
			splits() {
				var { splits } = this.contract
				return splits
			},
			status() {
				var { active } = this
				return active ? 'Active' : 'Archived'
			},
			target() {
				var { id } = this
				return `#${id}`
			}
		},
		methods: {
			range(split) {
				return Format.USD(split).toUpperCase()
			},
			rate(split, index) {
				var { splits } = this
				var a = Format.USD(split).toUpperCase()
				var b = Format.USD(splits[index++], true).toUpperCase()
				return `${a} - ${b}`
			}
		},
		watch: {
		}
	}

})