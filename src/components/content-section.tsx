"use client";

import React, { ReactNode } from 'react';

export interface ContentSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  background?: 'blue' | 'slate' | 'amber' | 'green' | 'purple' | 'white';
  textColor?: 'light' | 'dark';
  fullWidth?: boolean;
  centered?: boolean;
  paddingY?: 'small' | 'medium' | 'large';
}

const ContentSection = ({
  title,
  description,
  children,
  background = 'slate',
  textColor = 'dark',
  fullWidth = false,
  centered = false,
  paddingY = 'medium'
}: ContentSectionProps) => {
  // Define background colors
  const bgColors = {
    blue: 'bg-blue-50',
    slate: 'bg-slate-100',
    amber: 'bg-amber-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    white: 'bg-white'
  };
  
  // Define text colors based on the textColor prop
  const textColors = {
    light: {
      heading: 'text-white',
      description: 'text-gray-200',
      content: 'text-gray-100'
    },
    dark: {
      heading: 'text-blue-900',
      description: 'text-gray-600',
      content: 'text-gray-800'
    }
  };
  
  // Define padding based on the paddingY prop
  const paddingYClasses = {
    small: 'py-6',
    medium: 'py-12',
    large: 'py-20'
  };

  return (
    <section className={`${bgColors[background]} w-full my-12 ${paddingYClasses[paddingY]}`}>
      <div className={`${fullWidth ? 'container mx-auto px-4' : 'max-w-4xl mx-auto px-4'}`}>
        {title && (
          <h2 className={`font-heading font-bold text-3xl md:text-4xl ${textColors[textColor].heading} mb-4 ${centered ? 'text-center' : ''}`}>
            {title}
          </h2>
        )}
        {description && (
          <p className={`text-lg md:text-xl ${textColors[textColor].description} mb-8 ${centered ? 'text-center' : ''}`}>
            {description}
          </p>
        )}
        <div className={`${textColors[textColor].content} ${centered ? 'text-center' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
