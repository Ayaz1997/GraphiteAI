'use server';

import { generate3DRenderFromSketch } from '@/ai/flows/generate-3d-render-from-sketch';
import { z } from 'zod';

export type FormState = {
  renderDataUri: string | null;
  error: string | null;
};

const GenerateRenderSchema = z.object({
  sketchDataUri: z.string().min(1, 'Sketch is required.'),
  moodBoardDataUri: z.union([z.string(), z.array(z.string())]).optional(),
  textPrompt: z.string().optional(),
});

export async function generateRenderAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = GenerateRenderSchema.safeParse({
    sketchDataUri: formData.get('sketchDataUri'),
    moodBoardDataUri: formData.getAll('moodBoardDataUri[]').length > 0 ? formData.getAll('moodBoardDataUri[]') : formData.get('moodBoardDataUri'),
    textPrompt: formData.get('textPrompt'),
  });

  if (!validatedFields.success) {
    return {
      renderDataUri: null,
      error: validatedFields.error.flatten().fieldErrors.sketchDataUri?.[0] || 'Invalid input.',
    };
  }

  try {
    const { sketchDataUri, moodBoardDataUri, textPrompt } = validatedFields.data;

    const result = await generate3DRenderFromSketch({
      sketchDataUri,
      // @ts-ignore
      moodBoardDataUri: Array.isArray(moodBoardDataUri) ? moodBoardDataUri[0] : moodBoardDataUri,
      textPrompt,
    });

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
    console.error('Error generating render:', error);
    return {
      renderDataUri: null,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
