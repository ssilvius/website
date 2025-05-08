"use client";

import Cal from "@calcom/embed-react";

export default function ConnectPage() {
  return (
    <div className="mx-auto container max-w-4xl py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Connect</h1>
          <p className="text-gray-500">
            If you&apos;ve found value in my writing and insights, I&apos;m available for executive mentoring, tech and product advisory roles, and coaching. Schedule time with me below.
          </p>
        </div>
        
        <div className="mt-8 h-[700px]">
          <Cal
            calLink="ssilvius"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            config={{
              hideEventTypeDetails: "false",
              layout: 'month_view',
              theme: 'light',
              brandColor: '#818cf8', // Indigo color to match your site's theme
              styles: {
                '--branding-brandColor': '#818cf8',
                '--enabledDateButton-backgroundColor': '#eef2ff', // Light indigo background
                '--selectedDateButton-backgroundColor': '#818cf8', // Indigo for selected date
                '--selectedDateButton-color': '#ffffff',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}