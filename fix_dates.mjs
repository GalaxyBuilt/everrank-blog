import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src/content/blog');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        if (fs.statSync(dirFile).isDirectory()) {
            filelist = walkSync(dirFile, filelist);
        } else {
            filelist.push(dirFile);
        }
    });
    return filelist;
};

const files = walkSync(blogDir).filter(f => f.endsWith('.mdx'));
let fixedDays = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace `date: "2026-03-04"` or `date: 2026-03-04T00:00:00Z` or `date: '2026-03-04'` with simply `date: YYYY-MM-DD` 
    const newContent = content.replace(/^date:\s*["']?([0-9]{4}-[0-9]{2}-[0-9]{2})[T0-9:Z]*["']?/m, 'date: $1');

    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        console.log(`Fixed date in ${file}`);
        fixedDays++;
    }
}

console.log('Fixed ' + fixedDays + ' files');
