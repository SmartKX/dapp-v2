(function () {
	'use strict';

	class Module {

		constructor({ str, fn }) {
			this.str = str;
			this.fn = fn;
			var [type, name] = str.split('/');
			this.type = type;
			this.name = name;
		}

		get alias() {
			var { name, type } = this;
			return name + type[0].toUpperCase() + type.substr(1)
		}

	}

	class App {

		constructor() {
			this.modules = {};
			this._modules = [];
		}

		// private
		_load(str) {
			var { _modules, modules } = this;
			var module = _modules.find(module => module.str == str);
			if (!module)
				throw new Error('invalid module!')
			var instance = module.fn(modules);
			var { type } = module;
			switch (type) {
				case 'service':
					module.instance = instance;
					break
			}
			return instance
		}

		// public
		bootstrap(str) {
			this._load(str);
		}

		module(str, fn, alias) {
			var module = new Module({ str, fn });
			var { name, type } = module;
			if (!name)
				throw new Error('invalid module string name,' + str + '!')
			var { _modules, modules } = this;
			if (_modules.find(module => module.str == str))
				throw new Error('module ' + str + ' is already defined!')
			_modules.push(module);
			if (!modules[type])
				modules[type] = {};
			var app = this;
			var prop = alias ? module.alias : name;
			Object.defineProperty(modules[type], prop, {
				get() {
					return module.instance || app._load(str)
				}
			});
		}

	}

	var app$1 = new App();

	app.module('component/contract', function({ factory }) {

		var { Format } = factory;

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
	`;

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
					var { length } = this.contract.accounts;
					return `Accounts: ${length}`
				},
				active() {
					var { active } = this.contract;
					return active
				},
				address() {
					var { address } = this.contract;
					return address
				},
				auditLink() {
					var { auditLink } = this.contract;
					return auditLink
				},
				date() {
					var { end, start } = this.contract;
					return `${start} - ${end || 'Present' }`
				},
				executed() {
					var { executed: e } = this.contract;
					var executed = Format.YMD(e).toUpperCase();
					return `Executed: ${executed}`
				},
				id() {
					var { address } = this;
					return `contract${address}`
				},
				pdfLink() {
					var { pdfLink } = this.contract;
					return pdfLink
				},
				splits() {
					var { splits } = this.contract;
					return splits
				},
				status() {
					var { active } = this;
					return active ? 'Active' : 'Archived'
				},
				target() {
					var { id } = this;
					return `#${id}`
				}
			},
			methods: {
				range(split) {
					return Format.USD(split).toUpperCase()
				},
				rate(split, index) {
					var { splits } = this;
					var a = Format.USD(split).toUpperCase();
					var b = Format.USD(splits[index++], true).toUpperCase();
					return `${a} - ${b}`
				}
			},
			watch: {
			}
		}

	});

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
	`;

		return {
			template,
			data() {
				return {
					session: ''
				}
			},
			created() {
				this.init();
			},
			mounted() {
			},
			destroyed() {
			},
			computed: {
				accountNumber() {
					var { accountNum } = this.household;
					return accountNum
				},
				household() {
					var { household } = this.session.data;
					return household || {}
				},
				manager() {
					var { manager } = this.household;
					return manager
				},
				name() {
					var { name } = this.household;
					return name
				}
			},
			methods: {
				init() {
					this.session = session;
				}
			},
			watch: {
			}
		}

	});

	app.module('component/navigation', function({ service }) {

		var { blockchain, session } = service;

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
	`;

		return {
			template,
			data() {
				return {
					session: ''
				}
			},
			created() {
				this.init();
			},
			mounted() {
			},
			destroyed() {
			},
			computed: {
				households() {
					var { households } = this.session.data;
					return households
				}
			},
			methods: {
				init() {
					this.session = session;
				}
			},
			watch: {
			}
		}

	});

	app.module('component/quarter', function({ factory, service }) {

	    var { Format } = factory;
	    var { session } = service;

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
    `;

	    return {
			template,
			data() {
				return {
	                chart: '',
	                session: ''
				}
			},
			created() {
	            this.init();
			},
			mounted() {
	            this.doChart();
			},
			destroyed() {
			},
			computed: {
	            accounts() {
	                var { accounts } = this.contract;
	                return accounts
	            },
	            contract() {
	                var { contract } = this.session.data;
	                return contract || {}
	            },
	            id() {
	                var { id } = this.quarter;
	                return Format.Y_Q(id)
	            },
	            quarter() {
	                var { quarter } = this.session.data;
	                return quarter || {}
	            },
	            values() {
	                var { values } = this.contract;
	                return values
	            }
	        },
			methods: {
	            doChart() {
	                var { accounts, values } = this;
	                var el = document.getElementById('chart');
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
	                };
	                this.chart = new Chart(el, chart);
	            },
	            init() {
	                this.session = session;
	            },
	            label(index) {
	                return `account${index}`
	            }
	        },
			watch: {
			}
		}

	});

	app.module('factory/Format', function() {

	    var { moment, numeral } = window;

	    class Format {

	        _numeral(a) {
	            return numeral(a / 1e6)
	        }

	        static BPS(a) {
	            var fmt = `0.00%`;
	            return Format._numeral(a).format(fmt)

	        }

	        static Y_Q(a) {
	            var str = String(a);
	            return `${str.slice(1, 4)} ${str.slice(4)}`
	        }

	        static YMD(a) {
	            var fmt = `YYYYMMMDD`;
	            return moment(a, `YYYYMMDD`).format(fmt)
	        }

	        static USD(a, short = false) {
	            var fmt = short ? `$0a` : `00`;
	            return Format._numeral(a).format(fmt)
	        }

	    }

	    return Format

	});

	app.module('factory/Http', function() {

		var { axios } = window;

	    class Http {

	        static _error({ response }) {
	            var { status: code, statusText: text, data } = response;
	            var status = { code, text };
	            return { status, data }
	        }

	        static async get({ url, options }) {
	            try {
	                var { data } = await axios.get(url, options);
	                return data
	            } catch(err) {
	                throw Http._error(err)
	            }
	        }

	        static async post({ url, data, options }) {
	            try {
	                var { data } =  await axios.post(url, data, options);
	                return data
	            } catch(err) {
	                throw Http._error(err)
	            }
	        }

			static async put({ url, data, options }) {
	            try {
	                var { data } =  await axios.put(url, data, options);
	                return data
	            } catch(err) {
	                throw Http._error(err)
	            }
			}
			
			static async delete({ url, options }) {
	            try {
	                var { data } =  await axios.delete(url, options);
	                return data
	            } catch(err) {
	                throw Http._error(err)
	            }
	        }

	    }

	    return Http

	});

	app.module('factory/store', function() {

		var households = [
			{
				name: 'John Smith Family',
				accountNum: 732612010,
				manager: 'Money Manager Jason',
				contracts: [
					{
						active: true,
						address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0',
						executed: '20180118',
						pdfLink: 'https://docusign.com/skx/xyz.pdf',
						auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0',
						splits: [
							0,
							1000000000000,
							3000000000000,
							5000000000000
						],
						bps: [
							10000,
							8000,
							6000,
							4000
						],
						start: 20182,
						end: null,
						accounts: [
							'B IRA',
							'S IRA',
							'B&S',
							'B Taxable',
							'S Taxable',
							'Kid Account'
						],
						quarters: [
				  			{
								id: 20182,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000,
									150000000000,
									325000000000
								]
				  			},
				  			{
								id: 20183,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000,
									150000000000,
									325000000000
								]
				  			}
						]
			  		},
			  		{
						active: false,
						address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
						executed: '20160527',
						pdfLink: 'https://docusign.com/skx/abc.pdf',
						auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
						splits: [0,1000000000000,3000000000000,5000000000000],
						bps: [10000, 8000, 6000, 4000],
						start: 20163,
						end: 20181,
						accounts: [
							'B IRA',
							'S IRA',
							'B&S',
							'B Taxable',
							'S Taxable'
						],
						quarters: [
							{
								id: 20182,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000,
									150000000000
								]
							},
							{
								id: 20183,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000,
									150000000000
								]
							}
						]
					},
			  		{
						active: false,
						address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2YYY',
						executed: '20160527',
						pdfLink: 'https://docusign.com/skx/abc.pdf',
						auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2YYY',
						splits: [
							0,
							1000000000000,
							3000000000000,
							4000000000000
						],
						bps: [
							10000,
							8000,
							6000,
							4000
						],
						start: 20163,
						end: 20181,
						accounts: [
							'B IRA',
							'S IRA',
							'B&S',
							'B Taxable'
						],
						quarters: [
							{
								id: 20182,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000
								]
							},
							{
								id: 20183,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000
								]
							}
						]
					}
				]
			},
			{
			  name: 'Mary Williams Family',
			  contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
			},
			{
			  name: 'Greg Andrews Family',
			  contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
			}
		];

		return { households }

	});

	app.module('service/blockchain', function({ factory }) {

	    var { store } = factory;

	    var { ethereum, web3, Web3 } = window;

	    var data = {};
	    
	    class BlockChain {

	        static async connect() {
	            if (data.web3)
	                throw new Error(`Already connected!`)
	            if (ethereum) {
	                data.web3 = new Web3(ethereum);
	                await ethereum.enable();
	            } else if (web3) {
	                var { currentProvider } = web3;
	                data.web3 = new Web3(currentProvider);
	            }
	            if (!data.web3)
	                throw new Error(`Non-Ethereum browser detected. You should consider trying MetaMask!`)
	        }

	        static async transaction(tx) {
	            var { households } = store;
	            return households
	            /*
	            var { eth } = data.web3 || {}
	            if (!eth)
	                throw new Error(`Not connected!`)
	            return eth.sendTransaction(tx)
	            */
	        }

	    }

	    return BlockChain

	});

	app.module('service/session', function() {

	    var data = {};

	    class Session {

	        static get data() {
	            return data
	        }

	        static init() {
	            data.households = [];
	            data.household = '';
	            data.contract = '';
	            data.quarter = '';
	        }
	    }

	    return Session

	});

	app.module('view/main', function({ component, service }) {

		var { contract, householdHeader, quarter, navigation } = component;
		var { blockchain, session } = service;

		var { Vue } = window;

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
    `;

	    var components = { contract, navigation, householdHeader, quarter, navigation };


	    new Vue({
			el: '#app',
			template,
			components,
			data: {
				session: ''
			},
			created() {
				this.init();
			},
			async mounted() {
				var { households } = this.session.data;
				try {
					households.length = 0;
					await blockchain.connect();
					households.push(...await blockchain.transaction(/* ... */));
				} catch(e) {
					console.log(e);
				}
			},
			destroyed() {
			},
			computed: {
				contracts() {
					var { household } = this.session.data;
					var { contracts } = household || {};
					return contracts || []
				}
			},
			watch: {
			},
			methods: {
				init() {
					session.init();
					this.session = session;
				} 
			}
		});

	});

	app$1.bootstrap('view/main');

}());
