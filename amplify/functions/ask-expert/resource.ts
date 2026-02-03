import { defineFunction } from '@aws-amplify/backend';

export const askExpert = defineFunction({
    name: 'ask-expert',
    entry: './handler.ts',
    environment: {
        BEDROCK_KB_ID: process.env.BEDROCK_KB_ID || '',
        BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID || 'amazon.nova-lite-v1:0',
    },
    timeoutSeconds: 60 // Bedrock can take a moment
});
