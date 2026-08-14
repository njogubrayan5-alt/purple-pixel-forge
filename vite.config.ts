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
      external: [],
      noExternal: true,
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
