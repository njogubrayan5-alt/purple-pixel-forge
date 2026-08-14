// scripts/ensure-unenv-shim.js
import fs from "fs";
import path from "path";

const targetPath = path.join("node_modules", "unenv", "dist", "runtime", "node");
const filePath = path.join(targetPath, "punycode.mjs");

try {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const content = `// Auto-generated shim to re-export punycode for unenv runtime resolution\n// DO NOT EDIT MANUALLY — this file is idempotently created by postinstall.\nexport * from "../../../punycode/index.js";\nexport { default } from "../../../punycode/index.js";\n`;
    fs.writeFileSync(filePath, content, { encoding: "utf8" });
    console.log("Created shim:", filePath);
  }
} catch (err) {
  console.error("Failed to ensure unenv shim file:", err);
  // Do not fail installs if writing fails
  process.exitCode = 0;
}
