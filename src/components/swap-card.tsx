import AmountBps from '@/components/amount-bps';
import TokensSelect from '@/components/token-selects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className='w-2/3'>
      <CardHeader>
        <CardTitle>Swap Card</CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='flex justify-center items-stretch gap-8'>
          <TokensSelect
            tokens={tokens}
            searchParams={searchParams}
          />
          <AmountBps
            inputMint={inputMint}
            searchParams={searchParams}
          />
        </div>
        <Visualizer
          inputMint={inputMint}
          outputMint={outputMint}
          amount={amount}
          slippageBps={slippageBps}
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
