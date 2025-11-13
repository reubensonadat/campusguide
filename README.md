# UCC Campus Guide

A comprehensive mobile app for University of Cape Coast students, featuring guides, tools, and essential information to navigate campus life successfully.

## 🚀 Features

### 📚 Comprehensive Guide
- **30+ Topics** covering everything from registration to graduation
- **Step-by-Step Instructions** with common mistakes to avoid
- **Interactive Modals** with rich content layouts
- **Progress Tracking** - Mark sections as complete
- **Search & Filtering** - Find guides quickly
- **Visual Content Types** - Overviews, steps, tips, resources, warnings, checklists

### 🛠️ Essential Tools
- **Timetable Builder** - Create and manage your class schedule with color-coded courses
- **Budget Tracker** - Track income and expenses with visual summaries
- **GPA Calculator** - Calculate and project your GPA scenarios
- **Reminders Board** - Never miss important deadlines with priority levels

### 💳 Payment System
- **Optional Support** - Keep the app free for all students
- **Supporter Badges** - Special recognition for contributors
- **Configurable Intervals** - Non-intrusive reminder system

### 📱 Mobile-First Design
- **Responsive Layout** - Optimized for mobile devices
- **PWA Support** - Install as a native app
- **Clean UI** - Modern, minimalist interface
- **Smooth Animations** - Professional transitions and micro-interactions

## 🛠️ Technical Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

## 📁 Project Structure
ucc-campus-guide/
├── public/ # Static assets
│ ├── favicon.ico
│ ├── logo.png
│ └── manifest.json
├── src/
│ ├── components/ # React components
│ │ ├── common/ # Reusable components
│ │ ├── guide/ # Guide-related components
│ │ ├── tools/ # Tool components
│ │ ├── payment/ # Payment components
│ │ └── onboarding/ # Onboarding component
│ ├── context/ # React context providers
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ ├── services/ # API and service functions
│ ├── utils/ # Utility functions
│ ├── styles/ # Global styles
│ ├── App.jsx # Main app component
│ └── main.jsx # App entry point
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tailwind.config.js # Tailwind configuration
├── vite.config.js # Vite configuration
└── README.md # Project documentation


## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with ES6+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ucc-campus-guide.git
cd ucc-campus-guide

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

Environment Variables
Create a .env file for production:

VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
VITE_PAYSTACK_SECRET_KEY=your_paystack_secret_key

📱 Usage
Development
Start the development server with npm run dev
Open your browser to http://localhost:5173
Make changes and see them reflected immediately
Production
Build the app with npm run build
Deploy the dist folder to your hosting service
🎨 Customization
Adding New Guide Topics
Create a new component in src/components/guide/[TopicName].jsx
Export it in src/pages/Guide.jsx
Add it to the guides array with proper metadata
Styling
The app uses Tailwind CSS with a custom color scheme defined in src/styles/globals.css. Modify the CSS variables to change the appearance:

:root {
  --primary-500: #your-primary-color;
  --accent-500: #your-accent-color;
  /* ... other color variables */
}

Data Storage
All user data is stored in localStorage. To clear data:
localStorage.clear();

🔧 Configuration
Payment Integration
Update src/services/paymentService.js with your Paystack credentials:

export const handlePayment = ({ amount, email, reference, metadata }) => {
  // Replace with your actual Paystack integration
  return new Promise((resolve, reject) => {
    // Mock implementation for development
    setTimeout(() => {
      resolve({
        status: 'success',
        reference,
        transaction: `txn_${Date.now()}`,
        message: 'Payment successful'
      });
    }, 2000);
  });
};

🐛 Troubleshooting
Common Issues
Module not found errors: Ensure all import paths are correct
CSS not loading: Check Tailwind configuration and imports
Local storage issues: Check browser's localStorage settings
Build errors: Clear node_modules and reinstall dependencies
Getting Help
Check the browser console for JavaScript errors
Verify all files exist in the correct locations
Ensure all dependencies are properly installed
Check for any conflicting environment variables
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Make your changes
Commit your changes (git commit -m "Add amazing feature")
Push to the branch (git push origin feature/amazing-feature)
Create a Pull Request
📞 Support
For support, please open an issue on GitHub or contact the development team.

Built with ❤️ for UCC Students