import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingDown, ChefHat, ShoppingCart, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

// ─── Ghana-specific tips database ───────────────────────────────────────────
const DAILY_TIPS = [
  {
    icon: <ChefHat className="w-5 h-5" />, color: 'emerald', tag: 'Food Strategy',
    title: 'Cook vs. Eat Out',
    tip: 'A plate of Waakye from a vendor costs ~GH₵ 15–25. Buying rice + beans in bulk (enough for 3 days) costs ~GH₵ 20 total. That\'s a saving of GH₵ 25–55 over 3 days.',
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />, color: 'blue', tag: 'Protein Hack',
    title: 'Buy Protein in Bulk',
    tip: 'A single fish portion at a chop bar costs ~GH₵ 10. A full sardine can costs ~GH₵ 12 and gives you 3 meals. Eggs (30 tray) cost ~GH₵ 55–70 — that\'s ~GH₵ 2.00 per egg vs. GH₵ 3.50 for one boiled egg at a stall.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'amber', tag: 'Meal Planning',
    title: 'The "Base + Add-on" Method',
    tip: 'Keep your base (rice, banku, yam) as your fixed cheap cost. Rotate your protein (eggs on low days, sardines on mid days, chicken on good days). This stops you from overspending when you\'re hungry.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'purple', tag: 'Utility Savings',
    title: 'Data Bundle Strategy',
    tip: 'Daily bundles cost more per MB. Buy weekly, or better yet, use our built-in Data Reselling service to get even cheaper data packages and save GH₵ 10+ a week!',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'red', tag: 'Transport',
    title: 'The Transport Trap',
    tip: 'Taking Bolt/Uber every day for a 10-minute journey that costs GH₵ 20 is GH₵ 140/week. The same route by campus shuttle or k3k3 is just GH₵ 2.50. Reserve Uber/Bolt for late nights or emergencies only.',
  },
  {
    icon: <ChefHat className="w-5 h-5" />, color: 'emerald', tag: 'Food Strategy',
    title: 'Batch Cook on Sundays',
    tip: 'Cooking a large pot of stew once a week costs ~GH₵ 30–40 in ingredients but feeds you for 5–6 meals. That\'s GH₵ 5–7 per meal. The same meal from a restaurant is GH₵ 30–50.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'amber', tag: 'Zero Waste',
    title: 'The "Leftover" Rule',
    tip: 'When you cook, always make extra. Tomorrow\'s breakfast is tonight\'s dinner leftovers. This is the single most effective way to cut food spending by 30–40%.',
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />, color: 'blue', tag: 'Shopping Smart',
    title: 'Shop at Market, Not Supermarket',
    tip: 'Tomatoes at a supermarket: GH₵ 8 for 4. At Kumasi/Accra Central market (or Kotokuraba): GH₵ 5 for 10. The local market will always be 30–50% cheaper for staples like tomatoes, onions, and pepper.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'purple', tag: 'Daily Savings',
    title: 'Sachet vs. Bottled Water',
    tip: 'A 500ml sachet of water costs GH₵ 0.50. A 500ml bottled water is GH₵ 3.50 (and GH₵ 4.50 for 750ml). Buying a reusable water bottle and filling it from sachets saves you money. Bottled water costs 7x more for the exact same volume!',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'red', tag: 'Mindset',
    title: 'Avoid "Small Small" Spending',
    tip: 'Buying GH₵ 2 biscuits + GH₵ 3 Fan Ice + GH₵ 5 peanuts between meals = GH₵ 10 gone with zero nutritional value. These "invisible" purchases kill your budget faster than any big expense.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'emerald', tag: 'Academic',
    title: 'Printing Strategy',
    tip: 'Printing at the Science Market is often cheaper per page than small private spots around hostels. Print all course materials in bulk at the start of the semester to save GH₵ 20-30.',
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />, color: 'blue', tag: 'Snacks',
    title: 'Snack Substitution',
    tip: 'Swap expensive imported biscuits (GH₵ 5-10) for local roasted groundnuts or plantain chips (GH₵ 2-5). They keep you fuller for much longer and save you money.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'amber', tag: 'Social Spend',
    title: 'Group Study Snacks',
    tip: 'Instead of buying individual snacks for group studies, contribute GH₵ 5-10 each and buy in bulk from the market. You\'ll get 3x more food for the same price.',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'red', tag: 'Academic',
    title: 'Used Textbooks vs New',
    tip: 'Never buy a new textbook until you\'ve checked the department notice boards or asked senior students for used copies. You can save up to 60% this way.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'purple', tag: 'Utility Savings',
    title: 'Campus Wi-Fi over Data',
    tip: 'Download heavy materials, YouTube tutorials, and app updates while on Campus Wi-Fi (like Eduroam). Only use mobile data for messaging. This easily extends a weekly bundle by days.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'emerald', tag: 'Mindset',
    title: 'The "24-Hour" Rule',
    tip: 'See a nice shoe or dress online? Wait 24 hours before buying. 80% of the time, the urge passes completely, saving you GH₵ 100+ on impulse buys.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'blue', tag: 'Utility Savings',
    title: 'Share Subscriptions',
    tip: 'Don\'t pay for Netflix or Spotify alone. Find 3 friends and split a family plan. Your GH₵ 60/month drops to GH₵ 15/month instantly.',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'red', tag: 'Mindset',
    title: 'Avoid "Hungry Shopping"',
    tip: 'Never go to the Night Market or supermarket when you are starving. You will buy 50% more junk food than you actually planned for.',
  },
  {
    icon: <ChefHat className="w-5 h-5" />, color: 'amber', tag: 'Food Strategy',
    title: 'The "Kenkey & Fish" Hack',
    tip: 'Kenkey is one of the most budget-friendly heavy meals. Two balls of kenkey (GH₵ 10) and fried fish (GH₵ 10) = GH₵ 20 for a meal that keeps you full all day long.',
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />, color: 'purple', tag: 'Shopping Smart',
    title: 'Buy Toiletries in Bulk',
    tip: 'Buying tissue, soap, and toothpaste in bulk from the market at the start of the semester is 30% cheaper than buying single items from the hostel provisions shop.',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'emerald', tag: 'Transport',
    title: 'Don\'t Charter Taxis (Dropping)',
    tip: 'Never charter a taxi (dropping) unless it\'s a sheer emergency. Waiting a few extra minutes for a shared campus shuttle or k3k3 costs just GH₵ 2.50, while chartering a taxi for the exact same route costs GH₵ 15-20+.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'blue', tag: 'Utility Savings',
    title: 'Unsubscribe from SMS Promos',
    tip: 'Those GH₵ 0.50 daily SMS jokes or sports news drain GH₵ 15 a month. Dial your network\'s shortcode to check and cancel all active subscriptions.',
  },
  {
    icon: <ChefHat className="w-5 h-5" />, color: 'amber', tag: 'Food Strategy',
    title: 'Make Your Own Breakfast',
    tip: 'Oats, Tom Brown, or Hausa Koko made in your room costs about GH₵ 3-5 per serving. Buying breakfast outside every morning costs GH₵ 15+. Save GH₵ 50+ a week.',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'red', tag: 'Mindset',
    title: 'Keep Track of Borrowing',
    tip: 'Lending GH₵ 10 here and GH₵ 20 there to friends adds up fast. Keep track of it, or better yet, learn to politely say "My budget is tight this week".',
  },
  {
    icon: <Lightbulb className="w-5 h-5" />, color: 'purple', tag: 'Social Spend',
    title: 'Free Campus Events',
    tip: 'Look out for department week celebrations, SRC programs, or seminars. They often provide free food, snacks, and sometimes T-shirts!',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'emerald', tag: 'Mindset',
    title: 'Fix It, Don\'t Replace It',
    tip: 'A torn shoe or ripped bag can often be fixed by the campus cobbler (shoemaker) for GH₵ 5-10. Don\'t rush to buy a new one for GH₵ 150.',
  },
  {
    icon: <AlertCircle className="w-5 h-5" />, color: 'red', tag: 'Mindset',
    title: 'The "Outside Food" Trap',
    tip: 'Stop buying food outside every day! Your money will disappear in the twinkling of an eye. Cooking your own meals is the only guaranteed way to survive a full semester.',
  },
  {
    icon: <TrendingDown className="w-5 h-5" />, color: 'amber', tag: 'Transport',
    title: 'Avoid Unnecessary Town Trips',
    tip: 'Don\'t leave campus to go into town unnecessarily just because others are going. It drains your transport budget and wastes valuable study time.',
  },
];

