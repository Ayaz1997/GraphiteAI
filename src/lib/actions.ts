'use server';

import { generate3DRenderFromSketch } from '@/ai/flows/generate-3d-render-from-sketch';
import { z } from 'zod';

export type FormState = {
  renderDataUri: string | null;
  error: string | null;
};

const GenerateRenderSchema = z.object({
  sketchDataUri: z.string().min(1, 'Sketch is required.'),
  moodBoardDataUris: z.array(z.string()).optional(),
  textPrompt: z.string().optional(),
});

export async function generateRenderAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const moodBoards = formData.getAll('moodBoardDataUri[]').filter(item => typeof item === 'string' && item.length > 0) as string[];

    const validatedFields = GenerateRenderSchema.safeParse({
      sketchDataUri: formData.get('sketchDataUri'),
      moodBoardDataUris: moodBoards.length > 0 ? moodBoards : undefined,
      textPrompt: formData.get('textPrompt'),
    });

    if (!validatedFields.success) {
      return {
        renderDataUri: null,
        error: validatedFields.error.flatten().fieldErrors.sketchDataUri?.[0] || 'Invalid input.',
      };
    }

    const { sketchDataUri, moodBoardDataUris, textPrompt } = validatedFields.data;

    const result = await generate3DRenderFromSketch({
      sketchDataUri,
      moodBoardDataUris,
      textPrompt,
    });

    if (result.error) {
      return {
        renderDataUri: null,
        error: result.error,
      };
    }

    if (!result.renderDataUri) {
      return {
        renderDataUri: null,
        error: 'AI failed to generate a render. Please try again.',
      };
    }

    return {
      renderDataUri: result.renderDataUri,
      error: null,
    };
  } catch (error) {
    console.error('Error in generateRenderAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.';
    return {
      renderDataUri: null,
      error: errorMessage,
    };
  }
}
