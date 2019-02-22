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

	var app = new App();

	app.module('component/contract', function({ component, service }) {

		var { quarters } = component;
		var { events } = service;

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
	`;

		var components = { quarters };

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
				var { quarter } = this;
				this.init();
				this.events = { quarter: quarter.bind(this) };
				events.watch(this.events, this._uid);
			},
			mounted() {
			},
			destroyed() {
			},
			computed: {
			},
			methods: {
				init() {
					var { contract } = this;
					if (contract.active) {
	                    var [quarter] = contract.quarters
							.sort((a, b) => b.id - a.id);
						if (quarter)
							contract.Quarter = quarter.id;
					}
					var buttons = {};
					contract.Years
						.forEach((year) => {
							buttons[year] = {};
						});
					this.buttons = buttons;
				},
				quarter(e) {
					var { buttons, contract } = this;
					var year = e.quarterId.slice(0, 4);
					Object.keys(buttons)
						.forEach((key) => {
							if (key != year || e.accountNum != contract.accountNum || e.contractAddress != contract.address)
								buttons[key].index = -1;
						});
				}
			},
			watch: {
			}
		}

	});

	app.module('component/contracts', function({ component, model }) {

	    var { contract } = component;
	    var { Contract } = model;

	    var template = `
        <div class="accordion" id="accordionExample">
            <div class="card" v-for="(contract, index) in contracts">
                <div class="card-header" id="headingOne">
                    <div data-toggle="collapse" :data-target="contract.Id(index, true)" :aria-expanded="contract.active" aria-controls="collapseOne">
                        <h3 v-text="contract.Status"></h3>
                        <small class="text-muted" v-text="contract.Date"></small>
                    </div>
                </div>
                <div :id="contract.Id(index)" class="collapse" :class="contract.active ? 'show' : ''" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <contract :contract="contract" :aIndex="aIndex"></contract>
                    </div>
                </div>
            </div>
        </div>
    `;
	    
	    var components = { contract };

		return {
	        template,
	        props: ['household'],
	        components,
			data() {
				return {
	                aIndex: ''
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
	            contracts() {
	                var { household } = this;
	                var contracts = household ? household.contracts : [];
	                return contracts
	                    .map(data => new Contract(data, household.accountNum))
	            }
			},
			methods: {
	            init() {
	                var { contracts } = this;
	                var index = contracts
	                    .findIndex(c => c.active);
	                this.aIndex = index > -1 ? index : 0;
	            }
	        },
			watch: {
			}
		}

	});

	app.module('component/chart', function() {

	    var template = `
        <div>
            <canvas :id="id" :width="width" :height="height"></canvas>
        </div>
    `;

	    return {
	        template,
	        props: ['data'],
			data() {
				return {
	                chart: ''
				}
			},
			created() {
	            this.init();
			},
			mounted() {
	            this.draw();
			},
			destroyed() {
			},
			computed: {
	            id() {
	                var { _uid: id } = this;
	                return `chart-${id}`
	            }
	        },
			methods: {
	            draw() {
	                var { data, id } = this;
	                var { accounts, values } = data;
	                var el = document.getElementById(id);
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
	    
	                };
	                this.chart = new Chart(el, options);
	            },
	            init() {
	                this.width = 400;
	                this.height = 400;
	            },
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
	`;

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
					var { household } = this;
					return household ? (household.accountNum || '-') : ''
				},
				manager() {
					var { household } = this;
					return household ? (household.manager || '-') : ''
				},
				name() {
					var { household } = this;
					return household ? (household.name || '-') : ''
				}
			},
			methods: {
			},
			watch: {
			}
		}

	});

	app.module('component/navbar', function() {

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
						<span v-text="household"></span>
						<span>&nbsp;</span>
					</button>
					<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<a class="dropdown-item" href="#" v-for="(household, index) in households" v-on:click="select(household)">
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
	        props: ['navbar'],
			data() {
				return {
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
					var { household, navbar } = this;
					var { households } = navbar;
					return households
						.filter(h => h.name != household)
				},
				household() {
					var { households, index } = this.navbar;
					var household = households[index];
					return household ? household.name : 'Please select a household'
				}
			},
			methods: {
				init() {
				},
				select(household) {
					var { navbar } = this;
					var { households } = navbar;
					navbar.index = households.findIndex(h => h.name == household.name);
				}
			},
			watch: {
			}
		}

	});

	app.module('component/quarter', function({ component, factory, service }) {

	    var { chart } = component;
	    var { Format } = factory;
	    var { events } = service;

	    var template = `
        <div class="quarter">
            <template v-if="contract">
                <h1 v-text="id"></h1>
                <div class="row">
                    <div class="col-4">
                        <div class="form-group" v-for="(split, index) in values" :key="index">
                            <label :for="label(index)" v-text="accounts[index]"></label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">$</div>
                                </div>
                                <input type="text" class="form-control" :id="label(index)" aria-describedby="emailHelp" placeholder="Enter account ammount" :value="split | usd">
                            </div>
                            <small id="emailHelp" class="form-text text-muted">Small note about something or other.</small>
                        </div>
                    </div>
                    <div class="col-8">
                        <chart :data="chartData"></chart>
                    </div>
                </div>
            </template>
        </div>
    `;

	    var components = { chart };

	    var filters = {
			usd: Format.USD
		};

	    return {
	        template,
	        props: ['household'],
	        components,
	        filters,
			data() {
				return {
	                chart: '',
	                contractAddress: '',
	                quarterId: '',
				}
			},
			created() {
	            this.init();
	            var { quarter } = this;
	            this.events = { quarter: quarter.bind(this) };
	            events.watch(this.events, this._uid);
			},
			mounted() {
			},
			destroyed() {
	            events.unwatch(this.events, this._uid);
			},
			computed: {
	            accounts() {
	                var { contract } = this;
	                return contract ? contract.accounts : []
	            },
	            contract() {
	                var { contractAddress, household } = this;
	                var contracts = household ? household.contracts : [];
	                return contracts
	                    .find(c => c.address == contractAddress)
	            },
	            chartData() {
	                var { accounts, values } = this;
	                return { accounts, values }
	            },
	            id() {
	                var { quarterId } = this;
	                return Format.Y_Q(quarterId)
	            },
	            values() {
	                var { contract, quarterId } = this;
	                var quarters = contract ? contract.quarters : [];
	                var quarter = quarters
	                    .find(q => q.id == quarterId);
	                return quarter ? quarter.values : []
	            }
	        },
			methods: {
	            init() {
	                this.contractAddress = '';
	                this.quarterId = '';
	            },
	            quarter(e) {
	                this.init();
	                var { contractAddress, quarterId } = e;
	                this.$nextTick(() => {
	                    this.contractAddress = contractAddress;
	                    this.quarterId = quarterId;
	                });
	            },
	            label(index) {
	                return `account${index}`
	            },
	        },
			watch: {
			}
		}

	});

	app.module('component/quarters', function({ model, service }) {

	    var { Contract } = model;
	    var { events } = service;

	    var { Vue } = window;

	    var template = `
        <div>
            <p class="h6" v-text="year"></p>
                <div class="btn-group btn-group-sm btn-group-toggle mb-3" data-toggle="buttons">
                    <template v-for="(button, index) in buttons.list">
                        <template v-if="quarter(quarters, index)">
                            <label class="btn btn-outline-dark" :class="buttons.index == index ? 'active' : ''" v-on:click="select(index)">
                                <input type="radio" name="options">
                                <span v-text="button.label"></span>
                            </label>
                        </template>
                        <template v-else>
                            <label class="btn btn-outline-dark disabled">
                                <input type="radio" name="options">
                                <span v-text="button.label"></span>
                            </label>
                        </template>
                    </template>
                </div>
            </p>
        </div>
    `;

	    return {
	        template,
	        props: ['buttons', 'contract', 'year'],
			data() {
				return {
				}
			},
			created() {
	            this.init();
			},
			mounted() {
	            this.preSelect();
			},
			destroyed() {
			},
			computed: {
	            quarters() {
	                var { contract, year } = this;
	                return Contract.quarters(contract, year)
	            }
	        },
			methods: {
	            init() {
	                var { buttons, year } = this;
	                var list = [1, 2, 3, 4];
	                if (!buttons.index) {
	                    Vue.set(buttons, 'index', -1);
	                    var list = [1, 2, 3, 4]
	                        .map((n) => {
	                            var label = `Q${n}`;
	                            var id = `${year}${n}`;
	                            return { id, label }
	                        });
	                    Vue.set(buttons, 'list', list);
	                }
	            },
	            preSelect() {
	                var { buttons, contract } = this;
	                if (contract.active && contract.Quarter) {
	                    var index = buttons.list
	                        .findIndex(b => b.id == contract.Quarter);
	                    if (index > -1)
	                        this.select(index);
	                }
	            },
	            quarter(quarters, index) {
	                return quarters
	                    .find(q => q.id && String(q.id).slice(4) == index + 1)
	            },
	            select(index) {
	                var { contract, buttons } = this;
	                buttons.index = index;
	                var button = buttons.list[index];
	                var { id: quarterId } = button;
	                var { accountNum, address: contractAddress } = contract;
	                events.$emit('quarter', { accountNum, contractAddress, quarterId });
	            }
	        },
			watch: {
			}
		}

	});

	app.module('factory/Format', function() {

	    var { moment, numeral } = window;

	    class Format {

	        static _numeral(a) {
	            return numeral(a / 1e6)
	        }

	        static BPS(a) {
	            var fmt = `0.00%`;
	            return Format._numeral(a).format(fmt)

	        }

	        static Y_Q(a) {
	            var str = String(a);
	            return `${str.slice(0, 4)} Q${str.slice(4)}`
	        }

	        static YMD(a) {
	            var fmt = `YYYYMMMDD`;
	            return moment(a, `YYYYMMDD`).format(fmt)
	        }

	        static _shortUSD(a) {
	            return Format._numeral(a).format(`$a0`)
	        } 

	        static USD(a) {
	            return typeof a == 'boolean' && a == true ? Format._shortUSD : Format._numeral(a).format(`00`)
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

	app.module('factory/Model', function() {

	    var reserved = ['_data'];

	    class Model {

	        constructor({ data = {}, ignore = [], required = [], defaults = {} }) {
	            this._init(data, ignore, required, defaults);
	        }

	        _init(data, ignore, required, defaults) {
	            required
	                .forEach((key) => {
	                    if (!data.hasOwnProperty(key))
	                        throw new Error(`Sorry, model ${key} is required!`)
	                });
	            Object.keys(defaults)
	                .forEach((key) => {
	                    if (!data.hasOwnProperty(key))
	                        data[key] = defaults[key];
	                });
	            this._data = data;
	            var configurable = true;
	            Object.keys(data)
	                .forEach((key) => {
	                    if (reserved.indexOf(key) > -1)
	                        throw new Error(`Sorry, model ${key} is reserved!`)
	                    if (ignore.indexOf(key) > -1)
	                        return
	                    Object.defineProperty(this, key, {
	                        get() {
	                            return this._data[key]
	                        },
	                        set(v) {
	                            this._data[key] = v;
	                        },
	                        configurable
	                    });
	                });
	        }

	    }

	    return Model

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
						executed: '20180623',
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
				  			},
				  			{
								id: 20184,
								values: [
									250000000000,
									10000000000,
									500000000000,
									15000000000,
									150000000000,
									325000000000
								]
				  			},
				  			{
								id: 20191,
								values: [
									250000000000,
									10000000000,
									5000000000,
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
						executed: '20170527',
						pdfLink: 'https://docusign.com/skx/abc.pdf',
						auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
						splits: [0,1000000000000,3000000000000,5000000000000],
						bps: [10000, 8000, 6000, 4000],
						start: 20173,
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
								id: 20173,
								values: [
									2500000000,
									100000000,
									5000000000,
									15000000000,
									150000000000
								]
							},
							{
								id: 20174,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000,
									150000000000
								]
							},
							{
								id: 20174,
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
				name: 'Liu Kang Family',
				accountNum: 732665010,
				manager: 'Money Manager Freddy',
				contracts: [
					{
						active: true,
						address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0',
						executed: '20190218',
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
						start: 20184,
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
								id: 20184,
								values: [
									2500000000,
									100000000,
									500000000000,
									15000000000,
									1500000000,
									3250000000
								]
				  			},
				  			{
								id: 20191,
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
						executed: '20150921',
						pdfLink: 'https://docusign.com/skx/abc.pdf',
						auditLink: 'https://etherscan.io/address/0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2XXX',
						splits: [0,1000000000000,3000000000000,5000000000000],
						bps: [10000, 8000, 6000, 4000],
						start: 20173,
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
								id: 20173,
								values: [
									250000000000,
									10000000000,
									5000000000,
									150000000000,
									150000000000
								]
							},
							{
								id: 20174,
								values: [
									2500000000,
									10000000000,
									500000000000,
									150000000000,
									150000000000
								]
							},
							{
								id: 20174,
								values: [
									2500000000,
									10000000000,
									500000000000,
									150000000000,
									150000000000
								]
							}
						]
					},
			  		{
						active: false,
						address: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D2YYY',
						executed: '20140521',
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
						start: 20161,
						end: 20164,
						accounts: [
							'B IRA',
							'S IRA',
							'B&S',
							'B Taxable'
						],
						quarters: [
							{
								id: 20161,
								values: [
									550000000000,
									30000000000,
									700000000000,
									7500000000000
								]
							},
							{
								id: 20162,
								values: [
									250000000000,
									10000000000,
									500000000000,
									1500000000000
								]
							},
							{
								id: 20163,
								values: [
									450000000000,
									10000000000,
									400000000000,
									2500000000000
								]
							},
							{
								id: 20164,
								values: [
									750000000000,
									30000000000,
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
			  contractHash: '0xd1Df4eFc6b7d47D00E21566B676a9cbbBf5D26D0'
			},
			{
			  name: 'Greg Andrews Family',
			  contractHash: '0xd1Df4eFc6b7d47D00E21566B668a9cbbBf5D26D0'
			}
		];

		return { households }

	});

	app.module('factory/Sys', function() {

	    class Sys {

	        static wait(ms) {
	            return new Promise(resolve => setTimeout(resolve, ms))
	        }

	    }

	    return Sys
	    
	});

	app.module('model/Contract', function({ factory }) {

	    var { Format, Model } = factory;

	    var required = ['accountNum'];

	    class Contract extends Model {

	        constructor(data, accountNum) {
	            if (accountNum)
	                data.accountNum = accountNum;
	            data.Quarter = 0;
	            super({ data, required });
	        }

	        get Accounts() {
	            var { accounts } = this;
	            var n = Array.isArray(accounts) ? accounts.length : 0;
				return `Accounts: ${n}`
	        }

	        get Date() {
	            var { end, start } = this;
	            return `${start} - ${end || 'Present' }`
	        }

	        get Executed() {
				var { executed: date } = this;
				var executed = Format.YMD(date).toUpperCase();
				return `Executed: ${executed}`
	        }

	        get Status() {
	            var { active } = this;
	            return active ? 'Active' : 'Archived'
	        }

	        static quarters(c, year) {
	            var quarters = c ? c.quarters : [];
	            return quarters
	                .filter(q => q.id && String(q.id).slice(0, 4) == year)
	        }

	        static year(n) {
	            return n ? +String(n).slice(0, 4) : new Date().getFullYear()
	        }

	        get Years() {
	            var end = Contract.year(this.end);
	            var start = Contract.year(this.start);
	            var years = start == end ? [start] : [start, end];
	            while(end - start > 1) {
	                start++;
	                years.splice(1, 0, start);
	            }
	            return years
	                .reverse()
	        }

	        Range(index) {
				var { splits } = this;
	            var shortUSD = Format.USD(true);
	            var a, z;
	            if (Array.isArray(splits)) {
	                a = splits[index];
	                z = splits[index + 1];
	            }
				return `${Format.USD(a || 0).toUpperCase()} - ${shortUSD(z || 0).toUpperCase()}`
	        }

	        Rate(index) {
	            var { bps } = this;
	            var rate = Array.isArray(bps) ? bps[index] : 0;
				return Format.BPS(rate).toUpperCase()
	        }

	        Id(index, target) {
	            var id = `contract-${index + 1}`;
	            return target ? `#${id}` : id
	        }

	    }

	    return Contract

	});

	app.module('model/Household', function({ factory }) {

	    var { Model } = factory;

	    var Quarter = { contractAddress: '', id: '' };

	    class Household extends Model {

	        constructor(data) {
	            data.Quarter = Quarter;
	            super({ data });
	        }

	    }

	    return Household

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

	        static dummyData() {
	            var { households } = store;
	            return households 
	        }

	        static async transaction(tx) {
	            var { eth } = data.web3 || {};
	            if (!eth)
	                throw new Error(`Not connected!`)
	            return eth.sendTransaction(tx)
	        }

	    }

	    return BlockChain

	});

	app.module('service/events', function() {

	    var watchers = [];

		class Events {

			static $emit(event, data) {
	            watchers
	                .forEach((w) => {
					    if (w.event == event)
						    w.callback(data);
				    });
			}

			static $off(event, id) {
	            var index = watchers
	                .find(w => w.event == event && w.id == id);
	            if (index < 0)
	                throw new Error(`Sorry, no watcher found for event: ${event}, id: ${id}!`)
				watchers.splice(index, 1);
			}

			static $on(event, id, callback) {
	            var index = watchers
	                .find(w => w.event == event && w.id == id);
	            if (index > -1)
	                throw new Error(`Sorry, duplicate watcher for event: ${event}, id: ${id}!`)
				watchers.push({ event, id, callback });
			}

			static unwatch(events, id) {
				for (var event in events) {
					Events.$off(event, id);
				}
			}

			static watch(events, id) {
				for (var event in events) {
					Events.$on(event, id, events[event]);
				}
			}

		}

		return Events

	});

	//import './session'

	app.module('view/main', function({ component, model, service }) {

		var { contracts, householdHeader, navbar, quarter } = component;
		var { Household } = model;
		var { blockchain } = service;

		var { Vue } = window;

		var template = `
		<div>
			<navbar :navbar="navbar"></navbar>
			<template v-if="ready">
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
			</template>
		</div>
    `;

		var components = { contracts, householdHeader, navbar, quarter };

	    new Vue({
			el: '#app',
			template,
			components,
			data: {
				components: '',
				navbar: '',
				ready : ''
			},
			created() {
				this.init();
			},
			mounted() {
			},
			destroyed() {
			},
			computed: {
				household() {
					var { index, households } = this.navbar;
					return households[index]
				},
				households() {
					var { households } = this.navbar;
					return households
				},
				householdIndex() {
					var { index } = this.navbar;
					return index
				}
			},
			watch: {
				'navbar.index'() {
					if (!this.ready)
						return
					this.ready = false;
					this.$nextTick(() => {
						this.ready = true;
					});
				}
			},
			methods: {
				init() {
					this.navbar = { households: [], index: 0 };
					this.ready = true;
					this.load();
				},
				async load() {
					var { navbar } = this;
					navbar.index = 0;
					try {
						var households = await blockchain.dummyData();
						navbar.households.push(...households.map(h => new Household(h)));
					} catch(e) {
						console.log(e);
					}
				}
			}
		});

	});

	app.bootstrap('view/main');

}());
