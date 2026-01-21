import { client, isConfigured } from './client';
import { Project, ProjectListing } from './types';

// GROQ query to get all projects with basic info
export async function getAllProjects(): Promise<ProjectListing[]> {
  if (!isConfigured) return [];
  const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    platform,
    industry,
    year,
    description,
    thumbnail,
    featured
  }`;

  return await client.fetch(query);
}

// GROQ query to get a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isConfigured) return null;
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    platform,
    industry,
    deliverables,
    year,
    client,
    liveLink,
    repoLink,
    demoVideo,
    status,
    description,
    problemStatement,
    solution,
    process,
    keyFeatures,
    impactStats[] {
      _key,
      label,
      value
    },
    techStack,
    aiArchitecture,
    nextProject->{
      title,
      slug
    },
    heroImage,
    designSystemAssets,
    mockups,
    thumbnail,
    featured,
    order
  }`;

  return await client.fetch(query, { slug });
}

// Get all project slugs for static generation
export async function getProjectSlugs(): Promise<string[]> {
  if (!isConfigured) return [];
  const query = `*[_type == "project"].slug.current`;
  return await client.fetch(query);
}

// Get featured projects
export async function getFeaturedProjects(): Promise<ProjectListing[]> {
  if (!isConfigured) return [];
  const query = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    platform,
    industry,
    year,
    description,
    thumbnail,
    featured
  }`;

  return await client.fetch(query);
}

// Get next project in sequence
export async function getNextProject(currentSlug: string): Promise<Project | null> {
  if (!isConfigured) return null;
  const query = `*[_type == "project" && slug.current == $currentSlug][0].nextProject->{
    _id,
    title,
    slug,
    platform,
    industry,
    year,
    thumbnail
  }`;

  return await client.fetch(query, { currentSlug });
}
