import { useWallet, useWaveContract } from '@/hooks';
import { Button, Layout } from '@/shared';
import { useEffect } from 'react';

type Props = {
  //
};

const Page: React.VFC<Props> = ({}) => {
  const { currentAccount, checkIfWalletIsConnected, connectWallet } = useWallet();

  const { mining, handleWave, totalWaves } = useWaveContract();

  useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSomethingBeforeConnectWallet = () => {
    return (
      <Button theme="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    );
  };

  const renderSomethingAfterConnectWallet = () => {
    return (
      <div className="flex items-center">
        <div className="mr-4">
          <Button theme="primary" onClick={handleWave} disabled={mining}>
            {mining ? 'mining...' : 'Wave 👋'}
          </Button>
        </div>
        <div>{totalWaves}回</div>
      </div>
    );
  };

  return (
    <>
      <Layout>{currentAccount ? renderSomethingAfterConnectWallet() : renderSomethingBeforeConnectWallet()}</Layout>
    </>
  );
};

export default Page;
