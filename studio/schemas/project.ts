import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        { name: 'overview', title: 'Overview', default: true },
        { name: 'classification', title: 'Classification' },
        { name: 'narrative', title: 'Case Study' },
        { name: 'technical', title: 'Technical Details' },
        { name: 'metrics', title: 'Metrics & Impact' },
        { name: 'media', title: 'Media & Assets' },
        { name: 'visual', title: 'Visual Customization' },
    ],
    fields: [
        // OVERVIEW GROUP
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            group: 'overview',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'overview',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            group: 'overview',
            description: 'Brief tagline or elevator pitch',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            group: 'overview',
            options: {
                list: [
                    { title: 'Live', value: 'live' },
                    { title: 'Coming Soon', value: 'Coming Soon' },
                    { title: 'In Development', value: 'In Development' },
                    { title: 'Beta', value: 'beta' },
                ],
            },
        }),
        defineField({
            name: 'featured',
            title: 'Featured Project',
            type: 'boolean',
            group: 'overview',
            description: 'Show this project in featured sections',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            group: 'overview',
            description: 'Lower numbers appear first',
        }),

        // CLASSIFICATION GROUP
        defineField({
            name: 'platform',
            title: 'Platform / Form Factor',
            type: 'string',
            group: 'classification',
            options: {
                list: [
                    { title: 'Web App / SaaS', value: 'web-app' },
                    { title: 'Chrome Extension', value: 'chrome-extension' },
                    { title: 'Mobile App (iOS/Android)', value: 'mobile-app' },
                    { title: 'Desktop App', value: 'desktop-app' },
                    { title: 'Agentic Tool / AI System', value: 'agentic-tool' },
                    { title: 'API / Backend Service', value: 'api-service' },
                    { title: 'Design System / Component Library', value: 'design-system' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'industry',
            title: 'Industry / Sector',
            type: 'string',
            group: 'classification',
            options: {
                list: [
                    { title: 'LegalTech', value: 'legaltech' },
                    { title: 'FinTech', value: 'fintech' },
                    { title: 'HealthTech', value: 'healthtech' },
                    { title: 'EdTech', value: 'edtech' },
                    { title: 'Entertainment / Gaming', value: 'entertainment' },
                    { title: 'Media / Content', value: 'media' },
                    { title: 'E-commerce / Retail', value: 'ecommerce' },
                    { title: 'Productivity / Tools', value: 'productivity' },
                    { title: 'AI / ML', value: 'ai-ml' },
                    { title: 'Other', value: 'other' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'deliverables',
            title: 'Deliverables',
            type: 'array',
            group: 'classification',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'UI/UX Design', value: 'ui-ux-design' },
                    { title: 'Brand Identity', value: 'brand-identity' },
                    { title: 'Frontend Development', value: 'frontend-dev' },
                    { title: 'Backend Development', value: 'backend-dev' },
                    { title: 'Full-Stack Development', value: 'fullstack-dev' },
                    { title: 'Prompt Engineering', value: 'prompt-engineering' },
                    { title: 'AI Agent Development', value: 'ai-agent-dev' },
                    { title: 'Design System', value: 'design-system' },
                    { title: 'Product Strategy', value: 'product-strategy' },
                ],
            },
        }),
        defineField({
            name: 'client',
            title: 'Client / Company',
            type: 'string',
            group: 'classification',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
            group: 'classification',
            validation: (Rule) => Rule.required(),
        }),

        // CASE STUDY NARRATIVE GROUP
        defineField({
            name: 'problemStatement',
            title: 'Problem Statement',
            type: 'text',
            rows: 5,
            group: 'narrative',
            description: 'What user pain point does this solve?',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
            rows: 5,
            group: 'narrative',
            description: 'How your product solves the problem',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'process',
            title: 'Process / Methodology',
            type: 'array',
            group: 'narrative',
            of: [{ type: 'block' }],
            description: 'Rich text to explain your thinking and approach',
        }),
        defineField({
            name: 'keyFeatures',
            title: 'Key Features',
            type: 'array',
            group: 'narrative',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.max(5),
        }),

        // TECHNICAL DETAILS GROUP
        defineField({
            name: 'techStack',
            title: 'Core Tech Stack',
            type: 'array',
            group: 'technical',
            of: [{ type: 'string' }],
            description: 'Technologies used (e.g., React, Next.js, Firebase)',
        }),
        defineField({
            name: 'aiArchitecture',
            title: 'AI Models / Architecture',
            type: 'text',
            rows: 3,
            group: 'technical',
            description: 'Highlight the AI/ML components (e.g., GPT-4o, RAG Pipeline, Custom Agents)',
        }),
        defineField({
            name: 'repoLink',
            title: 'Repository Link',
            type: 'url',
            group: 'technical',
            description: 'GitHub/GitLab repository URL',
        }),
        defineField({
            name: 'liveLink',
            title: 'Live Project URL',
            type: 'url',
            group: 'technical',
            description: 'Production/demo URL',
        }),

        // METRICS & IMPACT GROUP
        defineField({
            name: 'impactStats',
            title: 'Impact Statistics',
            type: 'array',
            group: 'metrics',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'value',
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.min(3).max(6),
        }),

        // MEDIA & ASSETS GROUP
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            group: 'media',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            group: 'media',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                }),
            ],
        }),
        defineField({
            name: 'demoVideo',
            title: 'Demo Video / Walkthrough',
            type: 'url',
            group: 'media',
            description: 'Loom, YouTube, or other video demo URL',
        }),
        defineField({
            name: 'designSystemAssets',
            title: 'Design System / Style Guide',
            type: 'image',
            group: 'media',
            description: 'Image of your design system or component library',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'mockups',
            title: 'UI Mockups Gallery',
            type: 'array',
            group: 'media',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),

        // VISUAL CUSTOMIZATION GROUP
        defineField({
            name: 'themeMode',
            title: 'Preferred Theme Mode',
            type: 'string',
            group: 'visual',
            options: {
                list: [
                    { title: 'Dark Mode', value: 'dark' },
                    { title: 'Light Mode', value: 'light' },
                    { title: 'Auto', value: 'auto' },
                ],
            },
            initialValue: 'dark',
        }),
        defineField({
            name: 'brandColor',
            title: 'Brand Color',
            type: 'color',
            group: 'visual',
            description: 'Primary brand color to tint the portfolio UI',
        }),

        // LEGACY FIELDS (for backward compatibility)
        defineField({
            name: 'category',
            title: 'Category (Legacy)',
            type: 'string',
            group: 'overview',
            hidden: true,
        }),
        defineField({
            name: 'challenge',
            title: 'Challenge (Legacy)',
            type: 'text',
            group: 'narrative',
            hidden: true,
        }),
        defineField({
            name: 'link',
            title: 'Link (Legacy)',
            type: 'url',
            group: 'technical',
            hidden: true,
        }),
        defineField({
            name: 'metrics',
            title: 'Metrics (Legacy)',
            type: 'array',
            group: 'metrics',
            hidden: true,
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', type: 'string' }),
                        defineField({ name: 'value', type: 'string' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'nextProject',
            title: 'Next Project',
            type: 'reference',
            group: 'overview',
            to: [{ type: 'project' }],
            description: 'The project to show in the "Next Project" section',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'platform',
            media: 'thumbnail',
            status: 'status',
        },
        prepare({ title, subtitle, media, status }: any) {
            return {
                title,
                subtitle: `${subtitle || 'Project'}${status ? ` • ${status}` : ''}`,
                media,
            };
        },
    },
});
