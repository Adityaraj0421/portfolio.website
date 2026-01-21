import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { schemaTypes } from './schemas';

export default defineConfig({
    name: 'default',
    title: 'Fobet Media Portfolio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [
        structureTool(),
        visionTool(),
        colorInput(),
    ],

    schema: {
        types: schemaTypes,
    },
});
