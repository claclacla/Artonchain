// App.tsx
import "react-native-get-random-values"; // required by ethers in RN
import React, { useState } from "react";
import { View, Text, Button, Alert, AppRegistry } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ethers } from "ethers";
import artifact from "./Artonchain.json"; // <— copied from Foundry out/
import { RPC_URL, PRIVATE_KEY } from "./env";

export default function App() {
  const [busy, setBusy] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const deploy = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
      Alert.alert("Missing env", "Start with PRIVATE_KEY and SEPOLIA_RPC_URL set.");
      return;
    }
    setBusy(true);
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
      setBusy(false);
    }
  };

  const mintSelf = async () => {
    if (!RPC_URL || !PRIVATE_KEY) {
      Alert.alert("Missing env", "Start with PRIVATE_KEY and SEPOLIA_RPC_URL set.");
      return;
    }
    if (!address) {
      Alert.alert("No contract", "Deploy first to get the contract address.");
      return;
    }
    setBusy(true);
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(address, artifact.abi, wallet);

      // calls your mintArt(address) — mints to yourself
      const tx = await contract.mintArt(wallet.address);
      await tx.wait();
      Alert.alert("Minted ✅", `Tx: ${tx.hash}`);
    } catch (e: any) {
      Alert.alert("Mint failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>Artonchain — Deploy & Mint</Text>
        <Text selectable>RPC: {RPC_URL ?? "(not set)"}</Text>
        <Text selectable>Contract: {address ?? "(not deployed yet)"}</Text>

        <Button title={busy ? "Working..." : "Deploy Contract"} onPress={deploy} disabled={busy} />
        <Button title={busy ? "Working..." : "Mint to Self"} onPress={mintSelf} disabled={busy || !address} />
      </View>
    </SafeAreaView>
  );
}

// Register the app with AppRegistry
AppRegistry.registerComponent('main', () => App);
