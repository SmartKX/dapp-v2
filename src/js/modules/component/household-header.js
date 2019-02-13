app.module('component/householdHeader', function() {

	var template = `
		<div class="row bg-light border-bottom">
			<div class="col">
			<h1>Household Info</h1>
			<dl class="row">
				<dt class="col-sm-2">Household Name</dt>
				<dd class="col-sm-10">
					<small v-text="name"></small>
				</dd>
				<dt class="col-sm-2">Account Number</dt>
				<dd class="col-sm-10">
					<span v-text="accountNumber"><span>
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
			accountNumber() {
				var { accountNum } = this.household
				return accountNum
			},
			household() {
				var { household } = this.session.data
				return household || {}
			},
			manager() {
				var { manager } = this.household
				return manager
			},
			name() {
				var { name } = this.household
				return name
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