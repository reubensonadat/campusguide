import React from 'react';

export const Linkify = ({ text, className }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  if (!text) return null;

  const parts = text.split(urlRegex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 underline break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return <span key={i} className="break-words">{part}</span>;
      })}
    </span>
  );
};
