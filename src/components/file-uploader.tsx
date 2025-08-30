'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface FileUploaderProps {
  id: string;
  name: string;
  onFileLoad: (base64: string | null) => void;
  required?: boolean;
  className?: string;
  initialPreview?: string | null;
}

export function FileUploader({ id, name, onFileLoad, required = false, className, initialPreview }: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onFileLoad(base64String);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileLoad(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
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

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors",
          isDragging && "border-primary bg-accent/20",
          className
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
              className="object-contain rounded-lg p-2"
            />
            <button
              onClick={clearFile}
              className="absolute top-1 right-1 bg-background rounded-full p-1 shadow-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <UploadCloud className="w-6 h-6 mb-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">PNG, JPG</p>
          </div>
        )}
      </div>
      <Input
        id={id}
        name={name}
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif"
        required={required && !preview}
      />
      {/* Hidden input to hold base64 value for form submission */}
      {preview && <input type="hidden" name={`${name}DataUri`} value={preview} />}
    </div>
  );
}
