"use client";

import React, { useState, ReactNode } from 'react';

interface Step {
  title: string;
  content: ReactNode;
}

const TechnicalOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: Step[] = [
    {
      title: "API Configuration",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
            <div>$ curl -X POST https://api.monitoring.co/v1/auth \</div>
            <div className="ml-4">-H &quot;Content-Type: application/json&quot; \</div>
            <div className="ml-4">-d {`{"client_id": "your_client_id", "client_secret": "your_client_secret"}`}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Enter your OAuth client ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
              <input 
                type="password" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder="Enter your OAuth client secret"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Endpoint URL</label>
            <input 
              type="url" 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="https://your-domain.com/webhooks/monitoring"
            />
          </div>
          <div className="text-xs text-gray-500">
            ⚠️ Ensure your webhook endpoint supports POST requests and returns 200 status codes
          </div>
        </div>
      )
    },
    {
      title: "Monitoring Configuration", 
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Interval (ms)</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option>30000</option>
                <option>60000</option>
                <option>300000</option>
                <option>Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (ms)</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                defaultValue="5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retry Attempts</label>
              <input 
                type="number" 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                defaultValue="3"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Thresholds</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Latency P95 (ms)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  defaultValue="1000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Error Rate (%)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  defaultValue="5"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Escalation Policy</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email" className="rounded" />
                <label htmlFor="email" className="text-sm">Email after 1 failure</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="slack" className="rounded" />
                <label htmlFor="slack" className="text-sm">Slack after 3 failures</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="pagerduty" className="rounded" />
                <label htmlFor="pagerduty" className="text-sm">PagerDuty after 5 failures</label>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Integration Setup",
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Integration Requirements</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Install our monitoring agent on your servers</li>
              <li>• Configure CORS headers for JavaScript SDK</li>
              <li>• Set up SSL certificate verification</li>
              <li>• Whitelist our IP ranges in your firewall</li>
            </ul>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SDK Installation</label>
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
              <div>npm install @monitoring-co/sdk</div>
              <div className="mt-2">{`// Initialize in your application`}</div>
              <div>import MonitoringSDK from &apos;@monitoring-co/sdk&apos;;</div>
              <div className="mt-1">const monitor = new MonitoringSDK({'{'}  </div>
              <div className="ml-4">apiKey: &apos;your_api_key&apos;,</div>
              <div className="ml-4">endpoint: &apos;https://api.monitoring.co/v1/events&apos;,</div>
              <div className="ml-4">batchSize: 100,</div>
              <div className="ml-4">flushInterval: 30000</div>
              <div>{'}'});</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option>production</option>
                <option>staging</option>
                <option>development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Center Region</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                <option>us-east-1</option>
                <option>us-west-2</option>
                <option>eu-west-1</option>
                <option>ap-southeast-1</option>
              </select>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="bg-white border rounded-lg shadow-sm my-6">
      <div className="p-4 border-b bg-red-50">
        <h4 className="font-medium text-red-800 mb-2">❌ Original Technical Onboarding Flow</h4>
        <p className="text-sm text-red-700">This engineer-designed flow assumes users understand technical concepts and want comprehensive configuration options upfront.</p>
      </div>
      
      {/* Progress indicator */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Setup Progress</span>
          <span className="text-sm text-gray-500">{currentStep + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step navigation */}
      <div className="flex border-b">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`px-4 py-3 text-sm font-medium flex-1 ${
              currentStep === index
                ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setCurrentStep(index)}
          >
            {step.title}
          </button>
        ))}
      </div>
      
      {/* Step content */}
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h3>
        {steps[currentStep].content}
        
        <div className="flex justify-between mt-6">
          <button
            className={`px-4 py-2 text-sm rounded ${
              currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 text-sm rounded ${
              currentStep === steps.length - 1 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
      
      {/* Problems callout */}
      <div className="border-t p-4 bg-red-50">
        <h5 className="font-medium text-red-800 mb-2">Why This Approach Fails:</h5>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Assumes users understand OAuth, webhooks, and API concepts</li>
          <li>• Requires complex setup before showing any value</li>
          <li>• Technical jargon creates anxiety and confusion</li>
          <li>• All-or-nothing approach with no progressive disclosure</li>
          <li>• No guidance on what settings actually matter for getting started</li>
        </ul>
      </div>
    </div>
  );
};

export default TechnicalOnboardingFlow;
