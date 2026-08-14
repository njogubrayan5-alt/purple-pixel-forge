import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      // Externalize node runtime packages that should remain runtime dependencies
      external: ["tr46", "unenv", "punycode", "tr46/**", "unenv/**"],
      // noExternal must be an array or true. Use an empty array to avoid forcing bundling.
      noExternal: [],
    },
    resolve: {
      tsconfigPaths: true,
      alias: [
        // fallback shim for any remaining punycode resolution paths
        { find: /^punycode(\/.*)?$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
        { find: /unenv\/dist\/runtime\/node\/punycode\.mjs$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
      ],
    },
  },
});
