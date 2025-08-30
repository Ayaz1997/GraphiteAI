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
import { Separator } from './ui/separator';

const initialState = {
  renderDataUri: null,
  error: null,
};

export function DashboardClient() {
  const { toast } = useToast();
  const [sketch, setSketch] = useState<string | null>(null);
  const [moodBoard, setMoodBoard] = useState<string | null>(null);
  const [generatedAngles, setGeneratedAngles] = useState<string[]>([]);
  const [formState, formAction] = useFormState(generateRenderAction, initialState);

  const handleAngleGeneration = () => {
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
  };
  
  const handleHighQualityRender = () => {
    toast({
        title: 'Premium Feature',
        description: 'High-quality rendering requires credits. Please upgrade your account.',
        variant: 'destructive'
    });
  }

  const mainRender = formState.renderDataUri || 'https://picsum.photos/1024/1024?random=1';
  const hasGeneratedRender = !!formState.renderDataUri;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-4 xl:col-span-3">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Create Render</CardTitle>
              <CardDescription>Upload your files and provide a prompt to generate a 3D model.</CardDescription>
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
                  <FileUploader id="moodboard-upload" name="moodBoard" onFileLoad={setMoodBoard} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-prompt">Text Prompt (Optional)</Label>
                  <Textarea
                    id="text-prompt"
                    name="textPrompt"
                    placeholder="e.g., 'A modern two-story house with large windows, cedar siding, and a flat roof...'"
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
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Render Display */}
            <div className="xl:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Generated Render</CardTitle>
                        <CardDescription>This is the primary render generated from your inputs.</CardDescription>
                    </CardHeader>
                    <CardContent className="relative aspect-square">
                        {formState.pending ? (
                            <div className="flex items-center justify-center h-full bg-muted rounded-lg">
                                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                            </div>
                        ) : (
                            <Image
                                src={hasGeneratedRender ? mainRender : "https://picsum.photos/seed/graphite/1024/1024"}
                                alt="Generated 3D Render"
                                fill
                                className="object-cover rounded-lg"
                                data-ai-hint="architectural render"
                            />
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
            
            {/* Angles/Variations Display */}
            <div className="xl:col-span-1">
                 <Card>
                    <CardHeader>
                        <CardTitle>Variations</CardTitle>
                        <CardDescription>Different angles and styles.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {generatedAngles.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {generatedAngles.map((angleSrc, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image
                                src={angleSrc}
                                alt={`Angle variation ${index + 1}`}
                                fill
                                className="object-cover rounded-md"
                                data-ai-hint="architectural detail"
                                />
                            </div>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center text-sm text-muted-foreground py-10">
                            Click 'Generate Angles' to create variations of your design.
                        </div>
                        )}
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
