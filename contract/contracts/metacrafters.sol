//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
error notOwner();


contract Metacrafters {
    address private immutable i_owner; // owner address
    uint256 public constant MINIMUM_AMOUNT = 0.0001*10**18; // 0.0001 ether in wei
    address[] public funders; // list of funders
    uint public totalFunds;

    constructor(){
        i_owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != i_owner) {
            revert notOwner();
        }
        _;
    }

    struct People{
        string name;
        uint favNumber;
    }

    People[] public people;
    mapping(string => uint) public nameToFavoriteNumber;
    mapping(address => uint) public addressToFundedAmount;

    function newPerson(string memory _name, uint256 _num) public {
        people.push(People(_name, _num));
        nameToFavoriteNumber[_name] = _num;
    }
    
    function fund() public payable {
        require(msg.value >= MINIMUM_AMOUNT, "SEND ATLEAST 0.0001 ETH");
        addressToFundedAmount[msg.sender] += msg.value;
        funders.push(msg.sender);
        totalFunds += msg.value;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = i_owner.call{value : address(this).balance}("");
        funders = new address[](0);
        require(success, "money transfer failed");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFundAmount() public view returns(uint) {
        return totalFunds;
    }

    receive() external payable { 
        fund();
    }

    fallback() external payable { 
        revert("wrong function!");
    }
}