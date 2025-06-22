'use client';

import React, { useMemo } from 'react';
import { ReactFlow, Node, Edge, Position, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { formatAmount } from '@/lib/utils';
import { TRoutePlan, TSwapQuote } from '@/types/global';

export default function VisualizerRenderer({ data }: { data: TSwapQuote }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    data.routePlan.forEach((item: TRoutePlan, index: number) => {
      const id = `${index}`;
      nodes.push({
        id,
        position: { x: index * 200, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <div className='text-xs text-left'>
              <div className='flex justify-between items-center gap-4'>
                <span className='font-bold text-lg truncate'>{item.swapInfo.label}</span>
                <span className='text-muted-foreground'>{item.percent}%</span>
              </div>

              {/* <div className='flex justify-between items-center gap-2'>
                <span>AMM: </span>
                <span className='truncate'>{item.swapInfo.ammKey}</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <span>Input: </span>
                <span className='truncate'>{item.swapInfo.inputMint}</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <span>Output: </span>
                <span className='truncate'>{item.swapInfo.outputMint}</span>
              </div> */}
              <div className='flex justify-between items-center gap-2'>
                <span>In Amt: </span>
                <span>{formatAmount(item.swapInfo.inAmount)}</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <span>Out Amt: </span>
                <span>{formatAmount(item.swapInfo.outAmount)}</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <span>Fee: </span>
                <span> {formatAmount(item.swapInfo.feeAmount)}</span>
              </div>
            </div>
          ),
        },
        style: {
          width: 180,
          overflowWrap: 'break-word',
          border: '1px solid var(--border)',
          padding: 10,
          borderRadius: 'var(--radius)',
          background: 'var(--card)',
          color: 'var(--card-foreground)',
        },
      });

      if (index > 0) {
        edges.push({
          id: `e${index - 1}-${index}`,
          source: `${index - 1}`,
          target: id,
          animated: true,
          style: {
            stroke: 'var(--primary)',
          },
        });
      }
    });

    return { nodes, edges };
  }, [data]);

  return (
    <div className='w-full h-full border rounded-lg'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Controls
          style={{
            backgroundColor: 'var(--background)',
          }}
        />
        <MiniMap
          style={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
          }}
          nodeColor='var(--primary)'
          nodeStrokeColor='var(--border)'
          maskColor='var(--secondary)'
        />
      </ReactFlow>
    </div>
  );
}
