## TaskFlow Smart Contracts — Celo

Full on-chain suite for the TaskFlow decentralized project management platform.

### Contracts

| Contract | Description |
|---|---|
| `TaskRegistry` | Create and track tasks with priority and status |
| `ReputationLedger` | Mint rep points per task (High=70, Med=50, Low=30) |
| `WorkspaceGate` | cUSD token-gated workspace access |
| `TaskFlow` | Orchestrator — completeTask mints rep in one tx |
| `TaskFlowFactory` | Deploy all contracts in one transaction |
| `TaskFlowToken` | ERC20 governance token (TFT, 100M max) |
| `ProofOfWork` | ERC721 NFT minted on task completion |
| `SprintBoard` | On-chain sprint management |
| `DAOProposal` | On-chain voting for roadmap proposals |
| `MilestoneTracker` | Roadmap milestones with upvoting |
| `TeamRegistry` | Team member and role management |
| `ProjectRegistry` | Project tracking with status and progress |
| `WorkspaceRegistry` | Workspace creation and membership |
| `ActivityLogger` | On-chain audit log |
| `TaskBounty` | Post and claim cUSD bounties for tasks |

### Interfaces

`contracts/interfaces/` — ITaskRegistry, IReputationLedger, IWorkspaceGate, ISprintBoard, IDAOProposal, IMilestoneTracker

### Utils

`contracts/utils/` — Pausable, Ownable, ReentrancyGuard

### Networks

| Network | Chain ID | RPC |
|---|---|---|
| Celo Mainnet | 42220 | https://forno.celo.org |
| Alfajores Testnet | 44787 | https://alfajores-forno.celo-testnet.org |

### cUSD Addresses

- Mainnet: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
- Alfajores: `0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1`
