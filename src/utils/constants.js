// App constants
export const APP_NAME = 'Campus Guide';
export const APP_VERSION = '1.0.0';

// Time constants
export const SUPPORT_MODAL_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms
export const FEEDBACK_MODAL_DELAY = 30 * 60 * 1000; // 30 minutes in ms, per request
export const MIN_SUPPORT_SHOWS_BEFORE_SURVEY = 6; // Support modal should appear 6 times before survey

// LocalStorage keys
export const LS_KEYS = {
  FIRST_VISIT: 'ucc_first_visit',
  GUIDE_COMPLETION: 'ucc_guide_completion',
  SUPPORTER_STATUS: 'ucc_supporter_status',
  LAST_SUPPORT_MODAL_SHOWN: 'ucc_last_support_modal_shown',
  SUPPORT_SHOWN_COUNT: 'ucc_support_shown_count',
  FEEDBACK_SUBMITTED: 'ucc_feedback_submitted_v2',
  TIMETABLE: 'ucc_timetable',
  BUDGET: 'ucc_budget',
  GPA: 'ucc_gpa',
  REMINDERS: 'ucc_reminders',
  SETTINGS: 'ucc_settings',
  HOME_WIDGETS: 'ucc_home_widgets',
  ONBOARDED: 'ucc_onboarded'
};

// Default home widget visibility
export const DEFAULT_HOME_WIDGETS = {
  classes: true,
  tasks: true,
  calendar: false,
  weather: true,
  library: false,
  quickNote: true,
  verse: false,
  forex: false,
  football: false,
  crypto: false,
  news: false,
  quote: false,
  joke: false,
  fact: false,
  github: false,
  word: false
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
  'E': { min: 0, max: 49.9 }
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
    // Allowances & Support
    'Parental Allowance', 'Guardian Support', 'Pocket Money',
    'Sibling Contribution', 'Relative Gift', 'Friend Gift',
    
    // Academic & Awards
    'Scholarship', 'Bursary', 'Student Loan (SLTF)', 
    'SRC Grant', 'Departmental Award', 'Research Grant',
    'Academic Prize', 'Dean\'s List Award',
    
    // Work & Business
    'Part-time Job (Campus)', 'Part-time Job (Off-campus)',
    'Freelance Work', 'Business Sales', 'Tutoring Income',
    'Internship Stipend', 'National Service Allowance',
    'Baking/Cooking Sales', 'Graphic Design Gigs',
    
    // Miscellaneous
    'Refund', 'Sale of Used Items', 'Savings Interest', 
    'Betting/Lottery Win', 'Other Income'
  ],
  EXPENSE: [
    // Academics & School
    'Tuition Fees', 'Hostel/Hall Fees', 'Departmental Dues',
    'SRC Dues', 'JCR Dues', 'Course Registration',
    'Handouts / Course Materials', 'Textbooks', 'Printing / Photocopy',
    'Stationery (Pens, Books)', 'Library Fines', 'Field Trip Fees',
    'Lab Equipment/Coat', 'Project Work Expenses',
    
    // Food & Dining
    'Breakfast', 'Lunch', 'Dinner', 
    'Snacks & Pastries', 'Groceries (Market)', 'Groceries (Supermarket)',
    'Drinking Water (Sachet/Dispenser)', 'Beverages', 'Campus Night Market',
    'Restaurant Dining', 'Fast Food',
    
    // Transportation
    'Campus Shuttle', 'Taxi / Uber / Bolt', 'Trotro / Public Bus',
    'Transport Home (Vacation)', 'Fuel (Personal Car)', 'Car Maintenance',
    
    // Housing & Utilities
    'Electricity Prepaid', 'Gas (Cooking)', 'Water Bill',
    'Hostel Maintenance', 'Cleaning Supplies', 'Room Decor/Furniture',
    
    // Technology & Communication
    'MTN Data Bundle', 'Vodafone/Telecel Data', 'Airtime/Credit',
    'Wi-Fi Subscription', 'Laptop Repair/Maintenance', 'Phone Accessories',
    'Software/App Subscription',
    
    // Personal Care & Health
    'Haircut / Salon', 'Cosmetics / Skincare', 'Toiletries (Soap, Paste)',
    'Laundry Service / Soap', 'Medication (Pharmacy)', 'Hospital Bills',
    'Gym Membership', 'Sanitary Pads',
    
    // Clothing & Accessories
    'New Clothes', 'Shoes / Footwear', 'Bags / Backpack',
    'Jewelry / Accessories', 'Tailor / Seamstress',
    
    // Social & Entertainment
    'Movie Tickets', 'Party / Event Tickets', 'Club Dues/Subscriptions',
    'Netflix/Spotify Subscription', 'Video Games', 'Outing with Friends',
    'Dates / Relationships', 'Birthdays / Gifts for others',
    
    // Miscellaneous
    'Church Offering / Tithe', 'Charity / Donation', 'Bank Charges',
    'MoMo Fees', 'Repayment of Loan', 'Emergency', 'Other Expenses'
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