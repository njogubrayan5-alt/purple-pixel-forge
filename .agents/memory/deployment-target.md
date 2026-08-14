---
name: Replit deployment target
description: Deployment target guidance for the MongoDB-backed TanStack Start app.
---

Use Nitro's `node-server` preset for Replit deployments of this app rather than the default Cloudflare preset.

**Why:** The MongoDB dependency brings in `tr46` and `punycode`; the Cloudflare/unenv bundle path fails in Rolldown when resolving `punycode/`, while the Node server bundle completes successfully.

**How to apply:** Keep the Nitro preset set to `node-server` unless the deployment platform changes. If the platform changes, verify its supported Nitro preset before changing this decision.