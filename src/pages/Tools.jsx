import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, DollarSign, TrendingUp, Bell, Clock, BarChart3, Target, Lightbulb, Users, Wrench, Sparkles, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import BudgetTracker from '../components/tools/BudgetTracker';
import GPACalculator from '../components/tools/GPACalculator';
import RemindersBoard from '../components/tools/RemindersBoard';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('timetable');
  const navigate = useNavigate();

  const tools = [
    {
      id: 'timetable',
      title: 'Timetable Builder',
      description: 'Create and manage your class schedule',
      icon: Calendar,
      component: TimetableBuilder,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      features: ['Color-coded courses', 'PDF export', 'Weekly view', 'Conflict detection']
    },
    {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'Track income and expenses',
      icon: DollarSign,
      component: BudgetTracker,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      features: ['Visual summaries', 'CSV export', 'Category tracking', 'Balance calculation']
    },
    {
      id: 'gpa',
      title: 'GPA Calculator',
      description: 'Calculate and track your GPA',
      icon: TrendingUp,
      component: GPACalculator,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      features: ['Grade calculator', 'Projection scenarios', 'Credit tracking', 'Historical data']
    },
    {
      id: 'reminders',
      title: 'Reminders Board',
      description: 'Never miss important deadlines',
      icon: Bell,
      component: RemindersBoard,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      features: ['Priority levels', 'Due date tracking', 'Browser notifications', 'Complete/incomplete']
    }
  ];

  const toolStats = [
    {
      label: 'Total Tools',
      value: '4',
      icon: Wrench,
      color: 'text-gray-600',
      bg: 'bg-gray-50'
    },
    {
      label: 'Active Users',
      value: '2,500+',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Data Saved',
      value: 'Local',
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  const ActiveComponent = tools.find(t => t.id === activeTool)?.component;

  return (
    <div className="p-4 pb-24 bg-gray-50/50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-200 mb-6">
             <Sparkles size={12} /> Essential Tools
          </div>

          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
            <Wrench size={40} className="text-white drop-shadow-md" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            Student <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
              Tools & Resources
            </span>
          </h1>
          
          <p className="text-blue-100/90 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Essential tools to make your university life easier and more productive.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-none"
            >
              <Target size={20} /> Back to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/guide')}
              className="bg-blue-800/40 backdrop-blur-md border border-white/30 text-white hover:bg-blue-800/60 px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Lightbulb size={20} /> View Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {toolStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center border-none shadow-sm hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
              <CardContent className="pt-6 pb-6">
                <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={22} className={stat.color} />
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tool Selector */}
      <Card className="mb-8 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            Choose a Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all ${
                    activeTool === tool.id 
                      ? `${tool.border} ${tool.bg} shadow-md` 
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={24} className={tool.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${tool.color}`}>{tool.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-medium">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {tool.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          activeTool === tool.id 
                            ? `${tool.bg} ${tool.color}` 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Tool */}
      {ActiveComponent && (
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
              {tools.find(t => t.id === activeTool)?.icon && 
                React.createElement(tools.find(t => t.id === activeTool)?.icon, { 
                  size: 20, 
                  className: tools.find(t => t.id === activeTool)?.color 
                })
              }
              {tools.find(t => t.id === activeTool)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ActiveComponent />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tools;