import { TAPIResponse, TToken } from '@/types/global';

export const getTokens = async (): Promise<TAPIResponse<TToken[]>> => {
  try {
    const response = await fetch('https://token.jup.ag/strict', { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }
    const data = await response.json();

    return {
      success: true,
      data: data ?? [],
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
