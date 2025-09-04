
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { InteractiveFileUploader } from './interactive-file-uploader';

const uploadingRequirements = [
  'We accept JPEG and PNG image formats',
  'Make sure you upload architectural/blueprint-like images',
  'Good-quality images ensure faster and better convert',
];

const placeholderImages = [
    'https://picsum.photos/seed/placeholder1/128/128',
    'https://picsum.photos/seed/placeholder2/128/128',
    'https://picsum.photos/seed/placeholder3/128/128',
    'https://picsum.photos/seed/placeholder4/128/128',
]

export function TryItOut() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    return (
        <section className="w-full py-20 md:py-32 lg:py-40 bg-[#F9FAFB]">
            <div className="container mx-auto px-40">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                        Try It Out
                    </h2>
                    <p className="max-w-2xl text-lg text-gray-500">
                        Upload your own sketch or floor plan and experience the magic of instant 3D conversion directly in your browser.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div className="relative flex flex-col items-center">
                        <div className="relative w-full max-w-md h-80">
                            <div className="sketch-image-container sketch-image-2">
                                 <Image
                                    src="https://picsum.photos/seed/sketch2/400/300"
                                    width={400}
                                    height={300}
                                    alt="Sketch 2"
                                    data-ai-hint="floor plan sketch"
                                    className="rounded-2xl bg-white p-2 shadow-xl"
                                />
                            </div>
                            <div className="sketch-image-container sketch-image-1">
                                <Image
                                    src="https://picsum.photos/seed/sketch1/400/300"
                                    width={400}
                                    height={300}
                                    alt="Sketch 1"
                                    data-ai-hint="floor plan sketch"
                                    className="rounded-2xl bg-white p-2 shadow-xl"
                                />
                            </div>
                        </div>

                        <div className="arrow-container">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 10 Q 90 10, 90 90" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5" fill="none" markerEnd="url(#arrowhead)" />
                                <defs>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>

                        <div className="mt-8 w-full max-w-md text-left">
                            <h3 className="font-headline text-xl font-medium text-gray-700 mb-4">Uploading requirements</h3>
                            <ul className="space-y-2">
                                {uploadingRequirements.map((req, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-600">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full">
                       <InteractiveFileUploader 
                         placeholders={placeholderImages}
                         onFileSelect={setSelectedFile}
                       />
                    </div>
                </div>
            </div>
        </section>
    );
}
