import React from 'react';

const SimpleWorkflowDemo = () => {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Visualization Impact</h3>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">550%</div>
          <div className="text-sm text-gray-600">Improvement in setup completion</div>
          <div className="text-xs text-gray-500 mt-1">12% → 78%</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">75%</div>
          <div className="text-sm text-gray-600">Reduction in understanding time</div>
          <div className="text-xs text-gray-500 mt-1">20+ min → 3-5 min</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-purple-600">65%</div>
          <div className="text-sm text-gray-600">Fewer support tickets</div>
          <div className="text-xs text-gray-500 mt-1">Within 30 days</div>
        </div>
      </div>
    </div>
  );
};

export default SimpleWorkflowDemo;
