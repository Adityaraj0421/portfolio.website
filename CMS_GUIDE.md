# CMS Integration for Fobet Media Portfolio

This guide explains how to set up and use the Sanity CMS for managing your project/case study content.

## Setup Instructions

### 1. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io/) and sign up
2. Create a new project
3. Note your **Project ID** and **Dataset name** (usually "production")

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.local.example`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token-here
```

**To get your API token:**

1. Go to [manage.sanity.io](https://manage.sanity.io/)
2. Select your project
3. Go to API → Tokens
4. Create a new token with **Editor** permissions
5. Copy the token to your `.env.local` file

### 3. Update Sanity Studio Configuration

Edit `studio/sanity.cli.ts` and update the project ID:

```typescript
{
  "api": {
    "projectId": "your-actual-project-id",
    "dataset": "production"
  }
}
```

### 4. Start Sanity Studio

```bash
cd studio
npm run dev
```

The Studio will open at `http://localhost:3333`

### 5. Migrate Existing Projects

Run the migration script to upload your existing projects:

```bash
# Edit scripts/migrate-to-sanity.ts and uncomment the last line
# Then run:
npx tsx scripts/migrate-to-sanity.ts
```

## Managing Content

### Adding a New Project

1. Open Sanity Studio at `http://localhost:3333`
2. Click "Create" → "Project"
3. Fill in all required fields:
   - **Title**: Project name
   - **Slug**: URL-friendly identifier (auto-generated from title)
   - **Category**: Project type (e.g., "Web Experience")
   - **Year**: Project year
   - **Client**: Client name
   - **Description**: Short project description
   - **Challenge**: The problem you solved
   - **Solution**: How you solved it
   - **Metrics**: Exactly 3 metrics (label + value)
4. Optional fields:
   - **Project Link**: Live project URL
   - **Status**: "Live", "Coming Soon", or "In Development"
   - **Hero Image**: Large background image for project page
   - **Thumbnail**: Smaller image for project listings
   - **Next Project**: Link to the next project in sequence
   - **Featured**: Show in featured sections
   - **Order**: Display order (lower numbers first)
5. Click "Publish"

### Editing a Project

1. Find the project in Sanity Studio
2. Make your changes
3. Click "Publish" to update

Changes will be reflected on your website within 1 hour (or immediately if you trigger a rebuild).

### Uploading Images

1. Click on an image field (Hero Image or Thumbnail)
2. Drag and drop an image or click to browse
3. Crop/adjust as needed
4. Add alt text for accessibility
5. Save

**Recommended image sizes:**

- Hero Image: 1920x1080px (16:9 ratio)
- Thumbnail: 800x800px (square) or 800x600px (4:3 ratio)

## Development Workflow

### Running the Website Locally

```bash
npm run dev
```

Your site will be at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### ISR (Incremental Static Regeneration)

The website uses ISR with a 1-hour revalidation period. This means:

- Pages are statically generated at build time
- Content updates appear within 1 hour
- Or immediately after a new deployment

## Troubleshooting

### "Project not found" error

- Check that your environment variables are set correctly
- Verify the project slug matches the URL
- Ensure the project is published in Sanity Studio

### Images not loading

- Verify `cdn.sanity.io` is in `next.config.ts` image domains
- Check that images are uploaded and published in Sanity
- Ensure image URLs are being generated correctly

### Build errors

- Run `npm run build` locally to test
- Check that all environment variables are set in your deployment platform
- Verify Sanity API token has correct permissions

## Next Steps

1. Upload project images to Sanity
2. Customize the Sanity Studio theme (in `studio/sanity.config.ts`)
3. Set up webhooks for instant revalidation (optional)
4. Add preview mode for draft content (optional)

## Support

For Sanity-specific issues, check:

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
