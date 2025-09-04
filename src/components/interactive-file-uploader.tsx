
'use client';

import React, { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface InteractiveFileUploaderProps {
  placeholders: string[];
  onFileSelect: (file: string | null) => void;
}

export function InteractiveFileUploader({ placeholders, onFileSelect }: InteractiveFileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onFileSelect(base64String);
    };
    reader.readAsDataURL(file);
  }, [onFileSelect]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 5 * 1024 * 1024) {
      processFile(file);
    } else {
        // Handle error: invalid file type or size
        alert('Please upload a JPG or PNG file under 5MB.');
    }
  }, [processFile]);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectPlaceholder = (e: React.MouseEvent, placeholder: string) => {
      e.preventDefault();
      setPreview(placeholder);
      onFileSelect(placeholder);
  }

  return (
    <div className="w-full p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors",
          isDragging && "border-primary bg-accent/20"
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragEnter}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="File preview"
              fill
              className="object-contain rounded-lg p-4"
              data-ai-hint="floor plan sketch"
            />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors z-10"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="p-4 bg-gray-200 rounded-full mb-4">
                <UploadCloud className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-1">JPG or PNG (5mb max)</p>
          </div>
        )}
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
        />
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <p className="text-sm text-gray-500">No images? Try these:</p>
        <div className="flex items-center gap-2">
            {placeholders.map((p, i) => (
                <button key={i} onClick={(e) => selectPlaceholder(e, p)} className="p-1 border-2 border-gray-200 hover:border-primary rounded-md transition-all">
                    <Image src={p} width={48} height={48} alt={`Placeholder ${i+1}`} className="rounded" data-ai-hint="floor plan sketch" />
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}
