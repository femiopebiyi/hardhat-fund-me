import { deployments, ethers, getNamedAccounts, network } from "hardhat"
import { FundMe } from "../../typechain/FundMe"
import { assert } from "chai"
import { developmentChains } from "../../helper-hardhat-config"


developmentChains.includes(network.name) ? describe.skip :

describe("FundMe",  function(){
    let fundMe: FundMe
    let deployer

    const sendValue = ethers.parseEther("0.02")

    this.beforeEach(async function(){
        deployer = (await getNamedAccounts()).deployer
                const fundMeDeployment = await deployments.get("FundMe");
                const deployerSigner = await ethers.getSigner(deployer);

        fundMe = await (ethers as any).getContractAt(fundMeDeployment.abi, fundMeDeployment.address, deployerSigner)

        

    })

    it("allows people to fund and withdraw", async function(){
        await fundMe.fund({value: sendValue})
        await fundMe.withdraw()
        const endingBalance = await ethers.provider.getBalance(await fundMe.getAddress())
        console.log("ending balance:", endingBalance)

        assert.equal(endingBalance.toString(), "0")
    })

})