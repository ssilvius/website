'use client';
import React, { useState } from 'react';

interface Constraint {
  technical?: string[];
  business?: string[];
}

interface Participant {
  name: string;
  role: string;
  required: boolean;
  hasResponded: boolean;
}

interface RelatedDecision {
  title: string;
  outcome: string;
}

interface Decision {
  title: string;
  type: string;
  urgency: 'high' | 'medium' | 'low';
  deadline: string;
  impact: string;
  problemStatement: string;
  successCriteria?: string[];
  constraints?: Constraint;
  relatedDecisions?: RelatedDecision[];
}

interface DecisionContextProps {
  decision: Decision;
  participants?: Participant[];
  relatedDecisions?: RelatedDecision[];
  onUpdateContext?: () => void;
}

const DecisionContext = ({ 
  decision, 
  participants = [], 
  relatedDecisions = []
}: DecisionContextProps) => {
  const [showFullContext, setShowFullContext] = useState(false);
  
  const contextCompleteness = calculateContextScore(decision);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      {/* Context Quality Indicator */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {decision.title}
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            contextCompleteness >= 80 ? 'bg-green-400' : 
            contextCompleteness >= 60 ? 'bg-yellow-400' : 'bg-red-400'
          }`}></div>
          <span className="text-sm text-gray-600">
            {contextCompleteness}% context complete
          </span>
        </div>
      </div>

      {/* Decision Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <span className="text-sm font-medium text-gray-700">Decision Type</span>
          <p className="text-sm text-gray-900">{decision.type}</p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Urgency</span>
          <p className={`text-sm font-medium ${
            decision.urgency === 'high' ? 'text-red-600' :
            decision.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {decision.urgency} - {decision.deadline}
          </p>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Impact Scope</span>
          <p className="text-sm text-gray-900">{decision.impact}</p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          What We&apos;re Deciding
        </h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {decision.problemStatement && decision.problemStatement.replace(/'/g, "&apos;")}
          </p>
        </div>
      </div>

      {/* Success Criteria */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Success Criteria
        </h3>
        <ul className="space-y-2">
          {decision.successCriteria?.map((criteria, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-sm text-gray-700">{criteria}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Constraints & Considerations */}
      <div className="mb-6">
        <button
          onClick={() => setShowFullContext(!showFullContext)}
          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <span>Constraints &amp; Background Context</span>
          <svg 
            className={`w-4 h-4 transform transition-transform ${showFullContext ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showFullContext && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Technical Constraints</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                {decision.constraints?.technical?.map((constraint, idx) => (
                  <li key={idx}>• {constraint}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Business Constraints</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                {decision.constraints?.business?.map((constraint, idx) => (
                  <li key={idx}>• {constraint}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900">Previous Related Decisions</h4>
              <div className="mt-2 space-y-2">
                {relatedDecisions.map((related, idx) => (
                  <div key={idx} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-200">
                    <span className="font-medium">{related.title}</span>
                    <span className="text-gray-600 ml-2">({related.outcome})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Required Participants */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Required Input From
        </h3>
        <div className="flex flex-wrap gap-2">
          {participants.map((participant, idx) => (
            <span 
              key={idx}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                participant.hasResponded 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {participant.name} ({participant.role})
              {participant.required && <span className="ml-1 text-red-500">*</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate context completeness
const calculateContextScore = (decision: Decision): number => {
  let score = 0;
  let maxScore = 0;
  
  // Problem statement (25 points)
  maxScore += 25;
  if (decision.problemStatement && decision.problemStatement.length > 50) score += 25;
  
  // Success criteria (20 points)
  maxScore += 20;
  if (decision.successCriteria && decision.successCriteria.length > 0) score += 20;
  
  // Constraints (20 points)
  maxScore += 20;
  if (decision.constraints && (decision.constraints.technical || decision.constraints.business)) score += 20;
  
  // Timeline (15 points)
  maxScore += 15;
  if (decision.deadline) score += 15;
  
  // Impact scope (10 points)
  maxScore += 10;
  if (decision.impact) score += 10;
  
  // Related decisions (10 points)
  maxScore += 10;
  if (decision.relatedDecisions && decision.relatedDecisions.length > 0) score += 10;

  return Math.round((score / maxScore) * 100);
};

export default DecisionContext;