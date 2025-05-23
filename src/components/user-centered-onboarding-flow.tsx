"use client";

import React, { useState, ReactNode } from 'react';

interface Step {
  title: string;
  content: ReactNode;
}

const UserCenteredOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [monitoringStarted, setMonitoringStarted] = useState(false);
  
  const steps: Step[] = [
    {
      title: "What would you like to monitor?",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Let&apos;s start monitoring your first API
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll have you up and running in under 3 minutes
            </p>
          </div>
          
          <div className="space-y-3">
            {[
              { 
                title: "My website homepage", 
                description: "Monitor if your site is up and how fast it loads",
                icon: "🌐",
                recommended: true
              },
              { 
                title: "A REST API endpoint", 
                description: "Check if your API is responding correctly",
                icon: "🔗"
              },
              { 
                title: "A GraphQL API", 
                description: "Monitor your GraphQL queries and mutations",
                icon: "📊"
              }
            ].map((option, index) => (
              <div key={index} className={`border-2 rounded-lg p-4 cursor-pointer hover:border-blue-300 transition-colors ${
                option.recommended ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{option.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">{option.title}</h4>
                      {option.recommended && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Enter your URL",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              What&apos;s your website URL?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll check it every minute and alert you if something goes wrong
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <input 
                type="url" 
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourwebsite.com"
                defaultValue="https://example.com"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">💡</span>
                <div>
                  <h5 className="font-medium text-blue-800 mb-1">Pro tip</h5>
                  <p className="text-sm text-blue-700">
                    Start with your homepage. You can add more URLs later once you see how this works.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Test & Start Monitoring",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Let&apos;s test your website now
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll run a quick check to make sure everything is working
            </p>
          </div>
          
          {!monitoringStarted ? (
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">https://example.com</h4>
                    <p className="text-sm text-gray-600">Ready to test</p>
                  </div>
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={() => setMonitoringStarted(true)}
                  >
                    Test Now
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  This will take about 10 seconds
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center">
                  <span className="text-green-500 text-xl mr-3">✅</span>
                  <div>
                    <h4 className="font-medium text-green-800">Great! Your website is responding</h4>
                    <div className="text-sm text-green-700 mt-1 space-y-1">
                      <div>• Response time: 248ms</div>
                      <div>• Status: 200 OK</div>
                      <div>• SSL certificate: Valid</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2">What happens next?</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>&bull; We&apos;ll check your website every minute</li>
                  <li>&bull; You&apos;ll get an email if we detect any problems</li>
                  <li>&bull; View real-time status on your dashboard</li>
                </ul>
              </div>
              
              <div className="text-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Start Monitoring
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  You can add more websites and configure alerts later
                </p>
              </div>
            </div>
          )}
        </div>
      )
    }
  ];
  
  return (
    <div className="bg-white border rounded-lg shadow-sm my-6">
      <div className="p-4 border-b bg-green-50">
        <h4 className="font-medium text-green-800 mb-2">✅ User-Centered Onboarding Flow</h4>
        <p className="text-sm text-green-700">This redesigned flow focuses on getting users to value quickly with minimal cognitive load.</p>
      </div>
      
      {/* Progress indicator */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Getting Started</span>
          <span className="text-sm text-gray-500">{currentStep + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step content */}
      <div className="p-6">
        {steps[currentStep].content}
        
        <div className="flex justify-between mt-8">
          <button
            className={`px-4 py-2 text-sm rounded ${
              currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Back
          </button>
          {currentStep < steps.length - 1 && (
            <button
              className="px-6 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Continue
            </button>
          )}
        </div>
      </div>
      
      {/* Success factors callout */}
      <div className="border-t p-4 bg-green-50">
        <h5 className="font-medium text-green-800 mb-2">Why This Approach Works:</h5>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Starts with user intent (&quot;What do you want to monitor?&quot;) not technical requirements</li>
          <li>• Uses plain language and avoids technical jargon</li>
          <li>• Shows immediate value with live testing</li>
          <li>• Progressive disclosure - advanced features come later</li>
          <li>• Provides context and explanations for every step</li>
          <li>• Reduces anxiety with clear expectations and &quot;what happens next&quot;</li>
        </ul>
      </div>
    </div>
  );
};

export default UserCenteredOnboardingFlow;
