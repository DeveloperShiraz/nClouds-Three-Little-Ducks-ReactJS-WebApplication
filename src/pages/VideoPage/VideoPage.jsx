import { useState, useEffect } from 'react'
import TopNavigation from '../../components/TopNavigation/TopNavigation'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import VideoService from '../../services/VideoService'
import './VideoPage.css'

function VideoPage() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        loadVideos()
    }, [])

    const loadVideos = async () => {
        try {
            setLoading(true)
            setError(null)
            const videoList = await VideoService.listVideos()

            // Double-check: ensure videoList is an array before setting state
            const safeVideoList = Array.isArray(videoList) ? videoList : []

            setVideos(safeVideoList)
            if (safeVideoList.length > 0) {
                setSelectedVideo(safeVideoList[0])
            }
        } catch (err) {
            console.error(err)
            setError(err.message || 'Failed to load videos')
            setVideos([]) // Ensure videos is always an array
        } finally {
            setLoading(false)
        }
    }

    // Safely get video name
    const getVideoName = (video) => {
        if (!video || !video.key) return 'Unknown Video'
        return video.key.split('/').pop() || 'Unknown Video'
    }

    // Safely format file size
    const formatSize = (size) => {
        if (typeof size !== 'number' || isNaN(size)) return '? MB'
        return (size / 1024 / 1024).toFixed(1) + ' MB'
    }

    // Ensure videos is always an array for rendering
    const safeVideos = Array.isArray(videos) ? videos : []

    return (
        <div className="dashboard-container">
            <TopNavigation />

            <main className="dashboard-content video-content">
                {error && <div className="error-banner">{error}</div>}

                {loading ? (
                    <div className="loading-state">Loading videos...</div>
                ) : (
                    <div className="video-layout">
                        {/* Main Player Component */}
                        <div className="main-player-section">
                            {selectedVideo ? (
                                <div className="player-wrapper">
                                    <video
                                        key={selectedVideo.url || 'default'}
                                        controls
                                        autoPlay={false}
                                        className="main-video-player"
                                    >
                                        <source src={selectedVideo.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <h3 className="video-title">{getVideoName(selectedVideo)}</h3>
                                </div>
                            ) : (
                                <div className="empty-player">Select a video to play</div>
                            )}
                        </div>

                        {/* Playlist Sidebar */}
                        <div className="playlist-sidebar">
                            <h3>Library</h3>
                            <div className="video-list">
                                {safeVideos.map((video, index) => (
                                    <div
                                        key={video?.key || `video-${index}`}
                                        className={`video-item ${selectedVideo?.key === video?.key ? 'active' : ''}`}
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        <div className="video-thumbnail-placeholder">
                                            ▶
                                        </div>
                                        <div className="video-info">
                                            <span className="video-name">{getVideoName(video)}</span>
                                            <span className="video-meta">{formatSize(video?.size)}</span>
                                        </div>
                                    </div>
                                ))}
                                {safeVideos.length === 0 && <p className="no-videos">No videos found in bucket.</p>}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <BottomNavigation />
        </div>
    )
}

export default VideoPage