const colorMap = {
  emerald: { bg: 'bg-slate-50 dark:bg-slate-800/50', border: 'border-slate-200 dark:border-slate-700', icon: 'text-slate-600 dark:text-slate-400', tag: 'bg-slate-200 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300' },
  blue:    { bg: 'bg-blue-50 dark:bg-blue-900/20',       border: 'border-blue-200 dark:border-blue-800',       icon: 'text-blue-600 dark:text-blue-400',       tag: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-900/20',     border: 'border-amber-200 dark:border-amber-800',     icon: 'text-amber-600 dark:text-amber-400',     tag: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
  purple:  { bg: 'bg-orange-50 dark:bg-orange-900/20',   border: 'border-orange-200 dark:border-orange-800',   icon: 'text-orange-600 dark:text-orange-400',   tag: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' },
  red:     { bg: 'bg-rose-50 dark:bg-rose-900/20',         border: 'border-rose-200 dark:border-rose-800',         icon: 'text-rose-600 dark:text-rose-400',         tag: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300' },
};

// ─── Spending analysis insights ────────────────────────────────────────────
function generateInsights(transactions) {
  const insights = [];
  const now = new Date();
  const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);

  const recentExpenses = transactions.filter(t =>
    t.type === 'expense' && new Date(t.date) >= weekAgo
  );

  const byCategory = {};
  recentExpenses.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + parseFloat(t.amount);
  });

  const foodSpend = (byCategory['Food'] || 0) + (byCategory['Groceries'] || 0);
  const transportSpend = byCategory['Transport'] || 0;
  const totalSpend = Object.values(byCategory).reduce((a, b) => a + b, 0);

  if (foodSpend > 0) {
    const perMeal = foodSpend / 21; // 3 meals × 7 days
    insights.push({
      icon: '🍚',
      color: foodSpend > 100 ? 'red' : 'emerald',
      title: `Food: GH₵ ${foodSpend.toFixed(2)} this week`,
      body: foodSpend > 100
        ? `That's ~GH₵ ${perMeal.toFixed(2)}/meal. Cooking 2 meals a day yourself could cut this to under GH₵ 60.`
        : `Great! You're averaging GH₵ ${perMeal.toFixed(2)}/meal. Keep it up.`
    });
  }

  if (transportSpend > 50) {
    insights.push({
      icon: '🚌',
      color: 'amber',
      title: `Transport: GH₵ ${transportSpend.toFixed(2)} this week`,
      body: `If GH₵ ${(transportSpend * 0.4).toFixed(2)} of this was Bolt/Uber, switching to campus shuttle or k3k3 for daytime trips could save that amount weekly.`
    });
  }

  if (totalSpend === 0) {
    insights.push({
      icon: '👋',
      color: 'blue',
      title: 'Start logging to get insights',
      body: 'Once you log a few expenses in the Budget Tracker, we\'ll analyze your habits and give you personalized savings tips here.'
    });
  }

  return insights;
}

