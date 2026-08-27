import { createAppStore } from "@mfe/shared";

// This is the one runtime store used by the host and every mounted remote.
// Standalone remote entry points may create development stores, but exposed
// remote components consume this instance through the Provider in main.tsx.
export const store = createAppStore();
