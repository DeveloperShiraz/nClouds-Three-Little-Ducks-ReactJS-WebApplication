import TopNavigation from '../../components/TopNavigation/TopNavigation'
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation'
import '../DashboardPage/DashboardPage.css' // Reuse empty state styles

function AskPage() {
    return (
        <div className="dashboard-container">
            <TopNavigation />

            <main className="dashboard-content" style={{ paddingBottom: '80px' }}>
                <div className="empty-state">
                    <h2>Ask an Expert</h2>
                    <p>Get answers to your parenting questions here soon.</p>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}

export default AskPage
