import React, { useState, useMemo } from 'react'
import Chart from 'react-apexcharts'
import { TrendingUp, TrendingDown, MoreHorizontal, Calendar, Download, ChevronDown, Users, ShoppingBag, MessageCircle, Clock, Eye, ThumbsUp, Share2, MapPin } from 'lucide-react'

const MOCK = {
  stats: {
    totalUsers: { value: '4,287', trend: 31, label: 'Total Users', icon: Users },
    totalThrift: { value: '623', trend: 18, label: 'Total Thrift Items', icon: ShoppingBag },
    totalWhispers: { value: '15,342', trend: 24, label: 'Total Whispers', icon: MessageCircle },
    avgFocus: { value: '3,180', trend: 12, label: 'Avg. Focus Hours', icon: Clock },
  },
  monthlySales: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    sales: [28, 41, 33, 52, 46, 61, 55, 67, 58, 72, 64, 78],
    revenue: [22, 34, 27, 44, 38, 53, 46, 57, 49, 63, 55, 68],
  },
  monthlyTarget: 72,
  statistics: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    thisYear: [18, 32, 26, 41, 36, 48],
    lastYear: [11, 22, 17, 28, 24, 34],
  },
  recentOrders: [
    { id: '#TRX-001', user: 'Kofi Mensah', item: 'Engineering Textbook Set', amount: 'GH₵ 350', status: 'Completed', date: '2026-07-14' },
    { id: '#TRX-002', user: 'Ama Serwaa', item: 'MacBook Air 2024', amount: 'GH₵ 4,500', status: 'Pending', date: '2026-07-13' },
    { id: '#TRX-003', user: 'Yaw Asante', item: 'Campus Hoodie', amount: 'GH₵ 120', status: 'Completed', date: '2026-07-12' },
    { id: '#TRX-004', user: 'Efua Quansah', item: 'Graphing Calculator', amount: 'GH₵ 250', status: 'Cancelled', date: '2026-07-11' },
    { id: '#TRX-005', user: 'Nana Owusu', item: 'Scientific Calculator', amount: 'GH₵ 85', status: 'Completed', date: '2026-07-10' },
    { id: '#TRX-006', user: 'Akua Adjei', item: 'Dorm Desk Fan', amount: 'GH₵ 180', status: 'Pending', date: '2026-07-09' },
    { id: '#TRX-007', user: 'Kwame Boadi', item: 'Leather Sandals', amount: 'GH₵ 95', status: 'Completed', date: '2026-07-08' },
    { id: '#TRX-008', user: 'Abena Osei', item: 'Python Programming Guide', amount: 'GH₵ 65', status: 'Completed', date: '2026-07-07' },
  ],
  regions: {
    labels: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central'],
    values: [38, 27, 14, 12, 9],
  },
}

function TrendBadge({ trend, value }) {
  const isUp = trend > 0
  const Icon = isUp ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-1 text-[13px] font-semibold px-2 py-0.5 rounded-md ${
      isUp ? 'text-green-700 bg-green-50 dark:bg-green-500/15 dark:text-green-400' 
           : 'text-red-700 bg-red-50 dark:bg-red-500/15 dark:text-red-400'
    }`}>
      <Icon size={14} /> {isUp ? '+' : ''}{value}%
    </span>
  )
}

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60 transition-all duration-200 hover:shadow-lg hover:dark:shadow-gray-900/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex size-12 items-center justify-center rounded-full ${color}`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500">{label}</p>
            <h4 className="mt-1 text-title-sm font-bold text-gray-800 dark:text-white/90">
              {value}
            </h4>
          </div>
        </div>
        <TrendBadge trend={trend} value={Math.abs(trend)} />
      </div>
    </div>
  )
}

function KebabMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <MoreHorizontal size={18} className="text-gray-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 w-40 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {['View Report', 'Download CSV', 'Export PDF'].map(item => (
              <button key={item} onClick={() => setOpen(false)}
                className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                {item}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function FilterBar() {
  const [filter, setFilter] = useState('all')
  const options = [
    { label: 'All', value: 'all' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
  ]
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1.5 dark:border-gray-800 dark:bg-gray-900/60">
      {options.map(opt => (
        <button key={opt.value} onClick={() => setFilter(opt.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            filter === opt.value 
              ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-white/90' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white/60'
          }`}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function DateRangePicker() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-gray-900/60 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
      <Calendar size={16} className="text-gray-400" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Jan 1 - Jul 14, 2026</span>
      <ChevronDown size={14} className="text-gray-400" />
    </div>
  )
}

function ViewTabs() {
  const [active, setActive] = useState('overview')
  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Sales', value: 'sales' },
    { label: 'Revenue', value: 'revenue' },
  ]
  return (
    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1.5 dark:border-gray-800 dark:bg-gray-900/60">
      {tabs.map(tab => (
        <button key={tab.value} onClick={() => setActive(tab.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab.value 
              ? 'bg-primary-500 text-white shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white/60'
          }`}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function OrdersTable({ data }) {
  const statusColors = {
    Completed: 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400',
    Pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400',
    Cancelled: 'bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Recent Orders</h3>
        <button className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {['Order', 'User', 'Item', 'Amount', 'Status', 'Date'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className={`${i !== data.length - 1 ? 'border-b border-gray-50 dark:border-gray-800/50' : ''} hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors`}>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white/90">{row.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{row.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{row.item}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white/90">{row.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-semibold ${statusColors[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function WorldMap() {
  const total = MOCK.regions.values.reduce((a, b) => a + b, 0)
  const colors = ['bg-primary-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-gray-400']
  const dots = [
    { cx: 520, cy: 180, r: 8, cls: 'fill-primary-500' },
    { cx: 480, cy: 320, r: 6, cls: 'fill-blue-500' },
    { cx: 340, cy: 160, r: 5, cls: 'fill-emerald-500' },
    { cx: 560, cy: 280, r: 4, cls: 'fill-amber-500' },
    { cx: 300, cy: 300, r: 3, cls: 'fill-gray-400' },
  ]
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Users by Region</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Geographic distribution in Ghana</p>
        </div>
        <KebabMenu />
      </div>
      <div className="flex items-center justify-center mb-6">
        <svg viewBox="0 0 800 500" className="w-full h-auto max-w-[400px] text-gray-200 dark:text-gray-700">
          <circle cx="400" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="250" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="250" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="250" r="20" fill="currentColor" opacity="0.5" />
          <line x1="100" y1="250" x2="700" y2="250" stroke="currentColor" strokeWidth="0.5" />
          <line x1="400" y1="50" x2="400" y2="450" stroke="currentColor" strokeWidth="0.5" />
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} className={d.cls} style={{ opacity: 0.8 - i * 0.1 }} />
          ))}
        </svg>
      </div>
      <div className="space-y-2.5">
        {MOCK.regions.labels.map((region, i) => {
          const pct = Math.round((MOCK.regions.values[i] / total) * 100)
          return (
            <div key={region} className="flex items-center gap-3">
              <div className={`size-3 rounded-full shrink-0 ${colors[i]}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">{region}</span>
              <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white/90 min-w-[40px] text-right">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AnalyticsDashboard() {
  const barChart = useMemo(() => ({
    series: [
      { name: 'Sales', data: MOCK.monthlySales.sales, color: '#468EAA' },
      { name: 'Revenue', data: MOCK.monthlySales.revenue, color: '#93C5FD' },
    ],
    options: {
      chart: { type: 'bar', height: 320, stacked: false, toolbar: { show: false }, fontFamily: 'inherit', foreColor: '#9CA3AF' },
      colors: ['#468EAA', '#93C5FD'],
      grid: { borderColor: '#F3F4F6', strokeDashArray: 4, padding: { top: -10, right: 0, bottom: 0, left: -10 } },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '28%', horizontal: false } },
      dataLabels: { enabled: false },
      xaxis: { categories: MOCK.monthlySales.categories, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#9CA3AF', fontSize: '12px', fontWeight: 500 } } },
      yaxis: { labels: { style: { colors: '#9CA3AF', fontSize: '12px', fontWeight: 500 } } },
      legend: { position: 'top', horizontalAlign: 'right', fontSize: '13px', fontWeight: 600, markers: { width: 8, height: 8, radius: 2 } },
      tooltip: { theme: 'light', x: { show: true }, y: { formatter: v => `GH₵ ${v}k` } },
      states: { hover: { filter: { type: 'darken', value: 0.1 } } },
    },
  }), [])

  const radialChart = useMemo(() => ({
    series: [MOCK.monthlyTarget],
    options: {
      chart: { type: 'radialBar', height: 280, toolbar: { show: false }, fontFamily: 'inherit' },
      colors: ['#468EAA'],
      plotOptions: {
        radialBar: {
          hollow: { margin: 0, size: '60%' },
          track: { background: '#F3F4F6', strokeWidth: '80%' },
          dataLabels: {
            show: true,
            name: { show: false },
            value: {
              fontSize: '32px',
              fontWeight: 800,
              color: '#111827',
              formatter: v => `${v}%`,
            },
          },
        },
      },
      grid: { padding: { top: -15, bottom: -15 } },
      labels: ['Monthly Target'],
    },
  }), [])

  const areaChart = useMemo(() => ({
    series: [
      { name: 'This Year', data: MOCK.statistics.thisYear, color: '#468EAA' },
      { name: 'Last Year', data: MOCK.statistics.lastYear, color: '#F87171' },
    ],
    options: {
      chart: { type: 'area', height: 320, toolbar: { show: false }, fontFamily: 'inherit', foreColor: '#9CA3AF' },
      colors: ['#468EAA', '#F87171'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 95],
        },
      },
      grid: { borderColor: '#F3F4F6', strokeDashArray: 4, padding: { top: -10, right: 0, bottom: 0, left: -10 } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2.5 },
      xaxis: { categories: MOCK.statistics.categories, axisBorder: { show: false }, axisTicks: { show: false }, labels: { style: { colors: '#9CA3AF', fontSize: '12px', fontWeight: 500 } } },
      yaxis: { labels: { style: { colors: '#9CA3AF', fontSize: '12px', fontWeight: 500 } } },
      legend: { position: 'top', horizontalAlign: 'right', fontSize: '13px', fontWeight: 600, markers: { width: 8, height: 8, radius: 2 } },
      tooltip: { theme: 'light', x: { show: true }, y: { formatter: v => `${v}k` } },
      states: { hover: { filter: { type: 'darken', value: 0.1 } } },
    },
  }), [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Analytics Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track your campus performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker />
          <FilterBar />
          <button className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 transition-colors">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.values(MOCK.stats).map(stat => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} trend={stat.trend}
            color={stat.label === 'Total Users' ? 'bg-primary-500' : stat.label === 'Total Thrift Items' ? 'bg-amber-500' : stat.label === 'Total Whispers' ? 'bg-rose-500' : 'bg-emerald-500'} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Monthly Sales Bar Chart */}
        <div className="xl:col-span-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Sales & Revenue</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Performance overview for 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <ViewTabs />
              <KebabMenu />
            </div>
          </div>
          <Chart options={barChart.options} series={barChart.series} type="bar" height={320} />
        </div>

        {/* Monthly Target Radial */}
        <div className="xl:col-span-4 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Monthly Target</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Progress towards goal</p>
            </div>
            <KebabMenu />
          </div>
          <Chart options={radialChart.options} series={radialChart.series} type="radialBar" height={280} />
          <div className="flex justify-center gap-8 mt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white/90">GH₵ 68k</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Achieved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800 dark:text-white/90">GH₵ 80k</p>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Statistics Area Chart */}
        <div className="xl:col-span-7 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Week-by-week comparison</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-gray-800 dark:bg-gray-900/60">
                <span className="size-2.5 rounded-full bg-[#468EAA]" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">This Year</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1 dark:border-gray-800 dark:bg-gray-900/60">
                <span className="size-2.5 rounded-full bg-[#F87171]" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Last Year</span>
              </div>
            </div>
          </div>
          <Chart options={areaChart.options} series={areaChart.series} type="area" height={320} />
        </div>

        {/* World Map */}
        <div className="xl:col-span-5">
          <WorldMap />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable data={MOCK.recentOrders} />

      {/* Footer Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
          <Eye size={20} className="text-gray-400" />
          <div>
            <p className="text-lg font-bold text-gray-800 dark:text-white/90">18.7k</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Page Views</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
          <ThumbsUp size={20} className="text-gray-400" />
          <div>
            <p className="text-lg font-bold text-gray-800 dark:text-white/90">1,247</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Likes</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
          <Share2 size={20} className="text-gray-400" />
          <div>
            <p className="text-lg font-bold text-gray-800 dark:text-white/90">567</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Shares</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
          <MapPin size={20} className="text-gray-400" />
          <div>
            <p className="text-lg font-bold text-gray-800 dark:text-white/90">12</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Campuses Covered</p>
          </div>
        </div>
      </div>
    </div>
  )
}
