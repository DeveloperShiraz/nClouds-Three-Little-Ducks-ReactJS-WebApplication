import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from '@aws-sdk/client-bedrock-agent-runtime';

const bedrockClient = new BedrockAgentRuntimeClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const { question, sessionId } = event.arguments;
    const kbId = process.env.BEDROCK_KB_ID;
    const modelId = process.env.BEDROCK_MODEL_ID;

    // For cross-region inference profiles (like Nova 2 Lite), pass the inference profile ID directly.
    // AWS Bedrock will resolve it. Example IDs:
    // - Foundation model: amazon.nova-lite-v1:0
    // - Cross-region inference profile: us.amazon.nova-2-lite-v1:0
    // The modelArn parameter accepts both ARNs and model/profile IDs.
    const modelArn = modelId;

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

        let answerText = response.output?.text || "I'm sorry, I couldn't find an answer to that.";

        // Cleanup: Remove "Action: ... Response:" chain of thought artifacts if present
        // Example: "Action: GlobalDataSource.search(...) Response: The answer is..."
        // We want to keep everything AFTER "Response: "
        if (answerText.includes('Response:')) {
            const parts = answerText.split('Response:');
            // Take the last part to be safe (in case of nested thinking)
            answerText = parts[parts.length - 1].trim();
        }

        return {
            answer: answerText,
            sessionId: response.sessionId
        };

    } catch (error) {
        console.error('Bedrock error:', error);
        // Return the actual error message to the client for debugging
        throw new Error(`Bedrock Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
    }
};
