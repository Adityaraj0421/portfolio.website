# Sanity CMS Setup - Quick Start Guide

## Prerequisites

Before you begin, make sure you have:

- A Sanity account (sign up at [sanity.io](https://www.sanity.io/))
- Node.js installed
- This project cloned locally

## Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create Project"
3. Give your project a name (e.g., "Fobet Media Portfolio")
4. Choose a dataset name (use "production")
5. Note your **Project ID** - you'll need this!

## Step 2: Get Your API Token

1. In your Sanity project dashboard, go to **API** → **Tokens**
2. Click "Add API Token"
3. Name it (e.g., "Next.js Frontend")
4. Set permissions to **Editor**
5. Copy the token immediately (you won't see it again!)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
```

## Step 4: Update Sanity Studio Config

Edit `studio/sanity.cli.ts` and replace the project ID:

```typescript
{
  "api": {
    "projectId": "your-actual-project-id",  // Replace this!
    "dataset": "production"
  }
}
```

Also update `studio/sanity.config.ts` with your project ID (lines 8-9).

## Step 5: Start Sanity Studio

```bash
cd studio
npm run dev
```

The Studio will open at `http://localhost:3333`

## Step 6: Migrate Your Existing Projects

```bash
# Install tsx if not already installed
npm install --save-dev tsx

# Run the migration script
npx tsx scripts/migrate-to-sanity.ts
```

This will upload your 3 existing projects (Claussal.ai, Itz Confidential, Fobet Media) to Sanity.

## Step 7: Configure CORS (Important!)

1. Go to your Sanity project dashboard
2. Navigate to **API** → **CORS Origins**
3. Add these origins:
   - `http://localhost:3000` (for local development)
   - Your production domain (e.g., `https://yourdomain.com`)
   - Check "Allow credentials"

## Step 8: Test Your Setup

```bash
# In the main project directory
npm run dev
```

Visit `http://localhost:3000/work/claussal-ai` to see your first project loaded from Sanity!

## Next Steps

1. **Upload Images**: In Sanity Studio, edit each project and upload hero images and thumbnails
2. **Customize Studio**: Edit `studio/sanity.config.ts` to customize the Studio appearance
3. **Deploy**: Deploy your Next.js app to Vercel/Netlify with the environment variables set

## Troubleshooting

### "Cannot connect to Sanity"

- Check your Project ID and API Token in `.env.local`
- Make sure CORS is configured correctly

### "Images not loading"

- Verify images are uploaded in Sanity Studio
- Check that `cdn.sanity.io` is in your Next.js image config

### "Project not found"

- Make sure projects are published in Sanity Studio
- Check that the slug matches the URL

## Managing Content

See [CMS_GUIDE.md](./CMS_GUIDE.md) for detailed instructions on managing your projects.

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/sanity-nextjs-guide)
