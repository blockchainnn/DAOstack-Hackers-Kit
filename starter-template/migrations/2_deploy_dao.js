const keys = require('../keys/keys');
// 2_deploy_dao.js
var arcContracts = require("../arc.json");

var Avatar = artifacts.require("@daostack/arc/Avatar.sol");
var DaoCreator = artifacts.require("@daostack/arc/DaoCreator.sol");

const GAS_LIMIT = 5900000;

// Organization parameters:
// The DAO name
const orgName = "HACKATHON";
// The DAO's token name
const tokenName = "HACKATHON";
// Token symbol
const tokenSymbol = "HCKR";
// The ethereum addresses of the "founders"
// TODO: list your accounts to give initial reputation to
var founders = [keys.ADDRESS];
// TODO: list the token amount per founder account
// NOTE: the important thing is to make sure the array length match the number of founders
var foundersTokens = [1000000000];
// TODO: list the reputation amount per founder account
var foundersRep = [1000000000];

module.exports = async function(deployer) {
	deployer.then(async function() {
		// TODO: edit this switch command based on the comments at the variables decleration lines
		var networkId;
		switch (deployer.network) {
			case "ganache":
			case "development":
				networkId = "ganache";
				break;
			case "kovan":
			case "kovan-infura":
				networkId = "kovan";
				break;
			case "ropsten":
			case "ropsten-infura":
				networkId = "ropsten";
				break;
		}

		var daoCreatorInst = await DaoCreator.at(
			arcContracts.DaoCreator[networkId]
		);

		// Create DAO:
		var returnedParams = await daoCreatorInst.forgeOrg(
			orgName,
			tokenName,
			tokenSymbol,
			founders,
			foundersTokens, // Founders token amounts
			foundersRep, // Founders initial reputation
			0, // 0 because we don't use a UController
			0, // no token cap
			{ gas: GAS_LIMIT }
		);
		var avatarInst = await Avatar.at(returnedParams.logs[0].args._avatar); // Gets the Avatar address

		var schemesArray = []; // The addresses of the schemes
		const paramsArray = []; // Defines which parameters should be grannted for each of the schemes
		const permissionArray = []; // The permissions for the schemes

		// set the DAO's initial schmes:
		await daoCreatorInst.setSchemes(
			avatarInst.address,
			schemesArray,
			paramsArray,
			permissionArray
		); // Sets the scheme in our DAO controller by using the DAO Creator we used to forge our DAO
	});
};
