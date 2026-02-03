import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime';

const bedrockClient = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const { question, sessionId } = event.arguments;
    const kbId = process.env.BEDROCK_KB_ID;
    const modelId = process.env.BEDROCK_MODEL_ID;

    // Check if it's an Inference Profile (starts with region prefix usually) or Foundation Model
    // Valid Inference Profile prefixes: us., eu., us-east-1., etc.
    const isInferenceProfile =
        modelId?.startsWith('arn:') ||
        modelId?.includes('.') && !modelId?.startsWith('amazon.') && !modelId?.startsWith('anthropic.') && !modelId?.startsWith('meta.') && !modelId?.startsWith('mistral.') && !modelId?.startsWith('cohere.') && !modelId?.startsWith('ai21.');

    // Simpler check: if it starts with a region code prefix like "us." or "us-", it's a profile.
    const resourceType = (modelId?.startsWith('us') || modelId?.startsWith('eu') || modelId?.startsWith('ap') || modelId?.startsWith('sa') || modelId?.startsWith('ca'))
        ? 'inference-profile'
        : 'foundation-model';

    const modelArn = modelId?.startsWith('arn:')
        ? modelId
        : `arn:aws:bedrock:${process.env.AWS_REGION}::${resourceType}/${modelId}`;

    if (!kbId) {
        throw new Error('BEDROCK_KB_ID environment variable is not set');
    }

    try {
        const command = new RetrieveAndGenerateCommand({
            input: {
                text: question
            },
            retrieveAndGenerateConfiguration: {
                type: 'KNOWLEDGE_BASE',
                knowledgeBaseConfiguration: {
                    knowledgeBaseId: kbId,
                    modelArn: modelArn,
                }
            },
            sessionId: sessionId || undefined // Only pass if exists
        });

        const response = await bedrockClient.send(command);

        return {
            answer: response.output?.text || "I'm sorry, I couldn't find an answer to that.",
            sessionId: response.sessionId
        };

    } catch (error) {
        console.error('Bedrock error:', error);
        // Return the actual error message to the client for debugging
        throw new Error(`Bedrock Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};
