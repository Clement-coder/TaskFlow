# Deployment Guide

## Prerequisites
1. `npm install`
2. `cp .env.example .env` — add your `PRIVATE_KEY`
3. Fund wallet with CELO for gas (testnet faucet: https://faucet.celo.org)

## Deploy Core Suite
```bash
npm run deploy:testnet   # Alfajores first
npm run deploy:mainnet   # Then mainnet
```

## Deploy Extended Suite
```bash
npm run deploy:extended:testnet
npm run deploy:extended:mainnet
```

## Deploy via Factory (all in one tx)
```bash
npm run deploy:factory:mainnet
```

## Seed Test Data
```bash
TASK_REGISTRY_ADDRESS=0x... npm run seed:testnet
```

## Check Wallet Balance
```bash
npm run balance:testnet
npm run balance
```

## Contract Addresses (fill after deploy)

| Contract | Alfajores | Mainnet |
|---|---|---|
| TaskRegistry | | |
| ReputationLedger | | |
| WorkspaceGate | | |
| TaskFlowToken | | |
| ProofOfWork | | |
| DAOProposal | | |
| SprintBoard | | |
| MilestoneTracker | | |
| TeamRegistry | | |
| ProjectRegistry | | |
| WorkspaceRegistry | | |
| ActivityLogger | | |
| TaskBounty | | |
