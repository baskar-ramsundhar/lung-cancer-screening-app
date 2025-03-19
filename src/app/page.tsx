import { default as Link } from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Lung Cancer Screening Application
        </h1>
        
        <p className="text-center mb-8">
          A modern web application for automating lung cancer screening using X-ray images and Google Cloud's Medical Imaging Suite.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 border rounded-lg shadow-card">
            <h2 className="text-2xl font-semibold mb-4">For Radiologists</h2>
            <p className="mb-4">Access patient scans, view AI analysis results, and provide professional assessments.</p>
            <Link href="/login" className="text-primary-500 hover:text-primary-700">
              Login as Radiologist →
            </Link>
          </div>
          
          <div className="p-6 border rounded-lg shadow-card">
            <h2 className="text-2xl font-semibold mb-4">For Technicians</h2>
            <p className="mb-4">Upload X-ray images, manage patient records, and track analysis progress.</p>
            <Link href="/login" className="text-primary-500 hover:text-primary-700">
              Login as Technician →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
