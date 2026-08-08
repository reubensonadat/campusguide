import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'src', 'data', 'formulaLearning');

const mapping = {
  health_physiology: [
    'bmi_calculation', 'drug_dosage_weight', 'iv_flow_rate', 'body_surface_area',
    'mean_arterial_pressure', 'cardiac_output', 'creatinine_clearance',
    'fi_o2_delivery', 'fluid_maintenance', 'anion_gap'
  ],
  advanced_finance_economics: [
    'straight_line_depreciation', 'declining_balance_depreciation', 'net_present_value',
    'payback_period', 'contribution_margin', 'breakeven_units', 'current_ratio',
    'acid_test_ratio', 'debt_to_equity', 'margin_of_safety', 'gdp_nominal',
    'cpi_inflation', 'unemployment_rate', 'multiplier_effect', 'mps_from_mpc',
    'cross_price_elasticity', 'income_elasticity', 'cobb_douglas', 'phillips_curve',
    'real_gdp_growth'
  ],
  electrical_engineering: [
    'ohms_law_power', 'kvl', 'kcl', 'rc_time_constant', 'rl_time_constant',
    'impedance_series_rcl', 'transformer_ratio', 'three_phase_power', 'motor_slip',
    'wheatstone_bridge'
  ],
  essential_conversions: [
    'tip_split_calculator', 'loan_amortization_monthly', 'currency_conversion',
    'fuel_cost_calculator', 'age_calculator', 'gpa_projection', 'savings_goal',
    'compound_growth', 'unit_price_comparison', 'salary_tax_estimator'
  ]
};

async function migrate() {
  const sourcePath = 'file:///' + path.join(dataDir, 'advanced_optics_astrophysics.js').replace(/\\/g, '/');
  let sourceMod = await import(sourcePath + '?ts=' + Date.now());
  let sourceData = { ...sourceMod.advanced_optics_astrophysics };

  for (const [targetName, keys] of Object.entries(mapping)) {
    const targetFileName = `${targetName}.js`;
    const targetPath = 'file:///' + path.join(dataDir, targetFileName).replace(/\\/g, '/');
    let targetMod = await import(targetPath + '?ts=' + Date.now());
    let targetData = { ...targetMod[targetName] };

    let movedCount = 0;
    for (const key of keys) {
      if (sourceData[key]) {
        targetData[key] = sourceData[key];
        delete sourceData[key];
        movedCount++;
      }
    }

    console.log(`Moved ${movedCount} keys to ${targetFileName}`);
    const targetContent = `export const ${targetName} = ${JSON.stringify(targetData, null, 2)};\n`;
    fs.writeFileSync(path.join(dataDir, targetFileName), targetContent, 'utf8');
  }

  console.log(`Remaining keys in source: ${Object.keys(sourceData).length}`);
  const sourceContent = `export const advanced_optics_astrophysics = ${JSON.stringify(sourceData, null, 2)};\n`;
  fs.writeFileSync(path.join(dataDir, 'advanced_optics_astrophysics.js'), sourceContent, 'utf8');
}

migrate().catch(console.error);
