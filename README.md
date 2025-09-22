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

## Deployment

Deploy your Artonchain NFT contract to Sepolia testnet:

1. **Set environment variables**
   ```bash
   export SEPOLIA_RPC_URL="your_sepolia_rpc_url_here"
   export PRIVATE_KEY="your_private_key_here"
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