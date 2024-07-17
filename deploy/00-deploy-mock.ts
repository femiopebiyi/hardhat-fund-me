
import { getNamedAccounts, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DECIMALS, InitialAnswer } from "../helper-hardhat-config";


const deployMock = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId!;

    if (chainId === 31337) {
        log("Local network detected: deploying mocks");
        const mockaggregator = await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, InitialAnswer],
        });

        log("Mocks deployed");

        log("----------------------------------------------------------------------");
    }
};

export default deployMock;
deployMock.tags = ["all", "mocks"];