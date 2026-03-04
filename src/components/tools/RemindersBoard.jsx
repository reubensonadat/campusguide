import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../common/Card';
import { Plus, Trash2, Check } from 'lucide-react';
import { PRIORITY_LEVELS } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { showReminderNotification } from '../../services/notificationService';

const RemindersBoard = () => {
  const [reminders, setReminders] = useLocalStorage('ucc_reminders', []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    dueDate: '',
    priority: 'medium',
    completed: false
  });

  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.dueDate) {
      const reminder = {
        ...newReminder,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      setReminders([...reminders, reminder]);
      setNewReminder({
        title: '',
        dueDate: '',
        priority: 'medium',
        completed: false
      });
      setShowAddForm(false);
    }
  };

  const handleToggleComplete = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getPriorityInfo = (priority) => {
    return PRIORITY_LEVELS.find(p => p.value === priority) || PRIORITY_LEVELS[1];
  };

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'active') return !reminder.completed;
    if (filter === 'completed') return reminder.completed;
    return true;
  });

  const sortedReminders = filteredReminders.sort((a, b) => {
    // Sort by priority first, then by due date
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !dueDate.includes('completed');
  };

  return (
    <div className="p-4 pb-20">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>My Reminders</CardTitle>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={16} className="mr-1" />
              Add Reminder
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({reminders.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active ({reminders.filter(r => !r.completed).length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed ({reminders.filter(r => r.completed).length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Reminder Title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                    className="p-2 border rounded"
                  />
                  
                  <input
                    type="datetime-local"
                    value={newReminder.dueDate}
                    onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                    className="p-2 border rounded"
                  />
                  
                  <select
                    value={newReminder.priority}
                    onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                    className="p-2 border rounded"
                  >
                    {PRIORITY_LEVELS.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddReminder}>Add Reminder</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {sortedReminders.map(reminder => {
              const priorityInfo = getPriorityInfo(reminder.priority);
              const overdue = isOverdue(reminder.dueDate);
              
              return (
                <div
                  key={reminder.id}
                  className={`flex items-center justify-between p-3 border rounded ${
                    reminder.completed ? 'bg-gray-50 opacity-75' : ''
                  } ${overdue ? 'border-red-300 bg-red-50' : ''}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => handleToggleComplete(reminder.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        reminder.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {reminder.completed && <Check size={12} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${reminder.completed ? 'line-through text-gray-500' : ''}`}>
                          {reminder.title}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </span>
                        {overdue && (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                            Overdue
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Due: {formatDate(reminder.dueDate)}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReminder(reminder.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              );
            })}
            
            {sortedReminders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {filter === 'completed' 
                  ? 'No completed reminders yet.'
                  : 'No reminders yet. Add your first reminder to get started.'
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RemindersBoard;