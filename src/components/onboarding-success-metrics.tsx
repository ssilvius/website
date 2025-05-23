"use client";

import React, { useState } from 'react';

const OnboardingSuccessMetrics = () => {
  const [selectedCategory, setSelectedCategory] = useState('engagement');
  
  const metrics = {
    engagement: [
      {
        name: "Time to First Value (TTFV)",
        description: "How quickly users achieve their first successful outcome",
        target: "< 5 minutes",
        current: "12 minutes",
        trend: "improving",
        importance: "high"
      },
      {
        name: "Onboarding Completion Rate", 
        description: "Percentage of users who complete the full onboarding flow",
        target: "> 70%",
        current: "42%",
        trend: "declining",
        importance: "high"
      },
      {
        name: "Feature Discovery Rate",
        description: "How many key features users try during onboarding",
        target: "> 3 features",
        current: "1.8 features",
        trend: "stable",
        importance: "medium"
      },
      {
        name: "Setup Abandonment Points",
        description: "Where in the process users give up most frequently",
        target: "< 20% at any step",
        current: "58% at API config",
        trend: "worsening",
        importance: "critical"
      }
    ],
    satisfaction: [
      {
        name: "Perceived Ease of Setup",
        description: "User-reported difficulty level (1-10 scale)",
        target: "> 7.5/10",
        current: "4.2/10",
        trend: "stable",
        importance: "high"
      },
      {
        name: "Confidence to Explore",
        description: "How confident users feel trying new features post-onboarding",
        target: "> 80%",
        current: "34%",
        trend: "declining",
        importance: "high"
      },
      {
        name: "Net Promoter Score (Early)",
        description: "Likelihood to recommend after onboarding (day 1)",
        target: "> 30",
        current: "-12",
        trend: "stable",
        importance: "medium"
      },
      {
        name: "Support Satisfaction",
        description: "Rating of onboarding-related support interactions",
        target: "> 4.5/5",
        current: "3.1/5",
        trend: "improving",
        importance: "medium"
      }
    ],
    business: [
      {
        name: "Day 7 Retention Rate",
        description: "Users still active one week after signup",
        target: "> 60%",
        current: "28%",
        trend: "declining",
        importance: "critical"
      },
      {
        name: "Trial to Paid Conversion",
        description: "Users who convert from trial to paid plan",
        target: "> 25%",
        current: "11%",
        trend: "stable",
        importance: "critical"
      },
      {
        name: "Support Ticket Volume",
        description: "Onboarding-related support requests per 100 new users",
        target: "< 15 tickets",
        current: "47 tickets",
        trend: "worsening",
        importance: "high"
      },
      {
        name: "Revenue per Converted User",
        description: "Average revenue from users who complete onboarding",
        target: "> $120/month",
        current: "$89/month",
        trend: "stable",
        importance: "medium"
      }
    ]
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'worsening': return '📉';
      default: return '➡️';
    }
  };
  
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': 
      case 'worsening': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm my-6">
      <div className="p-4 border-b bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">📊 Measuring Onboarding Success</h4>
        <p className="text-sm text-gray-600">Key metrics that reveal how well your onboarding serves both users and business goals</p>
      </div>
      
      {/* Category selector */}
      <div className="border-b flex overflow-x-auto">
        {[
          { key: 'engagement', label: 'User Engagement', icon: '👥' },
          { key: 'satisfaction', label: 'User Satisfaction', icon: '😊' },
          { key: 'business', label: 'Business Impact', icon: '💼' }
        ].map(category => (
          <button
            key={category.key}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center space-x-2 ${
              selectedCategory === category.key 
                ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedCategory(category.key)}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-6">
        <div className="grid gap-4">
          {metrics[selectedCategory as keyof typeof metrics].map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-gray-900">{metric.name}</h5>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImportanceColor(metric.importance)}`}>
                      {metric.importance}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Target</div>
                      <div className="font-medium text-green-700">{metric.target}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Current</div>
                      <div className="font-medium text-gray-900">{metric.current}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Trend</div>
                      <div className={`font-medium flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                        <span>{getTrendIcon(metric.trend)}</span>
                        <span className="capitalize">{metric.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedCategory === 'engagement' && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-800 mb-2">🎯 Engagement Insights</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Users who reach first value in under 5 minutes have 4x higher retention</li>
              <li>• Each additional feature discovered during onboarding increases lifetime value by 23%</li>
              <li>• 58% abandonment at API configuration suggests this step needs urgent simplification</li>
            </ul>
          </div>
        )}
        
        {selectedCategory === 'satisfaction' && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-medium text-green-800 mb-2">😊 Satisfaction Insights</h5>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Low confidence scores (34%) indicate users fear breaking things</li>
              <li>• Negative early NPS (-12) often reverses after successful feature adoption</li>
              <li>• Users rate setup difficulty 2x higher than our internal team estimates</li>
            </ul>
          </div>
        )}
        
        {selectedCategory === 'business' && (
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 className="font-medium text-purple-800 mb-2">💼 Business Insights</h5>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Poor Day 7 retention (28%) directly correlates with onboarding friction</li>
              <li>• Support costs from onboarding issues exceed $2,400 per month</li>
              <li>• Users who complete onboarding successfully have 3x higher lifetime value</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingSuccessMetrics;
