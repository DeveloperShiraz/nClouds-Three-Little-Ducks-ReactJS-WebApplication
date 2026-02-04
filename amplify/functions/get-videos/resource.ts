import { defineFunction } from '@aws-amplify/backend';

export const getVideos = defineFunction({
    name: 'get-videos',
    entry: './handler.ts',
});
