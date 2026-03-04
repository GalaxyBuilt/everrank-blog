import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

// JSON Feed 1.1 spec — https://www.jsonfeed.org/version/1.1/
export async function GET(_context: APIContext) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);

    const sorted = posts.sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
    );

    const feed = {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'EverRank Blog — AI SEO & Performance Intelligence',
        home_page_url: 'https://everrank.app/blog',
        feed_url: 'https://everrank.app/blog/feed.json',
        description: 'Institutional-grade insights on AI-driven SEO, Next.js optimization, and compounding content strategy.',
        icon: 'https://everrank.app/og-image.png',
        favicon: 'https://everrank.app/favicon.ico',
        language: 'en-US',
        authors: [
            {
                name: 'EverRank Intelligence',
                url: 'https://everrank.app',
                avatar: 'https://everrank.app/favicon.ico',
            },
        ],
        items: sorted.map((post) => {
            const categorySlug = post.data.category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+$/, '');
            const url = `https://everrank.app/blog/${post.data.pillar}/${categorySlug}/${post.slug}`;

            return {
                id: url,
                url,
                title: post.data.title,
                summary: post.data.description,
                date_published: post.data.date.toISOString(),
                date_modified: post.data.date.toISOString(),
                authors: [{ name: post.data.author }],
                tags: [post.data.pillar, post.data.category, ...post.data.tags],
                ...(post.data.image
                    ? { image: typeof post.data.image === 'string' ? post.data.image : post.data.image.src }
                    : {}),
            };
        }),
    };

    return new Response(JSON.stringify(feed, null, 2), {
        headers: {
            'Content-Type': 'application/feed+json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
