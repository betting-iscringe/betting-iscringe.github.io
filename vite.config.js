import { defineConfig } from "vite";
import crypto from "node:crypto";
import react from "@vitejs/plugin-react";
import path from "path";

const cspNonce = crypto.randomBytes(32).toString("base64");

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "common",
        replacement: path.resolve(__dirname, "src/common"),
      },
    ],
  },
  html: {
    cspNonce: `nonce-${cspNonce}`,
  },

  plugins: [react()],
});
