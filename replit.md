# FireboxTechs

## Overview

FireboxTechs is a TanStack Start website for a technology company, with public pages for the company, services, projects, technologies, and contact, plus an admin area. The project uses React, Vite, Tailwind CSS, Nitro, and MongoDB.

## Development

- Install dependencies with `bun install`
- Start the development server with `bun run dev`
- Create a production build with `bun run build`

## Deployment

Nitro is configured with the `node-server` preset for Replit deployments. This keeps the MongoDB server dependency in a Node-compatible bundle and avoids the Cloudflare `unenv` punycode build failure.

## User preferences

- Preserve the existing TanStack Start and Vite structure.
- Prefer small, targeted changes over migrations or broad refactors.