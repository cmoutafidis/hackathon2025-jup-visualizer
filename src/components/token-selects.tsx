'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TToken } from '@/types/global';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const TokenSelects = ({ tokens, searchParams }: { tokens: TToken[]; searchParams: { [key: string]: string | string[] | undefined } }) => {
  const router = useRouter();
  const pathname = usePathname();

  const inputMint = (searchParams?.inputMint as string) ?? undefined;
  const outputMint = (searchParams?.outputMint as string) ?? undefined;

  const handleValueChange = (type: 'inputMint' | 'outputMint', value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(type, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='space-y-4 border p-4 rounded-xl flex-1'>
      <h1 className='text-lg font-semibold'>Select Token</h1>
      <Select
        onValueChange={(value) => {
          handleValueChange('inputMint', value);
        }}
        value={inputMint}
      >
        <SelectTrigger className='w-full py-5'>
          <SelectValue placeholder='Select Input Token' />
        </SelectTrigger>
        <SelectContent>
          {tokens.map((token) => (
            <SelectItem
              key={token.address}
              value={token.address}
            >
              <Image
                src={token.logoURI}
                alt={token.symbol}
                height={24}
                width={24}
              />

              <span className=''>{token.name}</span>
              <span className='text-muted-foreground'>({token.symbol})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => {
          handleValueChange('outputMint', value);
        }}
        value={outputMint}
      >
        <SelectTrigger className='w-full py-5'>
          <SelectValue placeholder='Select Output Token' />
        </SelectTrigger>
        <SelectContent>
          {tokens.map((token) => (
            <SelectItem
              key={token.address}
              value={token.address}
            >
              <Image
                src={token.logoURI}
                alt={token.symbol}
                height={24}
                width={24}
              />

              <span className=''>{token.name}</span>
              <span className='text-muted-foreground'>({token.symbol})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TokenSelects;
