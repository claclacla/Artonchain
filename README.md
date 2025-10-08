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

**Getting Sepolia ETH:**
You'll need Sepolia ETH to pay for gas fees when deploying contracts. Get free test ETH from:
- [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) - Recommended for this project

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
   forge script script/Deploy.s.sol:Deploy \
  --rpc-url $SEPOLIA_RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast
   ```

## Mobile App

**React Native app** for deploying and minting NFTs directly from mobile:

### Setup
1. **Navigate to app directory**
   ```bash
   cd artonchain-app
   npm install
   ```

2. **Run on iOS/Android**
   ```bash
   npx expo start
   ```

### App Functions
- **Deploy Contract**: Creates the NFT contract on blockchain (one-time setup)
- **Mint NFT**: Creates individual NFTs using the deployed contract (can do many times)

### Environment Variables
- `SEPOLIA_RPC_URL`: Your Alchemy Sepolia endpoint
- `PRIVATE_KEY`: Your wallet private key (without 0x prefix)

## File Storage

### Pinata 📌
**Pinata** is a decentralized storage service for IPFS (InterPlanetary File System):
- **What it does**: Provides reliable IPFS pinning and hosting for NFT metadata and images
- **Why use it**: Ensures your NFT artwork files remain accessible and don't get garbage collected
- **NFT Integration**: Stores artwork images and metadata JSON files that your smart contract references
- **Permanent Links**: Creates immutable IPFS hashes that can't be changed or deleted

**Project Files on Pinata:**
- NFT artwork images (PNG, JPG, GIF, etc.)
- Metadata JSON files containing artwork details
- IPFS URIs that your smart contract uses for minting

## Project Goals

- **Daily Learning**: Consistent progress in Web3 development
- **NFT Experimentation**: Exploring different NFT standards and features
- **Building in Public**: Sharing my journey and learning process

---

#Artonchain → my space to bring artwork on-chain as NFTs 🎨