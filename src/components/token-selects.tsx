'use client';

import { Command, CommandEmpty, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { TToken } from '@/types/global';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

type TokenSelectorProps = {
  tokens: TToken[];
  searchParams: { [key: string]: string | string[] | undefined };
};

const ITEM_HEIGHT = 48;
const HEIGHT = 300;

export default function TokenSelects({ tokens, searchParams }: TokenSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const inputMint = (searchParams?.inputMint as string) ?? '';
  const outputMint = (searchParams?.outputMint as string) ?? '';

  const [openInput, setOpenInput] = useState(false);
  const [openOutput, setOpenOutput] = useState(false);
  const [inputFilter, setInputFilter] = useState('');
  const [outputFilter, setOutputFilter] = useState('');

  const updateParams = useCallback(
    (type: 'inputMint' | 'outputMint', value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set(type, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router]
  );

  const filteredInputTokens = useMemo(() => {
    return inputFilter
      ? tokens.filter((t) => t.name.toLowerCase().includes(inputFilter.toLowerCase()) || t.symbol.toLowerCase().includes(inputFilter.toLowerCase()))
      : tokens;
  }, [inputFilter, tokens]);

  const filteredOutputTokens = useMemo(() => {
    return outputFilter
      ? tokens.filter((t) => t.name.toLowerCase().includes(outputFilter.toLowerCase()) || t.symbol.toLowerCase().includes(outputFilter.toLowerCase()))
      : tokens;
  }, [outputFilter, tokens]);

  const renderRow = (items: TToken[], onSelect: (token: TToken) => void) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCallback(
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const token = items[index];
        return (
          <CommandItem
            key={token.address}
            onSelect={() => onSelect(token)}
            style={style}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={token.logoURI.trim()}
              alt={token.symbol}
              height={24}
              width={24}
              className='mr-2'
            />
            <span className='mr-1'>{token.name}</span>
            <span className='text-muted-foreground'>({token.symbol})</span>
          </CommandItem>
        );
      },
      [items, onSelect]
    );

  const inputSelected = tokens.find((t) => t.address === inputMint);
  const outputSelected = tokens.find((t) => t.address === outputMint);

  return (
    <div className='space-y-2 border p-4 rounded-xl flex-1'>
      <h1 className='text-lg font-semibold'>Select Tokens</h1>
      <div className='flex justify-center items-center gap-4'>
        {/* Input Token Dropdown */}
        <Popover
          open={openInput}
          onOpenChange={setOpenInput}
        >
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='flex-1 justify-start py-5'
            >
              {inputSelected ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={inputSelected.logoURI.trim()}
                    alt={inputSelected.symbol}
                    height={24}
                    width={24}
                    className='mr-2'
                  />
                  {inputSelected.name} ({inputSelected.symbol})
                </>
              ) : (
                'Select Input Token'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[300px] p-0'>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder='Search token...'
                value={inputFilter}
                onValueChange={setInputFilter}
              />
              <CommandEmpty>No results found.</CommandEmpty>
              <div style={{ height: HEIGHT }}>
                <List
                  height={HEIGHT}
                  itemCount={filteredInputTokens.length}
                  itemSize={ITEM_HEIGHT}
                  width='100%'
                >
                  {renderRow(filteredInputTokens, (token) => {
                    updateParams('inputMint', token.address);
                    setOpenInput(false);
                    setInputFilter('');
                  })}
                </List>
              </div>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Output Token Dropdown */}
        <Popover
          open={openOutput}
          onOpenChange={setOpenOutput}
        >
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='flex-1 justify-start py-5'
            >
              {outputSelected ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={outputSelected.logoURI.trim()}
                    alt={outputSelected.symbol}
                    height={24}
                    width={24}
                    className='mr-2'
                  />
                  {outputSelected.name} ({outputSelected.symbol})
                </>
              ) : (
                'Select Output Token'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[300px] p-0'>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder='Search token...'
                value={outputFilter}
                onValueChange={setOutputFilter}
              />
              <CommandEmpty>No results found.</CommandEmpty>
              <div style={{ height: HEIGHT }}>
                <List
                  height={HEIGHT}
                  itemCount={filteredOutputTokens.length}
                  itemSize={ITEM_HEIGHT}
                  width='100%'
                >
                  {renderRow(filteredOutputTokens, (token) => {
                    updateParams('outputMint', token.address);
                    setOpenOutput(false);
                    setOutputFilter('');
                  })}
                </List>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
