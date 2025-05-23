"use client";

import React, { useState } from 'react';

// Sample data for the analytics dashboard
const sampleData = {
  metrics: [
    { id: 'visitors', name: 'Visitors', value: 24892, change: 12.4 },
    { id: 'conversions', name: 'Conversions', value: 1284, change: -2.1 },
    { id: 'revenue', name: 'Revenue', value: 58493, change: 8.7 },
    { id: 'avg_order', name: 'Avg. Order Value', value: 45.56, change: 11.2 }
  ],
  filters: [
    { id: 'date_range', name: 'Date Range', value: 'Last 30 Days' },
    { id: 'segment', name: 'Segment', value: 'All Users' },
    { id: 'channel', name: 'Channel', value: 'All Channels' }
  ],
  reports: [
    { id: 'traffic', name: 'Traffic Sources', type: 'pie' },
    { id: 'conversions', name: 'Conversion Funnel', type: 'funnel' },
    { id: 'time_series', name: 'Performance Over Time', type: 'line' }
  ],
  versions: [
    { id: 1, name: 'Current Version', date: 'May 21, 2025, 2:45 PM' },
    { id: 2, name: 'Yesterday\'s Version', date: 'May 20, 2025, 4:12 PM' },
    { id: 3, name: 'First Draft', date: 'May 19, 2025, 10:30 AM' }
  ]
};

