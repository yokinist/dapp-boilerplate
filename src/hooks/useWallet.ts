import { useState } from 'react';

export const useWallet = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum?.request) {
      console.info('Make sure you have MetaMask!');
      return;
    } else {
      console.info('We have the ethereum object', ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length !== 0) {
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
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    currentAccount,
    connectWallet,
    checkIfWalletIsConnected,
  };
};
