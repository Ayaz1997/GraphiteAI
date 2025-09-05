
import 'dotenv/config';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
// import {start} from 'genkit/dev';

// Note: Flows are automatically discovered and do not need to be imported here.

const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
      apiVersion: 'v1beta',
    }),
  ],
});

// start(ai, {
//   port: 4001,
// });
