// App.tsx
import "react-native-get-random-values"; // required by ethers in RN
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, AppRegistry } from "react-native";
import * as Clipboard from 'expo-clipboard';
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
  const [mintedTxHash, setMintedTxHash] = useState<string | null>(null);
  const [uriError, setUriError] = useState<string | null>(null);
  const [insertedAddress, setInsertedAddress] = useState("");
  const [activeTab, setActiveTab] = useState<"insert" | "deploy">("deploy");

  const deployContact = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
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
    } catch (e: any) {
      console.error("Deploy failed:", e?.message ?? String(e));
    } finally {
      setDeployingContract(false);
    }
  };

  const mintToMySelf = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
      return;
    }
    if (!address) {
      return;
    }
    
    // Validate IPFS URI format
    if (!uri.startsWith("ipfs://") || uri.length < 15) {
      setUriError("Invalid IPFS URI format. Must start with 'ipfs://' followed by a valid CID");
      return;
    }
    
    setUriError(null);
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
      setMintedTxHash(tx.hash);
      
      console.log(`Minted - Token ID: ${tokenId}, Tx: ${tx.hash}`);
    } catch (e: any) {
      console.error("Mint failed:", e?.message ?? String(e));
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
          
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>Contract Address</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text 
                selectable={!!address}
                style={{ 
                  fontSize: 14, 
                  flex: 1,
                  color: address ? "#000" : "#999"
                }} 
                numberOfLines={1} 
                ellipsizeMode="middle"
              >
                {address || "(not deployed yet)"}
              </Text>
              {address && (
                <TouchableOpacity
                  onPress={async () => {
                    await Clipboard.setStringAsync(address);
                  }}
                  style={{
                    padding: 4,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>📋</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <>
              {/* Tabs */}
              <View style={{ flexDirection: "row", marginBottom: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                <TouchableOpacity
                  onPress={() => setActiveTab("deploy")}
                  disabled={deployingContract}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    alignItems: "center",
                    borderBottomWidth: 2,
                    borderBottomColor: activeTab === "deploy" ? "#007AFF" : "transparent",
                  }}
                >
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: "600",
                    color: activeTab === "deploy" ? "#007AFF" : "#666"
                  }}>
                    Deploy
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => setActiveTab("insert")}
                  disabled={deployingContract}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    alignItems: "center",
                    borderBottomWidth: 2,
                    borderBottomColor: activeTab === "insert" ? "#5856D6" : "transparent",
                  }}
                >
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: "600",
                    color: activeTab === "insert" ? "#5856D6" : "#666"
                  }}>
                    Insert
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Deploy Tab Content */}
              {activeTab === "deploy" && (
                <View>
                  <Text style={{ marginBottom: 12, color: "#666" }}>
                    Deploy a new smart contract to the blockchain
                  </Text>
                  <TouchableOpacity
                    onPress={deployContact}
                    disabled={deployingContract}
                    style={{
                      backgroundColor: deployingContract ? "#ccc" : "#007AFF",
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
              )}

              {/* Insert Tab Content */}
              {activeTab === "insert" && (
                <View>
                  <Text style={{ marginBottom: 8 }}>Contract Address</Text>
                  <TextInput
                    value={insertedAddress}
                    onChangeText={setInsertedAddress}
                    placeholder="0x..."
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 4,
                      padding: 8,
                      fontSize: 14,
                      marginBottom: 12,
                      backgroundColor: "#fff"
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (insertedAddress.trim()) {
                        setAddress(insertedAddress.trim());
                        setInsertedAddress("");
                      }
                    }}
                    disabled={!insertedAddress.trim()}
                    style={{
                      backgroundColor: !insertedAddress.trim() ? "#ccc" : "#5856D6",
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                      Insert Contract
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
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
            onChangeText={(text) => {
              setUri(text);
              if (uriError) setUriError(null); // Clear error when user types
            }}
            placeholder="ipfs://..."
            style={{
              borderWidth: 1,
              borderColor: uriError ? "#ff0000" : "#ccc",
              borderRadius: 4,
              padding: 8,
              fontSize: 14,
              marginBottom: uriError ? 4 : 12,
              backgroundColor: address ? "#fff" : "#f0f0f0"
            }}
            editable={!minting && !!address}
          />
          
          {uriError && (
            <Text style={{ color: "#ff0000", fontSize: 12, marginBottom: 12 }}>
              {uriError}
            </Text>
          )}

          <Text selectable style={{ marginBottom: 4 }}>
            Minted Token ID: {mintedTokenId ?? "(not minted yet)"}
          </Text>
          
          <Text selectable style={{ marginBottom: 12, fontSize: 12 }}>
            Tx Hash: {mintedTxHash ?? "(not minted yet)"}
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
