const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/user/Desktop/Campus guide/src/components/guide/content/ucc';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove checklist array from the file completely:
    let lines = content.split('\n');
    let newLines = [];
    let inChecklist = false;
    let bracketCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!inChecklist && /\bchecklist\s*:\s*\[/.test(line)) {
            inChecklist = true;
            bracketCount += (line.match(/\[/g) || []).length;
            bracketCount -= (line.match(/\]/g) || []).length;
            if (bracketCount === 0) {
                inChecklist = false;
            }
            continue;
        }

        if (inChecklist) {
            bracketCount += (line.match(/\[/g) || []).length;
            bracketCount -= (line.match(/\]/g) || []).length;
            if (bracketCount <= 0) {
                inChecklist = false;
            }
            continue;
        }
        newLines.push(line);
    }

    content = newLines.join('\n');
    
    const hasSteps = /\bsteps\s*:\s*\[\s*\{/.test(content);
    const hasResources = /\bresources\s*:\s*\[\s*\{/.test(content);
    const hasWarnings = /\b(commonMistakes|consequences)\s*:/.test(content);

    let outputLines = [];
    let inTabs = false;
    for (let i = 0; i < content.split('\n').length; i++) {
        const line = content.split('\n')[i];
        if (!inTabs && /\bconst tabs\s*=\s*\[/.test(line)) {
            inTabs = true;
            continue;
        }
        if (inTabs) {
            if (/\];/.test(line)) {
                inTabs = false;
            }
            continue;
        }
        outputLines.push(line);
    }
    
    let finalContent = outputLines.join('\n');
    
    let tabsArray = `  const tabs = [\n    { id: 'overview', label: 'Overview' },`;
    if (hasSteps) tabsArray += `\n    { id: 'steps', label: 'Steps' },`;
    if (hasResources) tabsArray += `\n    { id: 'resources', label: 'Resources' },`;
    if (hasWarnings) tabsArray += `\n    { id: 'warnings', label: 'Warnings' },`;
    tabsArray += `\n  ];\n`;

    finalContent = finalContent.replace(/\s*return \{ sections, tabs,?(.*?) \};/, '\n' + tabsArray + '\n  return { sections, tabs$1 };');
    
    finalContent = finalContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    fs.writeFileSync(filePath, finalContent);
});
console.log('Processed all files.');
