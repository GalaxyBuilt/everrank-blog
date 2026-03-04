import fs from 'node:fs';
import path from 'node:path';

const blogDir = 'src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

let count = 0;

for (const file of files) {
    if (!file.includes('-vs-')) continue;

    let content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    let original = content;

    // 1. Update category to "Comparison Guides"
    content = content.replace(/^category:\s*["'].*?["']/m, 'category: "Comparison Guides"');

    // 2. Update slug to only include the basename (e.g., "everrank-vs-ahrefs")
    content = content.replace(/^slug:\s*["'](?:.*\/)?([^/]+)["']/m, 'slug: "$1"');

    if (content !== original) {
        fs.writeFileSync(path.join(blogDir, file), content);
        console.log('Fixed', file);
        count++;
    }
}

console.log(`Updated ${count} files.`);
