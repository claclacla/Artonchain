import Constants from "expo-constants";

const EXTRA: any = Constants.expoConfig?.extra ?? {};
console.log("Constants.expoConfig:", Constants.expoConfig);
console.log("EXTRA:", EXTRA);

export const RPC_URL = EXTRA.sepoliaUrl;
export const PRIVATE_KEY = EXTRA.privateKey;

console.log("SEPOLIA_RPC_URL:", RPC_URL);
console.log("PRIVATE_KEY:", PRIVATE_KEY ? "***SET***" : "NOT SET");
