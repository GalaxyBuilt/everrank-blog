import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);

    const index = posts
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
        .map((post) => {
            const categorySlug = (post.data.category ?? '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+$/, '');
            return {
                title: post.data.title,
                description: post.data.description,
                author: post.data.author,
                pillar: post.data.pillar,
                category: post.data.category,
                tags: post.data.tags,
                date: post.data.date.toISOString().split('T')[0],
                // Use the category route as the canonical URL
                url: `/blog/${post.data.pillar}/${categorySlug}/${post.slug}`,
                // Searchable blob for full-text matching
                searchText: [
                    post.data.title ?? '',
                    post.data.description ?? '',
                    post.data.category ?? '',
                    (post.data.pillar ?? '').replace(/-/g, ' '),
                    ...(post.data.tags ?? []),
                ].join(' ').toLowerCase(),
            };
        });

    return new Response(JSON.stringify(index), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
