// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

//get funds fron users
//withdraw funds
//set minimum funding value in usd

import "contracts/PriceConverter.sol";

error notOwner();

contract FundMe {
    using PriceConverter for uint256;
    uint256 public constant minimumUsd = 50 * 1e18;
    address[] public funders;

    address public immutable owner;

    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {
        //set minimum find amount
        require(
            msg.value.getConversionRate(priceFeed) >= minimumUsd,
            "didnt send enough"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        for (uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }

        //reset the array
        funders = new address[](0);

        // actually withdrawing the funds

        // transfer

        // msg.sender = address
        // payable(msg.sender) = payable address
        // payable (msg.sender).transfer(address(this).balance);

        // // send
        // bool sendSuccess =  payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "send failed");

        //call

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call failed");
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != owner) {
            revert notOwner();
        }
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
