"use client";

import React, { useState } from 'react';

// Type definitions
interface ConversationStep {
  id: string;
  type: 'user_input' | 'system_response' | 'decision_point' | 'api_call' | 'notification';
  title: string;
  description: string;
  branches: Array<{
    condition: string;
    probability: number;
  }>;
  isLast?: boolean;
}

// Conversation step component
const ConversationStep = ({ 
  step, 
  isActive, 
  onStepClick
}: {
  step: ConversationStep;
  isActive: boolean;
  onStepClick: (stepId: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const getStepIcon = (type: ConversationStep['type']) => {
    const icons = {
      user_input: '👤',
      system_response: '🤖',
      decision_point: '🤔',
      api_call: '⚡',
      notification: '📧'
    };
    return icons[type] || '💬';
  };

  const getStepColor = (type: ConversationStep['type']) => {
    const colors = {
      user_input: 'bg-blue-50 border-blue-200',
      system_response: 'bg-green-50 border-green-200', 
      decision_point: 'bg-yellow-50 border-yellow-200',
      api_call: 'bg-purple-50 border-purple-200',
      notification: 'bg-red-50 border-red-200'
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div 
      className={`
        relative p-4 mb-4 border-2 rounded-lg cursor-pointer transition-all
        ${getStepColor(step.type)}
        ${isActive ? 'ring-2 ring-blue-400 shadow-md' : 'hover:shadow-sm'}
      `}
      onClick={() => onStepClick(step.id)}
    >
      {/* Connection Line */}
      {!step.isLast && (
        <div className="absolute left-6 -bottom-4 w-0.5 h-4 bg-gray-300"></div>
      )}
      
      {/* Step Header */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-sm border">
          {getStepIcon(step.type)}
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              {step.title}
            </h3>
            
            {step.branches && step.branches.length > 1 && (
              <span className="text-xs bg-white px-2 py-1 rounded-full border">
                {step.branches.length} paths
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mt-1">
            {step.description}
          </p>
          
          {/* Quick Actions */}
          {step.type === 'decision_point' && step.branches && (
            <div className="mt-2 flex flex-wrap gap-2">
              {step.branches.slice(0, 2).map((branch, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-white px-2 py-1 rounded border text-gray-700"
                >
                  {branch.condition} ({Math.round(branch.probability * 100)}%)
                </span>
              ))}
              {step.branches.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{step.branches.length - 2} more paths
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Expand Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
        >
          <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ⌄
          </span>
        </button>
      </div>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 pl-11 border-l-2 border-gray-200">
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                What Happens Next
              </h4>
              {step.branches ? (
                <div className="mt-2 space-y-1">
                  {step.branches.map((branch, idx) => (
                    <div key={idx} className="text-xs text-gray-600 flex justify-between">
                      <span>If {branch.condition.replace('_', ' ')}</span>
                      <span className="font-medium">{Math.round(branch.probability * 100)}% likely</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-600 mt-1">
                  Continues to next step in sequence
                </p>
              )}
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                Success Rate
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {step.type === 'decision_point' ? '94%' : '97%'} of users complete this step successfully
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// New conversation view
const ConversationView = () => {
  const [activeStepId, setActiveStepId] = useState<string | null>(null);

  // Convert workflow to conversation steps (main path)
  const conversationSteps: ConversationStep[] = [
    {
      id: 'start',
      type: 'user_input',
      title: 'Customer Inquiry Received',
      description: 'Customer submits support ticket through website, email, or chat',
      branches: []
    },
    {
      id: 'classify',
      type: 'decision_point', 
      title: 'AI Classification',
      description: 'Our ML model analyzes the inquiry to understand what type of help is needed',
      branches: [
        { condition: 'billing_detected', probability: 0.35 },
        { condition: 'technical_issue', probability: 0.40 },
        { condition: 'general_inquiry', probability: 0.25 }
      ]
    },
    {
      id: 'technical',
      type: 'system_response',
      title: 'Technical Support Routing', 
      description: 'System determines the best way to help with technical issues',
      branches: [
        { condition: 'known_issue', probability: 0.60 },
        { condition: 'needs_diagnosis', probability: 0.40 }
      ]
    },
    {
      id: 'tech_kb',
      type: 'system_response',
      title: 'Knowledge Base Solution',
      description: 'We found a solution in our knowledge base and send step-by-step instructions',
      branches: [
        { condition: 'solution_works', probability: 0.85 },
        { condition: 'needs_more_help', probability: 0.15 }
      ]
    },
    {
      id: 'satisfaction',
      type: 'notification',
      title: 'Follow-up Check',
      description: 'We follow up to make sure the solution worked and the customer is satisfied',
      branches: []
    }
  ];

  const handleStepClick = (stepId: string) => {
    setActiveStepId(stepId);
  };

  return (
    <div className="bg-white border rounded-lg p-4 max-h-96 overflow-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        New Approach: Conversation-Based View
      </h3>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-medium">💡 User-Friendly:</span> Follow the main customer journey step by step. 
          Click any step to see alternatives and technical details.
        </p>
      </div>
      
      <div className="space-y-0">
        {conversationSteps.map((step, index) => (
          <ConversationStep
            key={step.id}
            step={{...step, isLast: index === conversationSteps.length - 1}}
            isActive={activeStepId === step.id}
            onStepClick={handleStepClick}
          />
        ))}
      </div>
      
      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>✅ 89% success rate</span>
          <span>⏱️ 2.3 min avg time</span>
          <span>🎯 5 main steps</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;