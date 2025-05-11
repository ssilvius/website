import React from 'react';

export const metadata = {
  title: 'Privacy Policy - Sean Silvius',
  description: 'Privacy policy for sean.silvius.me',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-heading font-black text-blue-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-lg">
          Last updated: May 10, 2025
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Welcome to sean.silvius.me. I value your privacy and have designed this site with privacy in mind.
          This Privacy Policy explains how your information is collected, used, and disclosed when you visit my website.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Information Collection</h2>
        <p>
          <strong>No Cookies:</strong> This is a static website that does not use cookies or similar tracking technologies to collect or store your personal information.
        </p>
        <p>
          <strong>Server Logs:</strong> Like most websites, basic server logs are collected automatically. This information includes your IP address, browser type, operating system, referring pages, and timestamps. This data is used only for troubleshooting and site maintenance purposes.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Future Changes</h2>
        <p>
          If I ever implement features that require cookies or collect personal information in the future, I will update this Privacy Policy and notify you through a visible notice on the website before implementing such changes.
        </p>
        <p>
          Yes, this means you&apos;ll get one of those &quot;stupid pop-ups&quot; that everyone uses. I don&apos;t like them either, but they&apos;re necessary for transparency and legal compliance.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Third-Party Services</h2>
        <p>
          This website may include links to other websites or services that operate independently and are not under my control. These websites may have their own privacy policies, which I encourage you to review. I am not responsible for the content or privacy practices of linked sites.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Contact Information</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact me through the Connect page on this website.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p>
          I may update this Privacy Policy occasionally to reflect changes in practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated &quot;Last Updated&quot; date at the top of this page.
        </p>
      </div>
    </div>
  );
}
