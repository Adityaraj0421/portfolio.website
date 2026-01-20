// Migration script to upload existing projects to Sanity
// Run this after setting up your Sanity project

import { client } from '../src/lib/sanity/client';

const projects = [
    {
        _type: 'project',
        title: 'Claussal.ai',
        slug: { current: 'claussal-ai', _type: 'slug' },
        category: 'Legal Tech AI',
        year: '2025',
        client: 'Claussal Inc.',
        link: 'https://claussal.ai',
        description: 'A digital front door for the Indian Legal Sector that feels less like a sales pitch and more like a glimpse into the future of litigation.',
        challenge: 'The average legal-tech website is cluttered, outdated, and screams \'database.\' The goal was to convince skeptical lawyers that Claussal isn\'t just a search tool - it is a sophisticated, intelligent partner. We needed to communicate authority without friction and build trust in 0.5 seconds.',
        solution: 'We bypassed the standard \'corporate blue\' for \'The Matte-Black Brief\' - a bold, dark-themed aesthetic. By stripping away unnecessary graphics (Minimalism as Power) and prioritizing crisp, high-contrast typography, we signaled focus and precision. The UX answers \'What is it?\', \'Is it safe?\', and \'How do I start?\' immediately.',
        metrics: [
            { _key: 'metric1', label: 'Visual Language', value: 'Dark Mode' },
            { _key: 'metric2', label: 'Trust Factor', value: 'Verified' },
            { _key: 'metric3', label: 'User Friction', value: 'Zero' }
        ],
        featured: true,
        order: 1
    },
    {
        _type: 'project',
        title: 'Itz Confidential',
        slug: { current: 'itz-confidential', _type: 'slug' },
        category: 'Web Experience',
        year: '2024',
        client: 'Itz Confidential',
        link: 'https://itzconfidential.com',
        description: 'We successfully launched itzconfidential.com not as a store, but as a playable prologue. Users aren\'t just buying a game; they are entering a story.',
        challenge: 'Mystery games rely on atmosphere, yet most websites selling them look like generic clothing stores. The magic of \'solving a crime\' was getting lost in boring product grids. We needed a noir aesthetic and a user experience that matched the intensity of the product.',
        solution: 'I scrapped the traditional e-commerce layout for a digital \'Evidence Board.\' I engineered a dynamic \'Red Thread\' SVG line that draws itself down the screen as the user scrolls, turning passive scrolling into active investigation. The checkout flow was gamified into a logic-gated \'Closure Report\' - users have to solve the case to submit.',
        metrics: [
            { _key: 'metric1', label: 'Aesthetic', value: 'Noir' },
            { _key: 'metric2', label: 'Interaction', value: 'Red Thread' },
            { _key: 'metric3', label: 'UX Type', value: 'Gamified' }
        ],
        featured: true,
        order: 2
    },
    {
        _type: 'project',
        title: 'Fobet Media',
        slug: { current: 'fobet-media', _type: 'slug' },
        category: 'Super-Profile',
        year: '2024',
        client: 'Fobet Media',
        status: 'Coming Soon',
        description: 'A platform that feels instantly familiar to creators, yet expensive enough to justify high-ticket retainers. We synthesized the psychomechanics of social media with a strict \'Matte Black\' design.',
        challenge: 'Fobet Media needed a digital home that spoke the native language of creators (Viral Art) while proving enterprise-grade engineering (Backend Science). The challenge was to balance \'Internet Hype\' with \'High-Ticket Trust\' without looking like a generic marketing template.',
        solution: 'We adopted the \'Super-Profile\' architecture with a \'Matte-Gram\' aesthetic - Pitch Black OLED backgrounds and system-native typography. I engineered a responsive \'Smart Grid\' that morphs from a mobile feed to a desktop command center. The \'Message\' button was reinvented as a simulated DM Chat Interface that pre-qualifies leads using logic-based automation.',
        metrics: [
            { _key: 'metric1', label: 'Aesthetic', value: 'Matte-Gram' },
            { _key: 'metric2', label: 'Architecture', value: 'Super-Profile' },
            { _key: 'metric3', label: 'Conversion', value: 'DM Pipeline' }
        ],
        featured: true,
        order: 3
    }
];

async function migrateProjects() {
    console.log('Starting migration...');

    try {
        // Create all projects
        const createdProjects = await Promise.all(
            projects.map(project => client.create(project))
        );

        console.log(`✅ Created ${createdProjects.length} projects`);

        // Update nextProject references
        // Claussal -> Itz Confidential
        await client
            .patch(createdProjects[0]._id)
            .set({ nextProject: { _type: 'reference', _ref: createdProjects[1]._id } })
            .commit();

        // Itz Confidential -> Fobet Media
        await client
            .patch(createdProjects[1]._id)
            .set({ nextProject: { _type: 'reference', _ref: createdProjects[2]._id } })
            .commit();

        // Fobet Media -> Claussal
        await client
            .patch(createdProjects[2]._id)
            .set({ nextProject: { _type: 'reference', _ref: createdProjects[0]._id } })
            .commit();

        console.log('✅ Updated nextProject references');
        console.log('🎉 Migration complete!');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    }
}

// Run migration
migrateProjects();

export { migrateProjects };
