'use server';
/**
 * @fileOverview A flow that incorporates a mood board of images to guide the AI's rendering style.
 *
 * - incorporateMoodBoardStyle - A function that handles the process of incorporating a mood board to guide the AI's rendering style.
 * - IncorporateMoodBoardStyleInput - The input type for the incorporateMoodBoardStyle function.
 * - IncorporateMoodBoardStyleOutput - The return type for the incorporateMoodBoardStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IncorporateMoodBoardStyleInputSchema = z.object({
  sketchDataUri: z
    .string()
    .describe(
      "A 2D architectural sketch as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  moodBoardDataUris: z
    .array(z.string())
    .describe(
      "An array of mood board images as data URIs that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .max(4),
  textPrompt: z.string().optional().describe('Optional text prompt to further refine the rendering style.'),
});
export type IncorporateMoodBoardStyleInput = z.infer<typeof IncorporateMoodBoardStyleInputSchema>;

const IncorporateMoodBoardStyleOutputSchema = z.object({
  render3DDataUri: z
    .string()
    .describe("A low-resolution 3D render as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type IncorporateMoodBoardStyleOutput = z.infer<typeof IncorporateMoodBoardStyleOutputSchema>;

export async function incorporateMoodBoardStyle(
  input: IncorporateMoodBoardStyleInput
): Promise<IncorporateMoodBoardStyleOutput> {
  return incorporateMoodBoardStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'incorporateMoodBoardStylePrompt',
  input: {schema: IncorporateMoodBoardStyleInputSchema},
  output: {schema: IncorporateMoodBoardStyleOutputSchema},
  prompt: `You are an AI that generates low-resolution 3D renders of architectural designs based on a 2D sketch and a mood board of images.

  The user will provide a sketch of the architecture and a mood board of images to guide the rendering style. Use the mood board images to inform the colors, textures, and overall aesthetic of the 3D render.

  {{#if textPrompt}}
  Additionally, a user has provided the following text prompt to further refine the rendering style: {{{textPrompt}}}
  {{/if}}

  Sketch: {{media url=sketchDataUri}}
  Mood Board:
  {{#each moodBoardDataUris}}
  {{media url=this}}
  {{/each}}
  `,
});

const incorporateMoodBoardStyleFlow = ai.defineFlow(
  {
    name: 'incorporateMoodBoardStyleFlow',
    inputSchema: IncorporateMoodBoardStyleInputSchema,
    outputSchema: IncorporateMoodBoardStyleOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: prompt,
      model: 'googleai/imagen-4.0-fast-generate-001',
      messages: [
        {
          role: 'user',
          content: [
            {text: prompt.prompt},
            {media: {url: input.sketchDataUri}},
            ...input.moodBoardDataUris.map(uri => ({
              media: {url: uri},
            })),
          ],
        },
      ],
    });

    return {render3DDataUri: media.url!};
  }
);
