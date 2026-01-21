import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Sanity client configuration
export const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false, // We use ISR, so we can fetch fresh data
    token: process.env.SANITY_API_TOKEN,
});

if (projectId === 'missing-project-id') {
    console.warn('⚠️ Sanity Project ID is missing. Build may fail during static generation.');
}

export const isConfigured = projectId !== 'missing-project-id';

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlForImage(source: any) {
    return builder.image(source);
}
