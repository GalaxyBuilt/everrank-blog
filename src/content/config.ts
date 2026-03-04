import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        author: z.string().default('EverRank Intelligence'),

        pillar: z.string().optional(),
        category: z.string(),
        image: image().optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(true),
    })
});

export const collections = { blog };
