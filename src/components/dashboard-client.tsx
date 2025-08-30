'use client';

import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Download,
  Sparkles,
  Palette,
  Camera,
  Wand2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { FileUploader } from './file-uploader';
import { useToast } from '@/hooks/use-toast';
import { generateRenderAction } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { cn } from '@/lib/utils';
import { MultipleFileUploader } from './multiple-file-uploader';

const initialState = {
  renderDataUri: null,
  error: null,
};

export function DashboardClient() {
  const { toast } = useToast();
  const [sketch, setSketch] = useState<string | null>(null);
  const [moodBoards, setMoodBoards] = useState<(string | null)[]>([]);
  const [generatedAngles, setGeneratedAngles] = useState<string[]>([]);
  const [formState, formAction] = useFormState(generateRenderAction, initialState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAngleGeneration = () => {
    if (!formState.renderDataUri) return;

    toast({
      title: 'Generating Angles...',
      description: 'This may take a moment. This is a placeholder.',
    });
    // In a real app, this would call a refinement AI flow
    const placeholderAngles = [
      'https://picsum.photos/512/512?random=2',
      'https://picsum.photos/512/512?random=3',
      'https://picsum.photos/512/512?random=4',
    ];
    setGeneratedAngles(placeholderAngles);
    // Set the main render as the first item in the angles list, so it's selectable
    if (!selectedImage) {
      setSelectedImage(formState.renderDataUri);
    }
  };
  
  const handleHighQualityRender = () => {
    toast({
        title: 'Premium Feature',
        description: 'High-quality rendering requires credits. Please upgrade your account.',
        variant: 'destructive'
    });
  }
  
  React.useEffect(() => {
    if (formState.renderDataUri && !selectedImage) {
      setSelectedImage(formState.renderDataUri);
    }
  }, [formState.renderDataUri, selectedImage]);

  const hasGeneratedRender = !!formState.renderDataUri;
  const mainRenderDisplay = selectedImage || 'https://picsum.photos/seed/graphite/1024/1024';

  const allRenders = hasGeneratedRender ? [formState.renderDataUri!, ...generatedAngles] : [];


  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
        {/* Controls Column */}
        <div className="lg:col-span-4 xl:col-span-3">
          <Card className="sticky top-4 h-full">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Create Render</CardTitle>
              <CardDescription>Upload files and provide a prompt to generate a 3D model.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sketch-upload">
                    <ImageIcon className="inline-block mr-2 h-4 w-4" />
                    Architectural Sketch
                  </Label>
                  <FileUploader id="sketch-upload" name="sketch" onFileLoad={setSketch} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moodboard-upload">
                    <Palette className="inline-block mr-2 h-4 w-4" />
                    Mood Board (Optional)
                  </Label>
                  <MultipleFileUploader
                    name="moodBoard"
                    onFilesLoad={setMoodBoards}
                    maxFiles={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-prompt">Text Prompt (Optional)</Label>
                  <Textarea
                    id="text-prompt"
                    name="textPrompt"
                    placeholder="e.g., 'A modern two-story house with large windows...'"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full font-semibold" disabled={!sketch}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Render
                </Button>
                {formState?.error && (
                    <div className="text-sm text-destructive flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{formState.error}</span>
                    </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader>
                    <CardTitle>Generated Render</CardTitle>
                    <CardDescription>The primary render and its variations will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4 min-h-0 p-6 pt-0">
                    <div className="relative bg-muted rounded-lg overflow-hidden flex-1">
                        {formState.pending ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                            </div>
                        ) : (
                            <Image
                                src={mainRenderDisplay}
                                alt="Generated 3D Render"
                                fill
                                className="object-cover"
                                data-ai-hint="architectural render"
                            />
                        )}
                    </div>
                    {allRenders.length > 0 ? (
                         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {allRenders.map((imgSrc, index) => (
                                <button key={index} onClick={() => setSelectedImage(imgSrc)} className={cn("relative aspect-square rounded-md overflow-hidden ring-offset-background ring-offset-2 focus:outline-none focus:ring-2 focus:ring-ring", { 'ring-2 ring-primary': selectedImage === imgSrc })}>
                                    <Image
                                        src={imgSrc}
                                        alt={`Render variation ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        data-ai-hint="architectural detail"
                                    />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="h-20" /> 
                    )}
                </CardContent>
                <CardFooter className="flex-wrap gap-2 pt-6">
                    <Button variant="outline" onClick={handleAngleGeneration} disabled={!hasGeneratedRender}>
                        <Camera className="mr-2 h-4 w-4" /> Generate Angles
                    </Button>
                    <Button onClick={handleHighQualityRender} disabled={!hasGeneratedRender}>
                        <Sparkles className="mr-2 h-4 w-4" /> High-Quality Render
                    </Button>
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
