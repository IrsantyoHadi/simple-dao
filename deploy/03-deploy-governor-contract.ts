import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
} from '../helper-hardhat-config';

const deployGovernorContract: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await get('GovernanceToken');
  const timeLock = await get('TimeLock');
  log('Deploying Governor Contract...');
  const governerContract = await deploy('GovernorContract', {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
    ],
    log: true,
  });

  log(`Governor Contract deployed to ${governerContract.address}`);
};

export default deployGovernorContract;
deployGovernorContract.tags = ['all', 'governor'];
