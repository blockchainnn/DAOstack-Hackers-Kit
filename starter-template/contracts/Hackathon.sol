pragma solidity ^0.4.23;

contract Hackathon{

    // 1. Initialize variable to store address of event coordinator
    address public eventCoordinator;

    // 2. Initialize variable to store addresses of the hackathon entrants
    address[] public entrants;

    // 3. Initialize boolean for registration being open
    bool private registrationIsOpen = true;

    // 4. set the event coordinator to be the contract creator
    constructor() public {
        eventCoordinator = msg.sender;
    }

    // 5. Set modifier that checks if the user is the event coordinator or not
    modifier restricted() {
        if (msg.sender == eventCoordinator) _;
    }


    // Allow users to register while registration is open
    function register() public payable{
        if (registrationIsOpen) {
            require(msg.value == 0.1 ether);
            entrants.push(msg.sender);
        }
    }

    // Display the addresses of the Hackathon entrants
    function getEntrants() public view returns (address[]) {
        return entrants;
    }

    // Display the total number of Hackathon entrants
    function numberOfEntrants() public view returns (uint) {
        return entrants.length;
    }

    // Display the event status
    function eventStatus() public view returns (string) {

        if (registrationIsOpen) {
            return 'Registration is open.';
        } else {
            return 'Registration is closed.';
        }
    }

    // Allow only the event coordinator to open registration
    function openRegistration() public restricted {
        registrationIsOpen = true;
    }

    // Allow only event coordinator to close registration
    function closeRegistration() public restricted {
        registrationIsOpen = false;
    }

}