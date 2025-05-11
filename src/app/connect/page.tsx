"use client";

import Cal from "@calcom/embed-react";

export default function ConnectPage() {
  return (
    <div className="mx-auto container max-w-7xl py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-heading font-black text-blue-900 uppercase">Connect</h1>
          <p className="text-slate-600 w-full text-lg">
            If you&apos;ve found value in my writing and insights, I&apos;m available for executive mentoring, tech and product advisory roles, and coaching. Schedule time with me below.
          </p>
        </div>
        
        <div className="mt-10 h-[700px] border border-slate-200 rounded-lg shadow-sm">
          <Cal
            calLink="ssilvius"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            config={{
              hideEventTypeDetails: "false",
              layout: 'month_view',
              theme: 'light',
              brandColor: '#3b82f6', // Blue color to match our refined theme
              styles: {
                '--branding-brandColor': '#3b82f6',
                '--enabledDateButton-backgroundColor': '#eff6ff', // Light blue background
                '--selectedDateButton-backgroundColor': '#3b82f6', // Blue for selected date
                '--selectedDateButton-color': '#ffffff',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}