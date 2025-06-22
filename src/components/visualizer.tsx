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
  const quoteResponse = await getQuote({ inputMint, outputMint, amount, slippageBps });

  return (
    <div className='flex flex-col justify-start items-stretch gap-2 border p-2 rounded-xl h-96'>
      <h2 className='text-lg font-semibold'>Visualization</h2>

      <div className='flex-1'>
        {quoteResponse.success && quoteResponse.data ? (
          <VisualizerRenderer data={quoteResponse.data} />
        ) : (
          <p className='text-gray-500 text-center'>No data available. Please select tokens and enter an amount.</p>
        )}
      </div>
    </div>
  );
};

export default Visualizer;
