import React from 'react';

const SimpleWorkflowDemo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Workflow Visualization Impact
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transforming complex flowcharts into intuitive conversation-based interfaces
          led to significant improvements in usability metrics.
        </p>
      </div>

      {/* Results Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurable Impact</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">550%</div>
            <div className="text-sm text-gray-600">Improvement in setup completion</div>
            <div className="text-xs text-gray-500 mt-1">12% → 78%</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">75%</div>
            <div className="text-sm text-gray-600">Reduction in time to understand</div>
            <div className="text-xs text-gray-500 mt-1">20+ min → 3-5 min</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">65%</div>
            <div className="text-sm text-gray-600">Fewer support tickets</div>
            <div className="text-xs text-gray-500 mt-1">Within 30 days</div>
          </div>
        </div>
      </div>
      
      {/* Key benefits */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">Key User Experience Benefits:</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Clear linear narrative users can follow</li>
          <li>• Human-friendly descriptions of what happens</li>
          <li>• Progressive disclosure of complexity</li>
          <li>• Focus on user value, not technical implementation</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleWorkflowDemo;
