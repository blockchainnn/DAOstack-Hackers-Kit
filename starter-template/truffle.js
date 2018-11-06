const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 8545,
			network_id: "*"
		},
		// Use to deploy to the Kovan testnet using Infura
		// "kovan-infura": {
		// 	provider: () =>
		// 		new HDWalletProvider(
		// 			"mobile observe chair brush anger target idle chef glow exclude rabbit cave", // Seed phrase with ETH (to pay gas) in its first account
		// 			// Note that truffle uses the m/44'/60'/0'/0 Path to get the account to deploy with
		// 			"https://kovan.infura.io/v3/3566b22022b0403fb4d3b99823e3b4d5"
		// 		),
		// 	network_id: 42,
		// 	gasPrice: 1000000000 // 1 Gwei
		// }
		"ropsten-infura": {
			provider: () =>
				new HDWalletProvider(
					"mobile observe chair brush anger target idle chef glow exclude rabbit cave", // Seed phrase with ETH (to pay gas) in its first account
					// Note that truffle uses the m/44'/60'/0'/0 Path to get the account to deploy with
					"https://ropsten.infura.io/v3/3566b22022b0403fb4d3b99823e3b4d5"
				),
			network_id: 3,
			gasPrice: 1000000000 // 1 Gwei
		}
	}
};