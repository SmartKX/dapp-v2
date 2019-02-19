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
	]

	return { households }

})