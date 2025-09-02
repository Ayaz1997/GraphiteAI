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

// New schema for validation
const ValidationSchema = z.object({
  isArchitecturalPlan: z.boolean().describe('Whether the uploaded image is an architectural plan or blueprint.'),
  reasoning: z.string().describe('A brief explanation for the decision.'),
});

// Define the validation prompt once, outside the function
const validationPrompt = ai.definePrompt({
  name: 'validateSketchPrompt',
  input: {schema: z.object({sketchDataUri: z.string()})},
  output: {schema: ValidationSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an AI expert in architecture and building plans. Your task is to determine if the provided image is a valid architectural drawing, blueprint, or sketch. It should contain elements like walls, rooms, dimensions, or other standard architectural notations. A photo of a finished building is not a valid plan. A simple drawing of a house without any structural detail is also not a valid plan.

  Analyze the following image: {{media url=sketchDataUri}}`,
});

const generate3DRenderFromSketchFlow = ai.defineFlow(
  {
    name: 'generate3DRenderFromSketchFlow',
    inputSchema: Generate3DRenderFromSketchInputSchema,
    outputSchema: Generate3DRenderFromSketchOutputSchema,
  },
  async input => {
    // Step 1: Validate the input image
    const {output: validationResult} = await validationPrompt({sketchDataUri: input.sketchDataUri});

    if (!validationResult?.isArchitecturalPlan) {
      const reasoning = validationResult?.reasoning || 'The AI could not determine why.';
      return {
        renderDataUri: undefined,
        error: `The uploaded image is not a valid architectural plan. ${reasoning}`,
      };
    }

    // Step 2: If validation passes, proceed with generation
    let promptText = `Given a 2D floor plan diagram or sketch, generate a 3D top-down architectural model. The output should maintain the exact layout and spatial relationships of rooms, walls, doors, and windows as depicted in the input. Ensure that furniture and fixtures (e.g., beds, sofas, tables, kitchen appliances, bathroom fixtures) are accurately represented in their respective locations and orientations, mimicking the style and level of detail shown in the provided examples. The rendering style should be consistent with the clean, modern, and well-lit aesthetic of the example images, featuring appropriate textures for flooring (hardwood, carpet, tile), walls, and furniture. The perspective should be a clear, overhead, slightly angled view, similar to an axonometric projection, allowing for a comprehensive understanding of the entire floor plan. All elements should be proportionally scaled and realistically rendered to create a professional and appealing visualization of the architectural space.`;

    if (input.textPrompt) {
      promptText += `\n\n**User Refinements:** Additionally, apply the following specific refinements based on the user's text prompt: "${input.textPrompt}"`;
    }

    if (input.moodBoardDataUris && input.moodBoardDataUris.length > 0) {
      promptText += `\n\n**Style Guidance:** Use the style, color palette, materials, and overall aesthetic from the provided mood board images to heavily influence the final render's design.`;
    }

    const promptParts: any[] = [{text: promptText}, {media: {url: input.sketchDataUri}}];

    if (input.moodBoardDataUris) {
      input.moodBoardDataUris.forEach(uri => {
        promptParts.push({media: {url: uri}});
      });
    }

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
