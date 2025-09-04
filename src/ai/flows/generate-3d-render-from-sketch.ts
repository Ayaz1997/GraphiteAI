
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
  textPrompt: z.string().optional().describe('Optional text prompt to further refine the rendering style.'),
  moodBoardDataUris: z
    .array(z.string())
    .optional()
    .describe(
      "An array of mood board images as data URIs. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .max(4),
});

export type Generate3DRenderFromSketchInput = z.infer<typeof Generate3DRenderFromSketchInputSchema>;

const Generate3DRenderFromSketchOutputSchema = z.object({
  renderDataUri: z
    .string()
    .optional()
    .describe(
      'The generated low-resolution 3D render, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  error: z.string().optional().describe('An error message if the generation failed.'),
});

export type Generate3DRenderFromSketchOutput = z.infer<typeof Generate3DRenderFromSketchOutputSchema>;

// Export the wrapper function that calls the flow
export async function generate3DRenderFromSketch(
  input: Generate3DRenderFromSketchInput
): Promise<Generate3DRenderFromSketchOutput> {
  return await generate3DRenderFromSketchFlow(input);
}

const generate3DRenderFromSketchFlow = ai.defineFlow(
  {
    name: 'generate3DRenderFromSketchFlow',
    inputSchema: Generate3DRenderFromSketchInputSchema,
    outputSchema: Generate3DRenderFromSketchOutputSchema,
  },
  async input => {
    let promptText = `Given a 2D floor plan diagram or sketch, generate a 3D top-down architectural model. The output should maintain the exact layout and spatial relationships of rooms, walls, doors, and windows as depicted in the input. Ensure that furniture and fixtures are accurately represented. The perspective should be a clear, overhead, slightly angled view.`;

    if (input.textPrompt) {
        promptText += `\n\nApply the following refinements: "${input.textPrompt}"`;
    }

    if (input.moodBoardDataUris && input.moodBoardDataUris.length > 0) {
        promptText += `\n\nUse the provided mood board images to strongly influence the colors, textures, materials, and overall aesthetic of the render.`;
    }

    const promptParts: any[] = [
      {text: promptText},
      {media: {url: input.sketchDataUri}},
      ...(input.moodBoardDataUris || []).map(uri => ({
        media: {url: uri},
      })),
    ];

    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: promptParts,
        config: {
          responseModalities: ['IMAGE', 'TEXT'],
        },
      });

      if (!media?.url) {
        return {error: 'Image generation failed. The AI did not return an image.'};
      }

      return {renderDataUri: media.url};
    } catch (e: any) {
      console.error('An error occurred during image generation:', e);
      let errorMessage = 'An unexpected error occurred during image generation. Please check the server logs.';
      if (e.message) {
        if (e.message.includes('SAFETY')) {
          errorMessage = 'The generation was blocked due to safety settings. Please modify your prompt or image.';
        } else if (e.message.includes('DEADLINE_EXCEEDED')) {
          errorMessage = 'The request timed out. Please try again.';
        } else {
          errorMessage = `Generation failed: ${e.message}`;
        }
      }
      return {error: errorMessage};
    }
  }
);
