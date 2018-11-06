const keys = require('./keys/keys');
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 8545,
			network_id: "*"
		},
		// Use to deploy to the Kovan testnet using Infura
		"kovan-infura": {
			provider: () =>
				new HDWalletProvider(
					keys.SEED_PHRASE, // Seed phrase with ETH (to pay gas) in its first account
					// Note that truffle uses the m/44'/60'/0'/0 Path to get the account to deploy with
					keys.KOVAN_INFURA
				),
			network_id: 42,
			gasPrice: 1000000000 // 1 Gwei
		},
		"ropsten-infura": {
			provider: () =>
				new HDWalletProvider(
                    keys.SEED_PHRASE, // Seed phrase with ETH (to pay gas) in its first account
					// Note that truffle uses the m/44'/60'/0'/0 Path to get the account to deploy with
					keys.ROPSTEN_INFURA
				),
			network_id: 3,
			gasPrice: 1000000000 // 1 Gwei
		}
	}
};