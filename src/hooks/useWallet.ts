import { RINKEBY_CHAIN_ID } from '@/constants';
import { EthereumType } from '@/types';
import { getEthereumSafety } from '@/utils';
import { useEffect, useState } from 'react';

export const useWallet = () => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentChainId, setCurrentChainId] = useState<string>();
  const [isRinkebyTestNetwork, setRinkebyTestNetwork] = useState<boolean>(false);
  const ethereum = getEthereumSafety();

  const checkIfWalletIsConnected = async (ethereum: EthereumType) => {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (typeof chainId === 'string') {
      setCurrentChainId(chainId);
    }
    if (!Array.isArray(accounts)) return;
    if (!accounts || accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      console.info('No authorized account found');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (!Array.isArray(accounts)) return;
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChainChanged = (chainId: unknown) => {
    if (typeof chainId === 'string') {
      setCurrentChainId(chainId);
    }
  };

  useEffect(() => {
    if (!currentChainId) return;
    const isRinkByChainId = currentChainId === RINKEBY_CHAIN_ID;
    setRinkebyTestNetwork(isRinkByChainId);
  }, [currentChainId]);

  useEffect(() => {
    if (!ethereum) return;
    checkIfWalletIsConnected(ethereum);
    ethereum.on('chainChanged', handleChainChanged);
    return () => {
      ethereum.off('chainChanged', handleChainChanged);
    };
  }, [ethereum]);

  return {
    isRinkebyTestNetwork,
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };
};
