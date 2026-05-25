/**
 * Generates a CSV file from formulas.js metadata.
 * Run: node scripts/generate-formulas-csv.cjs
 * Output: scripts/formulas_metadata.csv
 */
const fs = require('fs');
const path = require('path');

// Read formulas.js and extract the data
const formulasPath = path.join(__dirname, '..', 'src', 'data', 'formulas.js');
const content = fs.readFileSync(formulasPath, 'utf-8');

// We'll use a simple approach: eval the module exports
// Since it's an ES module, we need to transform it
let jsContent = content
  .replace(/^export\s+const\s+formulasData\s*=\s*/m, 'const formulasData = ')
  .replace(/;?\s*$/, ';');

// Add module.exports
jsContent += '\nmodule.exports = { formulasData };';

// Write temp file
const tempPath = path.join(__dirname, '_temp_formulas.cjs');
fs.writeFileSync(tempPath, jsContent, 'utf-8');

try {
  const { formulasData } = require(tempPath);
  
  // CSV headers
  const headers = [
    'id', 'name', 'description', 'equation', 'category', 'icon',
    'variables_json', 'num_variables'
  ];
  
  const rows = [];
  rows.push(headers.join(','));
  
  for (const category of formulasData) {
    for (const formula of category.formulas) {
      const variablesJson = JSON.stringify(
        formula.variables.map(v => ({
          id: v.id,
          label: v.label,
          unit: v.unit
        }))
      );
      
      // Escape CSV fields
      const escape = (str) => {
        if (!str) return '""';
        str = String(str).replace(/"/g, '""');
        return `"${str}"`;
      };
      
      const row = [
        escape(formula.id),
        escape(formula.name),
        escape(formula.description),
        escape(formula.equation),
        escape(category.category),
        escape(category.icon),
        escape(variablesJson),
        formula.variables.length
      ];
      
      rows.push(row.join(','));
    }
  }
  
  const csv = rows.join('\n');
  const csvPath = path.join(__dirname, 'formulas_metadata.csv');
  fs.writeFileSync(csvPath, csv, 'utf-8');
  
  console.log(`✅ Generated CSV with ${rows.length - 1} formulas`);
  console.log(`📄 Output: ${csvPath}`);
  console.log(`\nCategories:`);
  const cats = {};
  for (const category of formulasData) {
    cats[category.category] = (cats[category.category] || 0) + category.formulas.length;
  }
  for (const [cat, count] of Object.entries(cats)) {
    console.log(`  ${cat}: ${count} formulas`);
  }
  console.log(`\nTotal: ${Object.values(cats).reduce((a, b) => a + b, 0)} formulas`);
  
} finally {
  // Clean up temp file
  fs.unlinkSync(tempPath);
}
