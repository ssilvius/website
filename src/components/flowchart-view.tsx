"use client";

import React, { useState } from 'react';

// Type definitions
interface WorkflowNode {
  id: string;
  type: 'user_input' | 'system_response' | 'decision_point' | 'api_call' | 'notification';
  title: string;
  description: string;
  x: number;
  y: number;
  connections?: Array<{
    target: string;
    condition?: string;
    probability?: number;
    primary?: boolean;
  }>;
}

interface Workflow {
  name: string;
  description: string;
  totalNodes: number;
  avgCompletionTime: string;
  successRate: number;
  nodes: Record<string, WorkflowNode>;
}

// Complex workflow data representing a customer support automation system
const complexWorkflow: Workflow = {
  name: "Customer Support Automation Workflow",
  description: "Automated customer inquiry routing and response system",
  totalNodes: 47,
  avgCompletionTime: "2.3 minutes",
  successRate: 89,
  nodes: {
    start: {
      id: 'start',
      type: 'user_input',
      title: 'Customer Inquiry Received',
      description: 'Customer submits support ticket through website, email, or chat',
      x: 100, y: 50,
      connections: [{ target: 'classify', primary: true }]
    },
    classify: {
      id: 'classify',
      type: 'decision_point',
      title: 'AI Classification',
      description: 'ML model analyzes inquiry type and urgency',
      x: 250, y: 50,
      connections: [
        { target: 'billing', condition: 'billing_detected', probability: 0.35 },
        { target: 'technical', condition: 'technical_issue', probability: 0.40 },
        { target: 'general', condition: 'general_inquiry', probability: 0.25 }
      ]
    },
    billing: {
      id: 'billing',
      type: 'system_response',
      title: 'Billing Issue Handler',
      description: 'Automated billing verification and common issue resolution',
      x: 150, y: 150,
      connections: [
        { target: 'billing_auto', condition: 'auto_resolvable', probability: 0.70 },
        { target: 'billing_human', condition: 'requires_human', probability: 0.30 }
      ]
    },
    technical: {
      id: 'technical', 
      type: 'system_response',
      title: 'Technical Support Router',
      description: 'Routes technical issues based on product and severity',
      x: 250, y: 150,
      connections: [
        { target: 'tech_kb', condition: 'known_issue', probability: 0.60 },
        { target: 'tech_diag', condition: 'needs_diagnosis', probability: 0.40 }
      ]
    },
    general: {
      id: 'general',
      type: 'system_response', 
      title: 'General Inquiry Handler',
      description: 'FAQ matching and basic information requests',
      x: 350, y: 150,
      connections: [
        { target: 'faq_match', condition: 'faq_available', probability: 0.80 },
        { target: 'human_queue', condition: 'complex_inquiry', probability: 0.20 }
      ]
    },
    billing_auto: {
      id: 'billing_auto',
      type: 'api_call',
      title: 'Automated Resolution',
      description: 'Process refund, update billing, or fix account issue',
      x: 100, y: 250,
      connections: [{ target: 'confirm_resolution' }]
    },
    billing_human: {
      id: 'billing_human',
      type: 'notification',
      title: 'Escalate to Billing Team',
      description: 'Route to human agent with context and priority',
      x: 200, y: 250,
      connections: [{ target: 'human_followup' }]
    },
    tech_kb: {
      id: 'tech_kb',
      type: 'system_response',
      title: 'Knowledge Base Match',
      description: 'Provide step-by-step solution from KB',
      x: 200, y: 250,
      connections: [
        { target: 'solution_sent', condition: 'solution_found', probability: 0.85 },
        { target: 'tech_diag', condition: 'solution_incomplete', probability: 0.15 }
      ]
    },
    tech_diag: {
      id: 'tech_diag',
      type: 'decision_point',
      title: 'Diagnostic Assessment',
      description: 'Interactive troubleshooting and log analysis',
      x: 300, y: 250,
      connections: [
        { target: 'auto_fix', condition: 'fixable', probability: 0.45 },
        { target: 'specialist_queue', condition: 'complex', probability: 0.55 }
      ]
    },
    faq_match: {
      id: 'faq_match',
      type: 'system_response',
      title: 'FAQ Response',
      description: 'Send relevant FAQ with personalized context',
      x: 350, y: 250,
      connections: [{ target: 'satisfaction_check' }]
    },
    human_queue: {
      id: 'human_queue',
      type: 'notification',
      title: 'Human Agent Queue',
      description: 'Route to available agent with full context',
      x: 450, y: 250,
      connections: [{ target: 'human_followup' }]
    }
  }
};

