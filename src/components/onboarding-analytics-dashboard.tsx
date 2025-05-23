"use client";

import React, { useState } from 'react';

const OnboardingAnalyticsDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState('funnel');
  
  const funnelData = [
    { step: 'Landing Page', users: 10000, percentage: 100, color: 'bg-blue-500' },
    { step: 'Started Signup', users: 6500, percentage: 65, color: 'bg-blue-400' },
    { step: 'Email Verified', users: 4200, percentage: 42, color: 'bg-orange-400' },
    { step: 'Basic Info', users: 3100, percentage: 31, color: 'bg-orange-500' },
    { step: 'Configuration', users: 1300, percentage: 13, color: 'bg-red-400' },
    { step: 'First Success', users: 890, percentage: 8.9, color: 'bg-red-500' }
  ];
  
  const timeData = [
    { step: 'Email Verification', avgTime: '2m 15s', medianTime: '1m 45s', dropoffRate: '35%' },
    { step: 'Basic Information', avgTime: '4m 30s', medianTime: '3m 10s', dropoffRate: '26%' },
    { step: 'API Configuration', avgTime: '12m 45s', medianTime: '8m 20s', dropoffRate: '58%' },
    { step: 'Integration Setup', avgTime: '23m 10s', medianTime: '18m 40s', dropoffRate: '31%' }
  ];
  
  const supportTickets = [
    { category: 'Setup Confusion', count: 234, percentage: 45, trend: '+23%' },
    { category: 'API Configuration', count: 156, percentage: 30, trend: '+41%' },
    { category: 'Integration Issues', count: 89, percentage: 17, trend: '+12%' },
    { category: 'Account Access', count: 42, percentage: 8, trend: '-5%' }
  ];
  
  return (
    <div className="bg-white border rounded-lg shadow-sm my-6">
      <div className="p-4 border-b bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">📊 Onboarding Analytics Dashboard</h4>
        <p className="text-sm text-gray-600">Data-driven insights into user behavior during onboarding</p>
      </div>
      
      {/* Metric selector */}
      <div className="border-b flex overflow-x-auto">
        {[
          { key: 'funnel', label: 'Conversion Funnel', icon: '📈' },
          { key: 'time', label: 'Time Analysis', icon: '⏱️' },
          { key: 'support', label: 'Support Patterns', icon: '🎫' }
        ].map(metric => (
          <button
            key={metric.key}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center space-x-2 ${
              selectedMetric === metric.key 
                ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedMetric(metric.key)}
          >
            <span>{metric.icon}</span>
            <span>{metric.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {selectedMetric === 'funnel' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">User Conversion Funnel</h3>
              <div className="space-y-3">
                {funnelData.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.step}</span>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">{item.users.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-8 relative">
                      <div 
                        className={`${item.color} h-8 rounded flex items-center justify-center text-white text-sm font-medium transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        {item.percentage >= 15 && `${item.percentage}%`}
                      </div>
                      {index < funnelData.length - 1 && (
                        <div className="absolute -bottom-2 right-0 text-xs text-red-600 font-medium">
                          -{(funnelData[index].percentage - funnelData[index + 1].percentage).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h5 className="font-medium text-red-800 mb-2">🚨 Critical Drop-off Points</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>&bull; <strong>Email to Basic Info:</strong> 27% drop-off (likely friction in email verification)</li>
                <li>&bull; <strong>Basic Info to Configuration:</strong> 58% drop-off (overwhelming technical complexity)</li>
                <li>&bull; <strong>Configuration to Success:</strong> 32% drop-off (integration challenges)</li>
              </ul>
            </div>
          </div>
        )}
        
        {selectedMetric === 'time' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Time Spent Per Step</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Onboarding Step</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Average Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Median Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Drop-off Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {timeData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-medium">{item.step}</td>
                        <td className="px-4 py-3">
                          <span className={`${
                            item.avgTime.includes('12m') || item.avgTime.includes('23m') 
                              ? 'text-red-600 font-medium' 
                              : 'text-gray-900'
                          }`}>
                            {item.avgTime}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{item.medianTime}</td>
                        <td className="px-4 py-3">
                          <span className={`${
                            parseFloat(item.dropoffRate) > 40 
                              ? 'text-red-600 font-medium' 
                              : parseFloat(item.dropoffRate) > 25 
                              ? 'text-orange-600' 
                              : 'text-green-600'
                          }`}>
                            {item.dropoffRate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-medium text-orange-800 mb-2">⏰ Time-Based Insights</h5>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>&bull; Users spending &gt;10 minutes on API Configuration are 73% more likely to abandon</li>
                <li>&bull; Integration Setup time varies wildly (3-45 minutes), indicating unclear instructions</li>
                <li>&bull; Users who complete in under 8 minutes total have 4x higher Day 7 retention</li>
              </ul>
            </div>
          </div>
        )}
        
        {selectedMetric === 'support' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Support Ticket Analysis</h3>
              <div className="grid gap-4">
                {supportTickets.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{item.category}</h5>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-bold text-gray-900">{item.count}</span>
                        <span className={`text-sm font-medium ${
                          item.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {item.trend}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.percentage}% of total tickets</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-800 mb-2">💡 Support Pattern Insights</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>&bull; 75% of onboarding support tickets occur in the first 24 hours</li>
                <li>&bull; &quot;How do I...&quot; questions indicate missing guidance in the UI</li>
                <li>&bull; API Configuration tickets spike on weekends (less dev support available)</li>
                <li>&bull; Users who contact support during onboarding are 40% less likely to convert</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingAnalyticsDashboard;
