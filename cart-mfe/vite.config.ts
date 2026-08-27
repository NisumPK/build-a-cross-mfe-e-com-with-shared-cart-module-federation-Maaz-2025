import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const sharedDependencies = {
  react: { singleton: true },
  "react-dom": { singleton: true },
  "react-redux": { singleton: true },
  "@reduxjs/toolkit": { singleton: true },
  "react-router": { singleton: true },
  "react-router-dom": { singleton: true },
  "@mfe/shared": { singleton: true },
};

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart",
      filename: "assets/remoteEntry.js",
      dts: false,
      exposes: {
        "./CartApp": "./src/CartApp.tsx",
      },
      shared: sharedDependencies,
    }),
  ],
  server: {
    port: 5002,
    strictPort: true,
    origin: "http://localhost:5002",
    cors: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  },
  build: {
    target: "esnext",
  },
});
