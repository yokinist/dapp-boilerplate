import { useCallback, useEffect, useState } from 'react';
import { RINKEBY_CHAIN_ID } from '@/constants';
import { getEthereumSafety } from '@/utils';

type ReturnUseWallet = {
  isRinkebyTestNetwork: boolean;
  currentAccount: string | undefined;
  connectWallet: () => void;
  checkIfWalletIsConnected: () => void;
};

export const useWallet = (): ReturnUseWallet => {
  const [currentAccount, setCurrentAccount] = useState<string>();
  const [currentChainId, setCurrentChainId] = useState<string>();
  const [isRinkebyTestNetwork, setRinkebyTestNetwork] = useState<boolean>(false);
  const ethereum = getEthereumSafety();

  const handleSetAccount = useCallback((accounts: unknown) => {
    if (!Array.isArray(accounts)) return;
    if (!accounts || accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      alert('No authorized account found');
    }
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    if (!ethereum) return;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (typeof chainId === 'string') {
      setCurrentChainId(chainId);
    }
    handleSetAccount(accounts);
  }, [ethereum, handleSetAccount]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      handleSetAccount(accounts);
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
    checkIfWalletIsConnected();
    ethereum.on('chainChanged', handleChainChanged);
    return () => {
      ethereum.off('chainChanged', handleChainChanged);
    };
  }, [checkIfWalletIsConnected, ethereum]);

  return {
    isRinkebyTestNetwork,
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };
};
