const fs = require('fs');
const path = require('path');

const directoriesToSearch = [
    'src/components/guide',
    'src/pages/Guide.jsx'
];

function replaceInFile(filepath) {
    if (fs.statSync(filepath).isDirectory()) {
        const files = fs.readdirSync(filepath);
        files.forEach(file => {
            replaceInFile(path.join(filepath, file));
        });
    } else {
        if (!filepath.endsWith('.jsx') && !filepath.endsWith('.js')) return;
        let content = fs.readFileSync(filepath, 'utf8');
        if (content.includes('indigo')) {
            content = content.replace(/indigo/g, 'primary');
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`Updated ${filepath}`);
        }
    }
}

directoriesToSearch.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath)) {
        replaceInFile(fullPath);
    }
});

console.log("Replacement complete.");
