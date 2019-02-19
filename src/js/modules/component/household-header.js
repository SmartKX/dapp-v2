app.module('component/householdHeader', function() {

	var template = `
		<div class="row bg-light border-bottom">
			<div class="col">
			<h1>Household Info</h1>
			<dl class="row">
				<dt class="col-sm-2">Household Name</dt>
				<dd class="col-sm-10">
					<span v-text="name"></span>
				</dd>
				<dt class="col-sm-2">Account Number</dt>
				<dd class="col-sm-10">
					<span v-text="accountNumber"></span>
				</dd>
				<dt class="col-sm-2">Manager</dt>
				<dd class="col-sm-10">
					<span v-text="manager"></span>
				</dd>
			</dl>
			</div>
		</div>
	`

	return {
		template,
		props: ['household'],
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
			accountNumber() {
				var { household } = this
				return household ? (household.accountNum || '-') : ''
			},
			manager() {
				var { household } = this
				return household ? (household.manager || '-') : ''
			},
			name() {
				var { household } = this
				return household ? (household.name || '-') : ''
			}
		},
		methods: {
		},
		watch: {
		}
	}

})