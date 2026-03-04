// src/components/common/Card.jsx
import React from 'react';
import { cn } from '../../utils/helpers';
import { Info, AlertCircle, CheckCircle, FileText, Lightbulb, BookOpen, List, ExternalLink } from 'lucide-react';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'md',
  type = 'default',
  ...props
}) => {
  const baseClasses = 'transition-colors duration-300';

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundeds = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const typeStyles = {
    default: 'bg-[var(--white)] border border-[var(--gray-200)] dark:bg-gray-800 dark:border-gray-700',
    info: 'bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50',
    success: 'bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-800/50',
    warning: 'bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800/50',
    error: 'bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-800/50',
    guide: 'bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/50',
    resource: 'bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-800/50',
    tip: 'bg-purple-50 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800/50',
    checklist: 'bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50'
  };

  return (
    <div
      className={cn(
        baseClasses,
        paddings[padding],
        shadows[shadow],
        roundeds[rounded],
        typeStyles[type],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', icon, iconColor = 'text-gray-500', ...props }) => (
  <div className={`mb-4 flex items-start ${className}`} {...props}>
    {icon && (
      <div className={`mr-3 flex-shrink-0 ${iconColor}`}>
        {icon}
      </div>
    )}
    <div className="flex-1">
      {children}
    </div>
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-[var(--gray-900)] transition-colors duration-300 ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-[var(--gray-600)] mt-1 transition-colors duration-300 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-[var(--gray-200)] transition-colors duration-300 ${className}`} {...props}>
    {children}
  </div>
);

// Specialized card types
const InfoCard = ({ title, description, children, className = '', ...props }) => (
  <Card type="info" className={className} {...props}>
    <CardHeader icon={<Info size={20} />} iconColor="text-blue-500">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);

const WarningCard = ({ title, description, children, className = '', ...props }) => (
  <Card type="warning" className={className} {...props}>
    <CardHeader icon={<AlertCircle size={20} />} iconColor="text-yellow-500">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);

const GuideCard = ({ title, description, children, className = '', ...props }) => (
  <Card type="guide" className={className} {...props}>
    <CardHeader icon={<BookOpen size={20} />} iconColor="text-indigo-500">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);

const ResourceCard = ({ title, description, url, children, className = '', ...props }) => (
  <Card type="resource" className={className} {...props}>
    <CardHeader icon={<FileText size={20} />} iconColor="text-green-500">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
    {url && (
      <CardFooter>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
        >
          View Resource
          <ExternalLink size={16} className="ml-1" />
        </a>
      </CardFooter>
    )}
  </Card>
);

const TipCard = ({ title, description, children, className = '', ...props }) => (
  <Card type="tip" className={className} {...props}>
    <CardHeader icon={<Lightbulb size={20} />} iconColor="text-purple-500">
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
  </Card>
);

const ChecklistCard = ({ title, items, className = '', ...props }) => (
  <Card type="checklist" className={className} {...props}>
    <CardHeader icon={<List size={20} />} iconColor="text-gray-500">
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <input
              type="checkbox"
              className="h-4 w-4 border-[var(--gray-300)] rounded bg-[var(--white)] mr-2 mt-0.5 transition-colors duration-300 accent-[var(--primary-600)]"
              defaultChecked={item.checked}
              readOnly
            />
            <span className={`text-sm transition-colors duration-300 ${item.checked
              ? 'text-[var(--gray-400)] line-through'
              : 'text-[var(--gray-700)]'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  InfoCard,
  WarningCard,
  GuideCard,
  ResourceCard,
  TipCard,
  ChecklistCard
};
export default Card;