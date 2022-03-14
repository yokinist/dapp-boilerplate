const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveFactory = await hre.ethers.getContractFactory('Wave');
  const waveContract = await waveFactory.deploy();
  await waveContract.deployed();

  console.info('Contract deployed to:', waveContract.address);
  console.info('Contract deployed by:', owner.address);

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.info(error);
    process.exit(1);
  }
};

runMain();
