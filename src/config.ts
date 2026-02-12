export const SITE = {
    title: 'EverRank Blog',
    description: 'Institutional-grade SEO, Performance, and AI Content insights.',
    defaultLanguage: 'en',
};

export const PILLARS = {
    SEO_FUNDAMENTALS: {
        title: 'SEO Fundamentals & Best Practices',
        slug: 'seo-fundamentals',
        categories: [
            'On-page SEO',
            'Off-page SEO',
            'Keyword Research',
            'Content Optimization',
            'Technical SEO',
            'Common Mistakes',
            'SaaS SEO',
            'Evergreen Strategy'
        ]
    },
    AI_INSIGHTS: {
        title: 'AI + ContentIQ Insights',
        slug: 'ai-insights',
        categories: [
            'AI Research',
            'Predictive Ranking',
            'AI Audits',
            'ContentIQ Workflows',
            'Topic Authority',
            'ML Ranking',
            'Case Studies'
        ]
    },
    TECH_OPTIMIZATION: {
        title: 'Website & App Optimization',
        slug: 'tech-optimization',
        categories: [
            'Next.js Performance',
            'Next Scanner',
            'Core Web Vitals',
            'JS Frameworks',
            'CDN Strategy',
            'Technical Fixes',
            'Performance Metrics'
        ]
    },
    GROWTH_SYSTEMS: {
        title: 'Growth Systems & Ranking Strategy',
        slug: 'growth-systems',
        categories: [
            'Topic Clustering',
            'Compounding Content',
            'Zero Backlink Ranking',
            'Long-tail SEO',
            'Growth Case Studies',
            'Multi-site Systems',
            'Funnel Workflows'
        ]
    },
    BEST_PRACTICES: {
        title: 'EverRank Best Practices & How-To Guides',
        slug: 'best-practices',
        categories: [
            'Getting Started with EverRank',
            'ContentIQ Workflow Tips',
            'Nova Dashboard Mastery',
            'AI Prompt Builder Optimization',
            'SEO Audit Best Practices',
            'Multi-site & Team Management',
            'Scaling SEO with EverRank'
        ]
    },
    CASE_STUDIES: {
        title: 'Case Studies & Success Stories',
        slug: 'case-studies',
        categories: [
            'SEO Case Studies',
            'AI Optimization Success',
            'Growth Hacks',
            'Multi-site Wins',
            'Agency Client Stories',
            'EverRank ROI Examples',
            'Predictive Ranking Wins'
        ]
    }
} as const;

export type PillarKey = keyof typeof PILLARS;

export function getSlugForCategory(pillar: PillarKey, category: string): string {
    const p = PILLARS[pillar];
    const catSlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    return `/${p.slug}/${catSlug}`;
}
