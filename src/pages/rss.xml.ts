import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = await getCollection('blog', ({ data }) => !data.draft);

    // Sort newest first
    const sorted = posts.sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
    );

    return rss({
        title: 'EverRank Blog — AI SEO & Performance Intelligence',
        description: 'Institutional-grade insights on AI-driven SEO, Next.js optimization, and compounding content strategy. Published by EverRank.',
        site: context.site ?? 'https://everrank.app',
        xmlns: {
            media: 'http://search.yahoo.com/mrss/',
            atom: 'http://www.w3.org/2005/Atom',
        },
        customData: `
            <language>en-us</language>
            <copyright>© ${new Date().getFullYear()} EverRank. All rights reserved.</copyright>
            <managingEditor>hello@everrank.app (EverRank Intelligence)</managingEditor>
            <webMaster>hello@everrank.app (EverRank)</webMaster>
            <atom:link href="https://everrank.app/blog/rss.xml" rel="self" type="application/rss+xml" />
            <image>
                <url>https://everrank.app/favicon.ico</url>
                <title>EverRank Blog</title>
                <link>https://everrank.app/blog</link>
            </image>
        `,
        items: sorted.map((post) => {
            const url = `https://everrank.app/blog/${post.data.pillar}/${post.slug}`;
            const categorySlug = post.data.category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+$/, '');
            const categoryUrl = `https://everrank.app/blog/${post.data.pillar}/${categorySlug}/${post.slug}`;

            return {
                title: post.data.title,
                pubDate: post.data.date,
                description: post.data.description,
                link: categoryUrl,
                categories: [post.data.pillar, post.data.category, ...post.data.tags],
                author: `hello@everrank.app (${post.data.author})`,
                customData: post.data.image
                    ? `<media:content url="${post.data.image}" medium="image" />`
                    : '',
            };
        }),
    });
}
