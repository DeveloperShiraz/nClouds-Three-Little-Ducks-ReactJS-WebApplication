import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { askExpert } from './functions/ask-expert/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  askExpert,
});

const bedrockPolicy = new PolicyStatement({
  actions: [
    'bedrock:RetrieveAndGenerate',
    'bedrock:Retrieve',
    'bedrock:InvokeModel'
  ],
  resources: ['*'], // ideally restrict to specific KB ARN, but simpler for now
});

backend.askExpert.resources.lambda.addToRolePolicy(bedrockPolicy);
