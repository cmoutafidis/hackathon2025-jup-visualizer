import AmountBps from '@/components/amount-bps';
import TokensSelect from '@/components/token-selects';
import Visualizer from '@/components/visualizer';
import { TToken } from '@/types/global';

const SwapCard = ({ tokens, searchParams }: { tokens: TToken[]; searchParams: { [key: string]: string | string[] | undefined } }) => {
  const inputMintAddress = searchParams?.inputMint as string;
  const outputMintAddress = searchParams?.outputMint as string;
  const amount = (searchParams?.amount as string) ?? '0';
  const slippageBps = Number(searchParams?.slippageBps) || 50;

  const inputMint = tokens.find((t) => t.address === inputMintAddress);
  const outputMint = tokens.find((t) => t.address === outputMintAddress);

  return (
    <div className='space-y-4 w-full'>
      <TokensSelect
        tokens={tokens}
        searchParams={searchParams}
      />
      <AmountBps
        inputMint={inputMint}
        searchParams={searchParams}
      />
      <Visualizer
        inputMint={inputMint}
        outputMint={outputMint}
        amount={amount}
        slippageBps={slippageBps}
      />
    </div>
  );
};

export default SwapCard;
