const fs = require('fs');
const path = require('path');

const getAllFiles = (dir, extensions) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(file, extensions));
        } else {
            if (extensions.some(ext => file.endsWith(ext))) {
                results.push(file);
            }
        }
    });
    return results;
};

const srcDir = path.join(process.cwd(), 'src');
const publicDir = path.join(process.cwd(), 'public');

const allCodeFiles = [
    ...getAllFiles(srcDir, ['.js', '.jsx', '.css']),
    path.join(process.cwd(), 'index.html')
];

let allContent = '';
allCodeFiles.forEach(f => {
    try { allContent += fs.readFileSync(f, 'utf8') + '\n'; } catch (e) { }
});

const srcCandidateFiles = getAllFiles(srcDir, ['.js', '.jsx', '.css']);
const unusedSrc = [];
srcCandidateFiles.forEach(f => {
    const baseName = path.basename(f, path.extname(f));
    if (['main', 'App', 'index', 'globals'].includes(baseName)) return;

    const regex = new RegExp(`\\b${baseName}\\b`, 'g');
    const totalMatches = (allContent.match(regex) || []).length;

    let selfMatches = 0;
    try {
        const selfContent = fs.readFileSync(f, 'utf8');
        selfMatches = (selfContent.match(regex) || []).length;
    } catch (e) { }

    if (totalMatches <= selfMatches) {
        unusedSrc.push(f);
    }
});

const publicCandidateFiles = getAllFiles(publicDir, ['.svg', '.png', '.jpg', '.ico', '.json', '.js', '']);
const unusedPublic = [];
publicCandidateFiles.forEach(f => {
    const fileName = path.basename(f);
    if (fileName === '_redirects' || fileName === 'manifest.json' || fileName === 'sw.js') return;

    if (!allContent.includes(fileName)) {
        unusedPublic.push(f);
    }
});

console.log('---UNUSED_SRC---');
unusedSrc.forEach(f => console.log(path.relative(process.cwd(), f)));
console.log('---UNUSED_PUBLIC---');
unusedPublic.forEach(f => console.log(path.relative(process.cwd(), f)));
