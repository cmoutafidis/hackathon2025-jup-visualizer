import { Input } from '@/components/ui/input';
import { TToken } from '@/types/global';

const SwapInput = ({
  inputMint,
  inputAmount,
  setInputAmount,
}: {
  inputMint: TToken | undefined;
  inputAmount: string;
  setInputAmount: (amount: string) => void;
}) => {
  return (
    <div className='space-y-4 border p-4 rounded-xl flex-1'>
      <h1 className='text-lg font-semibold'>Input Amount</h1>
      <Input
        placeholder='Enter amount'
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        rightElement={inputMint?.symbol ?? '---'}
        rightElementClassName='text-sm text-muted-foreground pr-2'
      />
    </div>
  );
};

export default SwapInput;
