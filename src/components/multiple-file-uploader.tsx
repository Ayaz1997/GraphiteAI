'use client';

import React, { useState, useEffect } from 'react';
import { FileUploader } from './file-uploader';

interface MultipleFileUploaderProps {
  name: string;
  onFilesLoad: (base64: (string | null)[]) => void;
  maxFiles: number;
}

export function MultipleFileUploader({ name, onFilesLoad, maxFiles }: MultipleFileUploaderProps) {
  const [files, setFiles] = useState<(string | null)[]>(() => Array(maxFiles).fill(null));

  useEffect(() => {
    onFilesLoad(files.filter(file => file !== null));
  }, [files, onFilesLoad]);

  const handleFileLoad = (base64: string | null, index: number) => {
    const newFiles = [...files];
    newFiles[index] = base64;
    setFiles(newFiles);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: maxFiles }).map((_, index) => (
          <FileUploader
            key={index}
            id={`${name}-upload-${index}`}
            name={`${name}-${index}`}
            onFileLoad={(base64) => handleFileLoad(base64, index)}
            className="h-20"
            initialPreview={files[index]}
          />
        ))}
      </div>
      {files.filter(f => f).map((file, index) => (
        <input key={index} type="hidden" name={`${name}DataUri[]`} value={file || ''} />
      ))}
    </>
  );
}
