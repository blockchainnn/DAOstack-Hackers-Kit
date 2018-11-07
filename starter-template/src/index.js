import {
	InitializeArcJs,
	LoggingService,
	LogLevel,
	DAO,
	ConfigService,
	AccountService
	// Add all your needed Arc.js imports here.
} from "@daostack/arc.js";

const hackathonSchemeArtifacts = require("../build/contracts/Hackathon.json");
const contract = require('truffle-contract');
let HackathonScheme = contract(hackathonSchemeArtifacts);
const avatarAddress = '0x70db71cb0871a36bfe6c3a9e0f01f2719966dfbf';

var hackathonDAO;
var hackathonScheme;
/*
Helper function for initializing ArcJS and your app.
*/

async function initialize() {
// console.log(Hackathon)
	hackathonDAO = await DAO.at(avatarAddress);

	const daoSchemes = await hackathonDAO.getSchemes(); // Returns all the schemes your DAO is registered to
	const hackathonSchemeAddress = daoSchemes[0].address; // Since our DAO has only 1 scheme it will be the first one


	HackathonScheme.setProvider(web3.currentProvider); // Sets the Web3 Provider for a non-ArcJS contract
	hackathonScheme = HackathonScheme.at(hackathonSchemeAddress); // Initializes a HackathonScheme instance with our deployed scheme address

	$("#eventCoordinator").text("The DAO address is: " + avatarAddress);

	$("#daoAddress").text("The DAO address is: " + avatarAddress);

	await InitializeArcJs({
		watchForAccountChanges: true,
		AbsoluteVote: true,
		DaoCreator: true,
		ControllerCreator: true,
		Avatar: true,
		Controller: true

		/*
		Edit this to filter imported contracts
		, filter: {

		}
		*/
	});

	// These are some basic configurations, feel free to edit as you need.
	// Learn more about the Arc.js configurations here: https://daostack.github.io/arc.js/Configuration/
	ConfigService.set("estimateGas", true);
	ConfigService.set("txDepthRequiredForConfirmation", {
		kovan: 0,
		live: 0
	});
	LoggingService.logLevel = LogLevel.all;

	AccountService.subscribeToAccountChanges(() => {
		window.location.reload();
	});

	// TODO: Add your own initialize code here:
	ConfigService.set("providerUrl", "http://localhost");
	ConfigService.set("providerPort", 8545);

}

// Calls the initialize function to initialize your project.
(async () => {
	await initialize();
})();