'use server';

/**
 * @fileOverview Generates a low-resolution 3D render from a 2D architectural sketch.
 *
 * - generate3DRenderFromSketch - A function that handles the 3D render generation process.
 * - Generate3DRenderFromSketchInput - The input type for the generate3DRenderFromSketch function.
 * - Generate3DRenderFromSketchOutput - The return type for the generate3DRenderFromSketch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const Generate3DRenderFromSketchInputSchema = z.object({
  sketchDataUri: z
    .string()
    .describe(
      "A 2D architectural sketch, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  moodBoardDataUris: z
    .array(z.string())
    .optional()
    .describe(
      "An optional array of mood board images, as data URIs that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  textPrompt: z.string().optional().describe('Optional text prompt to refine the 3D render.'),
});

export type Generate3DRenderFromSketchInput = z.infer<typeof Generate3DRenderFromSketchInputSchema>;

const Generate3DRenderFromSketchOutputSchema = z.object({
  renderDataUri: z
    .string()
    .describe(
      'The generated low-resolution 3D render, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});

export type Generate3DRenderFromSketchOutput = z.infer<typeof Generate3DRenderFromSketchOutputSchema>;

export async function generate3DRenderFromSketch(
  input: Generate3DRenderFromSketchInput
): Promise<Generate3DRenderFromSketchOutput> {
  return generate3DRenderFromSketchFlow(input);
}

const generate3DRenderFromSketchFlow = ai.defineFlow(
  {
    name: 'generate3DRenderFromSketchFlow',
    inputSchema: Generate3DRenderFromSketchInputSchema,
    outputSchema: Generate3DRenderFromSketchOutputSchema,
  },
  async input => {
    let promptText = `You are an AI that generates low-resolution 3D renders of architectural designs based on 2D sketches.
    
    Generate a low-resolution 3D render from the provided architectural sketch.`;

    if (input.textPrompt) {
      promptText += `\n\nRefine the 3D render based on the following text prompt: ${input.textPrompt}`;
    }

    if (input.moodBoardDataUris && input.moodBoardDataUris.length > 0) {
      promptText += `\n\nIncorporate the style and aesthetics from the provided mood board images.`;
    }

    const promptParts: any[] = [{text: promptText}, {media: {url: input.sketchDataUri}}];

    if (input.moodBoardDataUris) {
      input.moodBoardDataUris.forEach(uri => {
        promptParts.push({media: {url: uri}});
      });
    }

    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: promptParts,
    });

    if (!media?.url) {
      throw new Error('Image generation failed.');
    }

    return {renderDataUri: media.url};
  }
);
