import { getTokens } from '@/actions/token.action';
import SwapCard from '@/components/swap-card';

export default async function Home() {
  const tokens = await getTokens();

  if (!tokens.success) {
    throw new Error(tokens.message);
  }
  return (
    <main className='flex-1 flex justify-center items-center'>
      <SwapCard tokens={tokens.data ?? []} />
    </main>
  );
}