// Old flowchart visualization component
const FlowchartView = ({ workflow = complexWorkflow }: { workflow?: Workflow }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  const getNodeColor = (type: WorkflowNode['type']) => {
    const colors = {
      user_input: '#3B82F6',      // blue
      system_response: '#10B981',  // green  
      decision_point: '#F59E0B',   // yellow
      api_call: '#8B5CF6',        // purple
      notification: '#EF4444'      // red
    };
    return colors[type] || '#6B7280';
  };

  return (
    <div className="bg-white border rounded-lg p-4 h-96 overflow-auto relative">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Old Approach: Traditional Flowchart View
      </h3>
      
      {/* SVG Canvas for flowchart */}
      <div className="relative w-full h-full bg-gray-50 border rounded overflow-auto">
        <svg width="600" height="400" className="absolute">
          {/* Render connections first (behind nodes) */}
          {Object.values(workflow.nodes).map(node => 
            node.connections?.map((conn, idx) => {
              const targetNode = workflow.nodes[conn.target];
              if (!targetNode) return null;
              
              return (
                <line
                  key={`${node.id}-${conn.target}-${idx}`}
                  x1={node.x + 40}
                  y1={node.y + 20}
                  x2={targetNode.x + 40}
                  y2={targetNode.y + 20}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            }) || []
          )}
          
          {/* Arrow marker definition */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                    refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
            </marker>
          </defs>
          
          {/* Render nodes */}
          {Object.values(workflow.nodes).map(node => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width="80"
                height="40"
                rx="4"
                fill={getNodeColor(node.type)}
                stroke={selectedNode === node.id ? "#1F2937" : "transparent"}
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80"
                onClick={() => setSelectedNode(node.id)}
              />
              <text
                x={node.x + 40}
                y={node.y + 20}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="8"
                className="pointer-events-none"
              >
                {node.title.substring(0, 12)}...
              </text>
              
              {/* Node connections indicator */}
              {node.connections && node.connections.length > 1 && (
                <circle
                  cx={node.x + 70}
                  cy={node.y + 10}
                  r="6"
                  fill="#DC2626"
                  opacity="0.8"
                />
              )}
            </g>
          ))}
        </svg>
        
        {/* Overwhelming complexity indicators */}
        <div className="absolute top-2 left-2 bg-red-100 border border-red-300 rounded px-2 py-1">
          <span className="text-xs text-red-800 font-medium">
            47 nodes • 73 connections • Multiple decision points
          </span>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-yellow-100 border border-yellow-300 rounded px-2 py-1">
          <span className="text-xs text-yellow-800">
            ⚠️ Zoom and pan required to see full workflow
          </span>
        </div>
      </div>
      
      {/* Selected node details - cramped and technical */}
      {selectedNode && (
        <div className="mt-4 p-3 bg-gray-100 border rounded text-xs">
          <div className="font-medium text-gray-900">
            Node: {workflow.nodes[selectedNode]?.title}
          </div>
          <div className="text-gray-600 mt-1">
            Type: {workflow.nodes[selectedNode]?.type}
          </div>
          <div className="text-gray-600">
            Connections: {workflow.nodes[selectedNode]?.connections?.length || 0}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowchartView;
