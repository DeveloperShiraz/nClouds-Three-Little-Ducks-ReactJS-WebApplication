import { generateClient } from 'aws-amplify/data'

const VideoService = {
    async listVideos() {
        try {
            // Lazy load client to prevent 'Amplify not configured' error on app load
            console.log("Generating Amplify Client for VideoService...")
            const client = generateClient()
            console.log("Amplify Client generated. Calling getVideos...")

            // Call the backend Lambda proxy to bypass CORS
            const response = await client.queries.getVideos()
            console.log("getVideos response:", response)

            let videos = response?.data

            // The Lambda returns JSON.stringify(array), then Amplify AWSJSON double-stringifies it.
            // We need to parse multiple times until we get an actual array.
            let parseAttempts = 0
            const maxParseAttempts = 3 // Safety limit

            while (typeof videos === 'string' && parseAttempts < maxParseAttempts) {
                try {
                    console.log(`Parse attempt ${parseAttempts + 1}, current type: ${typeof videos}`)
                    videos = JSON.parse(videos)
                    parseAttempts++
                } catch (parseError) {
                    console.error("Failed to parse videos JSON:", parseError)
                    return []
                }
            }

            console.log("Final parsed videos:", videos, "Is array:", Array.isArray(videos))

            // Ensure we return an array
            if (!Array.isArray(videos)) {
                console.warn("Videos response is not an array after parsing:", typeof videos, videos)
                return []
            }

            return videos
        } catch (error) {
            console.error("Error listing videos:", error)
            return []
        }
    }
}

export default VideoService
