import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Replit deployments run a Node server. Using Nitro's default Cloudflare
  // preset makes the MongoDB dependency pass through unenv's punycode shim,
  // which cannot be bundled by Rolldown.
  nitro: {
    preset: "node-server",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
  },
});
