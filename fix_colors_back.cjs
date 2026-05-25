const fs = require('fs');
const path = require('path');

// 1. Replace purple with primary in Home.jsx
const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
let home = fs.readFileSync(homePath, 'utf8');
home = home.replace(/purple-/g, 'primary-');
fs.writeFileSync(homePath, home);

// 2. Replace purple with primary in Community.jsx
const commPath = path.join(__dirname, 'src', 'pages', 'Community.jsx');
let comm = fs.readFileSync(commPath, 'utf8');
comm = comm.replace(/purple-/g, 'primary-');
fs.writeFileSync(commPath, comm);

console.log('Reverted purple to primary (Blue #6EABC6).');
