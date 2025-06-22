import { getQuote } from '@/actions/quote.action';
import VisualizerRenderer from '@/components/visualizer-renderer';
import { TToken } from '@/types/global';

const Visualizer = async ({
  inputMint,
  outputMint,
  amount,
  slippageBps,
}: {
  inputMint: TToken | undefined;
  outputMint: TToken | undefined;
  amount: string;
  slippageBps: number;
}) => {
  const quote = await getQuote({ inputMint, outputMint, amount, slippageBps });

  if (!quote.success) {
    throw new Error(quote.message);
  }

  return (
    <div className='flex flex-col justify-start items-stretch gap-2 border p-2 rounded-xl h-96'>
      <h2 className='text-lg font-semibold'>Visualization</h2>

      <div className='flex-1'>
        {quote.data ? (
          <VisualizerRenderer
            data={quote?.data}
            inputMint={inputMint}
            outputMint={outputMint}
          />
        ) : (
          <p className='text-gray-500 text-center'>No data available. Please select tokens and enter an amount.</p>
        )}
      </div>
    </div>
  );
};

export default Visualizer;
