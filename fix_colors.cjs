const fs = require('fs');
const path = require('path');

// 1. Add Pear to tailwind.config.js
const tailwindPath = path.join(__dirname, 'tailwind.config.js');
let tailwind = fs.readFileSync(tailwindPath, 'utf8');
if (!tailwind.includes("pear: '#CBD83B'")) {
  tailwind = tailwind.replace(
    /colors:\s*\{/,
    "colors: {\n        pear: '#CBD83B',"
  );
  fs.writeFileSync(tailwindPath, tailwind);
}

// 2. Update TabBar.jsx to use bg-pear
const tabBarPath = path.join(__dirname, 'src', 'components', 'common', 'TabBar.jsx');
let tabBar = fs.readFileSync(tabBarPath, 'utf8');
tabBar = tabBar.replace(/bg-purple-500/g, 'bg-pear');
tabBar = tabBar.replace(/bg-primary-800/g, 'bg-pear');
fs.writeFileSync(tabBarPath, tabBar);

// 3. Replace blue/indigo with purple in Home.jsx
const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let home = fs.readFileSync(homePath, 'utf8');
// Fix the hardcoded hex gradient
home = home.replace(/from-\[#1a237e\] via-\[#283593\] to-\[#3949ab\]/g, 'from-purple-900 via-purple-700 to-purple-600');
// Replace indigo with purple
home = home.replace(/indigo-/g, 'purple-');
home = home.replace(/violet-/g, 'purple-');
home = home.replace(/blue-/g, 'purple-');
fs.writeFileSync(homePath, home);

// 4. Replace indigo with purple in Community.jsx
const commPath = path.join(__dirname, 'src', 'pages', 'Community.jsx');
let comm = fs.readFileSync(commPath, 'utf8');
comm = comm.replace(/indigo-/g, 'purple-');
comm = comm.replace(/violet-/g, 'purple-');
fs.writeFileSync(commPath, comm);

console.log('Colors replaced successfully.');
