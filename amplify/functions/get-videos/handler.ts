import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = 'bedrock-video-multimodal-training-data';

export const handler = async (event) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
        });
        const response = await client.send(command);

        const videoFiles = response.Contents?.filter(item =>
            item.Key.endsWith('.mp4') || item.Key.endsWith('.mov') || item.Key.endsWith('.webm')
        ) || [];

        const videos = videoFiles.map(file => ({
            key: file.Key,
            size: file.Size,
            lastModified: file.LastModified,
            // Since it's a public/training data bucket, we construct the URL. 
            // If it requires auth, we'd generate a presigned URL here.
            url: `https://${BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file.Key}`
        }));

        return JSON.stringify(videos);
    } catch (error) {
        console.error('Error listing videos:', error);
        throw new Error('Failed to list videos');
    }
};
