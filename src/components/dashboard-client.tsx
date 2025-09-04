
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Download,
  Wand2,
  Image as ImageIcon,
  Palette,
  Pilcrow,
} from 'lucide-react';
import { FileUploader } from './file-uploader';
import { useToast } from '@/hooks/use-toast';
import { generateRenderAction } from '@/lib/actions';
import { useActionState } from 'react';
import { cn } from '@/lib/utils';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Textarea } from './ui/textarea';
import { MultipleFileUploader } from './multiple-file-uploader';

const initialState = {
  renderDataUri: null,
  error: null,
};

export function DashboardClient() {
  const { toast } = useToast();
  const [sketch, setSketch] = useState<string | null>(null);
  const [moodBoard, setMoodBoard] = useState<(string | null)[]>([]);
  const [formState, formAction, isPending] = useActionState(generateRenderAction, initialState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (formState.error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: formState.error,
      });
    }
  }, [formState.error, toast]);


  React.useEffect(() => {
    if (formState.renderDataUri && !selectedImage) {
      setSelectedImage(formState.renderDataUri);
    }
  }, [formState.renderDataUri, selectedImage]);

  const hasGeneratedRender = !!formState.renderDataUri;
  const mainRenderDisplay = selectedImage || formState.renderDataUri || 'https://picsum.photos/seed/graphite/1024/1024';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
        {/* Controls Column */}
        <div className="lg:col-span-4 xl:col-span-3 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Create Render</CardTitle>
              <CardDescription>Upload a sketch to generate a 3D model.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sketch-upload">
                    <ImageIcon className="inline-block mr-2 h-4 w-4" />
                    Architectural Sketch
                  </Label>
                  <FileUploader id="sketch-upload" name="sketch" onFileLoad={setSketch} required />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advanced-options">
                    <AccordionTrigger>Advanced Options</AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="text-prompt">
                          <Pilcrow className="inline-block mr-2 h-4 w-4" />
                          Text Prompt
                        </Label>
                        <Textarea
                          id="text-prompt"
                          name="textPrompt"
                          placeholder="e.g., 'Make it a modern style with lots of natural light.'"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mood-board-upload">
                          <Palette className="inline-block mr-2 h-4 w-4" />
                          Mood Board (up to 4)
                        </Label>
                        <MultipleFileUploader
                          name="moodBoard"
                          onFilesLoad={setMoodBoard}
                          maxFiles={4}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button type="submit" className="w-full font-semibold" disabled={!sketch || isPending}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isPending ? 'Generating...' : 'Generate Render'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col h-full">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader>
              <CardTitle>Generated Render</CardTitle>
              <CardDescription>The generated render will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 min-h-0 p-6 pt-0">
              <div className="relative bg-muted rounded-lg overflow-hidden flex-1">
                {isPending ? (
                  <div className="flex items-center justify-center h-full">
                     <DotLottieReact
                        src="https://lottie.host/59b29fe7-a1fa-4e20-aa92-160e5d2dcc70/0RzXncpPt2.lottie"
                        loop
                        autoplay
                        style={{ width: '300px', height: '300px' }}
                      />
                  </div>
                ) : (
                  <Image
                    src={mainRenderDisplay}
                    alt="Generated 3D Render"
                    fill
                    className="object-contain"
                    data-ai-hint="architectural render"
                  />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-wrap gap-2 pt-4">
              <Button variant="secondary" disabled={!hasGeneratedRender}>
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
