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
  ]
};

const UnsafeDashboard = () => {
  const [showError, setShowError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  return (
    <div className="bg-white border rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-200 rounded text-sm">Export</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Create Report</button>
        </div>
      </div>

      {/* Main dashboard area */}
      <div className="p-4">
        {/* Dense overwhelming controls */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          <div className="col-span-3 flex justify-between items-center mb-2">
            <h3 className="font-medium">Filters and Controls</h3>
            <div className="flex space-x-1">
              <button className="p-1 bg-gray-100 rounded" title="Configure columns">
                <span className="text-xs">⚙️</span>
              </button>
              <button className="p-1 bg-gray-100 rounded" title="Display options">
                <span className="text-xs">📊</span>
              </button>
              <button 
                className="p-1 bg-red-100 rounded" 
                title="Delete report"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <span className="text-xs">🗑️</span>
              </button>
            </div>
          </div>
          
          {/* Technical filter dropdown with codes */}
          <div className="col-span-1">
            <label className="text-xs text-gray-500 block">QUERY_SELECTOR</label>
            <select className="w-full text-xs p-1 border rounded" 
              onChange={() => setShowError(true)}>
              <option>segment.type = USR_DIR</option>
              <option>segment.type = USR_ORG</option>
              <option>segment.type = USR_IND</option>
            </select>
          </div>
          
          <div className="col-span-1">
            <label className="text-xs text-gray-500 block">DATE_RANGE</label>
            <select className="w-full text-xs p-1 border rounded">
              <option>RANGE_30D</option>
              <option>RANGE_7D</option>
              <option>CUSTOM_RANGE</option>
            </select>
          </div>
          
          <div className="col-span-1">
            <label className="text-xs text-gray-500 block">AGG_TYPE</label>
            <select className="w-full text-xs p-1 border rounded">
              <option>SUM</option>
              <option>COUNT</option>
              <option>AVG</option>
              <option>CMPD</option>
            </select>
          </div>
          
          {/* More dense controls */}
          <div className="col-span-3 grid grid-cols-4 gap-1 mt-2">
            <button className="p-1 bg-gray-100 text-xs rounded">Reset</button>
            <button className="p-1 bg-gray-100 text-xs rounded">Apply</button>
            <button className="p-1 bg-gray-100 text-xs rounded">Save Config</button>
            <button className="p-1 bg-gray-100 text-xs rounded"
              onClick={() => setShowError(true)}>
              Generate SQL
            </button>
          </div>
        </div>
        
        {/* Error message with technical jargon */}
        {showError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-xs text-red-800">
            <div className="font-medium">Error: Query Parameter Invalid</div>
            <div className="mt-1">
              ERR_CODE: INVLD_SEGMENTN_126<br />
              Details: Invalid segment parameter for the data warehouse. Contact your system administrator.
            </div>
            <button 
              className="mt-1 text-red-800 underline"
              onClick={() => setShowError(false)}>
              Dismiss
            </button>
          </div>
        )}
        
        {/* Metrics display - brusque and technical */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          {sampleData.metrics.map(metric => (
            <div key={metric.id} className="p-3 border rounded bg-gray-50">
              <div className="text-xs text-gray-500">{metric.id.toUpperCase()}</div>
              <div className="text-lg font-medium">
                {metric.id === 'revenue' ? '$' : ''}{metric.value.toLocaleString()}
              </div>
              <div className={`text-xs ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change > 0 ? '▲' : '▼'} {Math.abs(metric.change)}%
              </div>
            </div>
          ))}
        </div>
        
        {/* Data table with technical coding */}
        <div className="overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">METRIC_ID</th>
                <th className="p-2 border text-left">SRC_TYPE</th>
                <th className="p-2 border text-left">DSPL_NM</th>
                <th className="p-2 border text-right">QTY</th>
                <th className="p-2 border text-right">PCT</th>
                <th className="p-2 border text-right">CHG</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">SRCH_ORGN</td>
                <td className="p-2 border">SRCH</td>
                <td className="p-2 border">Organic Search</td>
                <td className="p-2 border text-right">12,482</td>
                <td className="p-2 border text-right">48.2%</td>
                <td className="p-2 border text-right text-green-600">+12.4%</td>
              </tr>
              <tr>
                <td className="p-2 border">DRCT</td>
                <td className="p-2 border">DRCT</td>
                <td className="p-2 border">Direct Traffic</td>
                <td className="p-2 border text-right">5,392</td>
                <td className="p-2 border text-right">21.8%</td>
                <td className="p-2 border text-right text-green-600">+3.2%</td>
              </tr>
              <tr>
                <td className="p-2 border">SOC_FB</td>
                <td className="p-2 border">SOC</td>
                <td className="p-2 border">Facebook</td>
                <td className="p-2 border text-right">4,291</td>
                <td className="p-2 border text-right">16.5%</td>
                <td className="p-2 border text-right text-red-600">-8.7%</td>
              </tr>
              <tr>
                <td className="p-2 border">SOC_TW</td>
                <td className="p-2 border">SOC</td>
                <td className="p-2 border">Twitter</td>
                <td className="p-2 border text-right">2,914</td>
                <td className="p-2 border text-right">10.2%</td>
                <td className="p-2 border text-right text-red-600">-2.1%</td>
              </tr>
              <tr>
                <td className="p-2 border">OTHR</td>
                <td className="p-2 border">OTHR</td>
                <td className="p-2 border">Other Sources</td>
                <td className="p-2 border text-right">813</td>
                <td className="p-2 border text-right">3.3%</td>
                <td className="p-2 border text-right text-green-600">+1.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Dangerous delete confirmation with no way back */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-bold text-red-600">Delete Report Configuration</h3>
            <p className="my-4 text-sm">
              Warning: You are about to delete this report. This action cannot be undone.
              All saved configurations will be permanently lost.
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 bg-gray-200 rounded text-sm"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                onClick={() => {
                  alert("Report deleted. This action cannot be undone.");
                  setShowDeleteConfirm(false);
                }}
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsafeDashboard;
