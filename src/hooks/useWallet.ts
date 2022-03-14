import { RINKEBY_CHAIN_ID } from '@/constants';
import { useEffect, useState } from 'react';
import { MetaMaskInpageProvider } from '@metamask/providers';

export const useWallet = () => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentChainId, setCurrentChainId] = useState<string>();
  const [isRinkebyTestNetwork, setRinkebyTestNetwork] = useState<boolean>(false);

  const checkIfWalletIsConnected = async (ethereum: MetaMaskInpageProvider) => {
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
      const { ethereum } = window;
      if (!ethereum?.request) {
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
    const { ethereum } = window;
    if (!ethereum || !ethereum?.on || !ethereum?.request) return;
    checkIfWalletIsConnected(ethereum);
    ethereum.on('chainChanged', handleChainChanged);
    return () => {
      ethereum.off('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    isRinkebyTestNetwork,
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };
};
