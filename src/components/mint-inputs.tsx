'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TToken } from '@/types/global';
import Image from 'next/image';

const MintInputs = ({
  tokens,
  inputMint,
  setInputMint,
  outputMint,
  setOutputMint,
}: {
  tokens: TToken[];
  inputMint: TToken | undefined;
  setInputMint: (value: TToken | undefined) => void;
  outputMint: TToken | undefined;
  setOutputMint: (value: TToken | undefined) => void;
}) => {
  return (
    <div className='space-y-4 border p-4 rounded-xl flex-1'>
      <h1 className='text-lg font-semibold'>Select Token</h1>
      <Select
        onValueChange={(value) => {
          const token = tokens.find((t) => t.address === value);
          setInputMint(token);
        }}
        value={inputMint?.address}
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
          const token = tokens.find((t) => t.address === value);
          setOutputMint(token);
        }}
        value={outputMint?.address}
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

export default MintInputs;
