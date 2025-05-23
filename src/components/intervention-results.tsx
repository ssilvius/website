"use client";

import React, { useState } from 'react';

export interface InterventionItem {
  title: string;
  description: string;
  strategies: string[];
  category: 'reversibility' | 'predictability' | 'forgiveness' | 'progressive-disclosure' | string;
}

export interface ResultItem {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface InterventionResultsProps {
  title?: string;
  description?: string;
  interventions: InterventionItem[];
  results?: ResultItem[];
  displayMode?: 'tabs' | 'table';
}

const InterventionResults = ({
  title = "Psychological Safety Interventions",
  description,
  interventions,
  results,
  displayMode = 'table'
}: InterventionResultsProps) => {
  const [activeTab, setActiveTab] = useState<string>(interventions[0]?.category || 'all');
  
  const categoryColors = {
    'reversibility': {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: '↩️'
    },
    'predictability': {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      icon: '🔮'
    },
    'forgiveness': {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '🛡️'
    },
    'progressive-disclosure': {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      icon: '🧩'
    },
    'default': {
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800',
      icon: '✨'
    }
  };
  
  const getCategoryStyles = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.default;
  };
  
  // Get all unique categories
  const categories = Array.from(new Set(interventions.map(i => i.category)));
  
  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden my-8">
      {/* Header section */}
      <div className="p-5 border-b bg-gray-50">
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      
      {displayMode === 'tabs' ? (
        <div>
          {/* Tab navigation */}
          <div className="border-b flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'all' 
                  ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Interventions
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === category 
                    ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          
          {/* Intervention cards */}
          <div className="p-4 grid gap-4 md:grid-cols-2">
            {interventions
              .filter(i => activeTab === 'all' || i.category === activeTab)
              .map((intervention, idx) => {
                const styles = getCategoryStyles(intervention.category);
                return (
                  <div 
                    key={idx} 
                    className={`${styles.bg} ${styles.border} border rounded-lg p-4`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3" aria-hidden="true">{styles.icon}</span>
                      <div>
                        <h4 className={`font-medium ${styles.text} mb-2`}>{intervention.title}</h4>
                        <p className="text-gray-700 text-sm mb-3">{intervention.description}</p>
                        <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                          {intervention.strategies.map((strategy, i) => (
                            <li key={i}>{strategy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Intervention</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {interventions.map((intervention, idx) => {
                  const styles = getCategoryStyles(intervention.category);
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium">{intervention.title}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}>
                          {styles.icon} {intervention.category.charAt(0).toUpperCase() + intervention.category.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">{intervention.description}</td>
                      <td className="px-4 py-3">
                        <ul className="list-disc ml-5 space-y-1">
                          {intervention.strategies.map((strategy, i) => (
                            <li key={i}>{strategy}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Results metrics if provided */}
      {results && results.length > 0 && (
        <div className="border-t mt-2 p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">Impact Results</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((result, idx) => (
              <div key={idx} className="p-3 bg-white rounded border">
                <div className={`font-bold text-xl ${result.isPositive !== false ? 'text-green-600' : 'text-red-600'}`}>
                  {result.value}
                  {result.change && (
                    <span className="text-sm ml-1">
                      {result.change.startsWith('+') || result.change.startsWith('-') 
                        ? result.change 
                        : `+${result.change}`}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{result.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionResults;
