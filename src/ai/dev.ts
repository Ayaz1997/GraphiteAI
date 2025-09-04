
import 'dotenv/config';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
// import {start} from 'genkit/dev';

// Note: Flows are automatically discovered and do not need to be imported here.
import '@/ai/flows/generate-3d-render-from-sketch.ts';

const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
});

// start(ai, {
//   port: 4001,
// });
