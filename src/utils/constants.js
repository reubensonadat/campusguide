// App constants
export const APP_NAME = 'UCC Campus Guide';
export const APP_VERSION = '1.0.0';

// Time constants
export const SUPPORT_MODAL_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms

// LocalStorage keys
export const LS_KEYS = {
  FIRST_VISIT: 'ucc_first_visit',
  GUIDE_COMPLETION: 'ucc_guide_completion',
  SUPPORTER_STATUS: 'ucc_supporter_status',
  TIMETABLE: 'ucc_timetable',
  BUDGET: 'ucc_budget',
  GPA: 'ucc_gpa',
  REMINDERS: 'ucc_reminders',
  SETTINGS: 'ucc_settings'
};

// Grade points for GPA calculation
export const GRADE_POINTS = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'E+': 0.5,
  'E': 0.0
};

// Grade ranges
export const GRADE_RANGES = {
  'A': { min: 80, max: 100 },
  'B+': { min: 75, max: 79.9 },
  'B': { min: 70, max: 74.9 },
  'C+': { min: 65, max: 69.9 },
  'C': { min: 60, max: 64.9 },
  'D+': { min: 55, max: 59.9 },
  'D': { min: 50, max: 54.9 },
  'E+': { min: 45, max: 49.9 },
  'E': { min: 0, max: 44.9 }
};

// Class time slots
export const TIME_SLOTS = [];
for (let hour = 6; hour <= 20; hour++) {
  TIME_SLOTS.push(`${hour.toString().padStart(2, '0')}:30`);
  if (hour < 20) {
    TIME_SLOTS.push(`${(hour + 1).toString().padStart(2, '0')}:00`);
  }
}

// Days of the week
export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Budget categories
export const BUDGET_CATEGORIES = {
  INCOME: [
    'Scholarship',
    'Student Loan',
    'Part-time Job',
    'Parental Support',
    'Allowance',
    'Gift',
    'Other Income'
  ],
  EXPENSE: [
    'Tuition Fees',
    'Accommodation',
    'Food & Dining',
    'Transportation',
    'Books & Supplies',
    'Entertainment',
    'Clothing',
    'Personal Care',
    'Healthcare',
    'Phone & Internet',
    'Utilities',
    'Other Expenses'
  ]
};

// Priority levels for reminders
export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
];

// Default settings
export const DEFAULT_SETTINGS = {
  notifications: true,
  darkMode: false,
  autoSave: true
};