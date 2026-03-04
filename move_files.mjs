import fs from 'node:fs';
import path from 'node:path';

const blogDir = 'src/content/blog';

// Ensure our two fixed categorical directories exist
const compDir = path.join(blogDir, 'comparison-guides');
const howtoDir = path.join(blogDir, 'how-to');

if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });
if (!fs.existsSync(howtoDir)) fs.mkdirSync(howtoDir, { recursive: true });

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

let movedCount = 0;

for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');

    // Comparison Guides
    if (file.includes('-vs-') || content.includes('category: "comparison-guides"') || content.includes('category: "Comparison Guides"')) {
        fs.renameSync(path.join(blogDir, file), path.join(compDir, file));
        console.log(`Moved ${file} to comparison-guides/`);
        movedCount++;
        continue;
    }

    // Pillar articles
    const pillarMatch = content.match(/^pillar:\s*["']([^"']+)["']/m);
    if (pillarMatch && pillarMatch[1]) {
        const pillarName = pillarMatch[1].toLowerCase().replace(/_/g, '-');
        const targetDir = path.join(blogDir, pillarName);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.renameSync(path.join(blogDir, file), path.join(targetDir, file));
        console.log(`Moved ${file} to ${pillarName}/`);
        movedCount++;
    }
}

console.log(`Moved ${movedCount} files into subdirectories.`);
