// Re-export the CommonJS punycode package as ESM for the bundler.
// This shim lets Vite/Rolldown resolve requests like "punycode/" or the unenv runtime path.
export * from "../node_modules/punycode/index.js";
export { default } from "../node_modules/punycode/index.js";
