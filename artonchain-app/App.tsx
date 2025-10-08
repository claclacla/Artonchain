// App.tsx
import "react-native-get-random-values"; // required by ethers in RN
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, AppRegistry } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ethers } from "ethers";
import artifact from "./Artonchain.json"; // <— copied from Foundry out/
import { RPC_URL, PRIVATE_KEY } from "./env";

export default function App() {
  const [deployingContract, setDeployingContract] = useState(false);
  const [minting, setMinting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [uri, setUri] = useState("ipfs://");
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  const deployContact = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
      Alert.alert("Missing env", "Start with PRIVATE_KEY and SEPOLIA_RPC_URL set.");
      return;
    }
    setDeployingContract(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

      const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        wallet
      );

      const contract = await factory.deploy(); // no constructor args
      await contract.deployed();
      setAddress(contract.address);
      Alert.alert("Deployed 🎉", `Address: ${contract.address}`);
    } catch (e: any) {
      Alert.alert("Deploy failed", e?.message ?? String(e));
    } finally {
      setDeployingContract(false);
    }
  };

  const mintToMySelf = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
      Alert.alert("Missing env", "Start with PRIVATE_KEY and SEPOLIA_RPC_URL set.");
      return;
    }
    if (!address) {
      Alert.alert("No contract", "Deploy first to get the contract address.");
      return;
    }
    setMinting(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(address, artifact.abi, wallet);

      // calls your mintArt(address, string) with metadata URI — mints to yourself
      const tx = await contract.mintArt(wallet.address, uri);
      const receipt = await tx.wait();
      
      // Extract token ID from the Transfer event
      const transferEvent = receipt.events?.find((e: any) => e.event === "Transfer");
      const tokenId = transferEvent?.args?.tokenId?.toString();
      
      if (tokenId) {
        setMintedTokenId(tokenId);
      }
      
      Alert.alert("Minted ✅", `Token ID: ${tokenId}\nTx: ${tx.hash}`);
      console.log(`Tx: ${tx.hash}`);
    } catch (e: any) {
      Alert.alert("Mint failed", e?.message ?? String(e));
    } finally {
      setMinting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", textAlign: "center" }}>Artonchain</Text>

        {/* Contract Box */}
        <View style={{ 
          borderWidth: 1, 
          borderColor: "#ddd", 
          borderRadius: 8, 
          padding: 16, 
          backgroundColor: "#f9f9f9" 
        }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>Contract</Text>
          <Text selectable style={{ marginBottom: 4 }}>RPC: {RPC_URL ?? "(not set)"}</Text>
          <Text selectable style={{ marginBottom: 12 }}>Contract: {address ?? "(not deployed yet)"}</Text>
          
          <TouchableOpacity
            onPress={deployContact}
            disabled={deployingContract || !!address}
            style={{
              backgroundColor: (deployingContract || !!address) ? "#ccc" : "#007AFF",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              {deployingContract ? "Working..." : "Deploy Contract"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* NFT Box */}
        <View style={{ 
          borderWidth: 1, 
          borderColor: "#ddd", 
          borderRadius: 8, 
          padding: 16, 
          backgroundColor: "#f9f9f9" 
        }}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>NFT</Text>
          
          <Text style={{ marginBottom: 8 }}>Metadata URI (ipfs://…)</Text>
          <TextInput
            value={uri}
            onChangeText={setUri}
            placeholder="ipfs://..."
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              padding: 8,
              fontSize: 14,
              marginBottom: 12,
              backgroundColor: address ? "#fff" : "#f0f0f0"
            }}
            editable={!minting && !!address}
          />

          <Text selectable style={{ marginBottom: 12 }}>
            Minted Token ID: {mintedTokenId ?? "(not minted yet)"}
          </Text>
          
          <TouchableOpacity
            onPress={mintToMySelf}
            disabled={minting || !address}
            style={{
              backgroundColor: (minting || !address) ? "#ccc" : "#34C759",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              {minting ? "Working..." : "Mint to my self"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Register the app with AppRegistry
AppRegistry.registerComponent('main', () => App);
