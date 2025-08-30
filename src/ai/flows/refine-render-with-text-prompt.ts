'use server';

/**
 * @fileOverview A flow to refine a 3D render using a text prompt.
 *
 * - refineRenderWithTextPrompt - A function that refines the 3D render based on a text prompt.
 * - RefineRenderWithTextPromptInput - The input type for the refineRenderWithTextPrompt function.
 * - RefineRenderWithTextPromptOutput - The return type for the refineRenderWithTextPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineRenderWithTextPromptInputSchema = z.object({
  renderDataUri: z
    .string()
    .describe(
      "The current 3D render as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  textPrompt: z.string().describe('A detailed text prompt to guide the refinement of the 3D render.'),
});
export type RefineRenderWithTextPromptInput = z.infer<typeof RefineRenderWithTextPromptInputSchema>;

const RefineRenderWithTextPromptOutputSchema = z.object({
  refinedRenderDataUri: z
    .string()
    .describe(
      "The refined 3D render as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RefineRenderWithTextPromptOutput = z.infer<typeof RefineRenderWithTextPromptOutputSchema>;

export async function refineRenderWithTextPrompt(input: RefineRenderWithTextPromptInput): Promise<RefineRenderWithTextPromptOutput> {
  return refineRenderWithTextPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineRenderWithTextPromptPrompt',
  input: {schema: RefineRenderWithTextPromptInputSchema},
  output: {schema: RefineRenderWithTextPromptOutputSchema},
  prompt: `You are an AI that refines 3D renders based on user-provided text prompts.

  The user will provide a current render and a text prompt describing desired refinements.
  Your goal is to generate a refined render that incorporates the feedback from the prompt.

Current Render:
{{media url=renderDataUri}}

Refinement Prompt: {{{textPrompt}}}

Generate a new render that incorporates the user's feedback. Return the new render as a data URI.
`,
});

const refineRenderWithTextPromptFlow = ai.defineFlow(
  {
    name: 'refineRenderWithTextPromptFlow',
    inputSchema: RefineRenderWithTextPromptInputSchema,
    outputSchema: RefineRenderWithTextPromptOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.renderDataUri}},
        {text: input.textPrompt},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });
    return {refinedRenderDataUri: output?.media?.url!};
  }
);
