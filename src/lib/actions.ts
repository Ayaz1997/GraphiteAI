
'use server';

import { generate3DRenderFromSketch } from '@/ai/flows/generate-3d-render-from-sketch';
import { z } from 'zod';

export type FormState = {
  renderDataUri: string | null;
  error: string | null;
};

const GenerateRenderSchema = z.object({
  sketchDataUri: z.string().min(1, 'Sketch is required.'),
  textPrompt: z.string().optional(),
  moodBoardDataUris: z.array(z.string()).optional(),
});

export async function generateRenderAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // Note: formData.getAll() is the correct way to get multiple values from a form
    const moodBoardUris = formData.getAll('moodBoardDataUri[]').map(String).filter(uri => uri);

    const validatedFields = GenerateRenderSchema.safeParse({
      sketchDataUri: formData.get('sketchDataUri'),
      textPrompt: formData.get('textPrompt'),
      moodBoardDataUris: moodBoardUris,
    });

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        renderDataUri: null,
        error: fieldErrors.sketchDataUri?.[0] || fieldErrors.textPrompt?.[0] || fieldErrors.moodBoardDataUris?.[0] || 'Invalid input.',
      };
    }
    
    const { sketchDataUri, textPrompt, moodBoardDataUris } = validatedFields.data;

    const result = await generate3DRenderFromSketch({
      sketchDataUri,
      textPrompt,
      moodBoardDataUris,
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
