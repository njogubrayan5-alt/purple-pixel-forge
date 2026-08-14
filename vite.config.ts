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
      // Externalize specific node-focused packages that should remain runtime
      // dependencies instead of being bundled for SSR. Ensure we do NOT force
      // bundling by explicitly disabling noExternal (set to false).
      external: ["tr46", "unenv", "punycode", "tr46/**", "unenv/**"],
      // Some higher-level config (from @lovable.dev/vite-tanstack-config) may set
      // noExternal to true. Explicitly set it to false to prevent forced bundling
      // of node packages which triggers resolution of node-only runtime files.
      noExternal: false,
    },
    resolve: {
      tsconfigPaths: true,
      alias: [
        // Map punycode imports (with or without trailing slash) to our shim
        { find: /^punycode(\/.*)?$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
        // Ensure any reference to the unenv runtime file resolves to the shim
        { find: /unenv\/dist\/runtime\/node\/punycode\.mjs$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
      ],
    },
  },
});
