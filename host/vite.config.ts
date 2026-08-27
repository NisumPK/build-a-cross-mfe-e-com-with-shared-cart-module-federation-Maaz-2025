import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const versions = {
  react: "19.2.8",
  reduxToolkit: "2.12.0",
  reactRedux: "9.3.0",
  reactRouter: "7.18.2",
} as const;

const sharedDependencies = {
  react: { singleton: true, requiredVersion: versions.react },
  "react-dom": { singleton: true, requiredVersion: versions.react },
  "react-redux": { singleton: true, requiredVersion: versions.reactRedux },
  "@reduxjs/toolkit": {
    singleton: true,
    requiredVersion: versions.reduxToolkit,
  },
  "react-router": {
    singleton: true,
    requiredVersion: versions.reactRouter,
  },
  "react-router-dom": {
    singleton: true,
    requiredVersion: versions.reactRouter,
  },
  "@mfe/shared": { singleton: true, requiredVersion: "1.0.0" },
};

function remote(name: string, entry: string) {
  return {
    name,
    entry,
    type: "module" as const,
    shareScope: "default",
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    plugins: [
      react(),
      federation({
        name: "host",
        dts: false,
        remotes: {
          catalog: remote(
            "catalog",
            env.VITE_CATALOG_REMOTE_URL ||
              "http://localhost:5001/assets/remoteEntry.js",
          ),
          cart: remote(
            "cart",
            env.VITE_CART_REMOTE_URL ||
              "http://localhost:5002/assets/remoteEntry.js",
          ),
        },
        shared: sharedDependencies,
      }),
    ],
    server: {
      port: 5000,
      strictPort: true,
      cors: true,
    },
    preview: {
      port: 5000,
      strictPort: true,
      cors: true,
    },
    build: {
      target: "esnext",
    },
  };
});
