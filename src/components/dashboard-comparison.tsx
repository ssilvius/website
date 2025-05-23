"use client";

import React, { useState } from 'react';
import UnsafeDashboard from './unsafe-dashboard';
import SafeDashboard from './safe-dashboard';

const DashboardComparison = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after' | 'split'>('split');
  
  const handleTabChange = (tab: 'before' | 'after' | 'split') => {
    setActiveTab(tab);
  };
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Tab navigation */}
      <div className="border-b flex">
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'before' 
              ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('before')}
        >
          Before: Unsafe Design
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'after' 
              ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('after')}
        >
          After: Psychologically Safe
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'split' 
              ? 'bg-white border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('split')}
        >
          Side-by-Side Comparison
        </button>
      </div>
      
      {/* Content area */}
      <div className="p-4">
        {activeTab === 'before' && (
          <div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-red-800 mb-2">Before: Anxiety-Inducing Interface</h4>
              <ul className="list-disc ml-5 text-sm text-red-700 space-y-1">
                <li>Technical jargon and codes create confusion</li>
                <li>Irreversible actions with harsh consequences</li>
                <li>Dense, overwhelming controls without guidance</li>
                <li>Unhelpful error messages that blame the user</li>
                <li>All complexity exposed at once</li>
                <li>No recovery path from mistakes</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <UnsafeDashboard />
            </div>
          </div>
        )}
        
        {activeTab === 'after' && (
          <div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-green-800 mb-2">After: Psychologically Safe Interface</h4>
              <ul className="list-disc ml-5 text-sm text-green-700 space-y-1">
                <li><strong>Reversibility:</strong> Version history and trash with 30-day recovery</li>
                <li><strong>Predictability:</strong> Preview results before applying changes</li>
                <li><strong>Forgiveness:</strong> Helpful error messages with resolution options</li>
                <li><strong>Progressive Disclosure:</strong> Complexity tiers and guided workflows</li>
                <li>Clear, human-friendly language instead of technical codes</li>
                <li>Contextual help and guidance throughout the experience</li>
              </ul>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <SafeDashboard />
            </div>
          </div>
        )}
        
        {activeTab === 'split' && (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 mb-2">Key Psychological Safety Differences</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-red-700 mb-1">Before:</h5>
                  <ul className="list-disc ml-5 text-gray-700 space-y-1">
                    <li>Permanent, irreversible deletions</li>
                    <li>Technical error codes without solutions</li>
                    <li>All complexity exposed at once</li>
                    <li>Unexpected outcomes of actions</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-700 mb-1">After:</h5>
                  <ul className="list-disc ml-5 text-gray-700 space-y-1">
                    <li>30-day recovery period for deleted items</li>
                    <li>Suggested fixes for common errors</li>
                    <li>Progressive complexity modes</li>
                    <li>Preview changes before applying</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-red-800 mb-2">Before: Anxiety-Inducing</div>
                <div className="border rounded-lg overflow-hidden">
                  <UnsafeDashboard />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-green-800 mb-2">After: Psychologically Safe</div>
                <div className="border rounded-lg overflow-hidden">
                  <SafeDashboard />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Results metrics */}
      <div className="border-t mt-6 p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-3">Impact of Psychological Safety Improvements</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded border">
            <div className="text-green-600 font-bold text-xl">+58%</div>
            <div className="text-sm text-gray-600">Feature Adoption</div>
          </div>
          <div className="p-3 bg-white rounded border">
            <div className="text-green-600 font-bold text-xl">+142%</div>
            <div className="text-sm text-gray-600">Advanced Usage</div>
          </div>
          <div className="p-3 bg-white rounded border">
            <div className="text-green-600 font-bold text-xl">-62%</div>
            <div className="text-sm text-gray-600">Support Tickets</div>
          </div>
          <div className="p-3 bg-white rounded border">
            <div className="text-green-600 font-bold text-xl">8.7/10</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComparison;
