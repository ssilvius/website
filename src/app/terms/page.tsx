import React from 'react';

export const metadata = {
  title: 'Terms of Service - Sean Silvius',
  description: 'Terms of service for sean.silvius.me',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-heading font-black text-blue-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-lg">
          Last updated: May 10, 2025
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Introduction</h2>
        <p>
          Welcome to sean.silvius.me. By accessing this website, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the website.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Intellectual Property</h2>
        <p>
          All content on this website, including but not limited to text, articles, graphics, logos, images, and code, is the property of Sean Silvius and is protected by copyright and other intellectual property laws.
        </p>
        
        <h3 className="text-xl font-heading font-bold mt-6 mb-3">Content Usage</h3>
        <p>
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on this website without express written permission.
        </p>
        
        <h3 className="text-xl font-heading font-bold mt-6 mb-3">About The Images</h3>
        <p>
          The images on this website are a mix of AI-generated content and hand-drawn illustrations. The hand-drawn illustrations represent personal creative work and practice of craft. Drawing, like many skills, requires consistent practice to maintain proficiency.
        </p>
        <p>
          All images, regardless of their creation method, may not be used without permission. Unauthorized use constitutes copyright infringement and may result in legal action.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">User Contributions</h2>
        <p>
          This website does not currently allow user-contributed content. If this changes in the future, additional terms will be added to cover such contributions.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Links to Other Websites</h2>
        <p>
          This website may contain links to third-party websites that are not owned or controlled by Sean Silvius. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Disclaimer</h2>
        <p>
          The information provided on this website is for general informational purposes only. I make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the website.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Limitation of Liability</h2>
        <p>
          In no event shall Sean Silvius be liable for any indirect, punitive, incidental, special, consequential damages, or any damages whatsoever arising out of or connected with the use or misuse of this website or its content.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Changes to These Terms</h2>
        <p>
          I reserve the right to modify these terms of service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any modifications constitutes your acceptance of the revised terms.
        </p>
        
        <h2 className="text-2xl font-heading font-bold mt-8 mb-4">Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact me through the Connect page on this website.
        </p>
      </div>
    </div>
  );
}
