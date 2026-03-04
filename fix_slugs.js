const fs = require('fs');
const path = require('path');
const blogDir = path.join(__dirname, 'src/content/blog');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
let count = 0;

for (const file of files) {
    if (!file.includes('-vs-')) continue;

    let content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    let original = content;

    // Extract just the basename for the slug
    if (content.match(/^slug:\s*["']([^"']+)["']/m)) {
        content = content.replace(/^slug:\s*["']([^"']+)["']/m, (match, p1) => {
            const parts = p1.split('/');
            const basename = parts[parts.length - 1];
            return `slug: "${basename}"`;
        });
    } else {
        // If slug doesn't exist, try to add it
        const basename = file.replace('.mdx', '');
        content = content.replace(/^---\n/, `---\nslug: "${basename}"\n`);
    }

    // Remove pillar
    content = content.replace(/^pillar:.*?\n/m, '');

    // Update category
    content = content.replace(/^category:.*?\n/m, 'category: "Comparison Guides"\n');

    if (content !== original) {
        fs.writeFileSync(path.join(blogDir, file), content);
        console.log('Fixed ' + file);
        count++;
    }
}

console.log(`Updated ${count} files.`);
