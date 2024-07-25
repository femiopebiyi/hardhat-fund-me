import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { get } from "http";


const  deployFunc = async (hre: HardhatRuntimeEnvironment) => {
    const {getNamedAccounts, deployments} = hre
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    console.log("getting chainId")
    const chainId: keyof typeof networkConfig | undefined =  network.config.chainId as keyof typeof networkConfig;
    console.log(chainId)
    // const ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed

let ethUsdPriceFeedAddress;

if(developmentChains.includes(network.name)){
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address
} else{
    ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed
}

    // when going for localhost or hardhat netw0rk we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        waitConfirmations: 6

    })

    log("-------------------------------------------------------------------------------------------------------------------- fund me deployed", )
 }

 export default deployFunc;

 deployFunc.tags = ["all", "fundme"]