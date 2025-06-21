'use client';

import MintInputs from '@/components/mint-inputs';
import SwapInput from '@/components/swap-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Visualizer from '@/components/visualizer';
import { TToken } from '@/types/global';
import { useState } from 'react';

const SwapCard = ({ tokens }: { tokens: TToken[] }) => {
  const [inputMint, setInputMint] = useState<TToken>();
  const [outputMint, setOutputMint] = useState<TToken>();
  const [inputAmount, setInputAmount] = useState<string>('');

  return (
    <Card className='w-2/3'>
      <CardHeader>
        <CardTitle>Swap Card</CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='flex justify-center items-stretch gap-8'>
          <MintInputs
            tokens={tokens}
            inputMint={inputMint}
            setInputMint={setInputMint}
            outputMint={outputMint}
            setOutputMint={setOutputMint}
          />
          <SwapInput
            inputMint={inputMint}
            inputAmount={inputAmount}
            setInputAmount={setInputAmount}
          />
        </div>
        <Visualizer
          inputMint={inputMint}
          outputMint={outputMint}
          inputAmount={inputAmount}
        />
      </CardContent>
    </Card>
  );
};

export default SwapCard;
