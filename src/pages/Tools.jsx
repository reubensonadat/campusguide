import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Calendar, DollarSign, TrendingUp, Bell, Clock, BarChart3, Target, Lightbulb, Users, Wrench } from 'lucide-react';
import TimetableBuilder from '../components/tools/TimetableBuilder';
import BudgetTracker from '../components/tools/BudgetTracker';
import GPACalculator from '../components/tools/GPACalculator';
import RemindersBoard from '../components/tools/RemindersBoard';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('timetable');

  const tools = [
    {
      id: 'timetable',
      title: 'Timetable Builder',
      description: 'Create and manage your class schedule',
      icon: Calendar,
      component: TimetableBuilder,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      features: ['Color-coded courses', 'PDF export', 'Weekly view', 'Conflict detection']
    },
    {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'Track income and expenses',
      icon: DollarSign,
      component: BudgetTracker,
      color: 'text-green-600',
      bg: 'bg-green-50',
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
      features: ['Priority levels', 'Due date tracking', 'Browser notifications', 'Complete/incomplete']
    }
  ];

  const toolStats = [
    {
      label: 'Total Tools',
      value: '4',
      icon: Wrench,
      color: 'text-gray-600'
    },
    {
      label: 'Active Users',
      value: '2,500+',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Data Saved',
      value: 'Local',
      icon: Target,
      color: 'text-green-600'
    }
  ];

  const ActiveComponent = tools.find(t => t.id === activeTool)?.component;

  return (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <Wrench size={40} className="text-gray-600 mx-auto mb-3" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Tools</h1>
        <p className="text-gray-600 text-lg">
          Essential tools to make your university life easier
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {toolStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center" style={{ backgroundColor: 'rgb(255 255 255)' }}>
              <CardContent className="pt-4">
                <Icon size={24} className={stat.color + ' mx-auto mb-2'} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tool Selector */}
      <Card className="mb-6" style={{ backgroundColor: 'rgb(255 255 255)' }}>
        <CardHeader>
          <CardTitle className="text-black">Choose a Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    activeTool === tool.id 
                      ? 'border-primary-500 bg-primary-50 shadow-medium' 
                      : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 ${tool.bg} rounded-lg flex items-center justify-center`}>
                      <Icon size={24} className={tool.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg mb-1 ${
                        activeTool === tool.id ? 'text-primary-800' : 'text-gray-900'
                      }`}>
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {tool.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          activeTool === tool.id 
                            ? 'bg-primary-100 text-primary-700' 
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
      {ActiveComponent && <ActiveComponent />}
    </div>
  );
};

export default Tools;