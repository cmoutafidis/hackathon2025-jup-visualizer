'use client';

import React, { useMemo } from 'react';
import { ReactFlow, Node, Edge, Position, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { formatAmount } from '@/lib/utils';
import { TRoutePlan, TSwapQuote, TToken } from '@/types/global';

export default function VisualizerRenderer({ data, inputMint, outputMint }: { data: TSwapQuote; inputMint?: TToken; outputMint?: TToken }) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodeStyle: React.CSSProperties = {
      width: 180,
      overflowWrap: 'break-word',
      border: '1px solid var(--border)',
      padding: 10,
      borderRadius: 'var(--radius)',
      background: 'var(--card)',
      color: 'var(--card-foreground)',
    };
    const edgeStyle = {
      stroke: 'var(--primary)',
    };

    if (inputMint) {
      nodes.push({
        id: 'input',
        position: { x: -250, y: 0 },
        sourcePosition: Position.Right,
        className: 'start-node',
        data: {
          label: (
            <div className='text-xs text-left'>
              <div className='font-bold text-lg truncate'>{inputMint.name}</div>
              <div className='text-muted-foreground'>{inputMint.symbol}</div>
            </div>
          ),
        },
        style: nodeStyle,
      });
    }

    data.routePlan.forEach((item: TRoutePlan, index: number) => {
      const id = `${index}`;
      nodes.push({
        id,
        position: { x: index * 250, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <div className='text-xs text-left'>
              <div className='flex justify-between items-center gap-4'>
                <span className='font-bold text-lg truncate'>{item.swapInfo.label}</span>
                <span className='text-muted-foreground'>{item.percent}%</span>
              </div>

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
        style: nodeStyle,
      });

      if (index > 0) {
        edges.push({
          id: `e${index - 1}-${index}`,
          source: `${index - 1}`,
          target: id,
          animated: true,
          style: edgeStyle,
        });
      }
    });

    if (outputMint) {
      nodes.push({
        id: 'output',
        position: { x: data.routePlan.length * 250, y: 0 },
        targetPosition: Position.Left,
        className: 'end-node',
        data: {
          label: (
            <div className='text-xs text-left'>
              <div className='font-bold text-lg truncate'>{outputMint.name}</div>
              <div className='text-muted-foreground'>{outputMint.symbol}</div>
            </div>
          ),
        },
        style: nodeStyle,
      });
    }

    if (inputMint && data.routePlan.length > 0) {
      edges.push({
        id: 'e-input-0',
        source: 'input',
        target: '0',
        animated: true,
        style: edgeStyle,
      });
    }

    if (outputMint && data.routePlan.length > 0) {
      edges.push({
        id: `e-${data.routePlan.length - 1}-output`,
        source: `${data.routePlan.length - 1}`,
        target: 'output',
        animated: true,
        style: edgeStyle,
      });
    }

    return { nodes, edges };
  }, [data, inputMint, outputMint]);

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
