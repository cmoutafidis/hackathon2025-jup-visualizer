import { getTokens } from '@/actions/token.action';

import SwapCard from '@/components/swap-card';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const tokens = await getTokens();

  if (!tokens.success) {
    throw new Error(tokens.message);
  }
  return (
    <main className='flex-1 flex justify-center items-center'>
      <SwapCard
        tokens={tokens.data ?? []}
        searchParams={await searchParams}
      />
    </main>
  );
}
