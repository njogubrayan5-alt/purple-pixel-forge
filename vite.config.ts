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
      // Externalize specific node-focused packages that should remain as runtime
      // dependencies instead of being bundled for SSR. Bundling them (noExternal: true)
      // causes rolldown to try to resolve node-specific runtime files like
      // unenv/dist/runtime/node/punycode.mjs which leads to Not a directory errors.
      external: ["tr46", "unenv", "punycode"],
      // Keep noExternal empty so we don't force-bundle all deps.
      noExternal: [],
    },
    resolve: {
      tsconfigPaths: true,
      alias: [
        // Keep the shim as a fallback for any import paths that still resolve to the
        // problematic runtime path. This should rarely be needed after externalizing,
        // but it's safe to keep.
        { find: /^punycode(\/.*)?$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
        { find: /unenv\/dist\/runtime\/node\/punycode\.mjs$/, replacement: path.resolve(__dirname, "src/shims/punycode.mjs") },
      ],
    },
  },
});
