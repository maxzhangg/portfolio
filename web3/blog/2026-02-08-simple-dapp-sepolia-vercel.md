# Building a Simple DApp on Sepolia and Vercel

This post documents a full end-to-end build of a minimal DApp: writing a Solidity contract, deploying it to Sepolia, connecting it with a Next.js frontend, and shipping the UI to Vercel.

## 1. Project Goal

I wanted a compact project that still covers the full Web3 flow:

- Smart contract authoring and deployment
- Wallet-based transaction signing
- Frontend read/write interaction via `viem`
- Cloud deployment with environment management

The contract is intentionally simple: it stores one string message and lets users update it.

## 2. Contract and Deployment

Contract name: `SimpleStorage`

Key functions:

- `getMessage()` reads current on-chain message
- `setMessage(string)` writes a new message
- `MessageUpdated` event is emitted on update

Deployment stack:

- `Hardhat`
- `@nomicfoundation/hardhat-toolbox`
- Sepolia RPC provider

Deployed contract address (Sepolia):

`0xc635bf97c2dE521B6B9466615f069645b695752E`

## 3. Frontend Integration

Frontend stack:

- `Next.js 14`
- `React 18`
- `TypeScript`
- `viem`

What the page does:

- Connect MetaMask wallet
- Ensure network is Sepolia
- Read current message from contract
- Submit transaction to update message
- Wait for receipt and refresh state

Environment variables used in frontend:

- `NEXT_PUBLIC_CONTRACT_ADDRESS`
- `NEXT_PUBLIC_SEPOLIA_RPC_URL`

## 4. Vercel Deployment

The frontend is deployed on Vercel at:

`https://simple-dapp-9yzwsly28-ms-projects-58b86da7.vercel.app`

Deployment notes:

- Root directory is the frontend folder
- `NEXT_PUBLIC_*` variables are configured in Vercel project settings
- Redeploy is required after environment variable changes

## 5. Issues and Fixes

During deployment, I hit a few common issues:

- `invalid project id`: RPC key was invalid
- `Missing env`: frontend env values were not loaded due to wrong file/restart timing
- `No Output Directory named "public"`: Vercel project config treated app as static output instead of Next.js

These were fixed by correcting RPC credentials, using `.env.local` correctly, and ensuring Vercel used a Next.js configuration.

## 6. Takeaways

Even a tiny DApp reveals the important engineering path in Web3:

- Signing and gas are unavoidable for state changes
- Frontend env strategy differs between local and cloud deployment
- Deployment platform config matters as much as code

This small project is now a reusable baseline for future experiments such as contract verification, event indexing, and richer UI states.
