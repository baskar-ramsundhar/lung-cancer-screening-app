import ImageUpload from '@app/components/upload/ImageUpload';
import React from 'react';

export default function UploadPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">X-ray Image Upload</h1>
      <ImageUpload />
    </div>
  );
}
