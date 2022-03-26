const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  const waveFactory = await hre.ethers.getContractFactory('Wave');
  const waveContract = await waveFactory.deploy();
  await waveContract.deployed();

  console.info('Deploying contracts with account: ', deployer.address);
  console.info('Account balance: ', accountBalance.toString());
  console.info('Contract deployed to:', waveContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
