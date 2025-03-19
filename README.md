# Lung Cancer Screening Application

A modern web application for automating lung cancer screening using X-ray images and Google Cloud's Medical Imaging Suite.

## Overview

This application addresses the challenges in the current manual review process for lung cancer screening by:

- Providing a platform to upload patient's X-ray images
- Automatically analyzing these images for potential lung cancer indicators using Google Cloud's Medical Imaging Suite
- Presenting the results to radiologists in a clear and organized manner, highlighting areas of concern
- Allowing secure storage and management of images, results, and patient information
- Enabling easy tracking of image analysis progress

## Technology Stack

- **Frontend**: Next.js with React, Tailwind CSS
- **Backend**: Next.js API routes with Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Storage**: Cloudflare R2 (S3-compatible) for image storage
- **AI Integration**: Google Cloud Medical Imaging Suite
- **Development**: Project IDX for AI-assisted development
- **Version Control**: Git/GitHub
- **Deployment**: Cloudflare Pages

## Features

- **User Authentication**: Secure role-based access control for radiologists, administrators, and technicians
- **Patient Management**: Comprehensive patient record management
- **Image Upload**: Support for DICOM and common image formats with validation
- **Automated Analysis**: AI-powered detection of potential lung cancer indicators
- **Interactive Viewer**: Clear visualization of analysis results with highlighted areas of concern
- **Worklist Management**: Efficient organization and tracking of screening studies
- **Reporting**: Comprehensive reporting capabilities for findings
- **Audit Logging**: Complete tracking of all system actions for compliance

## Development

This project is developed using Google's Project IDX, an AI-assisted development environment that enhances productivity and code quality.
