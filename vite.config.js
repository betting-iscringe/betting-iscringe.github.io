import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "common",
        replacement: path.resolve(__dirname, "src/common"),
      },
    ],
  },

  plugins: [react()],
});
