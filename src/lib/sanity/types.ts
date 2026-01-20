// Base Project interface matching your current structure
export interface Project {
    _id: string;
    _type: 'project';
    title: string;
    slug: {
        current: string;
    };
    platform: string;
    industry: string;
    deliverables: string[];
    year: string;
    client: string;
    demoVideo?: string;
    liveLink?: string;
    repoLink?: string;
    status?: string;
    description: string;
    problemStatement: string;
    solution: string;
    process?: any[];
    keyFeatures?: Feature[];
    impactStats: Metric[];
    techStack?: string[];
    aiArchitecture?: string;
    nextProject?: {
        title?: string;
        slug?: {
            current: string;
        };
    };
    heroImage?: any;
    designSystemAssets?: any;
    mockups?: any[];
    thumbnail?: any;
    featured?: boolean;
    order?: number;
}

export interface Metric {
    _key: string;
    label: string;
    value: string;
}

// Simplified project for listings
export interface ProjectListing {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    platform: string;
    industry: string;
    year: string;
    description: string;
    thumbnail?: any;
    featured?: boolean;
}

export interface Feature {
    _key: string;
    title: string;
    description: string;
    icon?: string;
}
