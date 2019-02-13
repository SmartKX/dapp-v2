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
	]

	return { households }

})