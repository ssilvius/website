# sean.silvius.me 
## A Next.js static content website with MDX blogging
This is my personal site's code. It is based on Next.js 14 app router with static generation of content from markdown files. The drafts folder contains work-in-progress content.

## Deployment on Vercel

This project uses pnpm as the package manager. When deploying to Vercel, you need to enable Corepack to ensure the correct pnpm version is used:

1. Add an environment variable in your Vercel project settings:
   - Name: `ENABLE_EXPERIMENTAL_COREPACK` 
   - Value: `1`

This allows Vercel to use the pnpm version specified in the `packageManager` field of your package.json, resolving any version compatibility issues during the build process.