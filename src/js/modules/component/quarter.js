app.module('component/quarter', function({ factory, service }) {

    var { Format } = factory
    var { session } = service

    var template = `
        <div class="quarter">
            <h1 v-text="id"><h1>
            <div class="row">
                <div class="col-4">
                    <div class="form-group" v-for="(split, index) in values" :key="index">
                        <label :for="label(index)" v-text="accounts[index]"></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">$</div>
                            </div>
                            <input type="text" class="form-control" :id="label(index)" aria-describedby="emailHelp" placeholder="Enter account ammount" :value="quarter.values[index] | Format.USD">
                        </div>
                        <small id="emailHelp" class="form-text text-muted">Small note about something or other.</small>
                    </div>
                </div>
                <div class="col-8">
                    <canvas id="chart" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
    `

    return {
		template,
		data() {
			return {
                chart: '',
                session: ''
			}
		},
		created() {
            this.init()
		},
		mounted() {
            this.doChart()
		},
		destroyed() {
		},
		computed: {
            accounts() {
                var { accounts } = this.contract
                return accounts
            },
            contract() {
                var { contract } = this.session.data
                return contract || {}
            },
            id() {
                var { id } = this.quarter
                return Format.Y_Q(id)
            },
            quarter() {
                var { quarter } = this.session.data
                return quarter || {}
            },
            values() {
                var { values } = this.contract
                return values
            }
        },
		methods: {
            doChart() {
                var { accounts, values } = this
                var el = document.getElementById('chart')
                var chart = {
                    type: 'pie',
                    data: {
                        labels: accounts,
                        datasets: [
                            {
                                label: 'Distribution of Funds',
                                data: values,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }
                        ]
                    }
                }
                this.chart = new Chart(el, chart)
            },
            init() {
                this.session = session
            },
            label(index) {
                return `account${index}`
            }
        },
		watch: {
		}
	}

})