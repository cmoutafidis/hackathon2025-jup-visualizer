import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TRoutePlan, TSwapQuote } from '@/types/global';
import { Fragment } from 'react';

const formatAmount = (amount: string, decimals = 6) => (Number(amount) / 10 ** decimals).toFixed(4);

const VisualizerRenderer = ({ data }: { data: TSwapQuote }) => {
  return (
    <div className='flex justify-between items-center gap-3'>
      {data.routePlan.map((item: TRoutePlan, index: number) => (
        <Fragment key={index}>
          <Tooltip>
            <TooltipTrigger className='border rounded-full px-4 py-3 shadow hover:bg-muted focus:outline-none'>
              <div className='text-sm font-semibold text-center truncate w-24'>{item.swapInfo.label}</div>
              <div className='text-xs text-muted-foreground text-center'>{item.percent}%</div>
            </TooltipTrigger>

            <TooltipContent
              className='text-sm max-w-sm p-3 rounded-md border shadow-md bg-background'
              tooltipArrowClassName='bg-background fill-background shadow-md'
            >
              <div className='space-y-1'>
                <div className='font-semibold text-base mb-1'>{item.swapInfo.label}</div>

                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>AMM Key</span>
                  <span className='text-right break-all text-muted-foreground'>{item.swapInfo.ammKey}</span>
                </div>

                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>Input Mint</span>
                  <span className='text-right break-all text-muted-foreground'>{item.swapInfo.inputMint}</span>
                </div>

                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>Output Mint</span>
                  <span className='text-right break-all text-muted-foreground'>{item.swapInfo.outputMint}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Input Amt</span>
                  <span>{formatAmount(item.swapInfo.inAmount)}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Output Amt</span>
                  <span>{formatAmount(item.swapInfo.outAmount)}</span>
                </div>

                <div className='flex justify-between'>
                  <span className='font-medium'>Fee</span>
                  <span>{formatAmount(item.swapInfo.feeAmount)}</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>

          {index !== data.routePlan.length - 1 && <div className='flex-1 bg-neutral-200 h-px' />}
        </Fragment>
      ))}
    </div>
  );
};

export default VisualizerRenderer;