const SafeDashboard = () => {
  const [showResultsPreview, setShowResultsPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showQueryError, setShowQueryError] = useState(false);
  const [complexity, setComplexity] = useState('simple');
  
  return (
    <div className="bg-white border rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Version 1.0
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm hover:bg-blue-100 transition-colors"
            onClick={() => setShowVersions(true)}
          >
            <span className="mr-1">🕒</span> Versions
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
            <span className="mr-1">+</span> Create Report
          </button>
        </div>
      </div>

      {/* Complexity selector - Progressive disclosure */}
      <div className="border-b bg-blue-50 p-2 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium rounded-l-lg border border-blue-200 ${
              complexity === 'simple' 
                ? 'bg-white text-blue-800' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setComplexity('simple')}
          >
            Simple View
          </button>
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium border border-blue-200 ${
              complexity === 'standard' 
                ? 'bg-white text-blue-800' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setComplexity('standard')}
          >
            Standard
          </button>
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium rounded-r-lg border border-blue-200 ${
              complexity === 'advanced' 
                ? 'bg-white text-blue-800' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => setComplexity('advanced')}
          >
            Advanced
          </button>
        </div>
      </div>

      {/* Main dashboard area */}
      <div className="p-4">
        {/* User-friendly filter controls */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Configure Your Report</h3>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={() => {
                /* Reset functionality */
              }}
            >
              <span className="mr-1">↺</span> Reset to Default
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700 block mb-1">User Segment</label>
              <div className="relative">
                <select 
                  className="w-full p-2 border rounded text-sm appearance-none pr-8"
                  onChange={() => setShowQueryError(true)}
                >
                  <option>All Users</option>
                  <option>New Users (Last 30 Days)</option>
                  <option>Returning Customers</option>
                </select>
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  ▼
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Filter data to specific user groups
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-700 block mb-1">Time Period</label>
              <div className="relative">
                <select className="w-full p-2 border rounded text-sm appearance-none pr-8">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Custom Range</option>
                </select>
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  ▼
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Choose the date range for your data
                </div>
              </div>
            </div>
            
            <div className="relative">
              <label className="text-sm text-gray-700 block mb-1">Data Display</label>
              <div className="relative">
                <select className="w-full p-2 border rounded text-sm appearance-none pr-8">
                  <option>Total Values</option>
                  <option>Count of Events</option>
                  <option>Average Values</option>
                </select>
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  ▼
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  How to aggregate your data
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview &amp; Apply controls with helpful guidance */}
          <div className="mt-4 flex space-x-3 items-center">
            <button 
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
              onClick={() => setShowResultsPreview(true)}
            >
              Preview Results
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
            <span className="text-sm text-gray-500">
              ⓘ Your current data won&apos;t change until you click &quot;Apply&quot;
            </span>
          </div>
        </div>
        
        {/* Query Error with recovery suggestions */}
        {showQueryError && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <div className="text-amber-600 text-xl">&#9888;&#65039;</div>
            <div className="flex-1">
              <div className="font-medium text-amber-800">We noticed a potential issue with your query</div>
              <div className="mt-1 text-sm text-amber-700">
                The segment &quot;Returning Customers&quot; might not work with your current date range selection.
              </div>
              <div className="mt-3 flex space-x-3">
                <button 
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm hover:bg-amber-200 transition-colors"
                  onClick={() => setShowQueryError(false)}
                >
                  Use suggested fix
                </button>
                <button 
                  className="px-3 py-1 bg-white border border-amber-200 text-amber-700 rounded text-sm hover:bg-amber-50 transition-colors"
                  onClick={() => setShowQueryError(false)}
                >
                  Ignore and continue
                </button>
              </div>
            </div>
            <button 
              className="text-amber-400 hover:text-amber-600"
              onClick={() => setShowQueryError(false)}
            >
              ✕
            </button>
          </div>
        )}
        
        {/* Results preview - Predictability */}
        {showResultsPreview && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium text-blue-800">Preview of your changes</div>
                <div className="text-sm text-blue-600">Here&apos;s how your data will look with the new filters</div>
              </div>
              <button 
                className="text-blue-400 hover:text-blue-600"
                onClick={() => setShowResultsPreview(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="bg-white p-3 rounded border border-blue-100">
              <div className="grid grid-cols-4 gap-3 mb-2">
                {sampleData.metrics.map(metric => (
                  <div key={metric.id} className="p-2 rounded bg-white">
                    <div className="text-xs text-gray-500">{metric.name}</div>
                    <div className="font-medium">
                      {metric.id === 'revenue' ? '$' : ''}{metric.value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-blue-600 mt-2">
                Showing preview with <strong>New Users</strong> segment and <strong>Last 30 Days</strong> time period
              </div>
            </div>
            
            <div className="mt-3 flex space-x-3">
              <button 
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                onClick={() => setShowResultsPreview(false)}
              >
                Apply These Changes
              </button>
              <button 
                className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded text-sm hover:bg-blue-50 transition-colors"
                onClick={() => setShowResultsPreview(false)}
              >
                Keep Editing
              </button>
            </div>
          </div>
        )}
        
        {/* Friendly, human-readable metrics */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          {sampleData.metrics.map(metric => (
            <div key={metric.id} className="p-4 border rounded bg-white hover:shadow-sm transition-shadow">
              <div className="text-sm text-gray-600">{metric.name}</div>
              <div className="text-xl font-medium mt-1">
                {metric.id === 'revenue' ? '$' : ''}{metric.value.toLocaleString()}
              </div>
              <div className={`text-sm flex items-center mt-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span>{metric.change > 0 ? '↑' : '↓'}</span>
                <span className="ml-1">{Math.abs(metric.change)}% from previous period</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* User-friendly data table */}
        <div className="overflow-auto border rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 border-b text-left text-sm font-medium text-gray-700">Traffic Source</th>
                <th className="p-3 border-b text-left text-sm font-medium text-gray-700">Category</th>
                <th className="p-3 border-b text-right text-sm font-medium text-gray-700">Visitors</th>
                <th className="p-3 border-b text-right text-sm font-medium text-gray-700">Percentage</th>
                <th className="p-3 border-b text-right text-sm font-medium text-gray-700">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Organic Search</td>
                <td className="p-3 border-b">Search Engines</td>
                <td className="p-3 border-b text-right">12,482</td>
                <td className="p-3 border-b text-right">48.2%</td>
                <td className="p-3 border-b text-right text-green-600">+12.4%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Direct Traffic</td>
                <td className="p-3 border-b">Direct</td>
                <td className="p-3 border-b text-right">5,392</td>
                <td className="p-3 border-b text-right">21.8%</td>
                <td className="p-3 border-b text-right text-green-600">+3.2%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Facebook</td>
                <td className="p-3 border-b">Social Media</td>
                <td className="p-3 border-b text-right">4,291</td>
                <td className="p-3 border-b text-right">16.5%</td>
                <td className="p-3 border-b text-right text-red-600">-8.7%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Twitter</td>
                <td className="p-3 border-b">Social Media</td>
                <td className="p-3 border-b text-right">2,914</td>
                <td className="p-3 border-b text-right">10.2%</td>
                <td className="p-3 border-b text-right text-red-600">-2.1%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Other Sources</td>
                <td className="p-3 border-b">Miscellaneous</td>
                <td className="p-3 border-b text-right">813</td>
                <td className="p-3 border-b text-right">3.3%</td>
                <td className="p-3 border-b text-right text-green-600">+1.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Helper text below table */}
        <div className="mt-2 text-sm text-gray-500 flex items-center">
          <span className="mr-1">💡</span>
          <span>Click on any row to see detailed metrics for that traffic source</span>
        </div>
      </div>
      
      {/* Safe delete confirmation with recovery options */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-medium text-gray-900">Are you sure you want to delete this report?</h3>
            <p className="my-4 text-sm text-gray-600">
              The report will be moved to your trash folder and automatically deleted after 30 days.
              You can restore it anytime during this period.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800 mb-4 flex">
              <span className="text-blue-500 mr-2">ℹ️</span>
              <span>Your report configuration will be saved as a version you can access later</span>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                onClick={() => {
                  alert("Report moved to trash. You can restore it from the trash folder within 30 days.");
                  setShowDeleteConfirm(false);
                }}
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Versions panel for reversibility */}
      {showVersions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Report Versions</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowVersions(false)}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your report configurations are automatically saved. You can restore any previous version.
            </p>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {sampleData.versions.map(version => (
                <div 
                  key={version.id}
                  className="p-3 border rounded hover:bg-gray-50 cursor-pointer flex justify-between"
                >
                  <div>
                    <div className="font-medium text-sm">{version.name}</div>
                    <div className="text-xs text-gray-500">{version.date}</div>
                  </div>
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    Restore
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t text-right">
              <button 
                className="px-4 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                onClick={() => setShowVersions(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeDashboard;
