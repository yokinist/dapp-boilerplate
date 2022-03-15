import { useWallet, useWaveContract } from '@/hooks';
import { Button, Layout } from '@/shared';

type Props = {
  //
};

const Page: React.VFC<Props> = ({}) => {
  const { currentAccount, isRinkebyTestNetwork, connectWallet } = useWallet();

  const { mining, handleWave, totalWaves } = useWaveContract({ enable: isRinkebyTestNetwork });

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
        {!isRinkebyTestNetwork ? (
          <p>Please Switch Rinkeby Test Network</p>
        ) : (
          <>
            <div className="mr-4">
              <Button theme="primary" onClick={handleWave} disabled={mining}>
                {mining ? 'mining...' : 'Wave 👋'}
              </Button>
            </div>
            <div>total: {totalWaves} waves</div>
          </>
        )}
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
