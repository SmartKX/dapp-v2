app.module('component/chart', function() {

    var template = `
        <div>
            <canvas :id="id" :width="width" :height="height"></canvas>
        </div>
    `

    return {
        template,
        props: ['data'],
		data() {
			return {
                chart: ''
			}
		},
		created() {
            this.init()
		},
		mounted() {
            this.draw()
		},
		destroyed() {
		},
		computed: {
            id() {
                var { _uid: id } = this
                return `chart-${id}`
            }
        },
		methods: {
            draw() {
                var { data, id } = this
                var { accounts, values } = data
                var el = document.getElementById(id)
                var options = {
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
                this.chart = new Chart(el, options)
            },
            init() {
                this.width = 400
                this.height = 400
            },
        },
		watch: {
		}
	}

})