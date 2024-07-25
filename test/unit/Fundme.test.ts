import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { FundMe } from "../../typechain/FundMe";
import { assert } from "chai";
import { developmentChains } from "../../helper-hardhat-config";



!developmentChains.includes(network.name) ? describe.skip :
describe("FundMe", function () {
    let fundMe: FundMe;
    let deployer: string;
    let mockV3Aggregator: any;

    beforeEach(async function () {
        this.timeout(10000); // Increase timeout to 60 seconds

        deployer = (await getNamedAccounts()).deployer;
        
        console.log("Starting deployments fixture");
        await deployments.fixture(["all"]);
        console.log("Deployments fixture completed");

        const fundMeDeployment = await deployments.get("FundMe");
        const mockV3AggregatorDeployment = await deployments.get("MockV3Aggregator");
                const deployerSigner = await ethers.getSigner(deployer);

        // Use ethers.getContractAt to get the deployed contract instance
        fundMe = await (ethers as any).getContractAt(fundMeDeployment.abi, fundMeDeployment.address, deployerSigner);
        mockV3Aggregator = await (ethers as any).getContractAt(mockV3AggregatorDeployment.abi, mockV3AggregatorDeployment.address, deployerSigner);
    });

    describe("constructor", function () {
        it("sets the aggregator addresses correctly", async function () {
            this.timeout(60000); // Increase timeout to 60 seconds

            const response = await fundMe.priceFeed();
            assert.equal(response, mockV3Aggregator.address);
        })
    });
});
