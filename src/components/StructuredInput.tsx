'use client';

import React, { useState, FormEvent } from 'react';

interface FormData {
  position: string;
  reasoning: string;
  concerns: string[];
  alternativeOptions: string[];
  confidenceLevel: number;
  additionalContext: string;
}

interface User {
  id: string;
  name?: string;
}


interface Input {
  userId: string;
  timestamp: string;
  type: string;
  [key: string]: unknown;
}

interface StructuredInputProps {
  currentUser: User;
  onSubmitInput: (input: Input) => void;
  existingInputs?: Input[];
}

const StructuredInput = ({ 
  // decision, 
  currentUser, 
  onSubmitInput,
  existingInputs = []
}: StructuredInputProps) => {
  const [inputType, setInputType] = useState<string>('position');
  const [formData, setFormData] = useState<FormData>({
    position: '',
    reasoning: '',
    concerns: [],
    alternativeOptions: [],
    confidenceLevel: 7,
    additionalContext: ''
  });
  
  const [newConcern, setNewConcern] = useState<string>('');
  // Removed unused newAlternative and setNewAlternative

  const handleAddConcern = (): void => {
    if (newConcern.trim()) {
      setFormData(prev => ({
        ...prev,
        concerns: [...prev.concerns, newConcern.trim()]
      }));
      setNewConcern('');
    }
  };

// const handleAddAlternative = (): void => {
//   if (newAlternative.trim()) {
//     setFormData(prev => ({
//       ...prev,
//       alternativeOptions: [...prev.alternativeOptions, newAlternative.trim()]
//     }));
//     setNewAlternative('');
//   }
// };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmitInput({
      ...formData,
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      type: inputType
    });
    
    // Reset form
    setFormData({
      position: '',
      reasoning: '',
      concerns: [],
      alternativeOptions: [],
      confidenceLevel: 7,
      additionalContext: ''
    });
  };

  // Check if user has already provided input
  const userHasResponded = existingInputs.some(input => input.userId === currentUser.id);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Your Input
        </h3>
        
        {userHasResponded && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            ✓ Already responded - you can update below
          </span>
        )}
      </div>

      {/* Input Type Selection */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'position', label: 'Take Position', icon: '👍' },
            { key: 'question', label: 'Ask Question', icon: '❓' },
            { key: 'alternative', label: 'Propose Alternative', icon: '💡' }
          ].map(type => (
            <button
              key={type.key}
              onClick={() => setInputType(type.key)}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                inputType === type.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Position/Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {inputType === 'position' && 'Your Position'}
            {inputType === 'question' && 'Your Question'}
            {inputType === 'alternative' && 'Alternative Proposal'}
          </label>
          <textarea
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={
              inputType === 'position' ? 'I think we should... because...' :
              inputType === 'question' ? 'I need clarification on...' :
              'Instead of the proposed options, what if we...'
            }
            required
          />
        </div>

        {/* Reasoning (for positions and alternatives) */}
        {(inputType === 'position' || inputType === 'alternative') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reasoning & Evidence
            </label>
            <textarea
              value={formData.reasoning}
              onChange={(e) => setFormData(prev => ({ ...prev, reasoning: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Explain your reasoning, include relevant data, past experience, or other evidence..."
            />
          </div>
        )}

        {/* Concerns */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Concerns or Risks
          </label>
          <div className="space-y-2">
            {formData.concerns.map((concern, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-200">
                <span className="flex-grow text-sm">{concern}</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    concerns: prev.concerns.filter((_, i) => i !== idx)
                  }))}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newConcern}
                onChange={(e) => setNewConcern(e.target.value)}
                placeholder="Add a concern or risk..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddConcern())}
              />
              <button
                type="button"
                onClick={handleAddConcern}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Confidence Level */}
        {inputType === 'position' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confidence Level: {formData.confidenceLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.confidenceLevel}
              onChange={(e) => setFormData(prev => ({ ...prev, confidenceLevel: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low confidence</span>
              <span>High confidence</span>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {userHasResponded ? 'Update Input' : 'Submit Input'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StructuredInput;