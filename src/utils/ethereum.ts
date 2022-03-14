export const hasEthereum = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};
