import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import WaveContractABI from '@/libs/hardhat/abis/contracts/Wave.sol/Wave.json';
import type { Wave as WaveType } from '@/libs/hardhat/types/contracts';
import { getEthereumSafety } from '@/utils';

const CONTRACT_ADDRESS = '0xB5F2837A96F966FDBa8076a439eedD9889B09b83';
const CONTRACT_ABI = WaveContractABI.abi;

type Props = {
  enable: boolean;
};

type ReturnUseWaveContract = {
  mining: boolean;
  totalWaves: number;
  handleWave: () => void;
};

export const useWaveContract = ({ enable }: Props): ReturnUseWaveContract => {
  const [totalWaves, setTotalWaves] = useState<number>(0);
  const [mining, setMining] = useState<boolean>(false);
  const ethereum = getEthereumSafety();

  const waveContract: WaveType | null = useMemo(() => {
    if (!ethereum) return null;
    // #TODO: ๅ็ดใ
    // @ts-ignore: ethereum as ethers.providers.ExternalProvider
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer) as WaveType;
  }, [ethereum]);

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
