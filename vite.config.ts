import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Keep TanStack Start config so tooling still finds the server entry
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: /^punycode(\/.*)?$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
      { find: /unenv\/dist\/runtime\/node\/punycode\.mjs$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
    ],
  },
  ssr: {
    external: ["tr46", "unenv", "punycode", "tr46/**", "unenv/**"],
    noExternal: [],
  },
});
