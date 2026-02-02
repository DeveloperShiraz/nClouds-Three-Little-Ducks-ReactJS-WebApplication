import TopNavigation from '../../components/TopNavigation/TopNavigation'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import '../DashboardPage/DashboardPage.css' // Reuse empty state styles

function VideoPage() {
    return (
        <div className="dashboard-container">
            <TopNavigation />

            <main className="dashboard-content" style={{ paddingBottom: '80px' }}>
                <div className="empty-state">
                    <h2>Video Library</h2>
                    <p>Educational videos and guides coming soon!</p>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default VideoPage
