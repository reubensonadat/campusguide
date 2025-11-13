// src/components/guide/GuideContent.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  InfoCard,
  WarningCard,
  GuideCard,
  ResourceCard,
  TipCard,
  ChecklistCard
} from '../common/Card';
import { 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  List,
  ChevronRight,
  Clock,
  Users,
  Calendar,
  Star
} from 'lucide-react';

// Memoized tab content components to prevent unnecessary re-renders
const OverviewTab = React.memo(({ section }) => (
  <div className="space-y-4 pb-4">
    <InfoCard 
      title="Overview" 
      description={section.summary}
    >
      <CardContent>
        {section.content}
      </CardContent>
    </InfoCard>
    
    {section.keyPoints && (
      <Card>
        <CardHeader icon={<Star size={20} />} iconColor="text-yellow-500">
          <CardTitle>Key Points</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {section.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )}
    
    {section.importantDates && (
      <Card>
        <CardHeader icon={<Calendar size={20} />} iconColor="text-blue-500">
          <CardTitle>Important Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {section.importantDates.map((date, index) => (
              <li key={index} className="flex items-start">
                <Clock size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{date.title}</div>
                  <div className="text-xs text-gray-500">{date.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )}
  </div>
));

const StepsTab = React.memo(({ section }) => (
  <div className="space-y-4 pb-4">
    <GuideCard 
      title="Step-by-Step Guide" 
      description="Follow these steps to complete this process successfully."
    >
      <CardContent>
        <ol className="space-y-4">
          {section.steps.map((step, index) => (
            <li key={index} className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium text-sm mr-3">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {typeof step === 'string' ? step : step.title}
                </div>
                {step.description && (
                  <div className="text-sm text-gray-600 mt-1">{step.description}</div>
                )}
                {step.note && (
                  <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                    <strong>Note:</strong> {step.note}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </GuideCard>
    
    {section.tips && (
      <TipCard 
        title="Helpful Tips" 
        description="These tips will help you complete this process more easily."
      >
        <CardContent>
          <ul className="space-y-2">
            {section.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <Lightbulb size={16} className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </TipCard>
    )}
  </div>
));

const ResourcesTab = React.memo(({ section }) => (
  <div className="space-y-4 pb-4">
    {section.resources && section.resources.length > 0 ? (
      section.resources.map((resource, index) => (
        <ResourceCard 
          key={index}
          title={resource.title}
          description={resource.description}
          url={resource.url}
        />
      ))
    ) : (
      <Card>
        <CardContent className="text-center py-8">
          <FileText size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Resources Available</h3>
          <p className="text-sm text-gray-600">Check back later for resources related to this topic.</p>
        </CardContent>
      </Card>
    )}
    
    {section.contacts && (
      <Card>
        <CardHeader icon={<Users size={20} />} iconColor="text-blue-500">
          <CardTitle>Who to Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {section.contacts.map((contact, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-600">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.role}</div>
                  <div className="text-xs text-gray-500 mt-1">{contact.contact}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )}
  </div>
));

const WarningsTab = React.memo(({ section }) => (
  <div className="space-y-4 pb-4">
    <WarningCard 
      title="Common Mistakes to Avoid" 
      description="Be aware of these common issues to ensure a smooth process."
    >
      <CardContent>
        <ul className="space-y-2">
          {section.commonMistakes.map((mistake, index) => (
            <li key={index} className="flex items-start">
              <AlertCircle size={16} className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{mistake}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </WarningCard>
    
    {section.consequences && (
      <Card>
        <CardHeader icon={<AlertCircle size={20} />} iconColor="text-red-500">
          <CardTitle>Potential Consequences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">{section.consequences}</p>
        </CardContent>
      </Card>
    )}
  </div>
));

const ChecklistTab = React.memo(({ section }) => {
  const completedCount = useMemo(() => 
    section.checklist?.filter(item => item.checked).length || 0, 
    [section.checklist]
  );
  
  const totalCount = useMemo(() => 
    section.checklist?.length || 0, 
    [section.checklist]
  );
  
  const progressPercentage = useMemo(() => 
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0, 
    [completedCount, totalCount]
  );

  return (
    <div className="space-y-4 pb-4">
      <ChecklistCard 
        title="Progress Checklist" 
        items={section.checklist || []}
      />
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Your Progress</span>
            <span className="text-sm text-gray-500">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

// Tab navigation component
const TabNavigation = React.memo(({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'steps', label: 'Steps' },
    { id: 'resources', label: 'Resources' },
    { id: 'warnings', label: 'Warnings' },
    { id: 'checklist', label: 'Checklist' }
  ];

  return (
    <div className="mb-4 border-b border-gray-200">
      <nav className="-mb-px flex space-x-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                isActive
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
});

const GuideContent = ({ guide, isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Memoize the current section to prevent unnecessary re-renders
  const section = useMemo(() => {
    if (!guide || !guide.sections || !guide.sections[currentSection]) {
      return null;
    }
    return guide.sections[currentSection];
  }, [guide, currentSection]);

  // Memoize the title to prevent unnecessary re-renders
  const title = useMemo(() => {
    return guide?.title || '';
  }, [guide]);

  // Use useCallback to prevent unnecessary re-renders of these functions
  const handleMarkSectionComplete = useCallback(() => {
    setCompletedSections(prev => {
      if (prev.includes(currentSection)) {
        return prev.filter(i => i !== currentSection);
      } else {
        return [...prev, currentSection];
      }
    });
  }, [currentSection]);

  // Memoize the tab content component to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    if (!section) return null;

    switch (activeTab) {
      case 'overview':
        return <OverviewTab section={section} />;
      case 'steps':
        return <StepsTab section={section} />;
      case 'resources':
        return <ResourcesTab section={section} />;
      case 'warnings':
        return <WarningsTab section={section} />;
      case 'checklist':
        return <ChecklistTab section={section} />;
      default:
        return null;
    }
  }, [section, activeTab]);

  // Memoize the isCompleted status to prevent unnecessary re-renders
  const isCompleted = useMemo(() => {
    return completedSections.includes(currentSection);
  }, [completedSections, currentSection]);

  // Return null if guide is not available
  if (!guide || !section) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      className="h-[85vh] max-h-[85vh] flex flex-col"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkSectionComplete}
              className={isCompleted ? 'text-green-600' : ''}
            >
              <CheckCircle size={16} className="mr-1" />
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </Button>
          </div>
          
          {section.summary && (
            <p className="text-gray-600">{section.summary}</p>
          )}
        </div>
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 overflow-y-auto">
          {tabContent}
        </div>
      </div>
    </Modal>
  );
};

export { GuideContent };
export default GuideContent;