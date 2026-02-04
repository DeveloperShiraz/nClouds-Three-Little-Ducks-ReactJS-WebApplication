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

            // Handle string response (JSON.stringify from Lambda)
            if (typeof videos === 'string') {
                try {
                    videos = JSON.parse(videos)
                } catch (parseError) {
                    console.error("Failed to parse videos JSON:", parseError)
                    return []
                }
            }

            // STRICTLY ensure we return an array
            if (!Array.isArray(videos)) {
                console.warn("Videos response is not an array:", videos)
                return []
            }

            return videos
        } catch (error) {
            console.error("Error listing videos:", error)
            // Return empty array instead of throwing to prevent page crash
            return []
        }
    }
}

export default VideoService
