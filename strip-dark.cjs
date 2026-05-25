const fs = require('fs');
let content = fs.readFileSync('src/components/ui/map.tsx', 'utf8');
content = content.replace(/dark:[^\s"']+/g, '');
fs.writeFileSync('src/components/ui/map.tsx', content);
console.log('Stripped dark classes from map.tsx');
