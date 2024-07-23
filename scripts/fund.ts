import { getNamedAccounts, ethers, deployments } from "hardhat"
import { FundMe } from "../typechain/FundMe";



async function main (){
    const deployer:string = (await getNamedAccounts()).deployer
    const deployerSigner = await ethers.getSigner(deployer)
    const fundMeDeployment = await deployments.get("FundMe");
    const fundMe: FundMe = await (ethers as any).getContractAt(fundMeDeployment.abi, fundMeDeployment.abi, deployerSigner) 
    const transactionResponse = await fundMe.fund({value: ethers.parseEther("0.01")})

    await transactionResponse.wait(1)
    console.log("funded....")
}

main()
    .then(()=> process.exit(0))
    .catch((error)=>{
        console.error(error)
        process.exit(1)
    })