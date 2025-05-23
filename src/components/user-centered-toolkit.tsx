"use client";

import React, { useState } from 'react';

interface Tool {
  name: string;
  category: string;
  description: string;
  useCase: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  time: string;
  link?: string;
}

const UserCenteredToolkit = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const tools: Tool[] = [
    {
      name: "User Journey Mapping",
      category: "research",
      description: "Visualize the user&apos;s path through your product, identifying pain points and emotion states at each step",
      useCase: "Understand the current state of your onboarding flow from the user&apos;s perspective",
      difficulty: "beginner",
      time: "2-4 hours",
      link: "https://www.nngroup.com/articles/journey-mapping-101/"
    },
    {
      name: "Usability Testing",
      category: "research",
      description: "Observe real users attempting to complete tasks with your product",
      useCase: "Identify specific points of confusion in your onboarding flow",
      difficulty: "intermediate",
      time: "1 day setup, 1 week execution",
      link: "https://www.usability.gov/how-to-and-tools/methods/usability-testing.html"
    },
    {
      name: "First-Click Testing",
      category: "research",
      description: "Focus testing specifically on where users click first when trying to accomplish a task",
      useCase: "Determine if users understand how to begin each onboarding step",
      difficulty: "beginner",
      time: "2-3 hours",
      link: "https://www.usertesting.com/blog/first-click-testing"
    },
    {
      name: "Heuristic Evaluation",
      category: "analysis",
      description: "Systematic review of your interface against established usability principles",
      useCase: "Identify technical design issues that violate usability best practices",
      difficulty: "intermediate",
      time: "4-8 hours",
      link: "https://www.nngroup.com/articles/ten-usability-heuristics/"
    },
    {
      name: "Card Sorting",
      category: "research",
      description: "Ask users to organize content into categories that make sense to them",
      useCase: "Structure your onboarding flow according to user mental models",
      difficulty: "beginner",
      time: "2-3 hours setup, 1 week execution",
      link: "https://www.usability.gov/how-to-and-tools/methods/card-sorting.html"
    },
    {
      name: "Progressive Disclosure Mapping",
      category: "design",
      description: "Plan what information and options to reveal at each stage of user familiarity",
      useCase: "Systematically reduce complexity for new users while maintaining power for advanced users",
      difficulty: "advanced",
      time: "1-2 days",
      link: "https://www.nngroup.com/articles/progressive-disclosure/"
    },
    {
      name: "Expectation Testing",
      category: "research",
      description: "Ask users what they expect would happen before they take an action",
      useCase: "Align your system behavior with what users naturally expect",
      difficulty: "beginner",
      time: "2-4 hours",
      link: "https://www.nngroup.com/articles/mental-models/"
    },
    {
      name: "Five-Second Testing",
      category: "research",
      description: "Show users an interface for five seconds, then ask what they remember",
      useCase: "Ensure your onboarding focuses attention on the most important elements",
      difficulty: "beginner",
      time: "1-2 hours",
      link: "https://usabilityhub.com/guides/five-second-testing"
    },
    {
      name: "Cognitive Walkthrough",
      category: "analysis",
      description: "Step through user tasks from a cognitive psychology perspective",
      useCase: "Identify where users might struggle due to mental model mismatches",
      difficulty: "advanced",
      time: "4-8 hours",
      link: "https://www.interaction-design.org/literature/article/cognitive-walkthrough"
    },
    {
      name: "Readability Analysis",
      category: "analysis", 
      description: "Evaluate the reading level and clarity of your interface text",
      useCase: "Ensure your instructions and labels are understandable by all users",
      difficulty: "beginner",
      time: "2-3 hours",
      link: "https://readable.com/"
    },
    {
      name: "Success/Failure Metrics",
      category: "measurement",
      description: "Define specific measurable indicators of user success and failure",
      useCase: "Create objective measurements to track onboarding improvements",
      difficulty: "intermediate",
      time: "4-6 hours setup, ongoing measurement",
      link: "https://www.productplan.com/glossary/success-metrics/"
    },
    {
      name: "Mental Model Diagramming",
      category: "research",
      description: "Visualize how users think about a domain vs. how your system is designed",
      useCase: "Identify and address gaps between how engineers and users think",
      difficulty: "advanced",
      time: "1-2 days",
      link: "https://indi.com/mental-models"
    }
  ];
  
  const categories = ['all', ...Array.from(new Set(tools.map(tool => tool.category)))];
  
  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.useCase.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'advanced': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'analysis': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'design': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'measurement': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <div className="bg-white border rounded-lg shadow-sm my-6">
      <div className="p-4 border-b bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">🧰 User-Centered Design Toolkit</h4>
        <p className="text-sm text-gray-600">Practical tools and techniques for creating better onboarding experiences</p>
      </div>
      
      <div className="p-4 border-b space-y-3">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          
          <div className="flex overflow-x-auto py-1 gap-1 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h5 className="font-medium text-gray-900">{tool.name}</h5>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(tool.difficulty)}`}>
                      {tool.difficulty}
                    </span>
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                      {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{tool.description}</p>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <h6 className="text-xs text-gray-500 uppercase tracking-wide mb-1">Best For</h6>
                    <p className="text-sm text-gray-700">{tool.useCase}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-gray-500">⏱️ {tool.time}</span>
                    {tool.link && (
                      <a 
                        href={tool.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-gray-500">No matching tools found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t p-4 bg-blue-50">
        <h5 className="font-medium text-blue-800 mb-2">How to Use This Toolkit</h5>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal pl-5">
          <li>Start with <strong>beginner tools</strong> if you&apos;re new to user-centered design</li>
          <li>Choose <strong>research tools</strong> to understand user pain points</li>
          <li>Use <strong>analysis tools</strong> to evaluate your current design</li>
          <li>Select <strong>measurement tools</strong> to track the impact of your changes</li>
        </ol>
      </div>
    </div>
  );
};

export default UserCenteredToolkit;
