// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://everrank.app',
    base: '/blog',
    integrations: [
        sitemap({
            filter: (page) => !page.includes('/draft/'),
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
        }),
        mdx(),
    ],
});
