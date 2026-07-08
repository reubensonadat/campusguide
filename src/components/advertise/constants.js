import { LayoutGrid, Sparkles } from 'lucide-react';

export const AD_PACKAGES = [
    {
        id: 'community_dir',
        name: 'Standard Listing',
        description: 'Permanent presence in the Community feed. Great for discoverability.',
        icon: LayoutGrid,
        popular: false,
        color: 'blue',
        prices: [
            { days: 3, price: 50 },
            { days: 7, price: 70, tag: 'Best Value' },
            { days: 14, price: 120 }
        ]
    },
    {
        id: 'home_banner',
        name: 'Premium Banner',
        description: 'Maximum visibility on the Home page. Reach students the moment they open the app.',
        icon: Sparkles,
        popular: true,
        color: 'primary',
        prices: [
            { days: 3, price: 70 },
            { days: 7, price: 100, tag: 'Most Popular' },
            { days: 14, price: 180 }
        ]
    }
];

export const STEPS = [
    { id: 1, title: 'Guidelines' },
    { id: 2, title: 'Business Details' },
    { id: 3, title: 'Ad Creative' },
    { id: 4, title: 'Checkout' }
];
