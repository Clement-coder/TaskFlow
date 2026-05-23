# TaskFlow Celo Smart Contracts

On-chain task registry, reputation ledger, and token-gated workspace access — deployed on **Celo Mainnet**.

## Contracts

| Contract | Description |
|---|---|
| `TaskRegistry` | Create and track tasks on-chain with priority and status |
| `ReputationLedger` | Mint reputation points for completed tasks (High=70, Medium=50, Low=30) |
| `WorkspaceGate` | cUSD token-gated workspace access (threshold: 100 cUSD) |

## Setup

```bash
npm install
cp .env.example .env
# Add your PRIVATE_KEY to .env
```

## Commands

```bash
# Compile
npm run compile

# Test
npm test

# Deploy to Alfajores testnet
npm run deploy:testnet

# Deploy to Celo mainnet
npm run deploy:mainnet
```

## Celo Network Info

- **Mainnet RPC:** https://forno.celo.org (Chain ID: 42220)
- **Testnet RPC:** https://alfajores-forno.celo-testnet.org (Chain ID: 44787)
- **cUSD Mainnet:** `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- **Explorer:** https://celoscan.io

## Related

- Frontend: `../stacksfrontend`
- cowcare-sdk: https://www.npmjs.com/package/cowcare-sdk
