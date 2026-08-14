import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      external: [],
      noExternal: true,
    },
    resolve: {
      // prefer native tsconfig paths support instead of the old plugin
      tsconfigPaths: true,
      alias: [
        // Map both "punycode" and "punycode/" imports to the package main file
        { find: /^punycode(\/.*)?$/, replacement: path.resolve(__dirname, "node_modules/punycode/index.js") },
      ],
    },
  },
});
