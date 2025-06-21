import { TAPIResponse, TToken } from '@/types/global';
import axios from 'axios';

export const getTokens = async (): Promise<TAPIResponse<TToken[]>> => {
  try {
    const { data } = await axios.get('https://token.jup.ag/all');

    return {
      success: true,
      data: data.slice(0, 10) ?? [],
      message: 'Tokens fetched successfully',
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: `Error fetching tokens: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
