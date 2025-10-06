const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

// Debug: Log the loaded environment variables
console.log("SEPOLIA_RPC_URL:", process.env.SEPOLIA_RPC_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "***SET***" : "NOT SET");

export default {
  expo: {
    name: "artonchain-app",
    slug: "artonchain-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "artonchainapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ]
    ],
    experiments: {
      reactCompiler: true
    },
    extra: {
      sepoliaUrl: process.env.SEPOLIA_RPC_URL,
      privateKey: process.env.PRIVATE_KEY
    }
  }
};
