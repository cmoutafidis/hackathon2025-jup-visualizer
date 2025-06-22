'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TToken } from '@/types/global';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const AmountBps = ({ inputMint, searchParams }: { inputMint: TToken | undefined; searchParams: { [key: string]: string | string[] | undefined } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const amountFromParams = (searchParams?.amount as string) ?? '';
  const slippageBpsFromParams = (searchParams?.slippageBps as string) ?? '50';

  const [amount, setAmount] = useState(amountFromParams);
  const [slippageBps, setSlippageBps] = useState(slippageBpsFromParams);

  const [debouncedAmount] = useDebounce(amount, 300);
  const [debouncedSlippageBps] = useDebounce(slippageBps, 300);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('amount', debouncedAmount);
    params.set('slippageBps', debouncedSlippageBps);
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedAmount, debouncedSlippageBps, pathname, router]);

  return (
    <div className='space-y-4 border p-4 rounded-xl flex-1'>
      <h1 className='text-lg font-semibold'>Swap</h1>
      <div className='flex justify-center items-end gap-4'>
        <div className='space-y-2 flex-1'>
          <Label htmlFor='amount'>Amount</Label>
          <Input
            id='amount'
            placeholder='Enter amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            rightElement={inputMint?.symbol ?? '---'}
            rightElementClassName='text-sm text-muted-foreground pr-2'
          />
        </div>
        <div className='space-y-2 flex-1 border py-3 px-3 dark:bg-input/30 rounded-md shadow-xs'>
          <Label htmlFor='slippage'>Slippage BPS</Label>
          <Slider
            value={[Number(slippageBps)]}
            onValueChange={(value) => setSlippageBps(String(value[0]))}
            min={10}
            max={100}
            step={10}
          />
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>10</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountBps;
