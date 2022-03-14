import WaveContractABI from '@/artifacts/contracts/Wave.sol/Wave.json';
import { hasEthereum } from '@/utils';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CONTRACT_ADDRESS = '0x77255bF3e1D2D9BDA46DC52CeE2CE5d3FaeA006b';
const CONTRACT_ABI = WaveContractABI.abi;

type Props = {
  enable: boolean;
};
export const useWaveContract = ({ enable }: Props) => {
  const [totalWaves, setTotalWaves] = useState(0);
  const [mining, setMining] = useState(false);

  const waveContract = useMemo(() => {
    if (!hasEthereum()) return null;
    const { ethereum } = window;
    if (!ethereum) return null;
    // @ts-ignore: ethers.providers.ExternalProvider?
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }, []);

  const handleGetTotalWaves = useCallback(async () => {
    if (!waveContract) return;
    const count = await waveContract.getTotalWaves();
    setTotalWaves(count.toNumber());
  }, [waveContract]);

  const handleWave = useCallback(async () => {
    try {
      if (!waveContract) return;
      handleGetTotalWaves();
      const waveTxn = await waveContract.wave();
      setMining(true);
      await waveTxn.wait();
      setMining(false);
      handleGetTotalWaves();
    } catch (error) {
      console.error(error);
    }
  }, [handleGetTotalWaves, waveContract]);

  useEffect(() => {
    if (!enable) return;
    handleGetTotalWaves();
  }, [enable, handleGetTotalWaves]);

  return {
    mining,
    totalWaves,
    handleWave,
  };
};
