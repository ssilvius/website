'use client';
import React from 'react';

interface Participant {
  id: string;
  name: string;
  required: boolean;
}

interface Input {
  userId: string;
  type: string;
  position?: string;
  confidenceLevel?: number;
}

interface ConsensusVisualizationProps {
  decision: unknown;
  participants: Participant[];
  inputs?: Input[];
  onParticipantClick?: (participantId: string) => void;
}

// 'decision' is defined in props for future extensibility, but is currently unused
const ConsensusVisualization = ({ 
  participants, 
  inputs = [],
  onParticipantClick 
}: ConsensusVisualizationProps) => {
  // Calculate consensus metrics
  const getConsensusData = () => {
    const requiredParticipants = participants.filter(p => p.required);
    const optionalParticipants = participants.filter(p => !p.required);
    
    const requiredResponses = requiredParticipants.filter(p => 
      inputs.some(input => input.userId === p.id)
    );
    
    const optionalResponses = optionalParticipants.filter(p =>
      inputs.some(input => input.userId === p.id)
    );

    // Analyze position distribution
    const positions = inputs.filter(input => input.type === 'position');
    const questions = inputs.filter(input => input.type === 'question');
    const alternatives = inputs.filter(input => input.type === 'alternative');

    // Simple sentiment analysis (in real app, this would be more sophisticated)
    const positivePositions = positions.filter(p => 
      (typeof p.position === 'string' && (p.position.toLowerCase().includes('support') || p.position.toLowerCase().includes('agree')))
      || (typeof p.confidenceLevel === 'number' && p.confidenceLevel >= 7)
    );

    const consensusScore = requiredResponses.length === requiredParticipants.length 
      ? Math.min(100, (positivePositions.length / positions.length) * 100)
      : 0;

    return {
      requiredResponseRate: (requiredResponses.length / requiredParticipants.length) * 100,
      optionalResponseRate: optionalParticipants.length > 0 
        ? (optionalResponses.length / optionalParticipants.length) * 100 
        : 100,
      consensusScore,
      totalInputs: inputs.length,
      questionsCount: questions.length,
      alternativesCount: alternatives.length,
      avgConfidence: positions.length > 0 
        ? positions.reduce((sum, p) => sum + (p.confidenceLevel || 5), 0) / positions.length 
        : 0
    };
  };

  const consensus = getConsensusData();
  
  const getConsensusColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getParticipantStatus = (participant: Participant): string => {
    const userInput = inputs.find(input => input.userId === participant.id);
    if (!userInput) return 'pending';
    if (userInput.type === 'question') return 'questioning';
    if (userInput.type === 'alternative') return 'proposing';
    if (typeof userInput.confidenceLevel === 'number' && userInput.confidenceLevel >= 7) return 'supporting';
    if (typeof userInput.confidenceLevel === 'number' && userInput.confidenceLevel <= 4) return 'concerned';
    return 'neutral';
  };

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: 'bg-gray-200 text-gray-700',
      questioning: 'bg-blue-200 text-blue-800',
      proposing: 'bg-purple-200 text-purple-800',
      supporting: 'bg-green-200 text-green-800',
      concerned: 'bg-red-200 text-red-800',
      neutral: 'bg-yellow-200 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string): string => {
    const icons: Record<string, string> = {
      pending: '⏳',
      questioning: '❓',
      proposing: '💡',
      supporting: '✅',
      concerned: '⚠️',
      neutral: '🤔'
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Decision Progress
      </h3>

      {/* Overall Consensus Score */}
      <div className="mb-6 p-4 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Consensus
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConsensusColor(consensus.consensusScore)}`}>
            {Math.round(consensus.consensusScore)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              consensus.consensusScore >= 80 ? 'bg-green-500' :
              consensus.consensusScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${consensus.consensusScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>Strong Opposition</span>
          <span>Strong Support</span>
        </div>
      </div>

      {/* Response Rates */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(consensus.requiredResponseRate)}%
          </div>
          <div className="text-sm text-gray-600">Required Input</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {consensus.totalInputs}
          </div>
          <div className="text-sm text-gray-600">Total Responses</div>
        </div>
      </div>

      {/* Participant Status Grid */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Participant Status
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {participants.map(participant => {
            const status = getParticipantStatus(participant);
            return (
              <button
                key={participant.id}
                onClick={() => onParticipantClick && onParticipantClick(participant.id)}
                className={`p-3 rounded-lg text-left hover:shadow-sm transition-shadow ${getStatusColor(status)}`}
              >
                <div className="flex items-center space-x-2">
                  <span>{getStatusIcon(status)}</span>
                  <span className="font-medium text-sm">{participant.name}</span>
                  {participant.required && <span className="text-red-500">*</span>}
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Summary */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">
          Input Summary
        </h4>
        
        <div className="flex space-x-4 text-sm">
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <span>{inputs.filter(i => i.type === 'position').length} positions</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
            <span>{consensus.questionsCount} questions</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
            <span>{consensus.alternativesCount} alternatives</span>
          </span>
        </div>

        {consensus.avgConfidence > 0 && (
          <div className="text-sm text-gray-600">
            Average confidence: {consensus.avgConfidence.toFixed(1)}/10
          </div>
        )}
      </div>

      {/* Decision Readiness */}
      <div className="mt-6 pt-4 border-t">
        {consensus.requiredResponseRate === 100 && consensus.questionsCount === 0 ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-800 font-medium">
              ✅ Ready for final decision - all required input received
            </span>
          </div>
        ) : (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <span className="text-yellow-800 font-medium">
              ⏳ Waiting for: {
                consensus.requiredResponseRate < 100 ? 'required participants, ' : ''
              }{
                consensus.questionsCount > 0 ? `${consensus.questionsCount} questions to be addressed` : ''
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsensusVisualization;