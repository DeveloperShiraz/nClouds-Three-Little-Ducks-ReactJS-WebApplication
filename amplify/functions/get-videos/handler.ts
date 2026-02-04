import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({ region: 'us-east-1' });
const BUCKET_NAME = 'bedrock-video-multimodal-training-data';

export const handler = async (event) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: BUCKET_NAME,
        });
        const response = await client.send(command);

        const videoFiles = response.Contents?.filter(item =>
            item.Key?.endsWith('.mp4') || item.Key?.endsWith('.mov') || item.Key?.endsWith('.webm')
        ) || [];

        // Generate presigned URLs for each video (valid for 1 hour)
        const videos = await Promise.all(
            videoFiles.map(async (file) => {
                const getObjectCommand = new GetObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: file.Key,
                });

                const presignedUrl = await getSignedUrl(client, getObjectCommand, {
                    expiresIn: 3600, // 1 hour
                });

                return {
                    key: file.Key,
                    size: file.Size,
                    lastModified: file.LastModified,
                    url: presignedUrl,
                };
            })
        );

        return JSON.stringify(videos);
    } catch (error) {
        console.error('Error listing videos:', error);
        throw new Error('Failed to list videos');
    }
};
