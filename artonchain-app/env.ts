import Constants from "expo-constants";

const EXTRA: any = Constants.expoConfig?.extra ?? {};

export const RPC_URL = EXTRA.sepoliaUrl;
export const PRIVATE_KEY = EXTRA.privateKey;
