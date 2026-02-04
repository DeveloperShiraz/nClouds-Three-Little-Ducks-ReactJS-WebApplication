import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { getVideos } from './functions/get-videos/resource';
import { askExpert } from './functions/ask-expert/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  askExpert,
  getVideos,
});

const bedrockPolicy = new PolicyStatement({
  actions: [
    'bedrock:RetrieveAndGenerate',
    'bedrock:Retrieve',
    'bedrock:InvokeModel',
    'bedrock:GetInferenceProfile'
  ],
  resources: ['*'], // ideally restrict to specific KB ARN, but simpler for now
});

backend.askExpert.resources.lambda.addToRolePolicy(bedrockPolicy);

const videoBucketPolicy = new PolicyStatement({
  actions: ['s3:GetObject', 's3:ListBucket'],
  resources: [
    'arn:aws:s3:::bedrock-video-multimodal-training-data',
    'arn:aws:s3:::bedrock-video-multimodal-training-data/*'
  ]
});

backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(videoBucketPolicy);

backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(videoBucketPolicy);
backend.getVideos.resources.lambda.addToRolePolicy(videoBucketPolicy);
