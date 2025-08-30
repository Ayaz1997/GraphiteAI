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

export async function generate3DRenderFromSketch(
  input: Generate3DRenderFromSketchInput
): Promise<Generate3DRenderFromSketchOutput> {
  // First, validate the input image
  const {output: validationResult} = await validationPrompt({sketchDataUri: input.sketchDataUri});

  if (!validationResult?.isArchitecturalPlan) {
    const reasoning = validationResult?.reasoning || 'The AI could not determine why.';
    // Return a valid Output object with an error message.
    return {
      renderDataUri: undefined,
      error: `The uploaded image is not a valid architectural plan. ${reasoning}`,
    };
  }

  // If validation passes, proceed with generation
  return await generate3DRenderFromSketchFlow(input);
}

const generate3DRenderFromSketchFlow = ai.defineFlow(
  {
    name: 'generate3DRenderFromSketchFlow',
    inputSchema: Generate3DRenderFromSketchInputSchema,
    outputSchema: Generate3DRenderFromSketchOutputSchema,
  },
  async input => {
    let promptText = `You are an AI that creates a detailed 3D isometric image from a 2D architectural blueprint drawing.

    The user has provided an architectural plan. Your goal is to convert this 2D drawing into a 3D isometric render. The render must be a direct representation of the uploaded plan, maintaining the same layout, room sizes, and overall structure.

    The final image should be a high-quality, detailed 3D isometric view of the building plan. Include 3D elements like beds, sofas, tables, and other furniture as appropriate for the rooms designated in the plan. Also, include details from the plan like room sizes and numbers where applicable.`;

    if (input.textPrompt) {
      promptText += `\n\nAdditionally, apply the following refinements based on the user's text prompt: "${input.textPrompt}"`;
    }

    if (input.moodBoardDataUris && input.moodBoardDataUris.length > 0) {
      promptText += `\n\nUse the style, colors, and textures from the provided mood board images to influence the aesthetic of the final render.`;
    }

    const promptParts: any[] = [{text: promptText}, {media: {url: input.sketchDataUri}}];

    if (input.moodBoardDataUris) {
      input.moodBoardDataUris.forEach(uri => {
        promptParts.push({media: {url: uri}});
      });
    }

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: promptParts,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media?.url) {
      return {error: 'Image generation failed.'};
    }

    return {renderDataUri: media.url};
  }
);