// ─── Main Component ─────────────────────────────────────────────────────────
export function SmartTips({ transactions = [] }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Rotate tip daily (use day-of-year as seed)
  useEffect(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setTipIndex(dayOfYear % DAILY_TIPS.length);
  }, []);

  const dailyTip = DAILY_TIPS[tipIndex];
  const tipStyle = colorMap[dailyTip.color];
  const insights = generateInsights(transactions);

  const nextTip = () => setTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
  const prevTip = () => setTipIndex((prev) => (prev - 1 + DAILY_TIPS.length) % DAILY_TIPS.length);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" /> Money Coach
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={prevTip} className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextTip} className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Daily Tip Card */}
      <div className={`rounded-2xl border p-4 mb-4 ${tipStyle.bg} ${tipStyle.border}`}>
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 shrink-0 ${tipStyle.icon}`}>{dailyTip.icon}</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-black text-gray-900 dark:text-white text-sm">{dailyTip.title}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tipStyle.tag}`}>{dailyTip.tag}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{dailyTip.tip}</p>
          </div>
        </div>
      </div>

      {/* Personalized Insights from real spending */}
      {insights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">Your Spending This Week</h3>
          {insights.map((insight, i) => {
            const s = colorMap[insight.color];
            return (
              <div key={i} className={`rounded-xl border p-3 flex items-start gap-3 ${s.bg} ${s.border}`}>
                <span className="text-xl shrink-0">{insight.icon}</span>
                <div>
                  <p className="text-sm font-black text-gray-900 dark:text-white">{insight.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{insight.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
