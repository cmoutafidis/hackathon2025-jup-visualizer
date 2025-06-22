# 🚀 Jup Visualizer

> **Built in Namaste Jupiverse - Hackathon Edition (HYD)!**

A cutting-edge, real-time swap route visualizer for Jupiter DEX that transforms complex DeFi transactions into beautiful, interactive flow diagrams. Watch your swaps come to life with animated route visualization, real-time quotes, and a modern, intuitive interface.

## ✨ Features

### 🎯 Core Functionality

- **Interactive Route Visualization**: Beautiful DAG (Directed Acyclic Graph) visualization of swap routes using React Flow
- **Token Selection**: Browse and select from Jupiter's comprehensive token list
- **Amount & Slippage Control**: Fine-tune your swap parameters with precision

### 🎨 Visual Experience

- **Animated Flow Diagrams**: Watch your swap route animate from input to output
- **Token Details Display**: See input/output tokens with names, symbols, and amounts
- **Route Breakdown**: Each hop shows AMM, amounts, fees, and percentage allocation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Built-in theme switching for optimal viewing

### 🔧 Technical Highlights

- **Server Actions**: Lightning-fast API calls with Next.js 15 server actions
- **Type Safety**: Full TypeScript implementation for rock-solid reliability
- **Modern UI**: Built with Radix UI primitives and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Visualization**: React Flow (@xyflow/react)
- **HTTP Client**: Axios
- **Package Manager**: pnpm
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd jup

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic happen! ✨

## 🎮 How to Use

1. **Select Tokens**: Choose your input and output tokens from the dropdown
2. **Enter Amount**: Specify how much you want to swap
3. **Adjust Slippage**: Set your preferred slippage tolerance (default: 0.5%)
4. **Watch the Magic**: See your swap route visualization!

## 🔗 API Integration

This project integrates with Jupiter's public APIs:

- **Token List**: `https://token.jup.ag/strict`
- **Quote API**: `https://lite-api.jup.ag/swap/v1/quote`

## 📁 Project Structure

```
src/
├── actions/          # Server actions for API calls
├── app/             # Next.js app router pages
├── components/      # React components
│   ├── ui/         # Reusable UI primitives
│   └── ...         # Feature components
├── lib/            # Utility functions
├── providers/      # React context providers
└── types/          # TypeScript type definitions
```
