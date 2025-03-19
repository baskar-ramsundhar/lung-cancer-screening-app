import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// This will be replaced with actual R2 implementation
const mockUploadToR2 = async (file: ArrayBuffer, fileName: string, contentType: string) => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would upload to R2 and return the URL
  const fileId = uuidv4();
  const fileUrl = `/api/images/${fileId}`;
  
  console.log(`Uploaded file: ${fileName}, Type: ${contentType}, Size: ${file.byteLength} bytes`);
  
  return {
    id: fileId,
    url: fileUrl,
    fileName,
    contentType,
    size: file.byteLength
  };
};

// Validate file type
const isValidFileType = (contentType: string) => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/dicom',
    'application/dicom'
  ];
  
  return validTypes.includes(contentType);
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const patientId = formData.get('patientId') as string | null;
    const studyId = formData.get('studyId') as string | null;
    
    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    if (!isValidFileType(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported types: JPEG, PNG, DICOM' },
        { status: 400 }
      );
    }
    
    // Validate file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }
    
    // Read file as ArrayBuffer
    const fileBuffer = await file.arrayBuffer();
    
    // Upload to R2 (mock implementation for now)
    const uploadResult = await mockUploadToR2(fileBuffer, file.name, file.type);
    
    // In a real implementation, we would store metadata in the database
    const timestamp = Date.now();
    const imageRecord = {
      id: uploadResult.id,
      studyId: studyId || 'default-study',
      patientId: patientId || 'default-patient',
      fileName: file.name,
      filePath: uploadResult.url,
      fileType: file.type.includes('dicom') ? 'dicom' : file.type.split('/')[1],
      uploadDate: timestamp,
      status: 'uploaded',
      metadata: JSON.stringify({
        contentType: file.type,
        size: file.size,
        uploadedAt: new Date(timestamp).toISOString()
      }),
      created_at: timestamp,
      updated_at: timestamp
    };
    
    console.log('Image record:', imageRecord);
    
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: uploadResult
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
