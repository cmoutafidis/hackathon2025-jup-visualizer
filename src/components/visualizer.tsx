import VisualizerRenderer from '@/components/visualizer-renderer';
import { TSwapQuote, TToken } from '@/types/global';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Visualizer = ({ inputMint, outputMint, inputAmount }: { inputMint: TToken | undefined; outputMint: TToken | undefined; inputAmount: string }) => {
  const [data, setData] = useState<TSwapQuote>();

  useEffect(() => {
    (async () => {
      if (!inputMint || !outputMint || !inputAmount) return;
      try {
        const { data } = await axios(
          `https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint?.address}&outputMint=${outputMint?.address}&amount=${inputAmount}&slippageBps=50&restrictIntermediateTokens=true`
        );

        setData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [inputMint, outputMint, inputAmount]);

  return (
    <div className='flex flex-col justify-start items-stretch gap-4 border p-4 rounded-xl h-52'>
      <h2 className='text-lg font-semibold mb-4'>Visualization</h2>

      <div className='flex-1'>
        {data ? <VisualizerRenderer data={data} /> : <p className='text-gray-500 text-center'>No data available. Please select tokens and enter an amount.</p>}
      </div>
    </div>
  );
};

export default Visualizer;
