
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
    '/images/sketch1.png',
    '/images/sketch2.jpg',
    '/images/sketch3.jpeg',
    '/images/sketch4.png',
]

export function TryItOut() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    return (
        <section className="w-full py-20 md:py-32 lg:py-40 bg-[#F9FAFB]">
            <div className="container mx-auto px-4 md:px-10">
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
                    <div className="relative flex flex-col items-center order-last lg:order-first">
                        <div className="relative w-full max-w-md h-80">
                            <div className="sketch-image-container sketch-image-2">
                                 <Image
                                    src="/images/sketch2.jpg"
                                    width={300}
                                    height={200}
                                    alt="Sketch 2"
                                    data-ai-hint="floor plan sketch"
                                    className="rounded-2xl bg-white p-2 shadow-xl"
                                />
                            </div>
                            <div className="sketch-image-container sketch-image-1">
                                <Image
                                    src="/images/sketch1.png"
                                    width={300}
                                    height={200}
                                    alt="Sketch 1"
                                    data-ai-hint="floor plan sketch"
                                    className="rounded-2xl bg-white p-2 shadow-xl"
                                />
                            </div>
                        </div>

                        <div className="arrow-container">
                        <Image
                            src="/images/arrow.svg"
                            width={180}
                            height={60}
                            alt="arrow right"
                            data-ai-hint="arrow"
                            className="left-[-100] top-20 absolute origin-top-left" //adjust arrow position here
                        />
                        </div>

                        <div className="mt-8 w-full max-w-md text-left">
                            <h3 className="font-body text-xl font-medium text-gray-900 mb-4">Uploading requirements</h3>
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
                    <div className="w-full order-first lg:order-last">
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
