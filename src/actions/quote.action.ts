'use server';

import { TAPIResponse, TSwapQuote, TToken } from '@/types/global';
import axios from 'axios';

export const getQuote = async ({
  inputMint,
  outputMint,
  amount,
  slippageBps,
}: {
  inputMint: TToken | undefined;
  outputMint: TToken | undefined;
  amount: string;
  slippageBps: number;
}): Promise<TAPIResponse<TSwapQuote>> => {
  if (!inputMint || !outputMint || !amount || parseFloat(amount) <= 0) {
    return {
      success: false,
      data: null,
      message: 'Input mint, output mint, and a valid amount are required',
    };
  }

  try {
    const quoteAmount = Math.floor(parseFloat(amount) * 10 ** inputMint.decimals);

    const { data } = await axios(
      `https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint.address}&outputMint=${outputMint.address}&amount=${quoteAmount}&slippageBps=${slippageBps}&restrictIntermediateTokens=true`
    );

    return {
      success: true,
      data: data,
      message: 'Quote fetched successfully',
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: `Error fetching quote: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
