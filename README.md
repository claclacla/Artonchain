# Artonchain

Artonchain is my personal project to bring my artwork on-chain as NFTs while I learn Web3. This repository serves as my learning journey into blockchain development, smart contracts, and the NFT ecosystem.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/claclacla/Artonchain.git
   cd Artonchain
   ```

2. **Install dependencies**
   ```bash
   cd contracts
   forge install
   ```

3. **Build and test**
   ```bash
   forge build
   forge test
   ```

## Blockchain Infrastructure

### Sepolia 🧪
**Sepolia** is a testnet (test network) for Ethereum:
- **Purpose**: A testing environment that mimics the real Ethereum network
- **Free**: Uses "fake" ETH that has no real value
- **Safe**: Perfect for testing smart contracts before deploying to mainnet
- **Why use it**: Deploy and test your contracts without spending real money

### Alchemy 🔗
**Alchemy** is the blockchain infrastructure provider used in this project:
- **What it does**: Provides reliable RPC endpoints to connect to Ethereum networks
- **RPC Endpoint**: A URL that lets your app communicate with the blockchain
- **Why use it**: Instead of running your own Ethereum node (expensive/complex), you use their infrastructure
- **Services**: Offers access to Ethereum, IPFS, and other blockchain networks

**Alchemy RPC URL format:**
```
https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

## Deployment

Deploy your Artonchain NFT contract to Sepolia testnet:

1. **Set environment variables**
   ```bash
   export SEPOLIA_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"
   export PRIVATE_KEY="your_private_key_here"
   ```
   
   Or create a `.env` file in the project root:
   ```
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   PRIVATE_KEY=your_private_key_here
   ```

2. **Deploy to Sepolia**
   ```bash
   forge script script/Deploy.s.sol --rpc-url sepolia --broadcast --verify
   ```

## Project Goals

- **Daily Learning**: Consistent progress in Web3 development
- **NFT Experimentation**: Exploring different NFT standards and features
- **Building in Public**: Sharing my journey and learning process

---

#Artonchain → my space to bring artwork on-chain as NFTs 🎨